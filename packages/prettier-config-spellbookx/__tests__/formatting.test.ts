/**
 * @file formatting.test.ts
 * Tests verifying actual formatting execution with Prettier across filetypes and configs.
 */

import { describe, expect, test } from 'vitest';

import prettier, { type Config } from 'prettier';

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

describe('prettier live formatting', () => {
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

  test('should format JavaScript/TypeScript code using base config', async () => {
    const unformatted =
      'const   greet = ( name: string ) => { return `hello ${name}` };';
    const formatted = await prettier.format(unformatted, {
      ...base,
      parser: 'typescript',
    });
    expect(formatted).toBe(
      'const greet = (name: string) => {\n  return `hello ${name}`;\n};\n'
    );
  });

  test('should format JSON files using base config', async () => {
    const unformatted = '{"b":  2,  "a": 1}';
    const formatted = await prettier.format(unformatted, {
      ...base,
      parser: 'json',
    });
    expect(formatted).toBe('{ "b": 2, "a": 1 }\n');
  });

  test('should sort package.json fields using prettier-plugin-packagejson', async () => {
    const unformatted = JSON.stringify({
      version: '1.0.0',
      name: 'my-package',
      scripts: { test: 'true' },
    });
    const formatted = await prettier.format(unformatted, {
      ...base,
      filepath: 'package.json',
    });
    const nameIndex = formatted.indexOf('"name"');
    const versionIndex = formatted.indexOf('"version"');
    expect(nameIndex).not.toBe(-1);
    expect(versionIndex).not.toBe(-1);
    expect(nameIndex).toBeLessThan(versionIndex);
  });

  test('should format Astro files using astro config', async () => {
    const unformatted =
      '---\nconst title = "My Title";\n---\n<div><h1>{title}</h1></div>';
    const formatted = await prettier.format(unformatted, {
      ...astro,
      filepath: 'index.astro',
    });
    expect(formatted).toContain('<h1>{title}</h1>');
  });

  test('should format Svelte files using svelte config', async () => {
    const unformatted =
      '<script>\nlet name="world";\n</script>\n<h1>Hello {name}!</h1>';
    const formatted = await prettier.format(unformatted, {
      ...svelte,
      filepath: 'App.svelte',
    });
    expect(formatted).toContain("let name = 'world';");
    expect(formatted).toContain('<h1>Hello {name}!</h1>');
  });

  test('should format Prisma schemas using prisma config', async () => {
    const unformatted = 'model User {\nid Int @id\nemail String\n}';
    const formatted = await prettier.format(unformatted, {
      ...prisma,
      filepath: 'schema.prisma',
    });
    expect(formatted).toContain('id    Int    @id');
  });

  test('should format SQL files using sql config', async () => {
    const unformatted = 'select   id, name   from   users   where   active = 1';
    const formatted = await prettier.format(unformatted, {
      ...sql,
      filepath: 'query.sql',
    });
    expect(formatted).toContain('select\n  id,\n  name\nfrom\n  users');
  });

  test('should format Nginx configs using nginx config', async () => {
    const unformatted = 'server { listen 80; server_name example.com; }';
    const formatted = await prettier.format(unformatted, {
      ...nginx,
      filepath: 'nginx.conf',
    });
    expect(formatted).toContain('server {');
    expect(formatted).toContain('listen');
  });

  test('should sort imports using sort-imports config and importOrder', async () => {
    const unformatted = [
      'import b from "./b";',
      'import a from "./a";',
      'import React from "react";',
      'import fs from "node:fs";',
    ].join('\n');
    const formatted = await prettier.format(unformatted, {
      ...sortImports,
      parser: 'typescript',
    });
    expect(formatted).toBe(
      "import fs from 'node:fs';\n\nimport React from 'react';\n\nimport a from './a';\nimport b from './b';\n"
    );
  });

  test('should format embedded languages using embed config', async () => {
    const unformatted =
      'const html = /* HTML */ `<div> <span > hello </span> </div>`;';
    const formatted = await prettier.format(unformatted, {
      ...embed,
      parser: 'typescript',
    });
    expect(formatted).toBe(
      'const html = /* HTML */ `<div><span> hello </span></div>`;\n'
    );
  });

  test('should format multiline arrays using multiline-arrays config', async () => {
    const unformatted = 'const items = [1, 2, 3];';
    const formatted = await prettier.format(unformatted, {
      ...multilineArrays,
      parser: 'typescript',
    });
    expect(formatted).toBe('const items = [\n  1,\n  2,\n  3,\n];\n');
  });

  test('every configuration should format standard code without errors', async () => {
    const code =
      'export function add(a: number, b: number): number { return a + b; }\n';
    for (const [name, config] of Object.entries(allConfigs)) {
      const formatted = await prettier.format(code, {
        ...config,
        parser: 'typescript',
      });
      expect(formatted, `Failed formatting with config "${name}"`).toBe(
        'export function add(a: number, b: number): number {\n  return a + b;\n}\n'
      );
    }
  });
});
