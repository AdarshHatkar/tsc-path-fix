# tsc-path-fix Documentation

Welcome to the comprehensive documentation for `tsc-path-fix` - the zero-runtime TypeScript path resolver that converts aliases to relative paths at compile time.

## Documentation Contents

### Core Documentation
- [Getting Started Guide](./getting-started.md) - Quick setup and basic usage
- [Performance Comparison](./performance.md) - Benchmarks and performance advantages
- [Troubleshooting Guide](./troubleshooting.md) - Solutions to common issues
- [Custom Replacers Guide](./custom-replacers.md) - Extending with custom path transformations

### Integration Guides
- [Working with Next.js](./integrations/nextjs.md)
- [Working with Node.js APIs](./integrations/nodejs.md)
- [Working with React Applications](./integrations/react.md)
- [Working with Monorepos](./integrations/monorepo.md)

### Advanced Topics
- [API Reference](./api-reference.md)
- [Configuration Options](./configuration.md)
- [Path Resolution Strategies](./path-resolution.md)
- [Contributing to tsc-path-fix](./contributing.md)

## Why tsc-path-fix?

`tsc-path-fix` solves the common problem of TypeScript path aliases not being properly transformed in the compiled JavaScript output. Unlike runtime solutions, it:

- ✅ **Zero Runtime Impact** - No code added to your bundle
- ✅ **Improved Performance** - No runtime path resolution overhead
- ✅ **Native TypeScript Integration** - Works with TypeScript's path mapping feature
- ✅ **Advanced Path Resolution** - Handles complex path mappings with ease
- ✅ **Watch Mode Support** - Seamless integration with development workflows

## Quick Start

```sh
# Install the package
npm install --save-dev tsc-path-fix

# Add to your build script
# package.json
{
  "scripts": {
    "build": "tsc && tsc-path-fix"
  }
}
```

For more details, check out the [Getting Started Guide](./getting-started.md).

## Community and Support

- [GitHub Repository](https://github.com/AdarshHatkar/tsc-path-fix)
- [npm Package](https://www.npmjs.com/package/tsc-path-fix)
- [Issue Tracker](https://github.com/AdarshHatkar/tsc-path-fix/issues)

## License

`tsc-path-fix` is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.