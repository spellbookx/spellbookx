import json from '@eslint/json';
import tseslint, { type ConfigArray } from 'typescript-eslint';

const jsonConfig: ConfigArray = tseslint.config({
  files: ['**/*.json'],
  plugins: { json },
  language: 'json/json',
  rules: {
    'no-irregular-whitespace': 'off',
    'json/no-duplicate-keys': 'error',
  },
});

export { jsonConfig };
export default jsonConfig;
