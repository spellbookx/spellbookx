import { describe, expect, test } from 'vitest';

import {
  defineConfig,
  defineSbxConfig,
  mergeCSpellConfigs,
  normalizeWords,
  packageJson,
} from '../src/lib/index.js';

describe('cspell-config-spellbookx - lib', () => {
  describe('packageJson', () => {
    test('should contain valid package metadata', () => {
      expect(packageJson.name).toBe('cspell-config-spellbookx');
      expect(packageJson.version).toBeDefined();
    });
  });

  describe('normalizeWords', () => {
    test('should normalize, deduplicate, and sort words alphabetically', () => {
      const input = [
        'Zebra',
        ' apple ',
        'banana',
        'APPLE',
        'Banana',
        '',
        null,
        undefined,
      ];
      const result = normalizeWords(input);

      expect(result).toEqual(['apple', 'banana', 'zebra']);
    });

    test('should handle empty input array or defaults', () => {
      expect(normalizeWords([])).toEqual([]);
      expect(normalizeWords()).toEqual([]);
    });
  });

  describe('mergeCSpellConfigs', () => {
    test('should return empty object when given empty or falsy configs', () => {
      expect(mergeCSpellConfigs()).toEqual({});
      expect(mergeCSpellConfigs(undefined, null, false)).toEqual({});
    });

    test('should deduplicate and normalize words across configs', () => {
      const merged = mergeCSpellConfigs(
        { words: ['foo', 'Bar'] },
        { words: ['BAR', 'baz', 'FOO'] }
      );

      expect(merged.words).toEqual(['bar', 'baz', 'foo']);
    });

    test('should deduplicate ignorePaths and dictionaries across configs', () => {
      const merged = mergeCSpellConfigs(
        {
          ignorePaths: ['**/dist/**', '**/node_modules/**'],
          dictionaries: ['typescript', 'node'],
        },
        {
          ignorePaths: ['**/node_modules/**', '**/custom/**'],
          dictionaries: ['node', 'python'],
        }
      );

      expect(merged.ignorePaths).toEqual([
        '**/dist/**',
        '**/node_modules/**',
        '**/custom/**',
      ]);
      expect(merged.dictionaries).toEqual(['typescript', 'node', 'python']);
    });

    test('should support nested arrays of configs', () => {
      const merged = mergeCSpellConfigs([
        { words: ['alpha'] },
        [{ words: ['beta'] }, { words: ['gamma'] }],
      ]);

      expect(merged.words).toEqual(['alpha', 'beta', 'gamma']);
    });
  });

  describe('defineSbxConfig / defineConfig', () => {
    test('should return default spellbookx configuration when called without overrides', () => {
      const config = defineSbxConfig();

      expect(config.version).toBe('0.2');
      expect(config.name).toBe('cspell-config-spellbookx');
      expect(config.words?.length).toBeGreaterThan(0);
      expect(config.ignorePaths?.length).toBeGreaterThan(0);
    });

    test('should extend base configuration with additional words and ignores', () => {
      const config = defineSbxConfig({
        words: ['customword123'],
        ignorePaths: ['**/my-secret-dir/**'],
      });

      expect(config.words).toContain('customword123');
      expect(config.words).toContain('spellbookx');
      expect(config.ignorePaths).toContain('**/my-secret-dir/**');
      expect(config.ignorePaths).toContain('**/node_modules/**');
    });

    test('should allow scalar property overrides', () => {
      const config = defineConfig({
        language: 'en',
        allowCompoundWords: false,
      });

      expect(config.language).toBe('en');
      expect(config.allowCompoundWords).toBe(false);
      expect(config.words).toContain('spellbookx');
    });
  });
});
