/**
 * @file ignores.ts
 * Global ignore patterns configuration for ESLint.
 * Shared presets imported from `@spellbookx/recipes/ignores`.
 */

import type { Linter } from 'eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

import { ignorePaths } from '@spellbookx/recipes/ignores';

/**
 * Flat ESLint configuration defining global ignore patterns for build artifacts, dependencies, and caches.
 */
export const configIgnores: Linter.Config[] = defineConfig([
  globalIgnores([...ignorePaths]),
]);

export default configIgnores;
