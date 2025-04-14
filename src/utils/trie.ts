/**
 * @file
 *
 * The TrieNode class is a prefix tree.
 * [Trie](https://en.wikipedia.org/wiki/Trie)
 *
 * This is a tree data structure used for locating specific keys
 * from within a set. The links between nodes defined by individual characters.
 * A node's position in the trie defines the key with which it is associated.
 * This distributes the value of each key across the data structure,
 * and means that not every node necessarily has an associated value.
 * 
 * Performance enhancement: This implementation includes caching for lookups
 * and optimizes path matching for TypeScript paths.
 */

/** */
import { isAbsolute, normalize, relative, resolve } from 'path';
import { findBasePathOfAlias, relativeOutPathToConfigDir } from '../helpers';
import { Alias, IProjectConfig, PathLike } from '../interfaces';

// Cache for search results to avoid repeated traversals
const searchCache = new Map<string, any>();
const MAX_CACHE_SIZE = 2000; // Maximum number of cached entries

export class TrieNode<T> {
  private children: Map<string, TrieNode<T>>;
  public data: T | null;
  public isEndOfWord: boolean; // Flag to mark complete paths

  constructor() {
    this.children = new Map();
    this.data = null;
    this.isEndOfWord = false;
  }

  /**
   * add adds an alias to the prefix tree.
   * @param {string} name the prefix of the alias.
   * @param {T} data the alias data.
   * @returns {void}.
   */
  public add(name: string, data: T): void {
    if (name.length <= 0) return;
    
    const firstChar = name[0];
    const node = this.children.has(firstChar)
      ? this.children.get(firstChar)
      : new TrieNode<T>();
      
    if (name.length == 1) {
      node.data = data;
      node.isEndOfWord = true;
    } else {
      node.add(name.substring(1), data);
    }
    
    this.children.set(firstChar, node);
    
    // Clear cache when adding new entries to ensure consistency
    searchCache.clear();
  }

  /**
   * search searches the prefix tree for the most correct alias data for a given prefix.
   * Performance optimized with caching for frequently accessed paths.
   * 
   * @param {string} name the prefix to search for.
   * @returns {T | null} the alias data or null.
   */
  public search(name: string): T | null {
    // Check cache first for improved performance
    const cachedResult = searchCache.get(name);
    if (cachedResult !== undefined) {
      return cachedResult;
    }
    
    if (name.length <= 0) {
      searchCache.set(name, null);
      return null;
    }

    const firstChar = name[0];
    const node = this.children.get(firstChar);
    
    let result = null;
    
    if (node) {
      if (name.length === 1) {
        result = node.data;
      } else {
        // Try to get the longest matching path first
        const recursiveResult = node.search(name.substring(1));
        // If no recursive match found, use current node's data if available
        result = recursiveResult !== null ? recursiveResult : node.data;
      }
    } else {
      result = this.data;
    }
    
    // Manage cache size
    if (searchCache.size >= MAX_CACHE_SIZE) {
      // Remove oldest 20% entries when cache gets too large
      const keysToDelete = Array.from(searchCache.keys()).slice(0, Math.floor(MAX_CACHE_SIZE * 0.2));
      keysToDelete.forEach(key => searchCache.delete(key));
    }
    
    // Cache the result
    searchCache.set(name, result);
    return result;
  }
  
  /**
   * Clears the search cache
   */
  public static clearCache(): void {
    searchCache.clear();
  }

  /**
   * buildAliasTrie builds an alias trie
   * Performance optimized to speed up the path normalization process.
   * 
   * @param {IProjectConfig} config projectConfig is an object with config details
   * @param {PathLike} paths optional the paths to put into the trie
   * @returns {TrieNode<Alias>} a TrieNode with the paths/aliases inside
   */
  static buildAliasTrie(
    config: IProjectConfig,
    paths?: PathLike
  ): TrieNode<Alias> {
    const aliasTrie = new this<Alias>();
    if (!paths) {
      return aliasTrie;
    }
    
    // Pre-compute the resolved config base URL for performance
    const resolvedBaseUrl = resolve(config.configDir, config.baseUrl);
    
    // Prepare a mapping of prefixes to aliases for batch processing
    const aliasMap = Object.keys(paths).map((alias) => {
      const shouldPrefixMatchWildly = alias.endsWith('*');
      const prefix = alias.replace(/\*$/, '');
      
      // Process and normalize paths in a single pass
      const normalizedPaths = paths[alias].map((path) => {
        path = path.replace(/\*$/, '');
        
        // Extract and normalize extensions if needed
        const dotIndex = path.lastIndexOf('.');
        if (dotIndex !== -1) {
          const beforeDot = path.slice(0, dotIndex);
          const afterDot = path.slice(dotIndex);
          
          // Only normalize if it's clearly an extension and not part of a path
          if (!afterDot.includes('/') && !afterDot.includes('\\')) {
            const extension = afterDot;
            if (!isDTS(extension)) {
              // Cache-friendly normalization of extensions
              const normalizedExtension = extension.replace(/\.([mc])?ts(x)?$/, '.$1js$2');
              path = beforeDot + normalizedExtension;
            }
          }
        }
        
        // Convert absolute paths to relative paths
        if (isAbsolute(path)) {
          path = relative(resolvedBaseUrl, path);
        }
        
        return path;
      });
      
      return {
        shouldPrefixMatchWildly,
        prefix,
        paths: normalizedPaths
      };
    });
    
    // Compute relative paths once if needed
    if (aliasMap.some(alias => 
      alias.paths.some(path => normalize(path).includes('..')) && 
      !config.configDirInOutPath
    )) {
      relativeOutPathToConfigDir(config);
    }
    
    // Add all aliases to the trie
    aliasMap.forEach(alias => {
      if (alias.prefix) {
        aliasTrie.add(alias.prefix, {
          ...alias,
          // Find basepath of aliases
          paths: alias.paths.map(findBasePathOfAlias(config))
        });
      }
    });
    
    return aliasTrie;
  }
}

// Optimized version with fast pattern matching
function isDTS(extension: string): boolean {
  return /\.d(\..*)?\.[mc]?ts(x)?$/.test(extension);
}

/**
 * Export a function to clear the trie search cache
 */
export function clearTrieCache(): void {
  searchCache.clear();
}
