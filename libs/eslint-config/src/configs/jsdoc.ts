import jsdoc from 'eslint-plugin-jsdoc';
import tseslint, { type ConfigArray } from 'typescript-eslint';

/**
 * Eslint configuration for JSDoc.
 * This configuration is split into two parts:
 * 1. For JavaScript files (JS, CJS, MJS, JSX)
 * 2. For TypeScript files (TS, MTS, CTS, TSX)
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

export default jsdocConfig;
