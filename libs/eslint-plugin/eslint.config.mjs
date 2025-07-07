import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import nodePlugin from 'eslint-plugin-n';
import eslintPlugin from 'eslint-plugin-eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: [
            '{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}',
            '{projectRoot}/esbuild.config.{js,ts,mjs,mts}',
          ],
        },
      ],
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
  {
    files: ['src/index.ts'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    plugins: {
      n: nodePlugin,
      'eslint-plugin': eslintPlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...nodePlugin.configs['flat/recommended-script'].rules,
      ...eslintPlugin.configs['flat/recommended'].rules,
      'n/no-unpublished-import': 'off',
      'n/exports-style': ['error', 'module.exports'],
      'eslint-plugin/require-meta-docs-description': 'error',
    },
  },
];
