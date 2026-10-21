/**
 * @file prettier.ts
 * ESLint configuration integrating Prettier formatting rules.
 */

import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

/**
 * Flat ESLint configuration activating `eslint-plugin-prettier` and disabling conflicting formatting rules.
 */
export const configPrettier: Linter.Config[] = defineConfig([
  prettierRecommended,
]);

export default configPrettier;
