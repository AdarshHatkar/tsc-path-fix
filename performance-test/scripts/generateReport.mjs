import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function generateHTMLReport(results) {
  const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TypeScript Path Resolution Performance Comparison</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 2rem;
        }
        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        .test-card {
            background: #fff;
            padding: 1.5rem;
            border-radius: 6px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .test-card h2 {
            color: #3498db;
            margin-top: 0;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
        }
        .stat-item {
            padding: 0.5rem;
            background: #f8f9fa;
            border-radius: 4px;
        }
        .stat-label {
            font-weight: bold;
            color: #666;
        }
        .stat-value {
            color: #2c3e50;
        }
        .chart {
            margin: 2rem 0;
            height: 400px;
        }
        .system-info {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 4px;
            margin-bottom: 2rem;
        }
        .timestamp {
            text-align: center;
            color: #666;
            font-size: 0.9rem;
            margin-top: 2rem;
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        <h1>TypeScript Path Resolution Performance Comparison</h1>
        
        <div class="system-info">
            <h3>System Information</h3>
            <p>Platform: ${results.system.platform}</p>
            <p>Architecture: ${results.system.arch}</p>
            <p>Node Version: ${results.system.nodeVersion}</p>
            <p>CPU Cores: ${results.system.cpus}</p>
        </div>

        <div class="summary">
            ${results.tests.map(test => `
                <div class="test-card">
                    <h2>${test.name}</h2>
                    <p>${test.description}</p>
                    ${test.stats ? `
                        <div class="stats">
                            <div class="stat-item">
                                <span class="stat-label">Min:</span>
                                <span class="stat-value">${test.stats.min.toFixed(2)}s</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Max:</span>
                                <span class="stat-value">${test.stats.max.toFixed(2)}s</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Avg:</span>
                                <span class="stat-value">${test.stats.avg.toFixed(2)}s</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Total:</span>
                                <span class="stat-value">${test.stats.total.toFixed(2)}s</span>
                            </div>
                        </div>
                    ` : '<p>No successful runs</p>'}
                </div>
            `).join('')}
        </div>

        <div class="chart">
            <canvas id="performanceChart"></canvas>
        </div>

        <div class="timestamp">
            Generated on: ${new Date(results.timestamp).toLocaleString()}
        </div>
    </div>

    <script>
        const ctx = document.getElementById('performanceChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ${JSON.stringify(results.tests.map(t => t.name))},
                datasets: [{
                    label: 'Average Duration (seconds)',
                    data: ${JSON.stringify(results.tests.map(t => t.stats?.avg || 0))},
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(46, 204, 113, 0.8)',
                        'rgba(155, 89, 182, 0.8)',
                        'rgba(52, 73, 94, 0.8)'
                    ],
                    borderColor: [
                        'rgba(52, 152, 219, 1)',
                        'rgba(46, 204, 113, 1)',
                        'rgba(155, 89, 182, 1)',
                        'rgba(52, 73, 94, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Duration (seconds)'
                        }
                    }
                }
            }
        });
    </script>
</body>
</html>
  `;

  return template;
}

// Read results file
const resultsFile = path.join(process.cwd(), 'performance-results.json');
const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));

// Generate HTML report
const html = generateHTMLReport(results);

// Save report
const reportFile = path.join(process.cwd(), 'performance-report.html');
fs.writeFileSync(reportFile, html);

console.log(`Performance report generated: ${reportFile}`); 