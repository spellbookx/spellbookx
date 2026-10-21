/**
 * @file import-order.test.ts
 * Tests for import ordering definitions, composer function, and presets.
 */

import { describe, expect, test } from 'vitest';

import {
  defaultImportOrderParserPlugins,
  defineImports,
  importOrder,
  imports,
} from '../src/index.js';

describe('importOrder and defineImports', () => {
  test('importOrder should export array of regex patterns aligned with ESLint ordering', () => {
    expect(Array.isArray(importOrder)).toBe(true);
    expect(importOrder.length).toBeGreaterThan(10);
    expect(importOrder).toContain('<BUILTIN_MODULES>');
    expect(importOrder).toContain('<THIRD_PARTY_MODULES>');
    expect(defaultImportOrderParserPlugins).toContain('typescript');
  });

  test('imports dictionary and defineImports function should compose custom importOrder correctly', () => {
    expect(imports).toBeDefined();
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

    expect(custom).toContain('^(@dotenvx/dotenvx|dotenv)(/.*)?$');
    expect(custom).toContain('<BUILTIN_MODULES>');
    expect(custom).toContain('^(@mui)(/.*)?$');
    expect(custom).toContain(
      '^(@fastify|@hapi/hapi|@koa/koa|@nestjs|express|fastify|hapi|koa|loopback|nest|sails)(/.*)?$'
    );
    expect(custom).toContain('');
    expect(custom).toContain('^(@angular|react|solid-js|svelte|vue)(/.*)?$');
    expect(custom).toContain('^[.]');
  });

  test('defineImports should handle trailing separators cleanly', () => {
    const custom = defineImports([imports.dotenv, '']);
    expect(custom.at(-1)).not.toBe('');
  });
});
