import json from '@eslint/json';
import jsoncParser from 'jsonc-eslint-parser';
import tseslint, { type ConfigArray } from 'typescript-eslint';

/**
 * ESLint configuration for `.json5` files supporting relaxed JSON5 syntax.
 * @returns {ConfigArray} ESLint configuration for JSON5 files.
 */
const json5Config: ConfigArray = tseslint.config({
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
});

export default json5Config;
