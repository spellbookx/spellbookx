/**
 * @file prompt.ts
 * Commitizen prompt questions and settings for interactive commits with cz-git.
 */

import type { UserConfig } from '@commitlint/types';

import { scopesEnum } from './scopes.js';

/**
 * Commitizen and cz-git interactive prompt configuration.
 */
export const prompt: UserConfig['prompt'] = {
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
      description: 'Write a short, imperative tense description of the change',
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
};
