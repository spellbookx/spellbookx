/**
 * @file index.ts
 * Main entry point for `@spellbookx/recipes`.
 * Re-exports all import groups, ignore path groups, types, and unified recipe dictionaries.
 */

import { ignores } from './ignores/index.js';
import { imports } from './imports/index.js';

export * from './ignores/index.js';
export * from './imports/index.js';

/**
 * Unified Spellbookx recipes collection containing both `ignores` and `imports` dictionaries.
 */
export const recipes = {
  ignores,
  imports,
} as const;

/**
 * Type of the unified Spellbookx recipes dictionary.
 */
export type RecipesDictionary = typeof recipes;

/**
 * Default export of the unified recipes dictionary bundling both `ignores` and `imports`.
 */
export default recipes;
