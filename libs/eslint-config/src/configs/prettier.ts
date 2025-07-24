import eslintConfigPrettierFlat from 'eslint-config-prettier/flat';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import tseslint, { type ConfigArray } from 'typescript-eslint';

/**
 * ESLint configuration for enforcing Prettier formatting across multiple file types.
 *
 * Features:
 * - Applies Prettier formatting rules as ESLint errors via `eslint-plugin-prettier`
 * - Supports Prettier formatting for:
 * - JavaScript and JSX (`.js`, `.cjs`, `.mjs`, `.jsx`)
 * - TypeScript and TSX (`.ts`, `.mts`, `.cts`, `.tsx`)
 * - Vue SFCs (`.vue`)
 * - Web formats (`.html`, `.htm`, `.css`, `.scss`, `.less`)
 * - Templating (`.hbs`)
 * - Structured config files (`.json`, `.jsonc`, `.json5`, `.yaml`, `.yml`)
 * - Documentation and content (`.md`, `.mdx`, `.markdown`)
 * - Schema/query definitions (`.graphql`, `.gql`)
 * - Prevents conflict with other stylistic ESLint rules using `eslint-config-prettier/flat`
 *
 * Requirements:
 * - `prettier`, `eslint-plugin-prettier`, and `eslint-config-prettier` must be installed
 * - A valid `.prettierrc` or equivalent config file should exist in the project root
 * @example
 * ```js
 * import sbx from '@spellbookx/eslint-config';
 * export default [
 *   ...,
 *   ...sbx.configs.prettier
 * ];
 * ```
 * @example
 * ```ts
 * import tseslint from 'typescript-eslint';
 * import sbx from '@spellbookx/eslint-config'
 * export default tseslint.config(
 *   ...,
 *   sbx.configs.prettier
 * )
 */
const prettierConfig: ConfigArray = tseslint.config({
  files: [
    // JavaScript
    '**/*.js',
    '**/*.cjs',
    '**/*.mjs',
    '**/*.jsx',

    // TypeScript
    '**/*.ts',
    '**/*.mts',
    '**/*.cts',
    '**/*.tsx',

    // Vue
    '**/*.vue',

    // HTML & CSS
    '**/*.html',
    '**/*.htm',
    '**/*.css',
    '**/*.scss',
    '**/*.less',

    // Handlebars
    '**/*.hbs',

    // JSON
    '**/*.json',
    '**/*.jsonc',
    '**/*.json5',

    // GraphQL
    '**/*.graphql',
    '**/*.gql',

    // Markdown
    '**/*.md',
    '**/*.markdown',
    '**/*.mdx',

    // YAML
    '**/*.yaml',
    '**/*.yml',
  ],
  plugins: {
    prettier: eslintPluginPrettier,
  },
  extends: [eslintConfigPrettierFlat],
  rules: {
    'prettier/prettier': 'error',
  },
});

export { prettierConfig as default, prettierConfig };
