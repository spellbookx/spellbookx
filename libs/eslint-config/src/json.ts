import json from '@eslint/json';
import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';

const configJson: Linter.Config[] = defineConfig({
  files: ['**/*.json'],
  plugins: { json },
  language: 'json/json',
  rules: {
    'no-irregular-whitespace': 'off',
    'json/no-duplicate-keys': 'error',
  },
});

export default configJson;
