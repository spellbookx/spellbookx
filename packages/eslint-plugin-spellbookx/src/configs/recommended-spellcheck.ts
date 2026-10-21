/**
 * @file recommended-spellcheck.ts
 * Recommended ESLint configuration extended with automated CSpell spell-checking.
 */

import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';

import { configCspell } from './cspell.js';
import { configIgnores } from './ignores.js';
import { configJavascript } from './javascript.js';
import { configJson } from './json.js';
import { configMarkdown } from './markdown.js';
import { configPrettier } from './prettier.js';
import { configReact } from './react.js';
import { configVuoto } from './vuoto.js';

/**
 * Complete recommended flat ESLint configuration including CSpell spellcheck validation.
 */
export const configRecommendedSpellcheck: Linter.Config[] = defineConfig([
  configIgnores,
  configJavascript,
  configReact,
  configJson,
  configMarkdown,
  configVuoto,
  configCspell,
  configPrettier,
]);

export default configRecommendedSpellcheck;
