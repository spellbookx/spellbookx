import eslintConfigPrettierFlat from 'eslint-config-prettier/flat';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import tseslint, { type ConfigArray } from 'typescript-eslint';

/**
 * ESLint configuration for Prettier.
 * This configuration applies to various file types including JavaScript, TypeScript, Vue, HTML, CSS, JSON, GraphQL, Markdown, and YAML.
 * @returns {ConfigArray} ESLint configuration for Prettier.
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

export default prettierConfig;
