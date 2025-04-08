import { join } from 'path';
import * as rimraf from 'rimraf';
import * as shell from 'shelljs';
import { spawn } from 'child_process';

export const projectsRoot = join(__dirname, '../projects');

export function runTestProject(projectNumber: number) {
  const projectDir = join(projectsRoot, `project${projectNumber}`);

  // Clean up dist directory
  try {
    rimraf.sync(join(projectDir, 'dist'));
  } catch (error) {
    console.error(
      `Error cleaning dist directory for project ${projectNumber}:`,
      error
    );
  }

  // Use spawn instead of shell.exec for better process control
  return new Promise<number>((resolve) => {
    const npmProcess = spawn('npm', ['start'], {
      cwd: projectDir,
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true
    });

    let stderr = '';

    npmProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    npmProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`Project ${projectNumber} failed:`, stderr);
      }
      resolve(code || 0);
    });

    // Set a timeout to kill the process if it takes too long
    const timeout = setTimeout(() => {
      try {
        npmProcess.kill();
        console.error(`Project ${projectNumber} timed out after 30 seconds`);
        resolve(1);
      } catch (error) {
        console.error(
          `Error killing process for project ${projectNumber}:`,
          error
        );
      }
    }, 30000);

    npmProcess.on('close', () => {
      clearTimeout(timeout);
    });
  });
}

export const sampleImportStatements = `
const module = require('0')
var module = require
(
  '1'
)  ;
import module from '2';
import "3"

imported ("invalid/import")

import theDefault, {namedExport} from
    "4"
import {
  extraLinesOhNo
} from '5'
const asyncImport = await import('6');

export * from '7';

import

  '8'

const notAnImport = unimport('something');
`;
