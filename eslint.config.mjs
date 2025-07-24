import nx from '@nx/eslint-plugin';
import sbx from '@spellbookx/eslint-config';
import { defineConfig } from 'eslint/config';

console.log(Object.keys(sbx.configs));

export default defineConfig([
  // Ignore patterns (custom + .gitignore)
  ...sbx.configs.ignores,
  ...sbx.configs.gitignore,

  // Nx base rules
  {
    extends: [nx.configs['flat/base']],
    rules: {
      'sort-imports': 'off',
    },
  },

  // JavaScript files
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    extends: [nx.configs['flat/javascript'], sbx.configs.javascript],
    rules: {
      'sort-imports': 'off',
    },
  },

  // TypeScript files
  {
    files: ['**/*.ts', '**/*.cts', '**/*.mts'],
    extends: [nx.configs['flat/typescript'], sbx.configs.typescript],
    rules: {
      'sort-imports': 'off',
    },
  },

  // JSDoc/TSDoc linting
  {
    files: [
      '**/*.ts',
      '**/*.cts',
      '**/*.mts',
      '**/*.tsx',
      '**/*.js',
      '**/*.cjs',
      '**/*.mjs',
      '**/*.jsx',
    ],
    extends: [sbx.configs.jsdoc],
  },

  // Nx-specific module boundaries
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

  // JSON, JSON5 and JSONC (via SBX configs)
  ...sbx.configs.json,
  ...sbx.configs.json5,
  ...sbx.configs.jsonc,

  // YAML
  ...sbx.configs.yaml,

  // Markdown with GitHub-style fenced blocks
  ...sbx.configs.markdownGithubYaml,

  // Prettier integration (conflict-free with core rules)
  ...sbx.configs.prettier,
]);
