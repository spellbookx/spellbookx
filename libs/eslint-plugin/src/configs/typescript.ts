import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import importPlugin from 'eslint-plugin-import';
import type { Linter } from 'eslint';

const configTypescript: Linter.Config = {
  files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
  plugins: {
    'simple-import-sort': simpleImportSort,
    import: importPlugin,
  },
  languageOptions: {
    parser: tseslintParser,
    ecmaVersion: 2022,
    sourceType: 'module',
    parserOptions: {
      project: true,
    },
  },
  rules: {
    ...js.configs.recommended.rules,
    ...tseslintPlugin.configs.recommendedTypeChecked.rules,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
};

export default configTypescript;
