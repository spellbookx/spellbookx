/**
 * @file javascript.ts
 * Comprehensive ESLint flat configuration for JavaScript, TypeScript, and Node.js.
 */

import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import nodeDependencies from 'eslint-plugin-node-dependencies';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';

import { imports } from '@spellbookx/recipes/imports';

import { defineImports } from '../lib/define-imports.js';

/**
 * Core flat ESLint configuration for JavaScript and TypeScript codebases.
 * Includes unicorn, typescript-eslint, jsdoc, simple-import-sort, and node dependencies rules.
 */
export const configJavascript: Linter.Config[] = defineConfig([
  // --- Common for JS/TS/JSX/TSX ---
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
    plugins: {
      jsdoc,
      import: importPlugin,
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      unicorn.configs.recommended,
    ],
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Enforce structured and grouped imports using simple-import-sort
      'sort-imports': 'off',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: defineImports(
            imports.dotenv,
            imports.sideEffects,
            imports.env,
            imports.builtinModules,
            imports.backendFrameworks,
            imports.backendMiddlewares,
            imports.uiFrameworks,
            imports.reactPackages,
            imports.fullstackFrameworks,
            imports.reactNativeExpo,
            imports.stateManagement,
            imports.dataFetching,
            imports.uiLibraries,
            imports.cssInJs,
            imports.icons,
            imports.testing,
            imports.thirdParty,
            imports.monorepo,
            imports.assets,
            imports.json,
            imports.styles,
            imports.relative
          ),
        },
      ],

      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/name-replacements': 'off',
      'unicorn/no-top-level-side-effects': 'off',
      'unicorn/no-asterisk-prefix-in-documentation-comments': 'off',
    },
  },

  // --- Node.js Specifics (TS/JS files) ---
  {
    files: ['**/*.{ts,js,mts,mjs,cts,cjs}'],
    ignores: ['**/*.{tsx,jsx}'],
    extends: [
      nodeDependencies.configs['flat/recommended'],
      jsdoc.configs['flat/contents-typescript-flavor'],
      jsdoc.configs['flat/logical-typescript-flavor'],
    ],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: ['__tests__'],
        },
      ],
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
          },
        },
      ],
      'jsdoc/require-description': 'warn',
    },
  },

  // --- CommonJS Overrides ---
  {
    files: ['**/*.{cjs,cts}'],
    languageOptions: { globals: { ...globals.commonjs } },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'unicorn/prefer-module': 'off',
    },
  },
]);

export default configJavascript;
