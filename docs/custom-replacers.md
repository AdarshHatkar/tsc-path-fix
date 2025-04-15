# Custom Replacers Guide

One of the powerful features of `tsc-path-fix` is the ability to create custom replacers that extend or modify how path aliases are transformed.

## What are Custom Replacers?

Custom replacers are JavaScript modules that you can create to implement specialized path transformation logic. They allow you to:

- Handle special path alias patterns
- Implement project-specific path transformations
- Add support for custom module resolution strategies
- Modify import statements beyond simple path replacement

## Creating a Custom Replacer

A custom replacer is a JavaScript module that exports a default function receiving an object with the following properties:

- `orig`: The original file contents as a string
- `file`: The path of the file being processed
- `config`: The configuration object with project settings

### Basic Custom Replacer Structure

```javascript
// customReplacer.js
module.exports.default = function({ orig, file, config }) {
  // Quick check if this replacer should process the file
  if (!orig.includes('@special')) {
    return orig; // Return original if nothing to process
  }
  
  // Replace occurrences with custom logic
  return orig.replace(
    /import\s+(?:[\w\s{},*]*)\s+from\s+['"]@special\/([^'"]*)['"]/g,
    (match, path) => {
      return `import { ... } from './specialized/${path}.js'`;
    }
  );
};
```

### ES Modules Format

```javascript
// customReplacer.js
export default function({ orig, file, config }) {
  // Custom replacement logic here
  return processedContents;
}
```

## Configuring Custom Replacers

Add your custom replacer to the `tsconfig.json` file:

```json
{
  "compilerOptions": {
    // ... TypeScript options
  },
  "tsc-path-fix": {
    "replacers": {
      "customReplacer": {
        "enabled": true,
        "file": "./path/to/customReplacer.js"
      }
    }
  }
}
```

## Custom Replacer Examples

### 1. Adding File Extensions with Context

This replacer adds file extensions based on the imported module type:

```javascript
module.exports.default = function({ orig, file, config }) {
  return orig.replace(
    /import\s+(?:[\w\s{},*]*)\s+from\s+['"]([^'"]*)['"]/g,
    (match, path) => {
      // Skip if already has extension or is external module
      if (path.includes('.') || path.startsWith('@') || !path.includes('/')) {
        return match;
      }
      
      // Add appropriate extension
      if (path.includes('component')) {
        return match.replace(path, `${path}.jsx`);
      } else {
        return match.replace(path, `${path}.js`);
      }
    }
  );
};
```

### 2. Transforming External Module Imports

This replacer transforms imports from an external CDN:

```javascript
module.exports.default = function({ orig, file, config }) {
  return orig.replace(
    /import\s+(?:[\w\s{},*]*)\s+from\s+['"]@cdn\/([^'"]*)['"]/g,
    (match, path) => {
      return match.replace(
        `@cdn/${path}`,
        `https://cdn.example.com/modules/${path}.js`
      );
    }
  );
};
```

### 3. Environment-specific Path Resolution

This replacer changes paths based on the current environment:

```javascript
module.exports.default = function({ orig, file, config }) {
  const env = process.env.NODE_ENV || 'development';
  
  return orig.replace(
    /import\s+(?:[\w\s{},*]*)\s+from\s+['"]@config\/([^'"]*)['"]/g,
    (match, path) => {
      return match.replace(
        `@config/${path}`,
        `./config/${env}/${path}.js`
      );
    }
  );
};
```

## Advanced Techniques

### Chaining Multiple Replacers

You can configure multiple custom replacers that will be applied in sequence:

```json
{
  "tsc-path-fix": {
    "replacers": {
      "firstReplacer": {
        "enabled": true,
        "file": "./firstReplacer.js"
      },
      "secondReplacer": {
        "enabled": true,
        "file": "./secondReplacer.js"
      }
    }
  }
}
```

### Accessing Project Configuration

Custom replacers have access to the project configuration:

```javascript
module.exports.default = function({ orig, file, config }) {
  // Access paths from tsconfig
  const paths = config.compilerOptions.paths;
  
  // Use configuration to inform replacement logic
  // ...
  
  return processedContents;
};
```

### File-specific Transformations

You can apply different transformations based on the file location:

```javascript
module.exports.default = function({ orig, file, config }) {
  if (file.includes('/components/')) {
    // Apply component-specific transformations
  } else if (file.includes('/api/')) {
    // Apply API-specific transformations
  }
  
  return processedContents;
};
```

## Best Practices

1. **Performance**: Always include quick checks to skip unnecessary processing
2. **Robustness**: Handle edge cases and validate paths before transforming
3. **Clarity**: Add comments explaining the transformation logic
4. **Modularity**: Create focused replacers for specific transformation tasks
5. **Testing**: Test your replacers with various import patterns

## Debugging Custom Replacers

You can debug your custom replacers by using the `--debug` flag:

```sh
tsc-path-fix --debug
```

This will output detailed information about each replacement operation, including which replacer processed each file and the resulting transformations.

## Common Issues and Solutions

### Replacer Not Being Applied

- Ensure the replacer is properly configured in `tsconfig.json`
- Check that the file path to the replacer is correct
- Verify that the replacer is exporting a default function

### Incorrect Path Transformations

- Log the input and output of your replacer function
- Use regex testers to verify your patterns
- Implement path resolution validation

### Handling Special Characters

For paths with special characters, ensure proper escaping:

```javascript
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
```

## Next Steps

- Learn about [performance optimization](./performance.md) for custom replacers
- See how to [combine with other tools](./integrations.md) for advanced workflows
- Explore [real-world examples](./examples.md) of custom replacers