# Getting Started with tsc-path-fix

This guide will help you quickly set up and start using `tsc-path-fix` in your TypeScript projects to resolve path aliases at compile time.

## What is tsc-path-fix?

`tsc-path-fix` is a zero-runtime TypeScript path resolver that converts aliases to relative paths at compile time. It's faster and lighter than alternatives, with native watch mode support.

## Installation

You can install `tsc-path-fix` either globally or as a dev dependency in your project:

### Global Installation

```sh
npm install -g tsc-path-fix
```

### Local Installation (Recommended)

```sh
npm install --save-dev tsc-path-fix
```

## Basic Setup

### Step 1: Configure TypeScript Paths

First, make sure your `tsconfig.json` has path aliases configured:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    },
    "outDir": "dist"
  }
}
```

### Step 2: Add Build Scripts

Add the following scripts to your `package.json`:

```json
{
  "scripts": {
    "build": "tsc && tsc-path-fix",
    "build:watch": "tsc && (concurrently \"tsc -w\" \"tsc-path-fix -w\")"
  }
}
```

### Step 3: Run the Build

Execute your build script:

```sh
npm run build
```

That's it! Your TypeScript path aliases will be converted to relative paths in the compiled JavaScript files.

## Example Usage

### Source TypeScript File

```typescript
// src/app.ts
import { Button } from '@components/Button';
import { formatDate } from '@utils/date-formatter';

const button = new Button('Click me');
const formattedDate = formatDate(new Date());
```

### Compiled JavaScript File (After tsc-path-fix)

```javascript
// dist/app.js
import { Button } from './components/Button.js';
import { formatDate } from './utils/date-formatter.js';

const button = new Button('Click me');
const formattedDate = formatDate(new Date());
```

## Advanced Configuration

### Watch Mode

For development, run in watch mode to automatically process files when they change:

```sh
npm run build:watch
```

### Custom Configuration

You can add a `tsc-path-fix` section to your `tsconfig.json` for advanced configuration:

```json
{
  "compilerOptions": {
    // ... your TypeScript options
  },
  "tsc-path-fix": {
    "verbose": true,
    "resolveFullPaths": true,
    "fileExtensions": {
      "inputGlob": "{js,jsx,mjs,cjs}",
      "outputCheck": ["js", "jsx", "mjs", "cjs", "d.ts"]
    }
  }
}
```

### Command Line Options

```sh
tsc-path-fix [options]

Options:
  -p, --project <path>     Path to tsconfig.json (default: "tsconfig.json")
  -w, --watch              Watch for file changes
  --outDir <path>          Output directory (overrides tsconfig.json)
  --resolveFullPaths       Add extensions to import paths when needed
  --verbose                Show detailed processing information
  --debug                  Show extensive debug information
```

## Working with External Project References

If you need to reference paths from other projects:

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

## Next Steps

- Check the [full documentation](../README.md) for more detailed information
- Explore [custom replacers](./custom-replacers.md) to extend functionality
- View [performance comparison](./performance.md) with other solutions
- See [troubleshooting guide](./troubleshooting.md) if you encounter issues

## Need Help?

- [Open an issue](https://github.com/AdarshHatkar/tsc-path-fix/issues) on GitHub
- [Star the project](https://github.com/AdarshHatkar/tsc-path-fix) if you find it useful