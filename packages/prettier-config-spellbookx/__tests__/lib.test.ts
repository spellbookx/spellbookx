import { describe, expect, it } from 'vitest';

import { plugins } from '../src/index.js';
import {
  formatGroupToRegex,
  getPluginName,
  mergeOverrides,
  packageJson,
  PLUGIN_PRIORITY,
  sortPlugins,
} from '../src/lib/index.js';

describe('prettier-config-spellbookx (lib utilities)', () => {
  it('exposes accurate package metadata in packageJson', () => {
    expect(packageJson.name).toBe('prettier-config-spellbookx');
    expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+/);
  });

  describe('getPluginName', () => {
    it.each([
      ['prettier-plugin-sh', 'prettier-plugin-sh'],
      [{ name: 'custom-plugin' }, 'custom-plugin'],
      [null, ''],
      [undefined, ''],
      [42, ''],
    ])('resolves %j to "%s"', (input, expected) => {
      expect(getPluginName(input)).toBe(expected);
    });
  });

  describe('PLUGIN_PRIORITY & sortPlugins', () => {
    it('assigns canonical priority weights for sort-imports, multiline-arrays, and tailwindcss', () => {
      expect(PLUGIN_PRIORITY['@ianvs/prettier-plugin-sort-imports']).toBe(10);
      expect(PLUGIN_PRIORITY['prettier-plugin-multiline-arrays']).toBe(20);
      expect(PLUGIN_PRIORITY['prettier-plugin-tailwindcss']).toBe(100);
    });

    it('sorts plugins in canonical order and removes duplicates', () => {
      const sorted = sortPlugins([
        plugins.tailwind,
        plugins.sh,
        plugins.sortImports,
        plugins.sh,
      ]);

      expect(sorted).toEqual([
        plugins.sortImports,
        plugins.sh,
        plugins.tailwind,
      ]);
    });
  });

  describe('mergeOverrides', () => {
    it('merges options for matching files patterns and preserves distinct patterns', () => {
      const merged = mergeOverrides([
        { files: '*.toml', options: { printWidth: 80 } },
        { files: '*.toml', options: { printWidth: 100, tabWidth: 4 } },
        { files: ['*.xml', '*.svg'], options: { parser: 'xml' } },
      ]);

      expect(merged).toEqual([
        { files: '*.toml', options: { printWidth: 100, tabWidth: 4 } },
        { files: ['*.xml', '*.svg'], options: { parser: 'xml' } },
      ]);
    });
  });

  describe('formatGroupToRegex', () => {
    it.each([
      ['<BUILTIN_MODULES>', '<BUILTIN_MODULES>'],
      [['node:'], '<BUILTIN_MODULES>'],
      ['<THIRD_PARTY_MODULES>', '<THIRD_PARTY_MODULES>'],
      [['@fastify', 'express'], '^(@fastify|express)(/.*)?$'],
      [['../', './'], '^[.]'],
      [
        ['^.+[.]css$', '^.+[.]scss$'],
        ['^.+[.]css$', '^.+[.]scss$'],
      ],
      [[], null],
      [123, null],
    ] as const)('transforms %j into %j', (input, expected) => {
      expect(formatGroupToRegex(input)).toEqual(expected);
    });
  });
});
