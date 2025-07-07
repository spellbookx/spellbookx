import json from '@eslint/json';
import type { Linter } from 'eslint';

const configJsonc: Linter.Config = {
  files: ['**/*.jsonc', '**/tsconfig*.json', '.vscode/*.json'],
  plugins: { json },
  language: 'json/jsonc',
  rules: {
    'no-irregular-whitespace': 'off',
    'json/no-duplicate-keys': 'error',
  },
};

export default configJsonc;
