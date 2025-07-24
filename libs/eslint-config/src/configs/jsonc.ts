import json from '@eslint/json';
import jsoncParser from 'jsonc-eslint-parser';
import tseslint, { type ConfigArray } from 'typescript-eslint';

/**
 * ESLint configuration for `.jsonc`, `tsconfig*.json`, and JSON with comments.
 * @returns {ConfigArray} ESLint configuration for JSON with comments files.
 */
const jsoncConfig: ConfigArray = tseslint.config({
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
});

export default jsoncConfig;
