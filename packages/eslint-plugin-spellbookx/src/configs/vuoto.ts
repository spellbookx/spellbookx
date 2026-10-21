/**
 * @file vuoto.ts
 * ESLint configuration for empty files, blocks, and clean code enforcement via `eslint-plugin-vuoto`.
 */

import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import vuoto from 'eslint-plugin-vuoto';

/**
 * Flat ESLint configuration enabling all code hygiene and empty block rules from `eslint-plugin-vuoto`.
 */
export const configVuoto: Linter.Config[] = defineConfig([
  {
    plugins: {
      vuoto,
    },
  },
  vuoto.configs.all,
]);

export default configVuoto;
