import json from '@eslint/json';
import { Linter } from 'eslint';

const configJson5: Linter.Config = {
  files: ['**/*.json5'],
  plugins: { json },
  language: 'json/json5',
  rules: {
    'no-irregular-whitespace': 'off',
    'json/no-duplicate-keys': 'error',
  },
};

export default configJson5;
