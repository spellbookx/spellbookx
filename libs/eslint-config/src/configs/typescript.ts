import js from '@eslint/js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint, { type ConfigArray } from 'typescript-eslint';

/**
 * ESLint configuration tailored for TypeScript projects with strict import sorting.
 *
 * Key Features:
 * - Targets `.ts`, `.mts`, and `.cts` files exclusively.
 * - Extends robust base JavaScript recommended rules alongside TypeScript-specific best practices.
 * - Enforces consistent and deterministic import/export order via `eslint-plugin-simple-import-sort`.
 * - Enables type-aware linting leveraging `parserOptions.project` with glob patterns to discover `tsconfig.json` files in monorepo-relevant directories.
 * - Configured for modern ECMAScript syntax compliance (`ecmaVersion: 'latest'`).
 *
 * Requirements:
 * - Valid `tsconfig.json` files must exist at the specified paths to activate type-aware linting rules.
 *
 * Usage Example (TypeScript):
 * ```ts
 * import tseslint from 'typescript-eslint';
 * import sbx from '@spellbookx/eslint-config';
 *
 * export default tseslint.config(
 *   ...sbx.configs.typescript
 * );
 * ```
 *
 * Usage Example (JavaScript):
 * ```js
 * import sbx from '@spellbookx/eslint-config';
 *
 * export default [sbx.configs.typescript];
 * ```
 */
const typescriptConfig: ConfigArray = tseslint.config({
  files: ['**/*.ts', '**/*.mts', '**/*.cts'],

  extends: [
    js.configs.recommended, // Base JavaScript recommended rules
    tseslint.configs.recommended, // TypeScript-specific best practices
  ],

  plugins: {
    'simple-import-sort': simpleImportSort, // Enforce import/export ordering
  },

  languageOptions: {
    ecmaVersion: 'latest',
    parser: tseslint.parser,
    parserOptions: {
      project: [
        './tsconfig.*?.json',
        './libs/**/tsconfig.*?.json',
        './apps/**/tsconfig.*?.json',
        './tools/**/tsconfig.*?.json',
      ],
      tsconfigRootDir: process.cwd(),
    },
  },

  rules: {
    // Off native to avoid conflicts with simple-import-sort
    'sort-imports': 'off',
    'sort-imports-requires/sort-imports': 'off',
    'sort-imports-requires/sort-requires': 'off',

    // Enforce sorted imports and exports
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
});

export { typescriptConfig as default, typescriptConfig };
