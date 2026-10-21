/**
 * @file all.ts
 * Comprehensive ESLint configuration bundling all supported file types, frameworks, and plugins.
 */

import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';

import { configAstro } from './astro.js';
import { configCspell } from './cspell.js';
import { configIgnores } from './ignores.js';
import { configJavascript } from './javascript.js';
import { configJson } from './json.js';
import { configMarkdown } from './markdown.js';
import { configPrettier } from './prettier.js';
import { configReact } from './react.js';
import { configSvelte } from './svelte.js';
import { configVuoto } from './vuoto.js';

/**
 * All-inclusive flat ESLint configuration bundle for multi-framework, full-stack monorepos.
 */
export const configAll: Linter.Config[] = defineConfig([
  configIgnores,
  configJavascript,
  configReact,
  configAstro,
  configSvelte,
  configJson,
  configMarkdown,
  configVuoto,
  configCspell,
  configPrettier,
]);

export default configAll;
