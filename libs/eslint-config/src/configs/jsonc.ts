import json from '@eslint/json';
import tseslint, { type ConfigArray } from 'typescript-eslint';

const jsoncConfig: ConfigArray = tseslint.config({
  files: ['**/*.jsonc', '**/tsconfig*.json', '.vscode/*.json'],
  plugins: { json },
  language: 'json/jsonc',
  rules: {
    'no-irregular-whitespace': 'off',
    'json/no-duplicate-keys': 'error',
  },
});

export { jsoncConfig };
export default jsoncConfig;
