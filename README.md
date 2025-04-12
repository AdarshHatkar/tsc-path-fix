# tsc-path-fix

Zero-runtime TypeScript path resolver that converts aliases to relative paths at compile time. Faster and lighter than alternatives, with native watch mode support.

[![npm version](https://badge.fury.io/js/tsc-path-fix.svg)](https://badge.fury.io/js/tsc-path-fix)
[![License](https://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)
[![Donate](https://img.shields.io/badge/Donate-WhatsApp-blue.svg)](https://api.whatsapp.com/send/?phone=919834877006)
[![Downloads](https://img.shields.io/npm/dm/tsc-path-fix.svg)](https://www.npmjs.com/package/tsc-path-fix)
[![GitHub stars](https://img.shields.io/github/stars/AdarshHatkar/tsc-path-fix.svg)](https://github.com/AdarshHatkar/tsc-path-fix/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/AdarshHatkar/tsc-path-fix.svg)](https://github.com/AdarshHatkar/tsc-path-fix/issues)

> **TypeScript Path Alias Resolver** - Fast, zero-runtime path resolution for TypeScript projects.

## Features

- 🔄 Automatically converts TypeScript path aliases to relative paths
- ⚡ Compile-time solution (no runtime dependencies)
- 📦 Works with both local and external project aliases
- 👀 Watch mode support for development
- 🔍 Debug mode for troubleshooting
- 🛠️ Customizable file extensions and path resolution

## Comparison to [tsconfig-paths](https://github.com/dividab/tsconfig-paths)

| Feature | tsc-path-fix | tsconfig-paths |
|---------|-------------|----------------|
| Runtime Dependencies | None | Required |
| Path Resolution | Compile-time | Runtime |
| Performance | Better | Slower |
| Bundle Size | Smaller | Larger |

## Comparison to [tsc-alias](https://github.com/justkey007/tsc-alias)

| Feature | tsc-path-fix | tsc-alias |
|---------|-------------|-----------|
| Runtime Dependencies | None | None |
| Path Resolution | Compile-time | Compile-time |
| External Project References | Supported | Limited support |
| Watch Mode | Native support | Requires additional setup |
| Debug Mode | Built-in | Limited |
| Custom Replacers | Supported | Not supported |
| File Extension Customization | Supported | Limited |
| Active Maintenance | Yes | Yes |
| Bundle Size | Smaller | Similar |

## Installation

You can install tsc-path-fix either globally or as a dev dependency:

```sh
# Global installation
npm install -g tsc-path-fix

# Local installation (recommended)
npm install --save-dev tsc-path-fix
```

## Quick Start

1. Add the build script to your `package.json`:

```json
{
  "scripts": {
    "build": "tsc && tsc-path-fix",
    "build:watch": "tsc && (concurrently \"tsc -w\" \"tsc-path-fix -w\")"
  }
}
```

2. Configure your `tsconfig.json` with path aliases:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```

3. Run the build:

```sh
npm run build
```

## Common Use Cases

### 1. Basic Path Alias Resolution

```typescript
// Before compilation (TypeScript)
import { Component } from '@components/Button';
import { util } from '@/utils/helper';

// After compilation (JavaScript)
import { Component } from './components/Button.js';
import { util } from './utils/helper.js';
```

### 2. External Project References

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@shared/*": ["../shared-library/src/*"]
    }
  }
}
```

### 3. Watch Mode for Development

```json
{
  "scripts": {
    "dev": "concurrently \"tsc -w\" \"tsc-path-fix -w\""
  }
}
```

## Configuration

### Command Line Options

```sh
tsc-path-fix [options]

Options:
  -p, --project <path>     Path to tsconfig.json (default: "tsconfig.json")
  -w, --watch             Watch for file changes
  --outDir <path>         Output directory
  --resolveFullPaths      Resolve incomplete import paths
  --verbose               Show detailed output
  --debug                 Show debug information
```

### Configuration via tsconfig.json

```json
{
  "compilerOptions": {
    // ... your TypeScript options
  },
  "tsc-path-fix": {
    "verbose": false,
    "resolveFullPaths": true,
    "replacers": {
      "customReplacer": {
        "enabled": true,
        "file": "./customReplacer.js"
      }
    },
    "fileExtensions": {
      "inputGlob": "{js,jsx,mjs}",
      "outputCheck": ["js", "json", "jsx", "mjs"]
    }
  }
}
```

## API Reference

### replaceTscAliasPaths(options?)

```typescript
import { replaceTscAliasPaths } from 'tsc-path-fix';

// Basic usage
replaceTscAliasPaths();

// With options
replaceTscAliasPaths({
  project: 'tsconfig.json',
  watch: true,
  verbose: true
});
```

### Single File Processing

```typescript
import { prepareSingleFileReplaceTscAliasPaths } from 'tsc-path-fix';

const processFile = await prepareSingleFileReplaceTscAliasPaths({
  project: 'tsconfig.json'
});

const result = processFile({
  fileContents: 'import { foo } from "@utils/foo";',
  filePath: 'src/index.ts'
});
```

## Troubleshooting

### Common Issues

1. **Paths not being replaced**
   - Check if your `tsconfig.json` paths are correctly configured
   - Ensure the source files are within the project scope
   - Run with `--debug` flag to see detailed information

2. **Watch mode not working**
   - Verify that both `tsc -w` and `tsc-path-fix -w` are running
   - Check file permissions in the output directory

3. **External project references**
   - Ensure the external project path is correctly specified in `tsconfig.json`
   - Verify that the external project is accessible

### Debug Mode

Run with the `--debug` flag to get detailed information about:
- Configuration loading
- File scanning
- Path resolution
- Replacement operations

```sh
tsc-path-fix --debug
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.