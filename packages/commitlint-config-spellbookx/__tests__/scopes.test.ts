/**
 * @file scopes.test.ts
 * Tests for scope identifiers, scope descriptions, and scopes enumeration.
 */

import { describe, expect, test } from 'vitest';

import {
  getScopeDescription,
  SCOPE_RELEASE,
  SCOPE_WORKSPACE,
  scopesArray,
  scopesEnum,
} from '../src/index.js';

describe('commitlint scopes', () => {
  test('constants should be properly defined', () => {
    expect(SCOPE_WORKSPACE).toBe('workspace');
    expect(SCOPE_RELEASE).toBe('release');
  });

  test('scopesArray should contain workspace, release, and monorepo packages', () => {
    expect(Array.isArray(scopesArray)).toBe(true);
    expect(scopesArray).toContain(SCOPE_WORKSPACE);
    expect(scopesArray).toContain(SCOPE_RELEASE);
    expect(scopesArray).toContain('commitlint-config-spellbookx');
    expect(scopesArray).toContain('cspell-config-spellbookx');
    expect(scopesArray).toContain('eslint-plugin-spellbookx');
    expect(scopesArray).toContain('prettier-config-spellbookx');
    expect(scopesArray).toContain('@spellbookx/recipes');
  });

  test('getScopeDescription should return user-friendly descriptions', () => {
    expect(getScopeDescription(SCOPE_WORKSPACE)).toBe(
      'workspace scope - root files such as config files, root package.json, etc'
    );
    expect(getScopeDescription(SCOPE_RELEASE)).toBe(
      'Special scope for release commits'
    );
    expect(getScopeDescription('custom-pkg')).toBe('custom-pkg scope');
  });

  test('scopesEnum should populate descriptions for all scopes', () => {
    expect(scopesEnum[SCOPE_WORKSPACE]?.description).toBe(
      getScopeDescription(SCOPE_WORKSPACE)
    );
    expect(scopesEnum[SCOPE_RELEASE]?.description).toBe(
      getScopeDescription(SCOPE_RELEASE)
    );
    for (const scope of scopesArray) {
      expect(scopesEnum[scope]).toBeDefined();
      expect(scopesEnum[scope]?.description).toBe(getScopeDescription(scope));
    }
  });
});
