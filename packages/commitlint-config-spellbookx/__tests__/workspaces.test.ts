/**
 * @file workspaces.test.ts
 * Tests for git root discovery, workspace config parsing, and scopes gathering.
 */

import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import {
  findGitRoot,
  getScopes,
  getWorkspacesRawPath,
} from '../src/lib/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.resolve(__dirname, '../temp-test-commitlint');

describe('workspace discovery and parsing', () => {
  beforeAll(() => {
    if (existsSync(testDir)) rmSync(testDir, { recursive: true, force: true });
    mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    if (existsSync(testDir)) rmSync(testDir, { recursive: true, force: true });
  });

  test('findGitRoot should locate git root directory', () => {
    const root = findGitRoot(__dirname);
    expect(root).not.toBeNull();
    expect(existsSync(path.join(root!, '.git'))).toBe(true);
  });

  test('should parse workspaces from JSON correctly', () => {
    const jsonPath = path.join(testDir, 'package.json');
    mkdirSync(testDir, { recursive: true });
    writeFileSync(
      jsonPath,
      JSON.stringify({ workspaces: ['packages/*', 'apps/*'] })
    );

    const workspaces = getWorkspacesRawPath(jsonPath, 'json', 'workspaces');
    expect(workspaces).toEqual(['packages/*', 'apps/*']);
  });

  test('should parse packages from YAML correctly', () => {
    const yamlPath = path.join(testDir, 'pnpm-workspace.yaml');
    mkdirSync(testDir, { recursive: true });
    writeFileSync(yamlPath, 'packages:\n  - "packages/*"\n  - "plugins/*"\n');

    const packages = getWorkspacesRawPath(yamlPath, 'yaml', 'packages');
    expect(packages).toEqual(['packages/*', 'plugins/*']);
  });

  test('should throw on unsupported parser', () => {
    const filePath = path.join(testDir, 'config.txt');
    writeFileSync(filePath, 'some text');
    expect(() => {
      // @ts-expect-error Testing invalid parser
      getWorkspacesRawPath(filePath, 'xml');
    }).toThrow(/Unsupported parser type/);
  });

  test('should return scopes including workspace and monorepo packages', () => {
    const scopes = getScopes();
    expect(Array.isArray(scopes)).toBe(true);
    expect(scopes).toContain('commitlint-config-spellbookx');
    expect(scopes).toContain('cspell-config-spellbookx');
    expect(scopes).toContain('eslint-plugin-spellbookx');
    expect(scopes).toContain('prettier-config-spellbookx');
    expect(scopes).toContain('@spellbookx/recipes');
  });
});
