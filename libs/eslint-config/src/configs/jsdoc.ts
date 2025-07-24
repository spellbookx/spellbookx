import jsdoc from 'eslint-plugin-jsdoc';
import tseslint, { type ConfigArray } from 'typescript-eslint';

/**
 * ESLint configuration for enforcing JSDoc standards.
 *
 * Applies different recommended jsdoc plugin configs based on file type:
 * - For JavaScript files (`.js`, `.cjs`, `.mjs`, `.jsx`), uses the
 * `recommended-typescript-flavor-error` config to support TypeScript-flavored JSDoc syntax with error-level reporting.
 * - For TypeScript files (`.ts`, `.mts`, `.cts`, `.tsx`), uses the
 * `recommended-typescript-error` config for strict type-aware JSDoc linting with errors.
 *
 * This setup ensures strict, consistent JSDoc validation aligned with the syntax style and type system of each file type.
 * @example
 * ```ts
 * import sbx form '@spellbookx/eslint-config'
 * export default [sbx.configs.jsdoc]
 * ```
 * @example
 * ```ts
 * import tseslint from 'typescript-eslint';
 * import sbx form '@spellbookx/eslint-config';
 * export default tseslint.config(
 *   sbx.configs.jsdoc
 * )
 */
const jsdocConfig: ConfigArray = tseslint.config(
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx'],
    extends: [jsdoc.configs['flat/recommended-typescript-flavor-error']],
  },
  {
    files: ['**/*.ts', '**/*.mts', '**/*.cts', '**/*.tsx'],
    extends: [jsdoc.configs['flat/recommended-typescript-error']],
  },
);

export { jsdocConfig as default, jsdocConfig };
