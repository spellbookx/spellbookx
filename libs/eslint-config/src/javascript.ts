import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import type { Linter } from 'eslint';
import js from '@eslint/js';
import ignores from './lib/ignores.js';
import { defineConfig } from 'eslint/config';

const configJavascript: Linter.Config[] = defineConfig({
  files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
  ignores: ignores,
  extends: [js.configs.recommended, importPlugin.flatConfigs.recommended],
  plugins: {
    import: importPlugin,
    'simple-import-sort': simpleImportSort,
  },
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    // eslint-plugin-import
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error',
    'import/no-duplicates': 'warn',
    'import/order': 'off',

    // simple-import-sort (disable import/order to avoid conflict)
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
  },
});

export default configJavascript;
