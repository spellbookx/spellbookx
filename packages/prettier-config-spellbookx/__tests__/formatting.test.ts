import { describe, expect, it } from 'vitest';

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

describe('prettier-config-spellbookx (live formatting)', () => {
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

  it('formats TypeScript code using base config', async () => {
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

  it('formats JSON content using base config', async () => {
    const formatted = await prettier.format('{"b":  2,  "a": 1}', {
      ...base,
      parser: 'json',
    });

    expect(formatted).toBe('{ "b": 2, "a": 1 }\n');
  });

  it('sorts package.json keys using prettier-plugin-packagejson', async () => {
    const unformatted = JSON.stringify({
      version: '1.0.0',
      name: 'my-package',
      scripts: { test: 'true' },
    });
    const formatted = await prettier.format(unformatted, {
      ...base,
      filepath: 'package.json',
    });

    expect(formatted.indexOf('"name"')).toBeLessThan(
      formatted.indexOf('"version"')
    );
  });

  it('formats Astro components using astro config', async () => {
    const unformatted =
      '---\nconst title = "My Title";\n---\n<div><h1>{title}</h1></div>';
    const formatted = await prettier.format(unformatted, {
      ...astro,
      filepath: 'index.astro',
    });

    expect(formatted).toContain('<h1>{title}</h1>');
  });

  it('formats Svelte components using svelte config', async () => {
    const unformatted =
      '<script>\nlet name="world";\n</script>\n<h1>Hello {name}!</h1>';
    const formatted = await prettier.format(unformatted, {
      ...svelte,
      filepath: 'App.svelte',
    });

    expect(formatted).toContain("let name = 'world';");
    expect(formatted).toContain('<h1>Hello {name}!</h1>');
  });

  it('formats Prisma schemas using prisma config', async () => {
    const unformatted = 'model User {\nid Int @id\nemail String\n}';
    const formatted = await prettier.format(unformatted, {
      ...prisma,
      filepath: 'schema.prisma',
    });

    expect(formatted).toContain('id    Int    @id');
  });

  it('formats SQL queries using sql config', async () => {
    const unformatted = 'select   id, name   from   users   where   active = 1';
    const formatted = await prettier.format(unformatted, {
      ...sql,
      filepath: 'query.sql',
    });

    expect(formatted).toContain('select\n  id,\n  name\nfrom\n  users');
  });

  it('formats Nginx configuration using nginx config', async () => {
    const unformatted = 'server { listen 80; server_name example.com; }';
    const formatted = await prettier.format(unformatted, {
      ...nginx,
      filepath: 'nginx.conf',
    });

    expect(formatted).toContain('server {');
    expect(formatted).toContain('listen');
  });

  it('sorts imports using sort-imports config', async () => {
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

  it('formats embedded HTML template literals using embed config', async () => {
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

  it('formats arrays across multiple lines using multiline-arrays config', async () => {
    const formatted = await prettier.format('const items = [1, 2, 3];', {
      ...multilineArrays,
      parser: 'typescript',
    });

    expect(formatted).toBe('const items = [\n  1,\n  2,\n  3,\n];\n');
  });

  it.each(allPresets)(
    'formats standard TypeScript code cleanly with preset "%s"',
    async (_name, config) => {
      const code =
        'export function add(a: number, b: number): number { return a + b; }\n';
      const formatted = await prettier.format(code, {
        ...config,
        parser: 'typescript',
      });

      expect(formatted).toBe(
        'export function add(a: number, b: number): number {\n  return a + b;\n}\n'
      );
    }
  );
});
