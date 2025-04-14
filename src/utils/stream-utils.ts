/**
 * @file
 * 
 * Utilities for streaming file processing to improve memory usage and performance
 * when handling large files or large numbers of files.
 */

import * as fs from 'fs';
import { createReadStream, createWriteStream } from 'fs';
import { promisify } from 'util';
import { pipeline as pipelineCallback } from 'stream';
import { StringDecoder } from 'string_decoder';

const pipeline = promisify(pipelineCallback);
const stat = promisify(fs.stat);

/**
 * Process a large file in streaming chunks to avoid loading it all into memory
 * 
 * @param filePath Path to the file to process
 * @param transformFn Function that transforms each chunk
 * @returns Promise that resolves when processing is complete
 */
export async function streamProcessFile(
  filePath: string, 
  transformFn: (chunk: string) => string
): Promise<void> {
  // File stats to determine if worth streaming (small files are processed normally)
  const stats = await stat(filePath);
  
  // For small files (less than 1MB), just use the standard approach
  if (stats.size < 1024 * 1024) {
    const content = await fs.promises.readFile(filePath, 'utf8');
    const transformed = transformFn(content);
    
    if (content !== transformed) {
      await fs.promises.writeFile(filePath, transformed, 'utf8');
    }
    
    return;
  }
  
  // For larger files, use streaming
  const tempFilePath = `${filePath}.temp`;
  const readStream = createReadStream(filePath, { encoding: 'utf8' });
  const writeStream = createWriteStream(tempFilePath, { encoding: 'utf8' });
  
  // Used to handle multi-byte characters that might be split across chunk boundaries
  const decoder = new StringDecoder('utf8');
  let pendingChunk = '';
  
  try {
    // Use transform function on chunks
    await new Promise<void>((resolve, reject) => {
      readStream.on('data', (chunk: Buffer) => {
        try {
          // Convert buffer to string and prepend any pending data
          const chunkStr = pendingChunk + decoder.write(chunk);
          
          // Keep a little pending data to handle potential split characters
          const splitAt = Math.max(0, chunkStr.length - 4);
          const processChunk = chunkStr.substring(0, splitAt);
          pendingChunk = chunkStr.substring(splitAt);
          
          // Transform and write
          const transformedChunk = transformFn(processChunk);
          writeStream.write(transformedChunk);
        } catch (err) {
          reject(err);
        }
      });
      
      readStream.on('end', () => {
        // Process any remaining data
        if (pendingChunk) {
          const finalChunk = pendingChunk + decoder.end();
          const transformedFinal = transformFn(finalChunk);
          writeStream.write(transformedFinal);
        }
        
        writeStream.end();
        resolve();
      });
      
      readStream.on('error', reject);
      writeStream.on('error', reject);
    });
    
    // Replace original with temp file
    await fs.promises.rename(tempFilePath, filePath);
  } catch (error) {
    // Clean up temp file if something goes wrong
    if (fs.existsSync(tempFilePath)) {
      await fs.promises.unlink(tempFilePath).catch(() => {});
    }
    throw error;
  }
}

/**
 * Check if a file has any content that matches a pattern
 * This is useful for quickly filtering files that might need processing
 * 
 * @param filePath Path to the file to check
 * @param pattern RegExp pattern to search for
 * @returns Promise resolving to true if pattern is found, false otherwise
 */
export async function fileContainsPattern(
  filePath: string,
  pattern: RegExp
): Promise<boolean> {
  const readStream = createReadStream(filePath, { encoding: 'utf8' });
  const decoder = new StringDecoder('utf8');
  let buffer = '';
  
  return new Promise<boolean>((resolve, reject) => {
    readStream.on('data', (chunk: Buffer) => {
      buffer += decoder.write(chunk);
      
      // Check if pattern matches, and if so, stop reading and resolve
      if (pattern.test(buffer)) {
        readStream.destroy();
        resolve(true);
      }
      
      // Keep buffer size reasonable by trimming if it gets too large
      if (buffer.length > 8192) {
        buffer = buffer.substring(buffer.length - 4096);
      }
    });
    
    readStream.on('end', () => {
      buffer += decoder.end();
      resolve(pattern.test(buffer));
    });
    
    readStream.on('error', reject);
  });
}