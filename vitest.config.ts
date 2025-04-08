import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.spec.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    testTimeout: 120000,
    hookTimeout: 120000,
    teardownTimeout: 120000,
    deps: {
      interopDefault: true,
      optimizer: {
        ssr: {
          include: ['mylas', 'normalize-path']
        }
      }
    },
    pool: 'threads',
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 8
      }
    },
    sequence: {
      hooks: 'list'
    },
    isolate: false,
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/']
    },
    retry: 1
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '../replacers': resolve(__dirname, './src/replacers'),
    },
  },
  optimizeDeps: {
    exclude: ['rimraf', 'shelljs'],
  },
}) 