/**
 * Utility functions for calculations
 */

/**
 * Calculates the sum of all numbers in an array
 */
export function calculateTotal(numbers: number[]): number {
  return numbers.reduce((sum, num) => sum + num, 0);
}

/**
 * Calculates the average of numbers in an array
 */
export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) {
    return 0;
  }
  return calculateTotal(numbers) / numbers.length;
}