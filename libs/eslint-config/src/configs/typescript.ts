import js from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint, { type ConfigArray } from 'typescript-eslint';

import { findRealTsconfigPaths } from '../utils/find-real-tsconfig.js';
import { hasPackage } from '../utils/has-package.js';

type ImportResolversSettings = {
  [key: string]: object | undefined;
  typescript?: {
    alwaysTryTypes?: boolean;
    project?: string | string[];
  };
  node?: {
    extensions?: string[];
    moduleDirectory?: string[];
  };
  pnp?: object;
  webpack?: {
    config?: string | string[];
  };
};

const OFF = 0;
const WARN = 1;
const ERROR = 2;

const hasYarnPnp =
  hasPackage('eslint-import-resolver-pnp') &&
  process.env.NODE_LIFECYCLE_SCRIPT?.includes('yarn');

const hasWebpack = hasPackage('webpack');

const tsconfigPaths = findRealTsconfigPaths();

const getImportResolvers = (): ImportResolversSettings => {
  const resolvers: ImportResolversSettings = {};

  if (hasYarnPnp) resolvers.pnp = {};

  resolvers.typescript = {
    alwaysTryTypes: true,
    project: tsconfigPaths,
  };

  if (hasWebpack) {
    const webpackConfigPath = [
      './webpack.config.js',
      './webpack.config.ts',
      './config/webpack.config.js',
      './config/webpack.config.ts',
    ].find((path) => {
      try {
        require.resolve(path, { paths: [process.cwd()] });
        return true;
      } catch {
        return false;
      }
    });

    resolvers.webpack = {
      config: webpackConfigPath || './webpack.config.js',
    };
  }

  // ✅ Node resolver: fallback universale
  resolvers.node = {
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.mjs',
      '.cjs',
      '.json',
      '.node',
    ],
    moduleDirectory: ['node_modules', 'src'],
  };

  return resolvers;
};

const isNx = hasPackage('@nx/eslint-plugin');

/**
 * ESLint configuration for TypeScript projects.
 * This config extends recommended rules and integrates with import resolver settings.
 * @returns {ConfigArray} ESLint configuration array for TypeScript.
 */
const typescriptConfig: ConfigArray = isNx
  ? tseslint.config({
      files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
      extends: [
        js.configs.recommended,
        eslintPluginImport.flatConfigs.recommended,
        eslintPluginImport.flatConfigs.typescript,
      ],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
          project: tsconfigPaths,
          tsconfigRootDir: process.cwd(),
          noWarnOnMultipleProjects: true,
        },
        globals: {
          ...globals.node,
        },
      },
      plugins: {
        'simple-import-sort': simpleImportSort,
      },
      settings: {
        'import/resolver': getImportResolvers(),
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'],
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts'],
        },
      },
      rules: {
        'sort-imports': OFF,
        'simple-import-sort/imports': ERROR,
        'simple-import-sort/exports': ERROR,
        'import/no-unresolved': ERROR,
        'import/no-named-as-default-member': OFF,
        'no-undef': WARN,
        'no-use-before-define': OFF,
        '@typescript-eslint/no-use-before-define': [
          ERROR,
          { functions: true, classes: true, variables: true },
        ],
      },
    })
  : tseslint.config({
      files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        eslintPluginImport.flatConfigs.recommended,
        eslintPluginImport.flatConfigs.typescript,
      ],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
          project: tsconfigPaths,
          tsconfigRootDir: process.cwd(),
          noWarnOnMultipleProjects: true,
        },
        globals: {
          ...globals.node,
        },
      },
      plugins: {
        'simple-import-sort': simpleImportSort,
      },
      settings: {
        'import/resolver': getImportResolvers(),
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'],
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts'],
        },
      },
      rules: {
        'sort-imports': OFF,
        'simple-import-sort/imports': ERROR,
        'simple-import-sort/exports': ERROR,
        'import/no-unresolved': ERROR,
        'import/no-named-as-default-member': OFF,
        'no-undef': WARN,
        'no-use-before-define': OFF,
        '@typescript-eslint/no-use-before-define': [
          ERROR,
          { functions: true, classes: true, variables: true },
        ],
      },
    });

export default typescriptConfig;
