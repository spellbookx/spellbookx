/**
 * @file define-config.test.ts
 * Tests for defineSbxConfig and defineConfig composer utilities.
 */

import { describe, expect, test } from 'vitest';

import prettier from 'prettier';

import {
  configs,
  defineConfig,
  defineSbxConfig,
  plugins,
} from '../src/index.js';

describe('defineSbxConfig and defineConfig', () => {
  test('defineSbxConfig should deep merge configs, sort plugins, and merge overrides', () => {
    const customConfig = defineSbxConfig([
      configs.base,
      {
        plugins: [plugins.tailwind, plugins.sortImports],
        printWidth: 100,
      },
    ]);

    expect(customConfig.printWidth).toBe(100);
    expect(customConfig.tabWidth).toBe(2);
    // plugins must be sorted with tailwind last and sort-imports first
    const customPlugins = customConfig.plugins as string[];
    expect(customPlugins.at(0)).toBe('@ianvs/prettier-plugin-sort-imports');
    expect(customPlugins.at(-1)).toBe('prettier-plugin-tailwindcss');
    // duplicate plugins must not exist
    expect(new Set(customPlugins).size).toBe(customPlugins.length);
  });

  test('defineConfig alias should be identical to defineSbxConfig', () => {
    expect(defineConfig).toBe(defineSbxConfig);
  });

  test('defineSbxConfig should handle variable arguments and empty inputs', () => {
    const merged = defineSbxConfig(
      configs.base,
      undefined,
      false,
      { semi: false },
      [{ singleQuote: false }]
    );
    expect(merged.semi).toBe(false);
    expect(merged.singleQuote).toBe(false);
    expect(defineSbxConfig()).toEqual({});
  });

  test('should format using a custom configuration built with defineSbxConfig', async () => {
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
