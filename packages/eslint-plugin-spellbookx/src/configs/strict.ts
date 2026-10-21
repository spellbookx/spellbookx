/**
 * @file strict.ts
 * Strict ESLint configuration activating `typescript-eslint` strict rule definitions.
 */

import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

/**
 * Strict TypeScript flat ESLint configuration activating strict type-checking and code-hygiene rules from `typescript-eslint`.
 */
export const configStrict: Linter.Config[] = defineConfig([
  ...tseslint.configs.strict,
]);

export default configStrict;
