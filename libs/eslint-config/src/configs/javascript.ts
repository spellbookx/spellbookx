import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import js from '@eslint/js';
import tseslint, { type ConfigArray } from 'typescript-eslint';

/**
 * ESLint configuration for modern JavaScript files (`.js`, `.cjs`, `.mjs`).
 *
 * Features:
 * - Enables ECMAScript 2024 syntax
 * - Applies recommended rules from `@eslint/js` and `eslint-plugin-import`
 * - Integrates `simple-import-sort` for consistent import ordering
 * - Differentiates between CommonJS (`.cjs`) and ESM (`.mjs`) via `sourceType` overrides
 *
 * Notes:
 * - Disables `import/order` to prevent conflict with `simple-import-sort`
 * - Requires Node.js ≥ 20 or equivalent runtime for full syntax support
 */
const javascriptConfig: ConfigArray = tseslint.config(
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    extends: [js.configs.recommended, importPlugin.flatConfigs.recommended],
    plugins: {
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      ecmaVersion: 'latest',
    },
    rules: {
      // Core rules from eslint-plugin-import
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/no-duplicates': 'warn',
      'import/order': 'off',

      // Replacement rules from eslint-plugin-simple-import-sort
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
  },

  /**
   * Override for CommonJS files (`.cjs`).
   * Adjusts the `sourceType` to correctly parse CommonJS modules.
   */
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },

  /**
   * Override for ECMAScript Module files (`.mjs`).
   * Ensures `sourceType` is set to `module` for proper ESM parsing.
   */
  {
    files: ['**/*.mjs'],
    languageOptions: {
      sourceType: 'module',
    },
  }
);

export { javascriptConfig };
export default javascriptConfig;
