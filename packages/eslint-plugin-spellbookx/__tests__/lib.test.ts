import { describe, expect, it } from 'vitest';

import { defineImports, packageJson } from '../src/lib/index.js';

describe('eslint-plugin-spellbookx (lib utilities)', () => {
  it('exposes valid package metadata in packageJson', () => {
    expect(packageJson.name).toBe('eslint-plugin-spellbookx');
    expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+/);
  });

  describe('defineImports', () => {
    it('transforms package names and special tokens into simple-import-sort regex groups', () => {
      const groups = defineImports(
        ['dotenv', '@dotenvx/dotenvx'],
        '<THIRD_PARTY_MODULES>',
        'node:',
        '../'
      );

      expect(groups).toEqual([
        ['^dotenv', '^@dotenvx/dotenvx'],
        ['^[a-z]', String.raw`^@\w`],
        ['^node:'],
        [String.raw`^\.?\.\/`],
      ]);
    });

    it('accepts a single array of groups as its first argument', () => {
      const groups = defineImports([
        ['express', 'fastify'],
        ['@org/', '^@repo/'],
      ]);

      expect(groups).toEqual([
        ['^express', '^fastify'],
        ['^@org/', '^@repo/'],
      ]);
    });

    it('filters out null, undefined, and empty string groups', () => {
      const groups = defineImports(
        null,
        undefined,
        '',
        [],
        ['react', ''],
        ['']
      );

      expect(groups).toEqual([['^react']]);
    });

    it('deduplicates equivalent patterns within the same group', () => {
      const groups = defineImports(['../', './', String.raw`^\.?\.\/`]);

      expect(groups).toEqual([[String.raw`^\.?\.\/`]]);
    });
  });
});
