import json from '@eslint/json';
import tseslint, { type ConfigArray } from 'typescript-eslint';

const json5Config: ConfigArray = tseslint.config({
  files: ['**/*.json5'],
  plugins: { json },
  language: 'json/json5',
  rules: {
    'no-irregular-whitespace': 'off',
    'json/no-duplicate-keys': 'error',
  },
});

export { json5Config };
export default json5Config;
