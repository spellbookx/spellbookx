/**
 * @file index.ts
 * Main entry point for commitlint-config-spellbookx.
 * Exports conventional commit configuration, rules, prompt settings, and scope definitions.
 */

import type { UserConfig } from '@commitlint/types';

import { prompt } from './prompt.js';
import { rules } from './rules.js';

export { COMMIT_TYPES, type CommitType } from './constants/commit-types.js';
export * from './lib/index.js';
export { prompt } from './prompt.js';
export { rules } from './rules.js';
export {
  SCOPE_RELEASE,
  SCOPE_WORKSPACE,
  scopesArray,
  scopesEnum,
} from './scopes.js';

/**
 * Shareable Commitlint configuration preset enforcing conventional commits.
 */
export const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules,
  prompt,
};

export default config;
