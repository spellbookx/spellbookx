import js from '@eslint/js';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
// @ts-expect-error: No types available for this plugin
import sortImportRequires from 'eslint-plugin-sort-imports-requires';
import tseslint, { type ConfigArray } from 'typescript-eslint';

/**
 * ESLint configuration for modern JavaScript projects.
 *
 * Targets `.js`, `.cjs`, and `.mjs` files, supporting both CommonJS and ESM module formats.
 *
 * Features:
 * - Extends recommended rules from `@eslint/js`.
 * - Enforces strict import and require ordering with:
 * - `simple-import-sort` for static ES imports/exports.
 * - `sort-imports-requires` for dynamic CommonJS require calls.
 *
 * This combination ensures consistent import organization across mixed module systems.
 * @example
 * ```ts
 * import tseslint from 'typescript-eslint';
 * import sbx from '@spellbookx/eslint-config';
 * export default tseslint.config(
 *   ...sbx.configs.javascript
 * );
 * ```
 * @example
 * ```js
 * import sbx from '@spellbookx/eslint-config';
 * export default [sbx.configs.javascript];
 * ```
 */
const javascriptConfig: ConfigArray = tseslint.config(
  {
    files: ['**/*.js', '**/*.mjs'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
    rules: {
      'sort-imports': 'off',
      'sort-imports-requires/sort-imports': 'off',
      'sort-imports-requires/sort-requires': 'off',

      // ✅ Pure ESM import sorting
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  {
    files: ['**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
    },
    plugins: {
      'sort-imports-requires': sortImportRequires,
    },
    rules: {
      'sort-imports': 'off',
      'simple-import-sort/imports': 'off',
      'simple-import-sort/exports': 'off',

      // ✅ Only apply to CommonJS
      'sort-imports-requires/sort-requires': ['error', { unsafeAutofix: true }],
      'sort-imports-requires/sort-imports': ['error', { unsafeAutofix: true }],
    },
  },
);

export { javascriptConfig as default, javascriptConfig };
