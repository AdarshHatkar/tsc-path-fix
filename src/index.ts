import { watch } from 'chokidar';
import { globbySync } from 'globby';
import { pLimit } from 'plimit-lit';
import { prepareConfig, replaceAlias, replaceAliasString } from './helpers';
import {
  AliasReplacer,
  AliasReplacerArguments,
  IConfig,
  IOutput,
  IProjectConfig,
  ReplaceTscAliasPathsOptions
} from './interfaces';
import { ProgressBar } from './utils/progress-bar';

// export interfaces for api use.
export {
  ReplaceTscAliasPathsOptions,
  AliasReplacer,
  AliasReplacerArguments,
  IConfig,
  IProjectConfig,
  IOutput
};

const defaultConfig = {
  watch: false,
  verbose: false,
  debug: false,
  declarationDir: undefined,
  output: undefined,
  aliasTrie: undefined,
  showProgress: true
};

const OpenFilesLimit = pLimit(500);

/**
 * replaceTscAliasPaths replaces the aliases in the project.
 * @param {ReplaceTscAliasPathsOptions} options tsc-path-fix options.
 */
export async function replaceTscAliasPaths(
  options: ReplaceTscAliasPathsOptions = { ...defaultConfig }
) {
  const config = await prepareConfig(options);
  const output = config.output;
  const showProgress = options.showProgress !== undefined ? options.showProgress : config.showProgress;

  // Finding files and changing alias paths
  const posixOutput = config.outPath.replace(/\\/g, '/').replace(/\/+$/g, '');
  const globPattern = [
    `${posixOutput}/**/*.${config.inputGlob}`,
    `!${posixOutput}/**/node_modules`
  ];
  output.debug('Search pattern:', globPattern);
  const files = globbySync(globPattern, {
    dot: true,
    onlyFiles: true
  });
  output.debug('Found files:', files);

  let progressBar: ProgressBar;
  let processedCount = 0;

  // Initialize progress bar if enabled and there are files to process
  if (showProgress && files.length > 0 && !options.watch) {
    progressBar = new ProgressBar(files.length, {
      showElapsed: true,
      showCount: true,
      width: 40,
    });
    progressBar.start();
  }

  // Make array with promises for file changes
  // Wait for all promises to resolve
  const replaceList = await Promise.all(
    files.map((file) =>
      OpenFilesLimit(async () => {
        const result = await replaceAlias(
          config,
          file,
          options?.resolveFullPaths,
          options?.resolveFullExtension
        );
        
        // Update progress bar if it's enabled
        if (progressBar) {
          processedCount++;
          progressBar.update(processedCount);
        }
        
        return result;
      })
    )
  );

  // Count all changed files
  const replaceCount = replaceList.filter(Boolean).length;

  // Complete the progress bar if it was started
  if (progressBar) {
    progressBar.complete(`Processed ${files.length} files, ${replaceCount} were updated`);
  }

  output.info(`${replaceCount} files were affected!`);
  if (options.watch) {
    output.verbose = true;
    output.info('[Watching for file changes...]');
    const filesWatcher = watch(globPattern);
    const tsconfigWatcher = watch(config.configFile);
    const onFileChange = async (file: string) =>
      await replaceAlias(config, file, options?.resolveFullPaths);
    filesWatcher.on('add', onFileChange);
    filesWatcher.on('change', onFileChange);
    tsconfigWatcher.on('change', () => {
      output.clear();
      filesWatcher.close();
      tsconfigWatcher.close();
      replaceTscAliasPaths(options);
    });
  }
  if (options.declarationDir) {
    replaceTscAliasPaths({
      ...options,
      outDir: options.declarationDir,
      declarationDir: undefined,
      output: config.output,
      aliasTrie: undefined
    });
  }
}

export type SingleFileReplacer = (input: {
  fileContents: string;
  filePath: string;
}) => string;

/**
 * prepareSingleFileReplaceTscAliasPaths prepares a SingleFileReplacer.
 * @param {ReplaceTscAliasPathsOptions} options tsc-path-fix options.
 * @returns {Promise<SingleFileReplacer>} a SingleFileReplacer to use for replacing aliases in a single file.
 */
export async function prepareSingleFileReplaceTscAliasPaths(
  options: ReplaceTscAliasPathsOptions = { ...defaultConfig }
): Promise<SingleFileReplacer> {
  const config = await prepareConfig(options);

  return ({ fileContents, filePath }) => {
    return replaceAliasString(
      config,
      filePath,
      fileContents,
      options?.resolveFullPaths,
      options?.resolveFullExtension
    );
  };
}
