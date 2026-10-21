/**
 * @file base.ts
 * Minimal base ESLint configuration for JavaScript, TypeScript, and Prettier formatting.
 */

import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';

import { configIgnores } from './ignores.js';
import { configJavascript } from './javascript.js';
import { configPrettier } from './prettier.js';

/**
 * Minimal base flat ESLint configuration providing core language linting, ignore patterns, and Prettier formatting.
 */
export const configBase: Linter.Config[] = defineConfig([
  configIgnores,
  configJavascript,
  configPrettier,
]);

export default configBase;
