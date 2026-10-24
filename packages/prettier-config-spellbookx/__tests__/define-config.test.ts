import { describe, expect, it } from 'vitest';

import prettier from 'prettier';

import {
  configs,
  defineConfig,
  defineSbxConfig,
  plugins,
} from '../src/index.js';

describe('prettier-config-spellbookx (defineSbxConfig & defineConfig)', () => {
  it('merges configs, sorts plugins canonically, and deduplicates entries', () => {
    const customConfig = defineSbxConfig([
      configs.base,
      {
        plugins: [plugins.tailwind, plugins.sortImports],
        printWidth: 100,
      },
    ]);

    expect(customConfig.printWidth).toBe(100);
    expect(customConfig.tabWidth).toBe(2);

    const customPlugins = customConfig.plugins as string[];
    expect(customPlugins.at(0)).toBe('@ianvs/prettier-plugin-sort-imports');
    expect(customPlugins.at(-1)).toBe('prettier-plugin-tailwindcss');
    expect(new Set(customPlugins).size).toBe(customPlugins.length);
  });

  it('aliases defineConfig to defineSbxConfig', () => {
    expect(defineConfig).toBe(defineSbxConfig);
  });

  it('handles variadic arguments, nested arrays, and falsy inputs', () => {
    const merged = defineSbxConfig(
      configs.base,
      undefined,
      null,
      false,
      { semi: false },
      [{ singleQuote: false }]
    );

    expect(merged.semi).toBe(false);
    expect(merged.singleQuote).toBe(false);
    expect(defineSbxConfig()).toEqual({});
  });

  it('formats code using a composed configuration', async () => {
    const customConfig = defineSbxConfig([
      configs.base,
      { printWidth: 120, semi: false },
    ]);

    const formatted = await prettier.format('const answer = 42;\n', {
      ...customConfig,
      parser: 'typescript',
    });

    expect(formatted).toBe('const answer = 42\n');
  });
});
