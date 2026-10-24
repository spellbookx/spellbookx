import { describe, expect, it } from 'vitest';

import * as allConfigs from '../src/configs/index.js';
import defaultExport, {
  baseRules,
  configs,
  overrides,
  plugins,
  rules,
  type SbxPrettierConfig,
} from '../src/index.js';

describe('prettier-config-spellbookx (exports)', () => {
  it('exports configs.recommended as the default export', () => {
    expect(defaultExport).toBeDefined();
    expect(defaultExport).toEqual(configs.recommended);
  });

  it('exports all 19 presets in the configs dictionary', () => {
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

    expect(Object.keys(configs)).toHaveLength(19);
    for (const key of expectedKeys) {
      expect(configs[key]).toBeDefined();
    }
    expect(configs.all).toBe(allConfigs.all);
    expect(configs.base).toBe(allConfigs.base);
    expect(configs.recommended).toBe(allConfigs.recommended);
  });

  it('exposes all supported Prettier plugin identifiers', () => {
    expect(plugins).toMatchObject({
      sh: 'prettier-plugin-sh',
      toml: 'prettier-plugin-toml',
      ini: 'prettier-plugin-ini',
      packagejson: 'prettier-plugin-packagejson',
      properties: 'prettier-plugin-properties',
      xml: '@prettier/plugin-xml',
      astro: 'prettier-plugin-astro',
      svelte: 'prettier-plugin-svelte',
      prisma: 'prettier-plugin-prisma',
      sql: 'prettier-plugin-sql',
      nginx: 'prettier-plugin-nginx',
      embed: 'prettier-plugin-embed',
      sortImports: '@ianvs/prettier-plugin-sort-imports',
      'sort-imports': '@ianvs/prettier-plugin-sort-imports',
      multilineArrays: 'prettier-plugin-multiline-arrays',
      'multiline-arrays': 'prettier-plugin-multiline-arrays',
      tailwind: 'prettier-plugin-tailwindcss',
      tailwindcss: 'prettier-plugin-tailwindcss',
    });
  });

  it('exports baseRules and rules.base with standard formatting options', () => {
    expect(rules.base).toEqual(baseRules);
    expect(rules.base).toMatchObject({
      tabWidth: 2,
      singleQuote: true,
      semi: true,
      printWidth: 80,
      endOfLine: 'lf',
    });
  });

  it('exports individual and aggregated file overrides', () => {
    expect(overrides.czrc.files).toBe('**/.czrc');
    expect(overrides.jsonc).toEqual({
      files: '*.jsonc',
      options: { trailingComma: 'none' },
    });
    expect(overrides.toml.files).toEqual(['*.toml']);
    expect(overrides.astro.files).toEqual(['*.astro']);
    expect(overrides.svelte.files).toEqual(['*.svelte']);
    expect(overrides.base).toHaveLength(4);
    expect(overrides.all).toHaveLength(6);
  });
});
