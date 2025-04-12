import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const ITERATIONS = 3;
const RESULTS_FILE = 'performance-results.json';

// Parse command line arguments
const args = process.argv.slice(2);
const onlyMode = args.includes('--only');
const reportMode = args.includes('--report');

// Test configurations
const configs = [
  {
    name: 'tsc-path-fix',
    command: 'npm run build:pathfix',
    description: 'Using tsc-path-fix with both replacers'
  },
  {
    name: 'tsc-alias',
    command: 'npm run build:alias',
    description: 'Using tsc-alias with both replacers'
  },

];

// Filter configs based on --only argument
const filteredConfigs = onlyMode
  ? configs.filter(config => config.name.includes(args[args.indexOf('--only') + 1]))
  : configs;

// Results storage
const results = {
  timestamp: new Date().toISOString(),
  system: {
    platform: process.platform,
    arch: process.arch,
    nodeVersion: process.version,
    cpus: os.cpus().length
  },
  tests: []
};

// Run performance tests
async function runPerformanceTests() {
  console.log('Starting performance comparison...\n');

  for (const config of filteredConfigs) {
    console.log(`Testing ${config.name}...`);
    const testResults = {
      name: config.name,
      description: config.description,
      iterations: []
    };

    for (let i = 0; i < ITERATIONS; i++) {
      console.log(`  Iteration ${i + 1}/${ITERATIONS}`);
      const startTime = process.hrtime();
      
      try {
        execSync(config.command, { stdio: 'pipe' });
        const [seconds, nanoseconds] = process.hrtime(startTime);
        const duration = seconds + nanoseconds / 1e9;
        
        testResults.iterations.push({
          duration,
          timestamp: new Date().toISOString()
        });
        
        console.log(`    Duration: ${duration.toFixed(2)}s`);
      } catch (error) {
        console.error(`    Error: ${error.message}`);
        testResults.iterations.push({
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }

    // Calculate statistics
    const successfulRuns = testResults.iterations.filter(r => !r.error);
    if (successfulRuns.length > 0) {
      const durations = successfulRuns.map(r => r.duration);
      testResults.stats = {
        min: Math.min(...durations),
        max: Math.max(...durations),
        avg: durations.reduce((a, b) => a + b, 0) / durations.length,
        total: durations.reduce((a, b) => a + b, 0)
      };
    }

    results.tests.push(testResults);
    console.log(`  Average duration: ${testResults.stats?.avg.toFixed(2)}s\n`);
  }

  // Save results
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
  console.log(`Results saved to ${RESULTS_FILE}`);

  // Generate report if requested
  if (reportMode) {
    const { generateHTMLReport } = await import('./generateReport.mjs');
    await generateHTMLReport(results);
  }

  // Print summary
  console.log('\nPerformance Summary:');
  console.log('===================');
  results.tests.forEach(test => {
    console.log(`\n${test.name}:`);
    console.log(`  Description: ${test.description}`);
    if (test.stats) {
      console.log(`  Min: ${test.stats.min.toFixed(2)}s`);
      console.log(`  Max: ${test.stats.max.toFixed(2)}s`);
      console.log(`  Avg: ${test.stats.avg.toFixed(2)}s`);
      console.log(`  Total: ${test.stats.total.toFixed(2)}s`);
    }
  });
}

runPerformanceTests().catch(console.error); 