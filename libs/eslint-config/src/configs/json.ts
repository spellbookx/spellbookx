import json from '@eslint/json';
import jsoncParser from 'jsonc-eslint-parser';
import tseslint, { type ConfigArray } from 'typescript-eslint';

/**
 * ESLint configuration for `.json` files with strict JSON syntax.
 * @returns {ConfigArray} ESLint configuration for JSON files.
 */
const jsonConfig: ConfigArray = tseslint.config({
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
});

export default jsonConfig;
