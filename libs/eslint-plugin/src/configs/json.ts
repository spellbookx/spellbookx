import json from '@eslint/json';
import type { Linter } from 'eslint';

const configJson: Linter.Config = {
  files: ['**/*.json'],
  plugins: { json },
  language: 'json/json',
  rules: {
    'no-irregular-whitespace': 'off',
    'json/no-duplicate-keys': 'error',
  },
};

export default configJson;
