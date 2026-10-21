/**
 * @file lint.test.ts
 * Tests verifying conventional commit validation rules using `@commitlint/lint`.
 */

import { describe, expect, test } from 'vitest';

import lint from '@commitlint/lint';

import config from '../src/index.js';

describe('commitlint validation rules', () => {
  test('should validate valid conventional commits', async () => {
    const result = await lint(
      'feat(eslint-plugin-spellbookx): add new awesome feature',
      config.rules
    );
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should validate valid workspace scope commits', async () => {
    const result = await lint(
      'chore(workspace): update root configs',
      config.rules
    );
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should validate valid release scope commits', async () => {
    const result = await lint('feat(release): publish v1.0.0', config.rules);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should fail when type is invalid', async () => {
    const result = await lint('unknown(workspace): some change', config.rules);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.name === 'type-enum')).toBe(true);
  });

  test('should fail when scope is not in scope-enum', async () => {
    const result = await lint(
      'feat(nonexistent-scope): some change',
      config.rules
    );
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.name === 'scope-enum')).toBe(true);
  });

  test('should fail when subject has a trailing period', async () => {
    const result = await lint('fix(workspace): fix config typo.', config.rules);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.name === 'subject-full-stop')).toBe(
      true
    );
  });

  test('should fail when subject is empty', async () => {
    const result = await lint('fix(workspace): ', config.rules);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.name === 'subject-empty')).toBe(true);
  });
});
