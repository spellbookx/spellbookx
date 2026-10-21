/**
 * @file index.test.ts
 * Tests for entry point exports and dictionaries in prettier-config-spellbookx.
 */

import { describe, expect, test } from 'vitest';

import * as allConfigs from '../src/configs/index.js';
import defaultExport, {
  baseRules,
  configs,
  overrides,
  plugins,
  rules,
  type SbxPrettierConfig,
} from '../src/index.js';

describe('prettier-config-spellbookx exports', () => {
  test('default export should be configs.recommended', () => {
    expect(defaultExport).toBeDefined();
    expect(defaultExport).toEqual(configs.recommended);
  });

  test('should export all 19 configurations in configs named export', () => {
    const expectedKeys: SbxPrettierConfig[] = [
      'all',
      'astro',
      'astro-prisma',
      'astro-prisma-tailwind',
      'astro-tailwind',
      'base',
      'embed',
      'multiline-arrays',
      'nginx',
      'prisma',
      'prisma-tailwind',
      'recommended',
      'sort-imports',
      'sql',
      'svelte',
      'svelte-prisma',
      'svelte-prisma-tailwind',
      'svelte-tailwind',
      'tailwind',
    ];

    for (const key of expectedKeys) {
      expect(configs[key]).toBeDefined();
    }
    expect(Object.keys(configs)).toHaveLength(19);
    expect(configs.all).toBe(allConfigs.all);
    expect(configs.base).toBe(allConfigs.base);
    expect(configs.recommended).toBe(allConfigs.recommended);
  });

  test('should allow indexed access on configs dictionary', () => {
    expect(configs['svelte-prisma-tailwind']).toBeDefined();
    expect(configs['astro-prisma-tailwind']).toBeDefined();
  });

  test('plugins dictionary should expose all supported plugin names', () => {
    expect(plugins.sh).toBe('prettier-plugin-sh');
    expect(plugins.toml).toBe('prettier-plugin-toml');
    expect(plugins.ini).toBe('prettier-plugin-ini');
    expect(plugins.packagejson).toBe('prettier-plugin-packagejson');
    expect(plugins.properties).toBe('prettier-plugin-properties');
    expect(plugins.xml).toBe('@prettier/plugin-xml');
    expect(plugins.astro).toBe('prettier-plugin-astro');
    expect(plugins.svelte).toBe('prettier-plugin-svelte');
    expect(plugins.prisma).toBe('prettier-plugin-prisma');
    expect(plugins.sql).toBe('prettier-plugin-sql');
    expect(plugins.nginx).toBe('prettier-plugin-nginx');
    expect(plugins.embed).toBe('prettier-plugin-embed');
    expect(plugins.sortImports).toBe('@ianvs/prettier-plugin-sort-imports');
    expect(plugins['sort-imports']).toBe('@ianvs/prettier-plugin-sort-imports');
    expect(plugins.multilineArrays).toBe('prettier-plugin-multiline-arrays');
    expect(plugins['multiline-arrays']).toBe(
      'prettier-plugin-multiline-arrays'
    );
    expect(plugins.tailwind).toBe('prettier-plugin-tailwindcss');
    expect(plugins.tailwindcss).toBe('prettier-plugin-tailwindcss');
  });

  test('rules dictionary should export baseRules and rules.base', () => {
    expect(rules.base).toEqual(baseRules);
    expect(rules.base.tabWidth).toBe(2);
    expect(rules.base.singleQuote).toBe(true);
    expect(rules.base.semi).toBe(true);
  });

  test('overrides dictionary should export individual and aggregated overrides', () => {
    expect(overrides.czrc.files).toBe('**/.czrc');
    expect(overrides.toml.files).toEqual(['*.toml']);
    expect(overrides.astro.files).toEqual(['*.astro']);
    expect(overrides.svelte.files).toEqual(['*.svelte']);
    expect(Array.isArray(overrides.base)).toBe(true);
    expect(overrides.base).toHaveLength(3);
    expect(Array.isArray(overrides.all)).toBe(true);
    expect(overrides.all).toHaveLength(5);
  });
});
