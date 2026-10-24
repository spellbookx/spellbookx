import { describe, expect, it } from 'vitest';

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

describe('prettier-config-spellbookx (configs structure)', () => {
  const allPresets: [SbxPrettierConfig, Config][] = [
    ['all', all],
    ['astro', astro],
    ['astro-prisma', astroPrisma],
    ['astro-prisma-tailwind', astroPrismaTailwind],
    ['astro-tailwind', astroTailwind],
    ['base', base],
    ['embed', embed],
    ['multiline-arrays', multilineArrays],
    ['nginx', nginx],
    ['prisma', prisma],
    ['prisma-tailwind', prismaTailwind],
    ['recommended', recommended],
    ['sort-imports', sortImports],
    ['sql', sql],
    ['svelte', svelte],
    ['svelte-prisma', sveltePrisma],
    ['svelte-prisma-tailwind', sveltePrismaTailwind],
    ['svelte-tailwind', svelteTailwind],
    ['tailwind', tailwind],
  ];

  it.each(allPresets)(
    'preset "%s" shares consistent base formatting options',
    (_name, config) => {
      expect(config).toMatchObject({
        trailingComma: 'es5',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        printWidth: 80,
        endOfLine: 'lf',
        bracketSpacing: true,
      });
      expect(Array.isArray(config.plugins)).toBe(true);
      expect(Array.isArray(config.overrides)).toBe(true);
    }
  );

  it.each([
    ['tailwind', tailwind],
    ['astro-tailwind', astroTailwind],
    ['prisma-tailwind', prismaTailwind],
    ['astro-prisma-tailwind', astroPrismaTailwind],
    ['svelte-tailwind', svelteTailwind],
    ['svelte-prisma-tailwind', sveltePrismaTailwind],
    ['all', all],
    ['recommended', recommended],
  ] as const)(
    'places prettier-plugin-tailwindcss last in "%s"',
    (_name, config) => {
      const p = (config.plugins ?? []) as string[];
      expect(p.at(-1)).toBe('prettier-plugin-tailwindcss');
    }
  );

  it.each([
    ['astro', astro],
    ['astro-prisma', astroPrisma],
    ['astro-tailwind', astroTailwind],
    ['astro-prisma-tailwind', astroPrismaTailwind],
    ['all', all],
  ] as const)('includes prettier-plugin-astro in "%s"', (_name, config) => {
    expect(config.plugins).toContain('prettier-plugin-astro');
  });

  it.each([
    ['svelte', svelte],
    ['svelte-prisma', sveltePrisma],
    ['svelte-tailwind', svelteTailwind],
    ['svelte-prisma-tailwind', sveltePrismaTailwind],
    ['all', all],
  ] as const)('includes prettier-plugin-svelte in "%s"', (_name, config) => {
    expect(config.plugins).toContain('prettier-plugin-svelte');
  });

  it.each([
    ['prisma', prisma],
    ['astro-prisma', astroPrisma],
    ['prisma-tailwind', prismaTailwind],
    ['astro-prisma-tailwind', astroPrismaTailwind],
    ['svelte-prisma', sveltePrisma],
    ['svelte-prisma-tailwind', sveltePrismaTailwind],
    ['all', all],
  ] as const)('includes prettier-plugin-prisma in "%s"', (_name, config) => {
    expect(config.plugins).toContain('prettier-plugin-prisma');
  });

  it('includes all supported plugins in "all" with tailwind ordered last', () => {
    const p = (all.plugins ?? []) as string[];
    expect(p).toEqual(
      expect.arrayContaining([
        '@ianvs/prettier-plugin-sort-imports',
        'prettier-plugin-multiline-arrays',
        'prettier-plugin-astro',
        'prettier-plugin-svelte',
        'prettier-plugin-sh',
        'prettier-plugin-toml',
        'prettier-plugin-ini',
        'prettier-plugin-packagejson',
        'prettier-plugin-properties',
        'prettier-plugin-sql',
        'prettier-plugin-nginx',
        'prettier-plugin-prisma',
        '@prettier/plugin-xml',
        'prettier-plugin-embed',
        'prettier-plugin-tailwindcss',
      ])
    );
    expect(p.at(-1)).toBe('prettier-plugin-tailwindcss');
  });

  it('includes standard plugins in "recommended" without framework-specific plugins', () => {
    const p = (recommended.plugins ?? []) as string[];
    expect(p).toEqual(
      expect.arrayContaining([
        'prettier-plugin-sh',
        'prettier-plugin-toml',
        'prettier-plugin-ini',
        'prettier-plugin-packagejson',
        'prettier-plugin-properties',
        '@prettier/plugin-xml',
        'prettier-plugin-tailwindcss',
      ])
    );
    expect(p.at(-1)).toBe('prettier-plugin-tailwindcss');
    expect(p).not.toContain('prettier-plugin-astro');
    expect(p).not.toContain('prettier-plugin-svelte');
    expect(p).not.toContain('prettier-plugin-prisma');
  });
});
