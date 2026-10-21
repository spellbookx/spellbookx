/**
 * @file configs.test.ts
 * Tests verifying the structure, formatting options, and plugin compositions of all presets.
 */

import { describe, expect, test } from 'vitest';

import type { Config } from 'prettier';

import {
  all,
  astro,
  astroPrisma,
  astroPrismaTailwind,
  astroTailwind,
  base,
  embed,
  multilineArrays,
  nginx,
  prisma,
  prismaTailwind,
  recommended,
  sortImports,
  sql,
  svelte,
  sveltePrisma,
  sveltePrismaTailwind,
  svelteTailwind,
  tailwind,
} from '../src/configs/index.js';
import type { SbxPrettierConfig } from '../src/index.js';

describe('prettier configurations structure', () => {
  const allConfigs: Record<SbxPrettierConfig, Config> = {
    all,
    astro,
    'astro-prisma': astroPrisma,
    'astro-prisma-tailwind': astroPrismaTailwind,
    'astro-tailwind': astroTailwind,
    base,
    embed,
    'multiline-arrays': multilineArrays,
    nginx,
    prisma,
    'prisma-tailwind': prismaTailwind,
    recommended,
    'sort-imports': sortImports,
    sql,
    svelte,
    'svelte-prisma': sveltePrisma,
    'svelte-prisma-tailwind': sveltePrismaTailwind,
    'svelte-tailwind': svelteTailwind,
    tailwind,
  };

  test('all configurations should share consistent standard formatting rules', () => {
    for (const config of Object.values(allConfigs)) {
      expect(config.trailingComma).toBe('es5');
      expect(config.tabWidth).toBe(2);
      expect(config.semi).toBe(true);
      expect(config.singleQuote).toBe(true);
      expect(config.printWidth).toBe(80);
      expect(config.endOfLine).toBe('lf');
      expect(config.bracketSpacing).toBe(true);
      expect(Array.isArray(config.plugins)).toBe(true);
      expect(Array.isArray(config.overrides)).toBe(true);
    }
  });

  test('tailwind plugin should always be placed last when present', () => {
    const tailwindConfigs = [
      tailwind,
      astroTailwind,
      prismaTailwind,
      astroPrismaTailwind,
      svelteTailwind,
      sveltePrismaTailwind,
      all,
      recommended,
    ];

    for (const config of tailwindConfigs) {
      const p = (config.plugins || []) as string[];
      expect(p.at(-1)).toBe('prettier-plugin-tailwindcss');
    }
  });

  test('astro configurations should include prettier-plugin-astro', () => {
    const astroConfigs = [
      astro,
      astroPrisma,
      astroTailwind,
      astroPrismaTailwind,
      all,
    ];

    for (const config of astroConfigs) {
      const p = (config.plugins || []) as string[];
      expect(p).toContain('prettier-plugin-astro');
    }
  });

  test('svelte configurations should include prettier-plugin-svelte', () => {
    const svelteConfigs = [
      svelte,
      sveltePrisma,
      svelteTailwind,
      sveltePrismaTailwind,
      all,
    ];

    for (const config of svelteConfigs) {
      const p = (config.plugins || []) as string[];
      expect(p).toContain('prettier-plugin-svelte');
    }
  });

  test('prisma configurations should include prettier-plugin-prisma', () => {
    const prismaConfigs = [
      prisma,
      astroPrisma,
      prismaTailwind,
      astroPrismaTailwind,
      sveltePrisma,
      sveltePrismaTailwind,
      all,
    ];

    for (const config of prismaConfigs) {
      const p = (config.plugins || []) as string[];
      expect(p).toContain('prettier-plugin-prisma');
    }
  });

  test('all configuration should contain all available plugins with tailwind last', () => {
    const p = (all.plugins || []) as string[];
    expect(p).toContain('@ianvs/prettier-plugin-sort-imports');
    expect(p).toContain('prettier-plugin-multiline-arrays');
    expect(p).toContain('prettier-plugin-astro');
    expect(p).toContain('prettier-plugin-svelte');
    expect(p).toContain('prettier-plugin-sh');
    expect(p).toContain('prettier-plugin-toml');
    expect(p).toContain('prettier-plugin-ini');
    expect(p).toContain('prettier-plugin-packagejson');
    expect(p).toContain('prettier-plugin-properties');
    expect(p).toContain('prettier-plugin-sql');
    expect(p).toContain('prettier-plugin-nginx');
    expect(p).toContain('prettier-plugin-prisma');
    expect(p).toContain('@prettier/plugin-xml');
    expect(p).toContain('prettier-plugin-embed');
    expect(p).toContain('prettier-plugin-tailwindcss');
    expect(p.at(-1)).toBe('prettier-plugin-tailwindcss');
  });

  test('recommended configuration should contain community recommended plugins', () => {
    const p = (recommended.plugins || []) as string[];
    expect(p).toContain('prettier-plugin-sh');
    expect(p).toContain('prettier-plugin-toml');
    expect(p).toContain('prettier-plugin-ini');
    expect(p).toContain('prettier-plugin-packagejson');
    expect(p).toContain('prettier-plugin-properties');
    expect(p).toContain('@prettier/plugin-xml');
    expect(p).toContain('prettier-plugin-tailwindcss');
    expect(p.at(-1)).toBe('prettier-plugin-tailwindcss');
    expect(p).not.toContain('prettier-plugin-astro');
    expect(p).not.toContain('prettier-plugin-svelte');
    expect(p).not.toContain('prettier-plugin-prisma');
  });
});
