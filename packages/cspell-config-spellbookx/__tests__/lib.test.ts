import { describe, expect, it } from 'vitest';

import {
  defineConfig,
  defineSbxConfig,
  mergeCSpellConfigs,
  normalizeWords,
  packageJson,
} from '../src/lib/index.js';

describe('cspell-config-spellbookx (lib utilities)', () => {
  describe('packageJson', () => {
    it('exposes package name and version', () => {
      expect(packageJson.name).toBe('cspell-config-spellbookx');
      expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+/);
    });
  });

  describe('normalizeWords', () => {
    it('trims, lowercases, deduplicates, and sorts words alphabetically', () => {
      const input = [
        'Zebra',
        ' apple ',
        'banana',
        'APPLE',
        'Banana',
        '',
        ' '.repeat(3),
        null,
        undefined,
      ];

      expect(normalizeWords(input)).toEqual(['apple', 'banana', 'zebra']);
    });

    it('returns an empty array when called with no arguments or empty list', () => {
      expect(normalizeWords()).toEqual([]);
      expect(normalizeWords([])).toEqual([]);
    });
  });

  describe('mergeCSpellConfigs', () => {
    it('returns an empty object when passed no configs or only falsy values', () => {
      expect(mergeCSpellConfigs()).toEqual({});
      expect(mergeCSpellConfigs(undefined, null, false)).toEqual({});
    });

    it('deduplicates and normalizes words across multiple configs', () => {
      const merged = mergeCSpellConfigs(
        { words: ['foo', 'Bar'] },
        { words: ['BAR', 'baz', 'FOO'] }
      );

      expect(merged.words).toEqual(['bar', 'baz', 'foo']);
    });

    it('deduplicates ignorePaths and dictionaries while preserving order', () => {
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

    it('flattens arbitrarily nested config arrays', () => {
      const merged = mergeCSpellConfigs([
        { words: ['alpha'] },
        [{ words: ['beta'] }, { words: ['gamma'] }],
      ]);

      expect(merged.words).toEqual(['alpha', 'beta', 'gamma']);
    });
  });

  describe('defineSbxConfig & defineConfig', () => {
    it('returns the base spellbookx CSpell config when called without arguments', () => {
      const result = defineSbxConfig();

      expect(result.version).toBe('0.2');
      expect(result.name).toBe('cspell-config-spellbookx');
      expect(result.words?.length).toBeGreaterThan(0);
      expect(result.ignorePaths?.length).toBeGreaterThan(0);
    });

    it('merges custom words, ignorePaths, and dictionaries with base defaults', () => {
      const result = defineSbxConfig({
        words: ['customtoken'],
        ignorePaths: ['**/generated/**'],
        dictionaries: ['custom-dict'],
      });

      expect(result.words).toContain('customtoken');
      expect(result.words).toContain('spellbookx');
      expect(result.ignorePaths).toContain('**/generated/**');
      expect(result.ignorePaths).toContain('**/node_modules/**');
      expect(result.dictionaries).toContain('custom-dict');
      expect(result.dictionaries).toContain('typescript');
    });

    it('allows overriding scalar CSpell properties via defineConfig alias', () => {
      const result = defineConfig({
        language: 'en',
        allowCompoundWords: false,
      });

      expect(result.language).toBe('en');
      expect(result.allowCompoundWords).toBe(false);
      expect(result.words).toContain('spellbookx');
    });
  });
});
