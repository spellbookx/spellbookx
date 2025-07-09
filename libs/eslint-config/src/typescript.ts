import { type Linter } from 'eslint';
import tseslint from 'typescript-eslint';
import ignores from './lib/ignores.js';
import js from '@eslint/js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import importPlugin from 'eslint-plugin-import';
import tseslintParser from '@typescript-eslint/parser';

const configTypescript = tseslint.config({
  files: ['**/*.ts', '**/*.mts', '**/*.cts'],
  ignores: ignores,
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
  ],
  plugins: {
    'simple-import-sort': simpleImportSort,
    import: importPlugin,
    js,
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
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
}) as unknown as Linter.Config[];

export default configTypescript;
