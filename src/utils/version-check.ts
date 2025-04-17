/**
 * @file
 *
 * This file contains utilities for checking for package updates.
 */

import * as https from 'https';
import * as chalk from 'chalk';

const { version, name } = require('../../package.json');

/**
 * Check if a newer version of the package is available
 * @param {boolean} verbose Whether to log verbose messages
 * @returns {Promise<string|null>} The latest version if newer, null otherwise
 */
export async function checkForUpdates(verbose: boolean = false, debug = false): Promise<string | null> {
  return new Promise((resolve) => {
    // Set a timeout to avoid hanging if npm registry is slow
    const timeoutId = setTimeout(() => {
      if (debug) console.log(chalk.yellow('Version check timed out'));
      resolve(null);
    }, 3000);

    // Use the same URL format as npm itself
    const registryUrl = `https://registry.npmjs.org/${encodeURIComponent(name)}`;
    if (debug) console.log(chalk.gray(`Checking for updates at: ${registryUrl}`));

    https
      .get(registryUrl, (res) => {
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
        resolve(null);
      });
  });
}

/**
 * Display update notification if a newer version is available
 * @param {boolean} verbose Whether to log verbose messages
 * @param {boolean} debug Whether to log debug messages
 */
export async function notifyUpdates(verbose: boolean = false, debug: boolean = false): Promise<void> {
  try {
    // Only show this in verbose mode
    if (verbose || debug) {
      console.log(chalk.gray('Checking for updates...'));
    }
    
    const latestVersion = await checkForUpdates(verbose, debug);
    
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