import nx from '@nx/eslint-plugin';
import sbx from '@spellbookx/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Ignore files patterns and gitignore integration
  sbx.configs.ignores,
  sbx.configs.gitignore,

  // Nx core base configs for flat ESLint setups
  {
    extends: [nx.configs['flat/base']],
    rules: {
      'sort-imports': 'off', // Disable sort-imports for base config
    },
  },

  // JavaScript files configuration
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    extends: [nx.configs['flat/javascript'], sbx.configs.javascript],
    rules: {
      'sort-imports': 'off', // Disable sort-imports for JS files
    },
  },

  // TypeScript files configuration (removed .mjs here for clarity)
  {
    files: ['**/*.ts', '**/*.cts'],
    extends: [nx.configs['flat/typescript'], sbx.configs.typescript],
    rules: {
      'sort-imports': 'off', // Disable sort-imports for JS files
    },
  },

  // Module boundary enforcement across JS/TS
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },

  // JSDoc linting across all supported file extensions
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    extends: [sbx.configs.jsdoc],
  },

  // Additional config blocks for JSON, YAML, Markdown, and Prettier
  sbx.configs.json,
  sbx.configs.yaml,
  sbx.configs.markdown.githubYaml,
  sbx.configs.prettier,
]);
