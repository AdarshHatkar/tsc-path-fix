/**
 * @file
 *
 * This file contains utilities for checking for package updates.
 */

import * as https from 'https';
import * as chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const { version, name } = require('../../package.json');

// Cache configuration
const CACHE_DIR = path.join(os.homedir(), '.cache', 'tsc-path-fix');
const CACHE_FILE = path.join(CACHE_DIR, 'version-check.json');
const CHECK_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Ensure the cache directory exists
 */
function ensureCacheDir(): void {
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
  } catch (error) {
    // Silently fail if we can't create the cache directory
  }
}

/**
 * Read cached version data
 * @returns {object|null} The cached version data or null if not available
 */
function readCache(): { timestamp: number; latestVersion: string } | null {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const cacheData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
      return cacheData;
    }
  } catch (error) {
    // If we can't read the cache, we'll just check again
  }
  return null;
}

/**
 * Write version data to cache
 * @param {string} latestVersion The latest version
 */
function writeCache(latestVersion: string): void {
  try {
    ensureCacheDir();
    fs.writeFileSync(
      CACHE_FILE,
      JSON.stringify({
        timestamp: Date.now(),
        latestVersion
      })
    );
  } catch (error) {
    // Silently fail if we can't write to the cache
  }
}

/**
 * Check if a newer version of the package is available
 * @param {boolean} verbose Whether to log verbose messages
 * @param {boolean} debug Whether to log debug messages
 * @param {boolean} forceCheck Force a check even if cached data is available
 * @returns {Promise<string|null>} The latest version if newer, null otherwise
 */
export async function checkForUpdates(
  verbose: boolean = false, 
  debug: boolean = false,
  forceCheck: boolean = false
): Promise<string | null> {
  // Check if we can use cached data
  if (!forceCheck) {
    const cachedData = readCache();
    if (cachedData && Date.now() - cachedData.timestamp < CHECK_INTERVAL) {
      if (debug) console.log(chalk.gray(`Using cached version data: ${cachedData.latestVersion}`));
      
      // Only return the version if it's newer
      if (cachedData.latestVersion.localeCompare(version, undefined, { numeric: true }) > 0) {
        return cachedData.latestVersion;
      }
      return null;
    }
  }

  return new Promise((resolve) => {
    // Set a timeout to avoid hanging if npm registry is slow
    const timeoutId = setTimeout(() => {
      if (debug) console.log(chalk.yellow('Version check timed out'));
      resolve(null);
    }, 3000);

    // Add a user agent to avoid being flagged as a bot
    const options = {
      headers: {
        'User-Agent': `${name}/${version} node/${process.version} (${process.platform})`,
        'Accept': 'application/json'
      }
    };

    // Use the same URL format as npm itself
    const registryUrl = `https://registry.npmjs.org/${encodeURIComponent(name)}`;
    if (debug) console.log(chalk.gray(`Checking for updates at: ${registryUrl}`));

    https
      .get(registryUrl, options, (res) => {
        if (res.statusCode === 429) {
          // Handle rate limiting specifically
          clearTimeout(timeoutId);
          if (debug) console.log(chalk.yellow(`Rate limited by npm registry, using cached data if available`));
          
          // Try to use cached data if available
          const cachedData = readCache();
          if (cachedData && cachedData.latestVersion.localeCompare(version, undefined, { numeric: true }) > 0) {
            resolve(cachedData.latestVersion);
          } else {
            resolve(null);
          }
          return;
        }
        
        if (res.statusCode !== 200) {
          clearTimeout(timeoutId);
          if (debug) console.log(chalk.yellow(`Failed to check for updates: HTTP ${res.statusCode}`));
          resolve(null);
          return;
        }

        let data = '';
        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', () => {
          clearTimeout(timeoutId);
          try {
            const parsedData = JSON.parse(data);
            const latestVersion = parsedData['dist-tags']?.latest;
            
            if (debug) console.log(chalk.gray(`Current version: ${version}, Latest version: ${latestVersion}`));
            
            if (!latestVersion) {
              if (debug) console.log(chalk.yellow('Could not determine latest version'));
              resolve(null);
              return;
            }
            
            // Cache the latest version regardless of whether it's newer
            writeCache(latestVersion);
            
            if (latestVersion !== version) {
              // Simple version comparison that works for semver
              if (latestVersion.localeCompare(version, undefined, { numeric: true }) > 0) {
                if (verbose || debug) console.log(chalk.green(`New version available: ${latestVersion}`));
                resolve(latestVersion);
                return;
              }
            }
            
            if (debug) console.log(chalk.gray('No new version available'));
            resolve(null);
          } catch (e) {
            if (debug) console.log(chalk.yellow(`Error parsing version data: ${e.message}`));
            resolve(null);
          }
        });
      })
      .on('error', (err) => {
        clearTimeout(timeoutId);
        if (debug) console.log(chalk.yellow(`Network error checking for updates: ${err.message}`));
        
        // Try to use cached data if network request fails
        const cachedData = readCache();
        if (cachedData && cachedData.latestVersion.localeCompare(version, undefined, { numeric: true }) > 0) {
          resolve(cachedData.latestVersion);
        } else {
          resolve(null);
        }
      });
  });
}

/**
 * Display update notification if a newer version is available
 * @param {boolean} verbose Whether to log verbose messages
 * @param {boolean} debug Whether to log debug messages
 * @param {boolean} forceCheck Force a check even if cached data is available
 */
export async function notifyUpdates(
  verbose: boolean = false, 
  debug: boolean = false, 
  forceCheck: boolean = false
): Promise<void> {
  try {
    // Only show this in verbose mode
    if (verbose || debug) {
      console.log(chalk.gray('Checking for updates...'));
    }
    
    const latestVersion = await checkForUpdates(verbose, debug, forceCheck);
    
    if (latestVersion) {
      const boxWidth = 42;
      const padding = ' '.repeat(Math.max(1, 22 - version.length - latestVersion.length));
      
      console.log(chalk.yellow('\n┌' + '─'.repeat(boxWidth) + '┐'));
      console.log(chalk.yellow('│ ') + 
                 chalk.yellow(`Update available! ${version} → ${latestVersion}${padding}`) + 
                 chalk.yellow(' │'));
      console.log(chalk.yellow('│ ') + 
                 chalk.yellow(`Run `) + 
                 chalk.cyan(`npm install -g ${name}@latest`) + 
                 chalk.yellow(' to update ') + 
                 chalk.yellow(' │'));
      console.log(chalk.yellow('└' + '─'.repeat(boxWidth) + '┘'));
    }
  } catch (e) {
    // Only show errors in debug mode
    if (debug) {
      console.log(chalk.red(`Error checking for updates: ${e.message}`));
    }
  }
}