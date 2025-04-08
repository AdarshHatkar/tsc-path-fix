const fs = require("fs");
const path = require("path");

// Cache for file contents to avoid repeated file reads
const fileContentsCache = new Map();

// Cache for path calculations to avoid repeated calculations
const pathCache = new Map();

exports.default = ({ orig, file, config }) => {
    // Quick check if the file contains any aliases before doing expensive operations
    if (!orig.includes("@prisma")) {
        return orig;
    }

    // Define the absolute paths based on your configuration
    const rootDir = path.resolve(__dirname, "../"); // Adjust this if needed

    const pathMapping = {
        "@prisma": path.join(rootDir, "prisma"), // Absolute path to target
        // You can add more aliases here if needed
    };

    // Replace occurrences of the alias in the original string
    let newContents = orig;

    for (const [alias, targetPath] of Object.entries(pathMapping)) {
        // Skip if the alias doesn't exist in the content
        if (!newContents.includes(alias)) {
            continue;
        }

        const regex = new RegExp(alias, "g");

        // Calculate the relative path from the current file's directory to the target path
        // Use cache to avoid repeated calculations
        const cacheKey = `${file}-${targetPath}`;
        let relativePath = pathCache.get(cacheKey);

        if (!relativePath) {
            const fileDir = path.dirname(file);
            relativePath = path.relative(fileDir, targetPath).replace(/\\/g, "/"); // Convert to POSIX path format
            pathCache.set(cacheKey, relativePath);
        }

        newContents = newContents.replace(regex, relativePath);
    }

    // Log the original and modified contents for debugging
    // if (orig.includes("@prismaRace98")) {
    //     // console.log({ orig });
    //     // console.log({ file });
    // }
    // console.log({ orig });
    // console.log({ file });

    // If you want to write the new contents back to the file, uncomment the following line
    // fs.writeFileSync(file, newContents);

    return newContents; // Return the modified contents
};
