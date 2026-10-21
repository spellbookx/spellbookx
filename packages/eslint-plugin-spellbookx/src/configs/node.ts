/**
 * @file node.ts
 * Dedicated ESLint configuration tailored for Node.js backend services and CLI tools.
 */

import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';

import { configIgnores } from './ignores.js';
import { configJavascript } from './javascript.js';
import { configJson } from './json.js';
import { configPrettier } from './prettier.js';
import { configVuoto } from './vuoto.js';

/**
 * Node.js-focused flat ESLint configuration combining JS/TS, JSON, package hygiene, ignore patterns, and Prettier.
 */
export const configNode: Linter.Config[] = defineConfig([
  configIgnores,
  configJavascript,
  configJson,
  configVuoto,
  configPrettier,
]);

export default configNode;
