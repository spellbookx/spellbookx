import json from '@eslint/json';
import jsoncParser from 'jsonc-eslint-parser';
import tseslint, { type ConfigArray } from 'typescript-eslint';

/**
 * ESLint configuration for JSON-family files.
 *
 * Supports linting of `.json`, `.json5`, and `.jsonc` files using the `@eslint/json` plugin
 * and the `jsonc-eslint-parser`.
 *
 * Each format is assigned the appropriate `language` mode to ensure correct parsing and rule application:
 * - `json/json` — strict JSON (e.g., `package.json`)
 * - `json/json5` — relaxed syntax (e.g., custom tooling formats)
 * - `json/jsonc` — JSON with comments (e.g., `tsconfig.json`, `.vscode/settings.json`)
 *
 * Disables `no-irregular-whitespace` for better editor compatibility and enforces
 * `json/no-duplicate-keys` to catch key collisions early.
 *
 * Requires installation of `@eslint/json` and `jsonc-eslint-parser`.
 * @example
 * ```ts
 * import tseslint from 'typescript-eslint';
 * import sbx from '@spellbookx/eslint-config';
 * export default tseslint.config(
 *   ...sbx.configs.json,
 * );
 * ```
 * @example
 * ```js
 * import sbx from '@spellbookx/eslint-config';
 * export default [sbx.configs.json];
 * ```
 */
const jsonConfig: ConfigArray = tseslint.config(
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    languageOptions: {
      parser: jsoncParser,
      parserOptions: { jsonSyntax: 'json' },
    },
    rules: {
      'no-irregular-whitespace': 'off',
      'json/no-duplicate-keys': 'error',
    },
  },
  {
    files: ['**/*.json5'],
    plugins: { json },
    language: 'json/json5',
    languageOptions: {
      parser: jsoncParser,
      parserOptions: { jsonSyntax: 'json5' },
    },
    rules: {
      'no-irregular-whitespace': 'off',
      'json/no-duplicate-keys': 'error',
    },
  },
  {
    files: ['**/*.jsonc', '**/tsconfig*.json', '.vscode/*.json'],
    plugins: { json },
    language: 'json/jsonc',
    languageOptions: {
      parser: jsoncParser,
      parserOptions: { jsonSyntax: 'jsonc' },
    },
    rules: {
      'no-irregular-whitespace': 'off',
      'json/no-duplicate-keys': 'error',
    },
  },
);

export { jsonConfig as default, jsonConfig };
