/**
 * @file index.ts
 * Main entry point for `eslint-plugin-spellbookx`.
 * Exports ESLint flat configurations, plugin metadata, and configuration type definitions.
 */

import type { ESLint, Linter } from 'eslint';

import { configAll } from './configs/all.js';
import { configAstro } from './configs/astro.js';
import { configBase } from './configs/base.js';
import { configCspell } from './configs/cspell.js';
import { configIgnores } from './configs/ignores.js';
import { configJavascript } from './configs/javascript.js';
import { configJson } from './configs/json.js';
import { configMarkdown } from './configs/markdown.js';
import { configNode } from './configs/node.js';
import { configPrettier } from './configs/prettier.js';
import { configReact } from './configs/react.js';
import { configRecommended } from './configs/recommended.js';
import { configRecommendedSpellcheck } from './configs/recommended-spellcheck.js';
import { configStrict } from './configs/strict.js';
import { configSvelte } from './configs/svelte.js';
import { configVuoto } from './configs/vuoto.js';
import { packageJson } from './lib/package-json.js';

/**
 * Valid configuration names provided by `eslint-plugin-spellbookx`.
 */
export type SbxESLintConfig =
  | 'all'
  | 'astro'
  | 'base'
  | 'cspell'
  | 'ignores'
  | 'javascript'
  | 'json'
  | 'markdown'
  | 'node'
  | 'prettier'
  | 'react'
  | 'recommended'
  | 'recommended-spellcheck'
  | 'strict'
  | 'svelte'
  | 'vuoto';

/**
 * Dictionary mapping all supported configuration names to their respective flat configurations.
 */
const configs: Record<SbxESLintConfig, Linter.Config[]> = {
  all: configAll,
  astro: configAstro,
  base: configBase,
  cspell: configCspell,
  ignores: configIgnores,
  javascript: configJavascript,
  json: configJson,
  markdown: configMarkdown,
  node: configNode,
  prettier: configPrettier,
  react: configReact,
  recommended: configRecommended,
  'recommended-spellcheck': configRecommendedSpellcheck,
  strict: configStrict,
  svelte: configSvelte,
  vuoto: configVuoto,
};

/**
 * Extended ESLint plugin type with strongly-typed configurations dictionary.
 */
export type Plugin = ESLint.Plugin & {
  configs: typeof configs;
};

/**
 * ESLint plugin object exposing shareable flat configurations for Spellbookx.
 */
export const plugin: Plugin = {
  meta: {
    name: packageJson.name,
    version: packageJson.version,
    namespace: 'spellbookx',
  },
  configs,
  rules: {},
  processors: {},
};

export default plugin;

export { configAll } from './configs/all.js';
export { configAstro } from './configs/astro.js';
export { configBase } from './configs/base.js';
export { configCspell } from './configs/cspell.js';
export { configIgnores } from './configs/ignores.js';
export { configJavascript } from './configs/javascript.js';
export { configJson } from './configs/json.js';
export { configMarkdown } from './configs/markdown.js';
export { configNode } from './configs/node.js';
export { configPrettier } from './configs/prettier.js';
export { configReact } from './configs/react.js';
export { configRecommended } from './configs/recommended.js';
export { configRecommendedSpellcheck } from './configs/recommended-spellcheck.js';
export { configStrict } from './configs/strict.js';
export { configSvelte } from './configs/svelte.js';
export { configVuoto } from './configs/vuoto.js';
export { packageJson } from './lib/package-json.js';
