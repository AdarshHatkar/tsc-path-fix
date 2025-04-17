/**
 * @file
 *
 * This file has all helperfunctions related to replacing.
 */

/** */
import { existsSync, promises as fsp } from 'fs';
import { Dir } from 'mylas';
import { isAbsolute, join } from 'path';
import { IConfig, ReplacerOptions } from '../interfaces';
import { replaceSourceImportPaths, resolveFullImportPaths } from '../utils';
import { fileContainsPattern, streamProcessFile } from '../utils/stream-utils';
import { newImportStatementRegex } from '../utils/import-path-resolver';
import normalizePath = require('normalize-path');

// Import regex for quick filtering - used to avoid processing files without imports
const quickFilterRegex = /import|require|from/;

// Cache for file contents to avoid redundant reading of unchanged files
const fileContentCache = new Map<string, { mtime: number; content: string }>();

// Maximum number of entries to store in the cache before starting to evict
const MAX_CACHE_SIZE = 1000;

// Threshold for using streaming vs in-memory processing (in bytes)
const STREAMING_THRESHOLD = 1024 * 1024; // 1MB

/**
 * Clears the file content cache
 */
export function clearFileContentCache(): void {
  fileContentCache.clear();
}

/**
 * importReplacers imports replacers for tsc-path-fix to use.
 * @param {IConfig} config the tsc-path-fix config object.
 * @param {ReplacerOptions} replacers the tsc-path-fix replacer options.
 * @param {string[]} cmdReplacers array of filepaths to replacers from command-line.
 */
export async function importReplacers(
  config: IConfig,
  replacers: ReplacerOptions,
  cmdReplacers?: string[]
) {
  config.output.debug('Started loading replacers');
  const dir = process.cwd();
  const node_modules: string[] = Dir.nodeModules({ cwd: dir });
  config.output.debug('Found node_modules:', node_modules);

  // List of default replacers.
  const defaultReplacers: ReplacerOptions = {
    default: {
      enabled: true
    },
    'base-url': {
      enabled: !!config.baseUrl
    }
  };

  // List of all replacers.
  let merged: ReplacerOptions = {
    ...defaultReplacers,
    ...replacers
  };

  // Added replacers to list from command-line filepaths.
  config.output.debug(
    'Added replacers to list from command-line filepaths:',
    cmdReplacers
  );
  cmdReplacers?.forEach((v) => {
    merged[v] = {
      enabled: true,
      file: v
    };
  });

  config.output.debug('Reading replacers config');
  const entries = Object.entries(merged);
  for await (const replacer of entries) {
    if (replacer[1].enabled) {
      // Importing default replacers.
      if (Object.keys(defaultReplacers).includes(replacer[0])) {
        config.output.debug('Loading default replacer:', replacer);
        const replacerModule = await import(
          `../replacers/${replacer[0]}.replacer`
        );
        config.replacers.push(replacerModule.default);
      }

      const file = replacer[1]?.file;
      if (!file) {
        config.output.debug('Replacer has no file:', replacer);
        continue; // When file is undefined don't try to import.
      }
      // Try to import replacer.
      const tryImportReplacer = async (targetPath: string) => {
        const replacerModule = await import(targetPath);
        config.output.debug('Imported replacerModule:', replacerModule);
        const replacerFunction = replacerModule.default;
        if (typeof replacerFunction == 'function') {
          config.replacers.push(replacerFunction);
          config.output.info(`Added replacer "${file}"`);
        } else {
          config.output.error(
            `Failed to import replacer "${file}", not in replacer format.`
          );
        }
      };

      // Look for replacer in cwd.
      const isRelativePath = !isAbsolute(file);
      const path = isRelativePath ? normalizePath(join(dir, file)) : file;

      if (existsSync(path)) {
        try {
          await tryImportReplacer(path);
          config.output.debug('Imported replacer:', path);
          continue;
        } catch {}
      }

      // Look for replacer in node_modules.
      if (isRelativePath) {
        for (const targetPath of node_modules.map((v) => join(dir, v, file))) {
          try {
            await tryImportReplacer(targetPath);
            config.output.debug('Imported replacer:', targetPath);
            continue;
          } catch {}
        }
      }

      config.output.error(`Failed to import replacer "${file}"`);
    }
  }
  config.output.debug('Loaded replacers:', config.replacers);
}

/**
 * replaceAlias replaces aliases in file.
 * @param {IConfig} config configuration
 * @param {string} file file to replace aliases in.
 * @param {boolean} resolveFullPath if tsc-path-fix should resolve the full path
 * @returns {Promise<boolean>} if something has been replaced.
 */
export async function replaceAlias(
  config: IConfig,
  file: string,
  resolveFullPath?: boolean,
  resolveFullExtension?: string
): Promise<boolean> {
  config.output.debug('Starting to replace file:', file);
  
  // First, quickly check if file contains any import-like statements to avoid unnecessary processing
  const hasImports = await fileContainsPattern(file, quickFilterRegex);
  if (!hasImports) {
    config.output.debug('File has no import/require statements, skipping:', file);
    return false;
  }
  
  // Get file stats to check modification time and size
  const stats = await fsp.stat(file).catch(() => null);
  if (!stats) {
    config.output.debug('File not found or cannot be accessed:', file);
    return false;
  }
  
  // For large files, use streaming approach
  if (stats.size >= STREAMING_THRESHOLD) {
    config.output.debug('Using streaming for large file:', file);
    
    // Check if file has actual import statements that need processing
    const needsProcessing = await fileContainsPattern(file, newImportStatementRegex());
    if (!needsProcessing) {
      config.output.debug('Large file has no import statements to process, skipping:', file);
      return false;
    }
    
    // Use string transformer function with our streaming utility
    let wasModified = false;
    await streamProcessFile(file, (content) => {
      const transformed = replaceAliasString(
        config,
        file,
        content,
        resolveFullPath,
        resolveFullExtension
      );
      
      if (transformed !== content) {
        wasModified = true;
      }
      
      return transformed;
    });
    
    if (wasModified) {
      config.output.debug('Replaced file with changes using streaming approach:', file);
    }
    
    return wasModified;
  }
  
  // For smaller files, use the in-memory approach with caching
  let code: string;
  
  // Check if we have a cached version that's still valid
  const cached = fileContentCache.get(file);
  if (cached && cached.mtime === stats.mtime.getTime()) {
    code = cached.content;
    config.output.debug('Using cached file content:', file);
  } else {
    // Read the file if not cached or cache is stale
    code = await fsp.readFile(file, 'utf8');
    
    // Manage cache size by evicting entries if necessary
    if (fileContentCache.size >= MAX_CACHE_SIZE) {
      const keysToDelete = Array.from(fileContentCache.keys()).slice(0, Math.floor(MAX_CACHE_SIZE * 0.2));
      keysToDelete.forEach(key => fileContentCache.delete(key));
      config.output.debug('Evicted entries from file cache, new size:', fileContentCache.size);
    }
    
    // Update the cache
    fileContentCache.set(file, {
      mtime: stats.mtime.getTime(),
      content: code
    });
  }
  
  const tempCode = replaceAliasString(
    config,
    file,
    code,
    resolveFullPath,
    resolveFullExtension
  );

  if (code !== tempCode) {
    config.output.debug('replaced file with changes:', file);
    await fsp.writeFile(file, tempCode, 'utf8');
    
    // Update cache with the new content
    const newStats = await fsp.stat(file).catch(() => null);
    if (newStats) {
      fileContentCache.set(file, {
        mtime: newStats.mtime.getTime(),
        content: tempCode
      });
    }
    
    return true;
  }
  
  config.output.debug('replaced file without changes:', file);
  return false;
}

/**
 * replaceAliasString replaces aliases in the given code content and returns the changed code.
 * @param {IConfig} config configuration
 * @param {string} file path of the file to replace aliases in.
 * @param {string} code contents of the file to replace aliases in.
 * @param {boolean} resolveFullPath if tsc-path-fix should resolve the full path
 * @returns {string} content of the file with any replacements possible applied.
 */
export function replaceAliasString(
  config: IConfig,
  file: string,
  code: string,
  resolveFullPath?: boolean,
  resolveFullExtension?: string
): string {
  let previousCode = '';
  let currentCode = code;
  let iterationCount = 0;
  const MAX_ITERATIONS = 5; // Prevent infinite loops while allowing multiple passes
  
  // Continue until no more changes are made or max iterations reached
  while (previousCode !== currentCode && iterationCount < MAX_ITERATIONS) {
    previousCode = currentCode;
    iterationCount++;
    
    config.output.debug(`Alias resolution pass #${iterationCount} for ${file}`);
    
    // Clear all caches between iterations to ensure fresh resolution
    if (iterationCount > 1) {
      // Import these functions at the top of the file
      const { clearPathResolutionCache } = require('../utils/import-path-resolver');
      const { clearTrieCache } = require('../utils/trie'); 
      
      // Clear caches to ensure fresh path resolution in each iteration
      clearPathResolutionCache();
      clearTrieCache();
      
      // Also clear the pathCache in the config if possible
      if (config.pathCache && typeof config.pathCache.clearCache === 'function') {
        config.pathCache.clearCache();
      }
    }
    
    config.replacers.forEach((replacer) => {
      currentCode = replaceSourceImportPaths(currentCode, file, (orig) =>
        replacer({
          orig,
          file,
          config
        })
      );
    });
  }
  
  if (iterationCount > 1) {
    config.output.debug(`Completed ${iterationCount} passes for full alias resolution in ${file}`);
  }

  // Fully resolve all import paths (not just aliased ones)
  // *after* the aliases are resolved
  if (resolveFullPath) {
    currentCode = resolveFullImportPaths(currentCode, file, resolveFullExtension);
  }

  return currentCode;
}
