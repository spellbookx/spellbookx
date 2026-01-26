import type { UserConfig } from '@commitlint/types';

import { getScopes } from './helpers.js';

const SCOPE_WORKSPACE = 'workspace';
const SCOPE_RELEASE = 'release';

const scopesArray = [SCOPE_WORKSPACE, SCOPE_RELEASE, ...getScopes()];

const scopesEnum: Record<string, { description: string }> = {};

// Scopes Enum options
for (const scope of scopesArray) {
  let description;

  switch (scope) {
    case SCOPE_WORKSPACE: {
      description =
        'workspace scope - root files such as config files, root package.json, etc';
      break;
    }

    case SCOPE_RELEASE: {
      description = 'Special scope for release commits';
      break;
    }

    default: {
      description = `${scope} scope`;
      break;
    }
  }

  Object.defineProperty(scopesEnum, scope, {
    value: { description },
    enumerable: true,
    writable: true,
    configurable: true,
  });
}

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'ci',
        'build',
        'revert',
      ],
    ],
    'scope-enum': [2, 'always', scopesArray],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 100],
  },
  prompt: {
    settings: {
      enableMultipleScopes: true,
      scopeEnumSeparator: ',',
    },
    messages: {
      skip: ':skip',
      max: 'upper %d chars',
      min: '%d chars at least',
      emptyWarning: 'can not be empty',
      upperLimitWarning: 'over limit',
      lowerLimitWarning: 'below limit',
    },
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          feat: {
            description: 'A new feature',
            title: 'Features',
            emoji: '✨',
          },
          fix: { description: 'A bug fix', title: 'Bug Fixes', emoji: '🐛' },
          docs: {
            description: 'Documentation only changes',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description: 'Changes that do not affect meaning of the code',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: 'Code refactoring',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: 'Performance improvements',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: 'Adding or fixing tests',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description: 'Changes that affect build system',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description: 'Changes to CI config',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: { description: 'Other changes', title: 'Chores', emoji: '♻️' },
          revert: {
            description: 'Reverts a previous commit',
            title: 'Reverts',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description:
          'Select the scope(s) of the change (use arrow keys or space to select multiple)',
        enum: scopesEnum,
      },
      subject: {
        description:
          'Write a short, imperative tense description of the change',
      },
      body: { description: 'Provide a longer description of the change' },
      isBreaking: { description: 'Are there any breaking changes?' },
      breakingBody: { description: 'Describe the breaking changes with body' },
      breaking: { description: 'Describe the breaking changes' },
      isIssueAffected: {
        description: 'Does this change affect any open issues?',
      },
      issuesBody: {
        description: 'If issues are closed, enter longer description',
      },
      issues: { description: 'Add issue references (e.g., "fix #123")' },
    },
  },
};

export default config;
