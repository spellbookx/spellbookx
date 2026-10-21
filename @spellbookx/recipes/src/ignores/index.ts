/**
 * @file index.ts
 * Main exports for `@spellbookx/recipes/ignores`.
 * Exposes all modular ignore path groups, types, and the unified `ignores` dictionary.
 */

import * as constants from './constants.js';

/**
 * Dictionary of all ignore recipe categories and complete collections.
 */
export const ignores = {
  all: constants.all,
  core: constants.core,
  go: constants.go,
  lockFiles: constants.lockFiles,
  misc: constants.misc,
  node: constants.node,
  python: constants.python,
  rust: constants.rust,
  toolchains: constants.toolchains,
  windows: constants.windows,
} as const;

/**
 * Valid keys in the `ignores` dictionary.
 */
export type IgnoreRecipeKey = keyof typeof ignores;

/**
 * Type of the unified `ignores` dictionary.
 */
export type IgnoresDictionary = typeof ignores;

export * from './constants.js';

/**
 * Default export of the unified ignores dictionary.
 */
export default ignores;
