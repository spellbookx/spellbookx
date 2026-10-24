import { describe, expect, it } from 'vitest';

import defaultExport, {
  COMMIT_TYPES,
  config,
  prompt,
  rules,
  SCOPE_RELEASE,
  SCOPE_WORKSPACE,
  scopesArray,
  scopesEnum,
} from '../src/index.js';
import { packageJson } from '../src/lib/package-json.js';

describe('commitlint-config-spellbookx (entrypoint)', () => {
  it('exports a valid commitlint UserConfig object as default and named export', () => {
    expect(defaultExport).toBe(config);
    expect(config).toBeTypeOf('object');
    expect(config.extends).toEqual(['@commitlint/config-conventional']);
    expect(config.parserPreset).toBe(
      'conventional-changelog-conventionalcommits'
    );
    expect(config.rules).toBe(rules);
    expect(config.prompt).toBe(prompt);
  });

  it('exposes accurate package metadata', () => {
    expect(packageJson.name).toBe('commitlint-config-spellbookx');
    expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+/);
  });

  it('exports all 11 standard conventional commit types', () => {
    expect(COMMIT_TYPES).toEqual([
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
    ]);
  });

  it('configures cz-git interactive prompt questions and settings', () => {
    expect(prompt?.settings?.enableMultipleScopes).toBe(true);
    expect(prompt?.settings?.scopeEnumSeparator).toBe(',');
    expect(prompt?.questions?.scope?.enum).toBe(scopesEnum);

    for (const type of COMMIT_TYPES) {
      expect(prompt?.questions?.type?.enum?.[type]).toBeDefined();
    }
  });

  it('exports special scope constants and dynamically discovered scopes', () => {
    expect(SCOPE_WORKSPACE).toBe('workspace');
    expect(SCOPE_RELEASE).toBe('release');
    expect(Array.isArray(scopesArray)).toBe(true);
    expect(scopesEnum).toBeTypeOf('object');
  });
});
