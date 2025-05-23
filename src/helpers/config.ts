/**
 * @file
 *
 * This file has all helper functions related to configuration.
 */

/** */
import { existsSync, lstatSync } from 'fs';
import { Dir, Json } from 'mylas';
import { basename, dirname, isAbsolute, join, resolve } from 'path';
import {
  IConfig,
  IOutput,
  IProjectConfig,
  IRawTSConfig,
  ITSConfig,
  ReplaceTscAliasPathsOptions,
  ReplacerOptions
} from '../interfaces';
import { Output, PathCache, TrieNode } from '../utils';
import { importReplacers } from './replacers';
import normalizePath = require('normalize-path');

/**
 * Validates the tsc-path-fix configuration and returns detailed error messages if invalid
 * @param {IRawTSConfig} config The raw tsconfig with tsc-path-fix section
 * @returns {string[]} Array of error messages, empty if config is valid
 */
export function validateTscPathfixConfig(config: IRawTSConfig): string[] {
  const errors: string[] = [];
  const tscPathfixConfig = config['tsc-path-fix'];

  if (!tscPathfixConfig) {
    return errors; // No tsc-path-fix config is valid
  }

  // Validate replacers if present
  if (tscPathfixConfig.replacers) {
    const replacers = tscPathfixConfig.replacers as ReplacerOptions;

    for (const [name, options] of Object.entries(replacers)) {
      if (options.enabled === undefined) {
        errors.push(`Replacer "${name}" is missing the "enabled" property`);
      }

      if (options.enabled && options.file === undefined) {
        errors.push(
          `Enabled replacer "${name}" is missing the "file" property`
        );
      }
    }
  }

  // Validate fileExtensions if present
  if (tscPathfixConfig.fileExtensions) {
    const { inputGlob, outputCheck } = tscPathfixConfig.fileExtensions;

    if (inputGlob && typeof inputGlob !== 'string') {
      errors.push('fileExtensions.inputGlob must be a string');
    }

    if (outputCheck && !Array.isArray(outputCheck)) {
      errors.push('fileExtensions.outputCheck must be an array');
    } else if (outputCheck && !outputCheck.every(item => typeof item === 'string')) {
      errors.push('fileExtensions.outputCheck must be an array of strings');
    }
  }

  // Validate resolveFullPaths
  if (tscPathfixConfig.resolveFullPaths !== undefined && 
      typeof tscPathfixConfig.resolveFullPaths !== 'boolean') {
    errors.push('resolveFullPaths must be a boolean value');
  }

  // Validate verbose
  if (tscPathfixConfig.verbose !== undefined && 
      typeof tscPathfixConfig.verbose !== 'boolean') {
    errors.push('verbose must be a boolean value');
  }
  
  // Validate showProgress
  if (tscPathfixConfig.showProgress !== undefined && 
      typeof tscPathfixConfig.showProgress !== 'boolean') {
    errors.push('showProgress must be a boolean value');
  }

  return errors;
}

/**
 * prepareConfig prepares a IConfig object for tsc-path-fix to be used.
 * @param {ReplaceTscAliasPathsOptions} options options that are used to prepare a config object.
 * @returns {Promise<IConfig>} a promise of a IConfig object.
 */
export async function prepareConfig(
  options: ReplaceTscAliasPathsOptions
): Promise<IConfig> {
  const output = options.output ?? new Output(options.verbose, options.debug);

  const configFile = !options.configFile
    ? resolve(process.cwd(), 'tsconfig.json')
    : !isAbsolute(options.configFile)
      ? resolve(process.cwd(), options.configFile)
      : options.configFile;

  output.assert(existsSync(configFile), `Invalid file path => ${configFile}`);

  const {
    baseUrl = '',
    outDir,
    declarationDir,
    paths,
    replacers,
    resolveFullPaths,
    verbose,
    fileExtensions
  } = loadConfig(configFile, output);

  if (options?.fileExtensions?.inputGlob) {
    fileExtensions.inputGlob = options.fileExtensions.inputGlob;
  }
  if (options?.fileExtensions?.outputCheck) {
    fileExtensions.outputCheck = options.fileExtensions.outputCheck;
  }

  output.verbose = verbose;

  if (options.resolveFullPaths || resolveFullPaths) {
    output.debug('resolveFullPaths is active');
    options.resolveFullPaths = true;
  }

  const _outDir = options.outDir ?? outDir;
  if (declarationDir && _outDir !== declarationDir) {
    options.declarationDir ??= declarationDir;
  }

  output.assert(_outDir, 'compilerOptions.outDir is not set');

  const configDir: string = normalizePath(dirname(configFile));

  // config with project details and paths
  const projectConfig: IProjectConfig = {
    configFile: configFile,
    baseUrl: baseUrl,
    outDir: _outDir,
    configDir: configDir,
    outPath: _outDir,
    confDirParentFolderName: basename(configDir),
    hasExtraModule: false,
    configDirInOutPath: null,
    relConfDirPathInOutPath: null,
    pathCache: new PathCache(!options.watch, fileExtensions?.outputCheck),
    inputGlob:
      fileExtensions?.inputGlob || '{mjs,cjs,js,jsx,d.{mts,cts,ts,tsx}}'
  };
  output.debug('loaded project config:', projectConfig);

  const config: IConfig = {
    ...projectConfig,
    output: output,
    aliasTrie:
      options.aliasTrie ?? TrieNode.buildAliasTrie(projectConfig, paths),
    replacers: []
  };
  output.debug('loaded full config:', config);

  // Import replacers.
  await importReplacers(config, replacers, options.replacers);
  return config;
}

function replaceConfigDirPlaceholder(path: string, configDir: string) {
  return path.replace(/\$\{configDir\}/g, configDir);
}

/**
 * loadConfig loads a config file from fs.
 * @param {string} file file path to the config file that will be loaded.
 * @param {IOutput} output the output instance to log error to.
 * @returns {ITSConfig} a ITSConfig object
 */
export const loadConfig = (
  file: string,
  output: IOutput,
  baseConfigDir: string | null = null
): ITSConfig => {
  if (!existsSync(file)) {
    output.error(`File ${file} not found`, true);
  }
  output.debug('Loading config file:', file);

  // Load the raw config
  const rawConfig = Json.loadS<IRawTSConfig>(file, true);

  // Validate the tsc-path-fix section
  const validationErrors = validateTscPathfixConfig(rawConfig);
  if (validationErrors.length > 0) {
    const errorMessage = `Invalid tsc-path-fix configuration in ${file}:\n${validationErrors.join('\n')}`;
    output.error(errorMessage, true);
  }

  const {
    extends: ext,
    compilerOptions: { baseUrl, outDir, declarationDir, paths } = {
      baseUrl: undefined,
      outDir: undefined,
      declarationDir: undefined,
      paths: undefined
    },
    'tsc-path-fix': TSCAliasConfig
  } = rawConfig;

  const configDir = dirname(file);
  output.debug('configDir', configDir);
  const config: ITSConfig = {};

  if (baseUrl) {
    if (baseConfigDir !== null) {
      config.baseUrl = replaceConfigDirPlaceholder(baseUrl, baseConfigDir);
    } else {
      config.baseUrl = baseUrl;
    }
  }
  if (outDir) {
    let replacedOutDir = outDir;
    if (baseConfigDir !== null) {
      replacedOutDir = replaceConfigDirPlaceholder(outDir, baseConfigDir);
    }
    config.outDir = isAbsolute(replacedOutDir)
      ? replacedOutDir
      : join(configDir, replacedOutDir);
  }
  if (paths) {
    if (baseConfigDir !== null) {
      for (const key in paths) {
        paths[key] = paths[key].map((path) =>
          replaceConfigDirPlaceholder(path, baseConfigDir)
        );
      }
    }
    config.paths = paths;
  }
  if (declarationDir) {
    let replacedDeclarationDir = declarationDir;
    if (baseConfigDir !== null) {
      replacedDeclarationDir = replaceConfigDirPlaceholder(
        declarationDir,
        baseConfigDir
      );
    }
    config.declarationDir = isAbsolute(replacedDeclarationDir)
      ? replacedDeclarationDir
      : join(configDir, replacedDeclarationDir);
  }
  if (TSCAliasConfig?.replacers) {
    config.replacers = TSCAliasConfig.replacers;
  }
  if (TSCAliasConfig?.resolveFullPaths) {
    config.resolveFullPaths = TSCAliasConfig.resolveFullPaths;
  }
  if (TSCAliasConfig?.verbose) {
    config.verbose = TSCAliasConfig.verbose;
  }
  config.fileExtensions = TSCAliasConfig?.fileExtensions ?? {};

  const replacerFile = config.replacers?.pathReplacer?.file;

  if (replacerFile) {
    config.replacers.pathReplacer.file = join(configDir, replacerFile);
  }

  output.debug('loaded config (from file):', config);
  if (ext) {
    return {
      ...normalizeTsConfigExtendsOption(ext, file).reduce<ITSConfig>(
        (pre, ext) => ({
          ...pre,
          ...loadConfig(ext, output, baseConfigDir ?? configDir)
        }),
        {}
      ),
      ...config
    };
  }

  return config;
};

/**
 * normalizeTsConfigExtendsOption normalizes tsconfig extends option to a directly loadable path array
 * @param { string|string[] } ext
 * @param { string } file
 * @returns {string[]}
 */
export function normalizeTsConfigExtendsOption(
  ext: string | string[],
  file: string
): string[] {
  if (!ext) return [];
  const configDir = dirname(file);
  const normExts = (Array.isArray(ext) ? ext : [ext]).map((e) =>
    e.startsWith('.')
      ? join(configDir, e.endsWith('.json') ? e : `${e}.json`)
      : resolveTsConfigExtendsPath(e, file)
  );
  return normExts;
}

/**
 * resolveTsConfigExtendsPath resolves the path to the config file that is being inherited.
 * @param {string} ext the value of the extends field in the loaded config file.
 * @param {string} file file path to the config file that was loaded.
 * @returns {string} a file path to the config file that is being inherited.
 */
export function resolveTsConfigExtendsPath(ext: string, file: string): string {
  const tsConfigDir = dirname(file);
  const node_modules: string[] = Dir.nodeModules({ cwd: tsConfigDir }); // Getting all node_modules directories.
  const targetPaths = node_modules.map((v) => join(tsConfigDir, v, ext)); // Mapping node_modules to target paths.

  // Recursively checking ancestor directories for tsconfig.
  for (const targetPath of targetPaths) {
    if (ext.endsWith('.json')) {
      // Check if the file exists.
      if (existsSync(targetPath)) {
        return targetPath;
      } else {
        continue; // Continue checking when ext is a file but not yet found.
      }
    }
    let isDirectory = false;
    try {
      const stats = lstatSync(targetPath);
      isDirectory = stats.isDirectory() || stats.isSymbolicLink();
    } catch (err) {}
    if (isDirectory) {
      return join(targetPath, 'tsconfig.json');
    } else {
      // When target is not a file nor directory check with '.json' extension.
      if (existsSync(`${targetPath}.json`)) {
        return `${targetPath}.json`;
      }
    }
  }
}
