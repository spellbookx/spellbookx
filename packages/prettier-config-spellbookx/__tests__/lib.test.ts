/**
 * @file lib.test.ts
 * Tests for atomic utility functions located in src/lib.
 */

import { describe, expect, test } from 'vitest';

import {
  formatGroupToRegex,
  getPluginName,
  mergeOverrides,
  PLUGIN_PRIORITY,
  plugins,
  sortPlugins,
} from '../src/index.js';

describe('atomic lib utilities', () => {
  test('getPluginName should resolve plugin string identifier or object name', () => {
    expect(getPluginName('prettier-plugin-sh')).toBe('prettier-plugin-sh');
    expect(getPluginName({ name: 'custom-plugin' })).toBe('custom-plugin');
    expect(getPluginName(null)).toBe('');
    expect(getPluginName(undefined)).toBe('');
    expect(getPluginName(42)).toBe('');
  });

  test('PLUGIN_PRIORITY should set correct weights', () => {
    expect(PLUGIN_PRIORITY['@ianvs/prettier-plugin-sort-imports']).toBe(10);
    expect(PLUGIN_PRIORITY['prettier-plugin-tailwindcss']).toBe(100);
    expect(PLUGIN_PRIORITY['prettier-plugin-multiline-arrays']).toBe(20);
  });

  test('sortPlugins should place plugins in canonical order and deduplicate', () => {
    const sorted = sortPlugins([
      plugins.tailwind,
      plugins.sh,
      plugins.sortImports,
      plugins.sh, // duplicate
    ]);
    expect(sorted).toEqual([plugins.sortImports, plugins.sh, plugins.tailwind]);
  });

  test('mergeOverrides should merge options by files pattern and preserve unique entries', () => {
    const merged = mergeOverrides([
      { files: '*.toml', options: { printWidth: 80 } },
      { files: '*.toml', options: { printWidth: 100, tabWidth: 4 } },
      { files: ['*.xml', '*.svg'], options: { parser: 'xml' } },
    ]);
    expect(merged).toHaveLength(2);
    expect(merged[0]?.options).toEqual({ printWidth: 100, tabWidth: 4 });
    expect(merged[1]?.options).toEqual({ parser: 'xml' });
  });

  test('formatGroupToRegex should transform categories into regex strings', () => {
    expect(formatGroupToRegex('<BUILTIN_MODULES>')).toBe('<BUILTIN_MODULES>');
    expect(formatGroupToRegex(['node:'])).toBe('<BUILTIN_MODULES>');
    expect(formatGroupToRegex('<THIRD_PARTY_MODULES>')).toBe(
      '<THIRD_PARTY_MODULES>'
    );
    expect(formatGroupToRegex(['@fastify', 'express'])).toBe(
      '^(@fastify|express)(/.*)?$'
    );
    expect(formatGroupToRegex(['../', './'])).toBe('^[.]');
    expect(formatGroupToRegex(['^.+[.]css$', '^.+[.]scss$'])).toEqual([
      '^.+[.]css$',
      '^.+[.]scss$',
    ]);
    expect(formatGroupToRegex([])).toBeNull();
    expect(formatGroupToRegex(123)).toBeNull();
  });
});
