/**
 * @file commit-types.ts
 * Standard Conventional Commit types supported by Spellbookx.
 */

/**
 * List of allowed commit types based on the Conventional Commits specification.
 */
export const COMMIT_TYPES = [
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
] as const;

/**
 * Valid Conventional Commit type string.
 */
export type CommitType = (typeof COMMIT_TYPES)[number];
