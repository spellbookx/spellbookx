/**
 * @file react.ts
 * ESLint configuration for React and React Native components using `@eslint-react`.
 */

import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintReact from '@eslint-react/eslint-plugin';

/**
 * Flat ESLint configuration tailored for React and React Native JSX/TSX development using `@eslint-react`.
 */
export const configReact: Linter.Config[] = defineConfig([
  {
    files: ['**/*.{tsx,jsx}'],
    extends: [eslintReact.configs['recommended-typescript']],
    languageOptions: {
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.es2022 },
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Filename case OFF for React components (PascalCase is common)
      'unicorn/filename-case': 'off',
      // JSDoc OFF for React components
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-description': 'off',
      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/check-tag-names': 'off',
    },
  },
]);

export default configReact;
