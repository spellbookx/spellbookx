import { describe, expect, it } from 'vitest';

import {
  defaultImportOrderParserPlugins,
  defineImports,
  importOrder,
  imports,
} from '../src/index.js';

describe('prettier-config-spellbookx (importOrder & defineImports)', () => {
  it('exports default importOrder and parser plugins', () => {
    expect(Array.isArray(importOrder)).toBe(true);
    expect(importOrder.length).toBeGreaterThan(10);
    expect(importOrder).toContain('<BUILTIN_MODULES>');
    expect(importOrder).toContain('<THIRD_PARTY_MODULES>');
    expect(defaultImportOrderParserPlugins).toContain('typescript');
  });

  it('composes custom importOrder regexes from recipe groups', () => {
    expect(imports.dotenv).toEqual(['@dotenvx/dotenvx', 'dotenv']);
    expect(imports.separator).toBe('');

    const custom = defineImports([
      imports.dotenv,
      imports.builtinModules,
      ['@mui'],
      imports.backendFrameworks,
      '',
      imports.uiFrameworks,
      '^[.]',
    ]);

    expect(custom).toEqual(
      expect.arrayContaining([
        '^(@dotenvx/dotenvx|dotenv)(/.*)?$',
        '<BUILTIN_MODULES>',
        '^(@mui)(/.*)?$',
        '^(@fastify|@hapi/hapi|@koa/koa|@nestjs|express|fastify|hapi|koa|loopback|nest|sails)(/.*)?$',
        '',
        '^(@angular|react|solid-js|svelte|vue)(/.*)?$',
        '^[.]',
      ])
    );
  });

  it('strips trailing separators and collapses consecutive separators', () => {
    const custom = defineImports([
      '',
      imports.dotenv,
      '',
      '',
      imports.relative,
      '',
    ]);

    expect(custom.at(0)).not.toBe('');
    expect(custom.at(-1)).not.toBe('');
  });
});
