import { describe, expect, it } from 'vitest';

import lint from '@commitlint/lint';

import config from '../src/index.js';

describe('commitlint-config-spellbookx (lint rules)', () => {
  it.each([
    'feat(eslint-plugin-spellbookx): add new flat config preset',
    'fix(prettier-config-spellbookx): resolve plugin sort order',
    'chore(workspace): update root dependencies',
    'chore(release): bump to v1.1.1',
    'docs(@spellbookx/recipes): document ignore globs',
    'test(spellbookx): rewrite test suite with vitest',
  ])('accepts valid conventional commit: "%s"', async (message) => {
    const result = await lint(message, config.rules);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it.each([
    ['unknown(workspace): invalid commit type', 'type-enum'],
    ['feat(nonexistent-scope): unknown package scope', 'scope-enum'],
    ['fix(workspace): trailing period in subject.', 'subject-full-stop'],
    ['fix(workspace): ', 'subject-empty'],
    [`feat(workspace): ${'a'.repeat(80)}`, 'header-max-length'],
  ])(
    'rejects invalid commit "%s" with rule "%s"',
    async (message, expectedRule) => {
      const result = await lint(message, config.rules);

      expect(result.valid).toBe(false);
      expect(result.errors.some((err) => err.name === expectedRule)).toBe(true);
    }
  );
});
