/**
 * @file index.test.ts
 * Tests verifying the main configuration export and metadata of commitlint-config-spellbookx.
 */

import { describe, expect, test } from 'vitest';

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

describe('commitlint-config-spellbookx entrypoint', () => {
  test('should export valid configuration object', () => {
    expect(defaultExport).toBe(config);
    expect(typeof config).toBe('object');
    expect(Array.isArray(config.extends)).toBe(true);
    expect(config.extends).toContain('@commitlint/config-conventional');
    expect(config.parserPreset).toBe(
      'conventional-changelog-conventionalcommits'
    );
    expect(config.rules).toBe(rules);
    expect(config.prompt).toBe(prompt);
  });

  test('should contain valid package metadata in helpers', () => {
    expect(packageJson.name).toBe('commitlint-config-spellbookx');
    expect(packageJson.version).toBeDefined();
  });

  test('should export conventional commit types and scope constants', () => {
    expect(Array.isArray(COMMIT_TYPES)).toBe(true);
    expect(COMMIT_TYPES).toContain('feat');
    expect(COMMIT_TYPES).toContain('fix');
    expect(SCOPE_WORKSPACE).toBe('workspace');
    expect(SCOPE_RELEASE).toBe('release');
    expect(Array.isArray(scopesArray)).toBe(true);
    expect(typeof scopesEnum).toBe('object');
  });
});
