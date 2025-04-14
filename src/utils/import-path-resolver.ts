/**
 * @file
 *
 * Import statements come in a lot of flavors, so having a single
 * regex that can capture all of those with minimal side effects
 * is trickly. In this file this regex is constructed from multiple parts.
 *
 * Using a named captured group (supported in ES2018/Node 10+)
 * to allow arbitrary complexity of the regex without worrying
 * about messing up indexing.
 *
 * Meant to match ESM/CommonJS import patterns.
 *
 * ⚠ Can match content of strings and comments!
 *
 * @example
 * // Examples of import statements that must be matched
 * // (Note that there could be newlines between tokens.)
 * const module = require('some/path')
 * import module from 'some/path'
 * import "some/path"
 * import theDefault, {namedExport} from 'some/path'
 * const asyncImport = await import('some/path')
 * export * from 'some/path';
 */

/** */
import normalizePath = require('normalize-path');
import { existsSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { StringReplacer } from '../interfaces';

const anyQuote = `["']`;
const pathStringContent = `[^"'\r\n]+`;
const importString = `(?:${anyQuote}${pathStringContent}${anyQuote})`;

// Separate patterns for each style of import statement,
// wrapped in non-capturing groups,
// so that they can be strung together in one big pattern.
const funcStyle = `(?:\\b(?:import|require)\\s*\\(\\s*(\\/\\*.*\\*\\/\\s*)?${importString}\\s*\\))`;
const globalStyle = `(?:\\bimport\\s+${importString})`;
const globalMinimizedStyle = `(?:\\bimport${importString})`;
const fromStyle = `(?:\\bfrom\\s+${importString})`;
const fromMinimizedStyle = `(?:\\bfrom${importString})`;
const moduleStyle = `(?:\\bmodule\\s+${importString})`;

const importRegexString = `(?:${[
  funcStyle,
  globalStyle,
  globalMinimizedStyle,
  fromStyle,
  fromMinimizedStyle,
  moduleStyle
].join(`|`)})`;

// Precompile regexes with different flags for better performance
const importRegexGlobal = new RegExp(importRegexString, 'g');
const importRegexNonGlobal = new RegExp(importRegexString);
const stringRegex = new RegExp(
  `(?<pathWithQuotes>${anyQuote}(?<path>${pathStringContent})${anyQuote})`
);

// Cache for resolved paths to avoid redundant file system calls
const pathResolutionCache = new Map<string, string>();

class ImportPathResolver {
  constructor(
    public source: string,
    readonly sourcePath: string
  ) {}

  get sourceDir() {
    return dirname(this.sourcePath);
  }

  /**
   * Replace all source import paths, using a replacer
   * function (a la `String.prototype.replace(globalRegex,replacer)`)
   */
  replaceSourceImportPaths(replacer: StringReplacer) {
    this.source = this.source.replace(importRegexGlobal, replacer);
    return this;
  }

  /**
   * For a JavaScript code string, find all local import paths
   * and resolve them to full filenames (including the .js extension).
   * If no matching file is found for a path, leave it alone.
   */
  resolveFullImportPaths(ext = '.js') {
    this.replaceSourceImportPaths((importStatement) => {
      // Find substring that is just quotes
      const importPathMatch = importStatement.match(stringRegex);
      if (!importPathMatch) {
        return importStatement;
      }
      const { path, pathWithQuotes } = importPathMatch.groups;
      const fullPath = normalizePath(this.resolveFullPath(path, ext));
      return importStatement.replace(
        pathWithQuotes,
        pathWithQuotes.replace(path, fullPath)
      );
    });
    return this;
  }

  /**
   * Given an import path, resolve the full path (including extension).
   * If no corresponding file can be found, return the original path.
   */
  private resolveFullPath(importPath: string, ext = '.js') {
    // If bare import or already a full path import
    if (
      !importPath.startsWith('.') ||
      importPath.match(new RegExp(`\${ext}$`))
    ) {
      return importPath;
    }

    // Check cache first
    const cacheKey = `${this.sourceDir}:${importPath}:${ext}`;
    if (pathResolutionCache.has(cacheKey)) {
      return pathResolutionCache.get(cacheKey);
    }

    let resolvedPath = importPath;
    
    // Try adding the extension (if not obviously a directory)
    if (!importPath.match(/[/\\]$/)) {
      const asFilePath = `${importPath}${ext}`;
      if (existsSync(resolve(this.sourceDir, asFilePath))) {
        resolvedPath = asFilePath;
        pathResolutionCache.set(cacheKey, resolvedPath);
        return resolvedPath;
      }
    }
    
    // Assume the path is a folder; try adding index.js
    let asFilePath = join(importPath, 'index' + ext);
    if (
      (importPath.startsWith('./') || importPath === '.') &&
      !asFilePath.startsWith('./')
    ) {
      asFilePath = './' + asFilePath;
    }
    
    resolvedPath = existsSync(resolve(this.sourceDir, asFilePath))
      ? asFilePath
      : importPath;
      
    // Cache the result
    pathResolutionCache.set(cacheKey, resolvedPath);
    return resolvedPath;
  }

  static newStringRegex() {
    return stringRegex;
  }

  static newImportStatementRegex(flags = '') {
    return flags === 'g' ? importRegexGlobal : importRegexNonGlobal;
  }

  static resolveFullImportPaths(code: string, path: string, ext = '.js') {
    return new ImportPathResolver(code, path).resolveFullImportPaths(ext)
      .source;
  }

  static replaceSourceImportPaths(
    code: string,
    path: string,
    replacer: StringReplacer
  ) {
    return new ImportPathResolver(code, path).replaceSourceImportPaths(replacer)
      .source;
  }
  
  /**
   * Clear the path resolution cache - useful when watching for file changes
   */
  static clearCache() {
    pathResolutionCache.clear();
  }
}

// Export aliases for the static functions
// to make usage more friendly.
export const resolveFullImportPaths = ImportPathResolver.resolveFullImportPaths;
export const newImportStatementRegex =
  ImportPathResolver.newImportStatementRegex;
export const replaceSourceImportPaths =
  ImportPathResolver.replaceSourceImportPaths;
export const newStringRegex = ImportPathResolver.newStringRegex;
export const clearPathResolutionCache = ImportPathResolver.clearCache;
