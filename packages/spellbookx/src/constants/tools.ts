/**
 * @file tools.ts
 * Tool definitions, dependencies, config files, and scripts managed by Spellbookx.
 */

import type { ToolDefinition, ToolId } from '../types/index.js';
import {
  COMMITLINT_CONFIG_TEMPLATE,
  CSPELL_CONFIG_TEMPLATE,
  CSPELL_CUSTOM_WORDS_TEMPLATE,
  ESLINT_CONFIG_TEMPLATE,
  PRETTIER_CONFIG_TEMPLATE,
  PRETTIER_IGNORE_TEMPLATE,
} from './templates.js';

/**
 * Supported tools in order of setup execution.
 */
export const TOOLS: ToolDefinition[] = [
  {
    id: 'cspell',
    title: 'CSpell',
    description: 'Multi-language code and identifier spell-checking',
    defaultChecked: true,
    dependencies: [
      '@cspell/cspell-types',
      'cspell',
      'cspell-config-spellbookx',
    ],
    configFiles: [
      {
        path: 'cspell.config.cjs',
        content: CSPELL_CONFIG_TEMPLATE,
      },
      {
        path: '.config/cspell/custom.txt',
        content: CSPELL_CUSTOM_WORDS_TEMPLATE,
      },
    ],
    scripts: {
      spellcheck: 'cspell --no-progress --no-summary .',
      'spellcheck:all': 'cspell .',
    },
  },
  {
    id: 'commitlint',
    title: 'Commitlint & Commitizen',
    description:
      'Conventional Commits enforcement and interactive cz-git prompt',
    defaultChecked: true,
    dependencies: [
      '@commitlint/cli',
      '@commitlint/config-conventional',
      'commitizen',
      'commitlint-config-spellbookx',
      'cz-git',
    ],
    configFiles: [
      {
        path: 'commitlint.config.mjs',
        content: COMMITLINT_CONFIG_TEMPLATE,
      },
    ],
    scripts: {
      commit: 'cz',
      'commit:lint': 'commitlint --from=HEAD~1',
    },
    extraPackageJson: {
      config: {
        commitizen: {
          path: 'cz-git',
        },
      },
    },
  },
  {
    id: 'eslint',
    title: 'ESLint',
    description: 'Modern Flat Config with recommended presets & import sorting',
    defaultChecked: true,
    dependencies: ['eslint', 'eslint-plugin-spellbookx', '@spellbookx/recipes'],
    configFiles: [
      {
        path: 'eslint.config.mjs',
        content: ESLINT_CONFIG_TEMPLATE,
      },
    ],
    scripts: {
      lint: 'eslint --no-warn-ignored --fix .',
      'lint:check': 'eslint --no-warn-ignored .',
    },
  },
  {
    id: 'prettier',
    title: 'Prettier',
    description: 'Opinionated code formatting + Tailwind CSS class sorting',
    defaultChecked: true,
    dependencies: ['prettier', 'prettier-config-spellbookx'],
    configFiles: [
      {
        path: 'prettier.config.mjs',
        content: PRETTIER_CONFIG_TEMPLATE,
      },
      {
        path: '.prettierignore',
        content: PRETTIER_IGNORE_TEMPLATE,
      },
    ],
    scripts: {
      fmt: 'prettier --ignore-unknown --write .',
      'fmt:check': 'prettier --ignore-unknown --check .',
    },
  },
];

/**
 * Fast lookup map indexed by ToolId.
 */
export const TOOLS_MAP: Record<ToolId, ToolDefinition> = Object.fromEntries(
  TOOLS.map((tool) => [tool.id, tool])
) as Record<ToolId, ToolDefinition>;
