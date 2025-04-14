/**
 * Test file for new features:
 * 1. Enhanced config validation
 * 2. Progress bar implementation
 */
import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import * as vitest from 'vitest';
import { validateTscPathfixConfig } from '../src/helpers/config';
import { IRawTSConfig } from '../src/interfaces';
import { ProgressBar } from '../src/utils/progress-bar';
import path from 'path';
import fs from 'fs';

// Use vitest's vi object
const vi = vitest.vi;

describe('Config Validation', () => {
  it('should validate showProgress as boolean', () => {
    const validConfig: IRawTSConfig = {
      'tsc-path-fix': {
        showProgress: true
      }
    };
    
    const invalidConfig: IRawTSConfig = {
      'tsc-path-fix': {
        showProgress: 'yes' as any // Type error intentionally for testing
      }
    };
    
    // Valid config should not have errors
    const validErrors = validateTscPathfixConfig(validConfig);
    expect(validErrors.length).toBe(0);
    
    // Invalid config should have errors
    const invalidErrors = validateTscPathfixConfig(invalidConfig);
    expect(invalidErrors).toContain('showProgress must be a boolean value');
  });
  
  it('should validate fileExtensions.outputCheck properly', () => {
    const validConfig: IRawTSConfig = {
      'tsc-path-fix': {
        fileExtensions: {
          outputCheck: ['.js', '.jsx']
        }
      }
    };
    
    const invalidConfig: IRawTSConfig = {
      'tsc-path-fix': {
        fileExtensions: {
          outputCheck: [123, 456] as any // Type error intentionally for testing
        }
      }
    };
    
    // Valid config should not have errors
    const validErrors = validateTscPathfixConfig(validConfig);
    expect(validErrors.length).toBe(0);
    
    // Invalid config should have errors
    const invalidErrors = validateTscPathfixConfig(invalidConfig);
    expect(invalidErrors).toContain('fileExtensions.outputCheck must be an array of strings');
  });
});

describe('ProgressBar', () => {
  // Mock console output
  let stdoutWriteSpy: any;
  
  beforeEach(() => {
    stdoutWriteSpy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
  });
  
  afterEach(() => {
    stdoutWriteSpy.mockRestore();
  });
  
  it('should correctly initialize a progress bar', () => {
    const progressBar = new ProgressBar(100);
    expect(progressBar).toBeDefined();
  });
  
  it('should update progress based on current value', () => {
    const progressBar = new ProgressBar(100);
    progressBar.start();
    
    // Should have called process.stdout.write at least once for initialization
    expect(stdoutWriteSpy).toHaveBeenCalled();
    
    // Just verify that the update method doesn't throw errors
    expect(() => progressBar.update(50)).not.toThrow();
    
    // Verify that stdout.write was called
    expect(stdoutWriteSpy).toHaveBeenCalled();
  });
  
  it('should complete the progress bar', () => {
    const progressBar = new ProgressBar(100);
    progressBar.start();
    stdoutWriteSpy.mockClear();
    
    progressBar.complete("Test complete");
    
    // Should have called process.stdout.write with completion message
    expect(stdoutWriteSpy).toHaveBeenCalled();
  });
  
  it('should respect progress bar options', () => {
    const progressBar = new ProgressBar(100, {
      showPercent: false,
      showCount: true,
      width: 40,
      barChar: '#',
      emptyChar: '-'
    });
    
    progressBar.start();
    
    // Just verify that the update method with options doesn't throw errors
    expect(() => progressBar.update(25)).not.toThrow();
  });
});

// Integration test using real project25
describe('Integration test with project25', () => {
  it('Project25 should exist with proper structure', () => {
    const projectDir = path.resolve(__dirname, '../projects/project25');
    const tsconfigPath = path.join(projectDir, 'tsconfig.json');
    
    expect(fs.existsSync(projectDir)).toBe(true);
    expect(fs.existsSync(tsconfigPath)).toBe(true);
    
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    expect(tsconfig['tsc-path-fix'].showProgress).toBe(true);
  });
});

