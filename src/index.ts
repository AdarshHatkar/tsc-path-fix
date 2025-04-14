import { watch } from 'chokidar';
import { globbySync } from 'globby';
import { pLimit } from 'plimit-lit';
import { cpus } from 'os';
import { prepareConfig, replaceAlias, replaceAliasString, clearFileContentCache } from './helpers';
import {
  AliasReplacer,
  AliasReplacerArguments,
  IConfig,
  IOutput,
  IProjectConfig,
  ReplaceTscAliasPathsOptions
} from './interfaces';
import { ProgressBar } from './utils/progress-bar';
import { clearPathResolutionCache } from './utils/import-path-resolver';
import { clearTrieCache } from './utils/trie';

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

// Calculate optimal concurrency based on CPU cores (2-4x number of cores is usually optimal for I/O operations)
const cpuCount = cpus().length;
const OptimalConcurrency = Math.max(cpuCount * 3, 10); // Minimum of 10, up to 3x CPU cores
const OpenFilesLimit = pLimit(OptimalConcurrency);

// Optimal batch size for processing large projects
// This helps keep memory usage in check
const BATCH_SIZE = 500;

/**
 * Process files in batches to manage memory consumption
 * @param files Array of files to process
 * @param config Configuration 
 * @param progressBar Progress bar instance
 * @param options Options
 * @returns Number of files that were modified
 */
async function processFilesInBatches(
  files: string[],
  config: IConfig,
  progressBar: ProgressBar | null,
  options: ReplaceTscAliasPathsOptions
): Promise<number> {
  let processedCount = 0;
  let modifiedCount = 0;
  
  // Process files in batches to limit memory usage
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    config.output.debug(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(files.length / BATCH_SIZE)}`);
    
    // Process this batch
    const batchResults = await Promise.all(
      batch.map((file) =>
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
    
    // Count modified files in this batch
    modifiedCount += batchResults.filter(Boolean).length;
    
    // Force garbage collection-friendly behavior by clearing references
    if (global.gc && typeof global.gc === 'function') {
      global.gc();
    }
  }
  
  return modifiedCount;
}

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
  
  // More efficient globbing pattern with additional exclusions
  const globPattern = [
    `${posixOutput}/**/*.${config.inputGlob}`,
    `!${posixOutput}/**/node_modules/**`,
    `!${posixOutput}/**/.git/**`,
    `!${posixOutput}/**/dist/**`,
    `!${posixOutput}/**/build/**`
  ];
  
  output.debug('Search pattern:', globPattern);
  const files = globbySync(globPattern, {
    dot: true,
    onlyFiles: true,
    followSymbolicLinks: false, // Don't follow symlinks for better performance
    concurrency: OptimalConcurrency // Use same concurrency limit for consistency
  });
  output.debug('Found files:', files);

  let progressBar: ProgressBar = null;

  // Initialize progress bar if enabled and there are files to process
  if (showProgress && files.length > 0 && !options.watch) {
    progressBar = new ProgressBar(files.length, {
      showElapsed: true,
      showCount: true,
      width: 40,
    });
    progressBar.start();
  }

  // Process files in batches to optimize memory usage
  const replaceCount = await processFilesInBatches(files, config, progressBar, options);

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
    const onFileChange = async (file: string) => {
      // Clear all caches on file changes when in watch mode
      clearPathResolutionCache();
      clearFileContentCache();
      clearTrieCache();
      await replaceAlias(config, file, options?.resolveFullPaths);
    };
    filesWatcher.on('add', onFileChange);
    filesWatcher.on('change', onFileChange);
    tsconfigWatcher.on('change', () => {
      output.clear();
      filesWatcher.close();
      tsconfigWatcher.close();
      // Clear all caches when tsconfig changes
      clearPathResolutionCache();
      clearFileContentCache();
      clearTrieCache();
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
