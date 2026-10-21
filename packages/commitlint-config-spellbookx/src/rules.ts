/**
 * @file rules.ts
 * Commitlint rule definitions for enforcing conventional commits.
 */

import type { QualifiedRules } from '@commitlint/types';

import { COMMIT_TYPES } from './constants/commit-types.js';
import { scopesArray } from './scopes.js';

/**
 * Standard commitlint rules configuration.
 */
export const rules: QualifiedRules = {
  'type-enum': [2, 'always', [...COMMIT_TYPES]],
  'scope-enum': [2, 'always', scopesArray],
  'subject-empty': [2, 'never'],
  'subject-full-stop': [2, 'never', '.'],
  'header-max-length': [2, 'always', 72],
  'body-max-line-length': [2, 'always', 100],
  'footer-max-line-length': [2, 'always', 100],
};
