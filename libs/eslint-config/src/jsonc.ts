import json from '@eslint/json';
import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';

const configJsonc: Linter.Config[] = defineConfig({
  files: ['**/*.jsonc', '**/tsconfig*.json', '.vscode/*.json'],
  plugins: { json },
  language: 'json/jsonc',
  rules: {
    'no-irregular-whitespace': 'off',
    'json/no-duplicate-keys': 'error',
  },
});

export default configJsonc;
