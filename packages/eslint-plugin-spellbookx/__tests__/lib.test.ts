import { describe, expect, test } from 'vitest';

import { defineImports } from '../src/lib/define-imports.js';
import { packageJson } from '../src/lib/package-json.js';

describe('eslint-plugin-spellbookx (lib utilities)', () => {
  test('packageJson should contain valid package metadata', () => {
    expect(packageJson.name).toBe('eslint-plugin-spellbookx');
    expect(packageJson.version).toBeDefined();
    expect(typeof packageJson.version).toBe('string');
  });

  test('defineImports should transform package names into regex groups', () => {
    const groups = defineImports(
      ['dotenv', '@dotenvx/dotenvx'],
      '<THIRD_PARTY_MODULES>',
      'node:',
      '../'
    );

    expect(groups.length).toBe(4);
    expect(groups[0]).toEqual(['^dotenv', '^@dotenvx/dotenvx']);
    expect(groups[1]).toEqual(['^[a-z]', String.raw`^@\w`]);
    expect(groups[2]).toEqual(['^node:']);
    expect(groups[3]).toEqual([String.raw`^\.?\.\/`]);
  });

  test('defineImports should accept an array of groups as single argument', () => {
    const groups = defineImports([
      ['express', 'fastify'],
      ['@org/', '^@repo/'],
    ]);

    expect(groups.length).toBe(2);
    expect(groups[0]).toEqual(['^express', '^fastify']);
    expect(groups[1]).toEqual(['^@org/', '^@repo/']);
  });

  test('defineImports should ignore null, undefined, and empty string elements', () => {
    const groups = defineImports(null, undefined, '', [], ['react', ''], ['']);

    expect(groups.length).toBe(1);
    expect(groups[0]).toEqual(['^react']);
  });

  test('defineImports should deduplicate patterns within a group', () => {
    const groups = defineImports(['../', './', String.raw`^\.?\.\/`]);

    expect(groups.length).toBe(1);
    expect(groups[0]).toEqual([String.raw`^\.?\.\/`]);
  });
});
