import fs from 'node:fs';
import path from 'node:path';

import js from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
// @ts-expect-error: No types available for this plugin
import sortImportRequires from 'eslint-plugin-sort-imports-requires';
import tseslint, { type ConfigArray } from 'typescript-eslint';

import { hasPackage } from '../utils/has-package.js';

type ImportResolversSettings = {
  [key: string]: object | undefined;
  node?: {
    extensions?: string[];
    moduleDirectory?: string[];
  };
  pnp?: object;
  webpack?: {
    config?: string | string[];
  };
};

const hasYarnPnp =
  hasPackage('eslint-import-resolver-pnp') &&
  process.env.NODE_LIFECYCLE_SCRIPT?.includes('yarn');
const hasWebpack = hasPackage('webpack');

/**
 * Returns import resolver settings for JavaScript environments.
 * Includes Yarn PnP, Webpack, and Node.js resolution.
 * @returns Import resolver settings object for ESLint.
 */
const getImportResolvers = (): ImportResolversSettings => {
  const resolvers: ImportResolversSettings = {};

  if (hasYarnPnp) {
    resolvers.pnp = {};
  }

  if (hasWebpack) {
    const webpackConfigPaths = [
      './webpack.config.js',
      './webpack.config.ts',
      './config/webpack.config.js',
      './config/webpack.config.ts',
      // Add more paths if your webpack config might be elsewhere, e.g., './src/webpack.config.js'
    ];

    let foundWebpackConfigPath: string | undefined;
    for (const configPath of webpackConfigPaths) {
      // Construct an absolute path relative to the current working directory
      const absoluteConfigPath = path.join(process.cwd(), configPath);

      // Use fs.existsSync to check for file existence in an ESM-compatible way
      if (fs.existsSync(absoluteConfigPath)) {
        foundWebpackConfigPath = configPath; // Store the original relative path for the config setting
        break; // Stop on the first found config
      }
    }

    // Only add the webpack resolver if a config file was actually found
    if (foundWebpackConfigPath) {
      resolvers.webpack = {
        config: foundWebpackConfigPath,
      };
    }
  }

  resolvers.node = {
    extensions: ['.js', '.jsx', '.mjs', '.cjs', '.json', '.node'],
  };

  return resolvers;
};

const OFF = 0;
const WARN = 1;
const ERROR = 2;

/**
 * ESLint configuration for JavaScript projects.
 * Targets `.js`, `.mjs`, and `.cjs` files.
 * - Extends recommended rules from `@eslint/js`.
 * - Enforces import and require sorting.
 * - Handles both ESM and CommonJS modules.
 */
const javascriptConfig: ConfigArray = tseslint.config(
  {
    files: ['**/*.js', '**/*.mjs'],
    extends: [
      js.configs.recommended,
      eslintPluginImport.flatConfigs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
    settings: {
      'import/resolver': getImportResolvers(),
      'import/extensions': ['.js', '.jsx', '.mjs', '.cjs'],
    },
    rules: {
      'sort-imports': OFF,
      'sort-imports-requires/sort-imports': OFF,
      'sort-imports-requires/sort-requires': OFF,
      'simple-import-sort/imports': ERROR,
      'simple-import-sort/exports': ERROR,
      'import/no-unresolved': ERROR,
      'no-undef': WARN,
      'no-use-before-define': [
        ERROR,
        {
          functions: true,
          classes: true,
          variables: true,
        },
      ],
    },
  },
  {
    files: ['**/*.cjs'],
    extends: [
      js.configs.recommended,
      eslintPluginImport.flatConfigs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
    },
    plugins: {
      'sort-imports-requires': sortImportRequires,
    },
    settings: {
      'import/resolver': getImportResolvers(),
      'import/extensions': ['.js', '.jsx', '.mjs', '.cjs'],
    },
    rules: {
      'sort-imports': OFF,
      'simple-import-sort/imports': OFF,
      'simple-import-sort/exports': OFF,
      'sort-imports-requires/sort-requires': [ERROR, { unsafeAutofix: true }],
      'sort-imports-requires/sort-imports': [ERROR, { unsafeAutofix: true }],
      'import/no-unresolved': [
        ERROR,
        {
          ignore: ['^eslint/config'],
        },
      ],
      'no-undef': WARN,
      'no-use-before-define': [
        ERROR,
        {
          functions: true,
          classes: true,
          variables: true,
        },
      ],
    },
  },
  {
    files: ['**/cspell.config.mjs'],
    rules: {
      'import/named': OFF,
    },
  },
  {
    files: ['eslint.config.{js,cjs,mjs}', '**/eslint.config.{js,cjs,mjs}'],
    rules: {
      'import/no-named-as-default': OFF,
      'import/no-unresolved': [
        ERROR,
        {
          ignore: ['^eslint/config'],
        },
      ],
    },
  },
);

export default javascriptConfig;
