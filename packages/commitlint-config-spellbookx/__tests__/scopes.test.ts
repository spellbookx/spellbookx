import { describe, expect, it } from 'vitest';

import {
  getScopeDescription,
  SCOPE_RELEASE,
  SCOPE_WORKSPACE,
  scopesArray,
  scopesEnum,
} from '../src/index.js';

describe('commitlint-config-spellbookx (scopes)', () => {
  it('defines workspace and release scope constants', () => {
    expect(SCOPE_WORKSPACE).toBe('workspace');
    expect(SCOPE_RELEASE).toBe('release');
  });

  it.each([
    SCOPE_WORKSPACE,
    SCOPE_RELEASE,
    '@spellbookx/recipes',
    'commitlint-config-spellbookx',
    'cspell-config-spellbookx',
    'eslint-plugin-spellbookx',
    'prettier-config-spellbookx',
    'spellbookx',
  ])('includes "%s" in scopesArray and scopesEnum', (scope) => {
    expect(scopesArray).toContain(scope);
    expect(scopesEnum[scope]).toEqual({
      description: getScopeDescription(scope),
    });
  });

  it('returns descriptive text for special and package scopes', () => {
    expect(getScopeDescription(SCOPE_WORKSPACE)).toBe(
      'workspace scope - root files such as config files, root package.json, etc'
    );
    expect(getScopeDescription(SCOPE_RELEASE)).toBe(
      'Special scope for release commits'
    );
    expect(getScopeDescription('my-custom-pkg')).toBe('my-custom-pkg scope');
  });
});
