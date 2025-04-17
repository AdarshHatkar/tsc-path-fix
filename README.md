# tsc-path-fix

Zero-runtime TypeScript path resolver that converts aliases to relative paths at compile time. Faster and lighter than alternatives, with native watch mode support.

[![npm version](https://badge.fury.io/js/tsc-path-fix.svg)](https://badge.fury.io/js/tsc-path-fix)
[![License](https://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)
[![Donate](https://img.shields.io/badge/Donate-WhatsApp-blue.svg)](https://api.whatsapp.com/send/?phone=919834877006)
[![Downloads](https://img.shields.io/npm/dm/tsc-path-fix.svg)](https://www.npmjs.com/package/tsc-path-fix)
[![GitHub stars](https://img.shields.io/github/stars/AdarshHatkar/tsc-path-fix.svg)](https://github.com/AdarshHatkar/tsc-path-fix/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/AdarshHatkar/tsc-path-fix.svg)](https://github.com/AdarshHatkar/tsc-path-fix/issues)

> **TypeScript Path Alias Resolver** - Fast, zero-runtime path resolution for TypeScript projects.
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

## Features

- 🔄 **Smart Alias Resolution** - Automatically converts TypeScript path aliases to relative paths
- ⚡ **Zero-Runtime Solution** - No runtime dependencies required in your production code
- 💪 **Performance Optimized** - Built-in caching for path lookups and file system operations
- 📦 **Project Reference Support** - Works seamlessly with both local and external project aliases
- 👀 **Native Watch Mode** - Integrated file watching for development workflows
- 🧩 **Custom Replacers** - Extend functionality with your own path replacement logic
- 🛠️ **Highly Configurable** - Customize file extensions, path resolution, and processing behavior
- 📁 **File Extension Support** - Handles various file extensions (js, jsx, cjs, mjs, d.ts, etc.)
- 🔍 **Debug Mode** - Comprehensive debugging capabilities for troubleshooting

## Comparison to [tsconfig-paths](https://github.com/dividab/tsconfig-paths)

| Feature | tsc-path-fix | tsconfig-paths |
|---------|-------------|----------------|
| Runtime Dependencies | None - works at compile time | Required - loads at runtime |
| Path Resolution | Compile-time - converts to relative paths | Runtime - resolves during execution |
| Performance | Better - no runtime overhead | Slower - adds runtime processing |
| Bundle Size | Smaller - no code added to bundle | Larger - includes resolution code |
| Caching | Built-in path and file caching | Limited caching |
| External Project Support | Full support | Limited support |

## Comparison to [tsc-alias](https://github.com/justkey007/tsc-alias)

| Feature | tsc-path-fix | tsc-alias |
|---------|-------------|-----------|
| Runtime Dependencies | None | None |
| Path Resolution | Compile-time | Compile-time |
| Performance | Optimized with caching | Standard |
| External Project References | Fully supported | Limited support |
| Watch Mode | Native support | Requires additional setup |
| Debug Mode | Built-in with detailed logging | Limited |
| Custom Replacers | Supported with extensible API | Not supported |
| File Extension Customization | Comprehensive (js, jsx, cjs, mjs, d.ts, etc.) | Limited |
| Path Resolution Logic | Smart resolution with fallbacks | Basic resolution |
| Configuration Options | Extensive | Limited |
| Active Maintenance | Yes | Yes |




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

### 4. Custom Replacers

Create a custom replacer to handle special path transformations:

```javascript
// customReplacer.js
module.exports.default = ({ orig, file, config }) => {
  // Quick check if the file contains any specific aliases
  if (!orig.includes('@special')) {
    return orig;
  }
  
  // Replace occurrences with custom logic
  return orig.replace(/@special\/([^'"]*)/, (match, path) => {
    return `./specialized/${path}`;
  });
};
```

Configure it in your tsconfig.json:

```json
{
  "tsc-path-fix": {
    "replacers": {
      "customReplacer": {
        "enabled": true,
        "file": "./customReplacer.js"
      }
    }
  }
}
```

### 5. Working with Different File Extensions

Configure custom file extensions for your project:

```json
{
  "tsc-path-fix": {
    "fileExtensions": {
      "inputGlob": "{js,jsx,mjs,cjs}",
      "outputCheck": ["js", "jsx", "mjs", "cjs", "json"]
    }
  }
}
```

## Configuration

### Command Line Options

```sh
tsc-path-fix [options]

Options:
  -p, --project <path>     Path to tsconfig.json (default: "tsconfig.json")
  -w, --watch              Watch for file changes and process them incrementally
  --outDir <path>          Output directory for compiled files (overrides tsconfig.json)
  --resolveFullPaths       Automatically resolve incomplete import paths (add extensions/index.js)
  --verbose                Show detailed processing information
  --debug                  Show extensive debug information including path resolution
  --replacer <path>        Path to a custom replacer module
  --fileExtensions <exts>  Comma-separated list of file extensions to process
  -h, --help               Display help information
```

### Configuration via tsconfig.json

You can configure tsc-path-fix in your `tsconfig.json` file:

```json
{
  "compilerOptions": {
    // ... your TypeScript options
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  },
  "tsc-path-fix": {
    "verbose": false,
    "debug": false,
    "resolveFullPaths": true,
    "replacers": {
      "default": {
        "enabled": true
      },
      "base-url": {
        "enabled": true
      },
      "customReplacer": {
        "enabled": true,
        "file": "./customReplacer.js"
      }
    },
    "fileExtensions": {
      "inputGlob": "{js,jsx,mjs,cjs}",
      "outputCheck": ["js", "json", "jsx", "mjs", "cjs", "d.ts", "d.tsx", "d.cts", "d.mts"]
    }
  }
}
```

#### Configuration Options Explained:

- **verbose**: When true, outputs detailed processing information
- **debug**: When true, outputs extensive debug information for troubleshooting
- **resolveFullPaths**: Automatically adds file extensions and resolves index files
- **replacers**: 
  - **default**: Built-in replacer for processing path aliases
  - **base-url**: Built-in replacer for handling baseUrl references
  - **customReplacer**: Your own replacers (see Custom Replacers section)
- **fileExtensions**:
  - **inputGlob**: Glob pattern for finding files to process
  - **outputCheck**: List of file extensions to check when resolving paths

## API Reference

### replaceTscAliasPaths(options?)

Main function to replace TypeScript path aliases in compiled files:

```typescript
import { replaceTscAliasPaths } from 'tsc-path-fix';

// Basic usage
replaceTscAliasPaths();

// With options
replaceTscAliasPaths({
  project: 'tsconfig.json',        // Path to tsconfig.json
  watch: true,                     // Enable watch mode
  verbose: true,                   // Enable verbose logging
  debug: false,                    // Enable debug logging
  outDir: 'dist',                  // Output directory
  resolveFullPaths: true,          // Auto-resolve incomplete paths
  fileExtensions: ['js', 'jsx']    // File extensions to process
});
```

### prepareSingleFileReplaceTscAliasPaths(options?)

Function to create a file processor for individual files:

```typescript
import { prepareSingleFileReplaceTscAliasPaths } from 'tsc-path-fix';

// Create a file processor
const processFile = await prepareSingleFileReplaceTscAliasPaths({
  project: 'tsconfig.json',
  resolveFullPaths: true
});

// Process a single file
const result = processFile({
  fileContents: 'import { foo } from "@utils/foo";',
  filePath: 'src/index.ts'
});

console.log(result); // 'import { foo } from "./utils/foo.js";'
```

### Custom Replacer API

Create custom replacers to extend the functionality:

```typescript
// ES Module format
export default function({ orig, file, config }) {
  // orig: Original file contents (string)
  // file: Path of the file being processed (string)
  // config: Configuration object with project settings
  
  // Process file contents
  return processedContents;
}

// CommonJS format
module.exports.default = function({ orig, file, config }) {
  // Process file contents
  return processedContents;
};
```

### Path Resolution Utilities

For advanced use cases, you can access the core path resolution utilities:

```typescript
import { ImportPathResolver } from 'tsc-path-fix/utils';

// Resolve full import paths (adding file extensions)
const resolvedCode = ImportPathResolver.resolveFullImportPaths(
  code,       // Source code
  filePath,   // File path
  '.js'       // Default extension
);

// Replace source import paths
const processedCode = ImportPathResolver.replaceSourceImportPaths(
  code,       // Source code
  filePath,   // File path
  replacer    // Path replacer function
);
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