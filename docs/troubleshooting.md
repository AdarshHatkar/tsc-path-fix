# Troubleshooting Guide

This guide helps you solve common issues encountered while using `tsc-path-fix` in your TypeScript projects.

## Common Issues and Solutions

### Paths Not Being Replaced

**Symptoms:**
- Compiled JavaScript files still contain TypeScript path aliases
- Imports fail with "Cannot find module" errors when running the code

**Possible Solutions:**

1. **Check your tsconfig.json configuration:**
   - Ensure `baseUrl` is correctly set
   - Verify that your `paths` mappings are correctly defined
   - Make sure the `outDir` setting points to the right output directory

2. **Verify file inclusion:**
   - Check that your source files are included in the TypeScript compilation
   - Make sure they aren't excluded by `exclude` patterns in tsconfig.json

3. **Run in debug mode:**
   ```sh
   tsc-path-fix --debug
   ```
   This will show detailed information about which files are being processed and how paths are being resolved.

4. **Check for path match issues:**
   - Ensure your import statements match the path patterns defined in tsconfig.json
   - Remember that path mappings are case-sensitive

### Watch Mode Not Working Correctly

**Symptoms:**
- Changes to files are not being processed automatically
- Some files are processed but others are not

**Possible Solutions:**

1. **Verify both processes are running:**
   - Ensure both `tsc -w` and `tsc-path-fix -w` are running
   - Use a tool like `concurrently` to manage both watch processes

2. **Check file permissions:**
   - Ensure the output directory has proper write permissions
   - Verify that no other process is locking the files

3. **Use verbose mode:**
   ```sh
   tsc-path-fix -w --verbose
   ```
   This will provide more information about file watching activities.

4. **Increase file system watch limits:**
   On Linux systems, you might need to increase the inotify watch limits:
   ```sh
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
   ```

### External Project References Not Working

**Symptoms:**
- Imports from external projects are not being resolved correctly
- Paths to external project files remain as aliases

**Possible Solutions:**

1. **Verify external project paths:**
   - Ensure the paths to external projects are correct and accessible
   - Use absolute paths if relative paths are causing issues

2. **Check project references in tsconfig.json:**
   - Make sure external projects are properly referenced
   - Verify the path mappings for external projects

3. **Use project option:**
   ```sh
   tsc-path-fix -p tsconfig.json --verbose
   ```
   Explicitly specify the tsconfig.json file to use.

4. **Use monorepo tools:**
   - If working in a monorepo, consider tools like Nx, Lerna, or Turborepo
   - These tools often have better support for cross-project references

### Performance Issues

**Symptoms:**
- Processing takes a long time
- High CPU or memory usage

**Possible Solutions:**

1. **Limit the scope:**
   - Be more specific with includes/excludes in tsconfig.json
   - Process only the directories you need

2. **Check for circular dependencies:**
   - Circular project references can cause performance issues
   - Simplify your project structure if possible

3. **Use custom replacers efficiently:**
   - Ensure custom replacers have quick checks to avoid unnecessary processing
   - Optimize regular expressions for performance

4. **Update to the latest version:**
   - Newer versions often include performance improvements
   ```sh
   npm install --save-dev tsc-path-fix@latest
   ```

### Specific File Types Not Being Processed

**Symptoms:**
- Only some file extensions are being processed
- Certain file types still contain unresolved paths

**Possible Solutions:**

1. **Configure file extensions:**
   Add the following to your tsconfig.json:
   ```json
   {
     "tsc-path-fix": {
       "fileExtensions": {
         "inputGlob": "{js,jsx,mjs,cjs,d.ts}",
         "outputCheck": ["js", "jsx", "mjs", "cjs", "d.ts"]
       }
     }
   }
   ```

2. **Check file patterns:**
   - Ensure your file patterns include all necessary file types
   - Remember that some files might need special handling

### Custom Replacers Not Being Applied

**Symptoms:**
- Custom replacer logic is not being executed
- No changes are made to the files by custom replacers

**Possible Solutions:**

1. **Verify configuration:**
   - Check that custom replacers are correctly configured in tsconfig.json
   - Ensure the file path to the replacer is correct

2. **Check export format:**
   - Custom replacers must export a default function
   - Verify the function signature matches the expected format

3. **Debug the replacer:**
   - Add console.log statements in your replacer
   - Run with --debug flag to see detailed information

4. **Test in isolation:**
   - Create a simple test case to verify your replacer works as expected
   - Gradually add complexity once the basic functionality works

## Advanced Troubleshooting

### Debug Mode

For deeper investigation, run tsc-path-fix with the debug flag:

```sh
tsc-path-fix --debug > debug.log
```

This will generate a detailed log of all operations, including:
- Configuration loading
- File scanning
- Path resolution attempts
- Replacement operations

### Logging Environment

You can also set environment variables to control logging:

```sh
# On Windows
set TSC_PATH_FIX_DEBUG=true
tsc-path-fix

# On Linux/macOS
TSC_PATH_FIX_DEBUG=true tsc-path-fix
```

### Manual File Processing

To troubleshoot issues with specific files, you can use the JavaScript API directly:

```javascript
const { prepareSingleFileReplaceTscAliasPaths } = require('tsc-path-fix');
const fs = require('fs');

async function troubleshoot() {
  const processFile = await prepareSingleFileReplaceTscAliasPaths({
    project: 'tsconfig.json',
    verbose: true
  });

  const filePath = 'dist/problematic-file.js';
  const content = fs.readFileSync(filePath, 'utf8');
  
  const result = processFile({
    fileContents: content,
    filePath
  });
  
  console.log('Original:', content);
  console.log('Processed:', result);
}

troubleshoot().catch(console.error);
```

## Compatibility Issues

### Node.js Version Compatibility

`tsc-path-fix` works with Node.js 12.x and above. If you're encountering issues:

1. Verify your Node.js version:
   ```sh
   node --version
   ```

2. Update Node.js if necessary:
   ```sh
   # Using nvm
   nvm install --lts
   # Or download from nodejs.org
   ```

### TypeScript Version Compatibility

`tsc-path-fix` is tested with TypeScript 4.x and 5.x. If you're using an older version:

1. Update TypeScript:
   ```sh
   npm install --save-dev typescript@latest
   ```

2. Or specify compatibility in your configuration:
   ```json
   {
     "tsc-path-fix": {
       "typescriptVersion": "3.9"
     }
   }
   ```

## Getting Help

If you've tried the solutions above and still have issues:

1. **Check existing issues:**
   - Browse [GitHub issues](https://github.com/AdarshHatkar/tsc-path-fix/issues) for similar problems
   - Look for discussions in the TypeScript community

2. **Create a minimal reproduction:**
   - Create the smallest possible project that demonstrates your issue
   - This helps maintainers quickly understand and fix the problem

3. **Open a new issue:**
   - Include your tsconfig.json
   - Describe your setup and the problem in detail
   - Include error messages and debug output

4. **Contribute a fix:**
   - If you've solved your issue, consider contributing the fix back
   - Follow the contribution guidelines in the project README