/**
 * @file recommended.ts
 * Standard recommended ESLint configuration for JavaScript, TypeScript, React, JSON, Markdown, and Prettier.
 */

import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';

import { configIgnores } from './ignores.js';
import { configJavascript } from './javascript.js';
import { configJson } from './json.js';
import { configMarkdown } from './markdown.js';
import { configPrettier } from './prettier.js';
import { configReact } from './react.js';
import { configVuoto } from './vuoto.js';

/**
 * Recommended flat ESLint configuration bundle for modern web and Node.js projects.
 */
export const configRecommended: Linter.Config[] = defineConfig([
  configIgnores,
  configJavascript,
  configReact,
  configJson,
  configMarkdown,
  configVuoto,
  configPrettier,
]);

export default configRecommended;
