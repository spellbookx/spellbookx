import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import type { Linter } from 'eslint';
import js from '@eslint/js';

const configJavascript: Linter.Config = {
  files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
  plugins: {
    import: importPlugin,
    'simple-import-sort': simpleImportSort,
  },
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    // @eslint/js recommended rules
    ...js.configs.recommended.rules,

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
};

export default configJavascript;
