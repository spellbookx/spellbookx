import tseslint, { type ConfigArray } from 'typescript-eslint';
import js from '@eslint/js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import importPlugin from 'eslint-plugin-import';

/**
 * Flat ESLint configuration for TypeScript projects.
 *
 * Features:
 * - Supports `.ts`, `.mts`, and `.cts` extensions
 * - Applies recommended rules from `@eslint/js`, `typescript-eslint`, and `eslint-plugin-import`
 * - Enables modern ECMAScript syntax via `ecmaVersion: 2024`
 * - Enforces strict import ordering and deduplication
 * - Enables `project: true` to support rules requiring type-checking
 *
 * Requirements:
 * - A valid `tsconfig.json` must exist in the project root or ESLint context
 * - Type-aware rules only work with `parserOptions.project` correctly set
 */
const typescriptConfig: ConfigArray = tseslint.config({
  files: ['**/*.ts', '**/*.mts', '**/*.cts'],

  extends: [
    // Base JavaScript rules
    js.configs.recommended,

    // TypeScript-specific rules
    tseslint.configs.recommended,

    // Import plugin core and TS-specific rules
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
  ],

  plugins: {
    // Sorting plugin for consistent import ordering
    'simple-import-sort': simpleImportSort,
    import: importPlugin,
  },

  languageOptions: {
    ecmaVersion: 'latest',

    parserOptions: {
      /**
       * Enables rules that require type-checking.
       * This assumes ESLint is being run with a valid `tsconfig.json`.
       */
      project: true,
    },
  },

  rules: {
    // Import sorting and structure
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // Import hygiene
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
});

export { typescriptConfig };
export default typescriptConfig;
