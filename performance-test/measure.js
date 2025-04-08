const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function cleanDist() {
  if (fs.existsSync('./dist')) {
    fs.rmSync('./dist', { recursive: true });
  }
}

function measureTime(command) {
  const start = process.hrtime();
  execSync(command, { stdio: 'ignore' });
  const [seconds, nanoseconds] = process.hrtime(start);
  return seconds * 1000 + nanoseconds / 1000000;
}

// Count the number of files in the project
function countFiles(dir) {
  let count = 0;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      count += countFiles(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      count++;
    }
  }

  return count;
}

const fileCount = countFiles(path.join(__dirname, 'src'));
console.log(`Project contains ${fileCount} TypeScript files\n`);

const iterations = 3; // Reduced iterations for larger project
console.log('Running performance tests...\n');

// Test tsc-pathfix
console.log('Testing tsc-pathfix:');
let pathfixTimes = [];
for (let i = 0; i < iterations; i++) {
  cleanDist();
  const time = measureTime('npm run build:pathfix');
  pathfixTimes.push(time);
  console.log(`Iteration ${i + 1}: ${time.toFixed(2)}ms`);
}
const avgPathfix = pathfixTimes.reduce((a, b) => a + b) / iterations;
console.log(`Average: ${avgPathfix.toFixed(2)}ms\n`);

// Test tsc-alias
console.log('Testing tsc-alias:');
let aliasTimes = [];
for (let i = 0; i < iterations; i++) {
  cleanDist();
  const time = measureTime('npm run build:alias');
  aliasTimes.push(time);
  console.log(`Iteration ${i + 1}: ${time.toFixed(2)}ms`);
}
const avgAlias = aliasTimes.reduce((a, b) => a + b) / iterations;
console.log(`Average: ${avgAlias.toFixed(2)}ms\n`);

console.log('Summary:');
console.log(`tsc-pathfix average: ${avgPathfix.toFixed(2)}ms`);
console.log(`tsc-alias average: ${avgAlias.toFixed(2)}ms`);
console.log(`Difference: ${Math.abs(avgPathfix - avgAlias).toFixed(2)}ms`);
console.log(
  `tsc-pathfix is ${avgPathfix < avgAlias ? 'faster' : 'slower'} by ${(
    (Math.abs(avgPathfix - avgAlias) / Math.max(avgPathfix, avgAlias)) *
    100
  ).toFixed(2)}%`
);
