import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges multiple class name strings or objects into a single class name string.
 *
 * This utility function combines class names, handling duplicates and conditional
 * classes.
 *
 * @param inputs - A list of class name strings, objects (where keys are class names
 * and values are boolean conditions), or arrays of class names.
 * @returns A single string containing the combined class names.
 *
 * @example
 * // Basic usage
 * cn('foo', 'bar'); // => 'foo bar'
 *
 * @example
 * // Conditional classes
 * cn({ 'foo': true, 'bar': false, 'baz': true }); // => 'foo baz'
 *
 * @example
 * // Combining with Tailwind CSS classes
 * cn('text-center', 'text-sm', { 'font-bold': true, 'text-red-500': false });
 * // => 'text-center text-sm font-bold'
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
