import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  findGitRoot,
  getScopes,
  getWorkspacesRawPath,
} from '../src/lib/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('commitlint-config-spellbookx (workspace discovery)', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(path.join(os.tmpdir(), 'sbx-commitlint-'));
  });

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  describe('findGitRoot', () => {
    it('locates the git root directory from a nested package path', () => {
      const root = findGitRoot(__dirname);

      expect(root).not.toBeNull();
      expect(existsSync(path.join(root!, '.git'))).toBe(true);
    });

    it('returns null when no .git directory exists up to filesystem root', () => {
      const root = findGitRoot(tempDir);

      expect(root).toBeNull();
    });
  });

  describe('getWorkspacesRawPath', () => {
    it('parses workspace globs from a JSON file', () => {
      const jsonPath = path.join(tempDir, 'package.json');
      writeFileSync(
        jsonPath,
        JSON.stringify({ workspaces: ['packages/*', 'apps/*'] })
      );

      expect(getWorkspacesRawPath(jsonPath, 'json', 'workspaces')).toEqual([
        'packages/*',
        'apps/*',
      ]);
    });

    it('parses package globs from a YAML file', () => {
      const yamlPath = path.join(tempDir, 'pnpm-workspace.yaml');
      writeFileSync(yamlPath, 'packages:\n  - "packages/*"\n  - "plugins/*"\n');

      expect(getWorkspacesRawPath(yamlPath, 'yaml', 'packages')).toEqual([
        'packages/*',
        'plugins/*',
      ]);
    });

    it('returns an empty array when file does not exist or property is missing', () => {
      expect(
        getWorkspacesRawPath(path.join(tempDir, 'missing.json'), 'json')
      ).toEqual([]);

      const jsonPath = path.join(tempDir, 'empty.json');
      writeFileSync(jsonPath, JSON.stringify({ name: 'no-workspaces' }));
      expect(getWorkspacesRawPath(jsonPath, 'json', 'workspaces')).toEqual([]);
    });

    it('throws an error when given an unsupported parser type', () => {
      const filePath = path.join(tempDir, 'config.txt');
      writeFileSync(filePath, 'content');

      expect(() => {
        // @ts-expect-error Testing invalid parser runtime check
        getWorkspacesRawPath(filePath, 'xml');
      }).toThrow(/Unsupported parser type: xml/);
    });
  });

  describe('getScopes', () => {
    it('discovers all package scopes in the current monorepo', () => {
      const scopes = getScopes(__dirname);

      expect(scopes).toEqual(
        expect.arrayContaining([
          '@spellbookx/recipes',
          'commitlint-config-spellbookx',
          'cspell-config-spellbookx',
          'eslint-plugin-spellbookx',
          'prettier-config-spellbookx',
          'spellbookx',
        ])
      );
    });

    it('discovers scopes from a simulated git repository with workspaces and ignores malformed package.json', () => {
      mkdirSync(path.join(tempDir, '.git'));
      writeFileSync(
        path.join(tempDir, 'package.json'),
        JSON.stringify({ name: 'root-pkg', workspaces: ['packages/*'] })
      );

      const pkgA = path.join(tempDir, 'packages/pkg-a');
      const pkgInvalid = path.join(tempDir, 'packages/pkg-invalid');
      mkdirSync(pkgA, { recursive: true });
      mkdirSync(pkgInvalid, { recursive: true });

      writeFileSync(
        path.join(pkgA, 'package.json'),
        JSON.stringify({ name: '@acme/pkg-a' })
      );
      writeFileSync(path.join(pkgInvalid, 'package.json'), '{ invalid json');

      const scopes = getScopes(tempDir);

      expect(scopes).toContain('root-pkg');
      expect(scopes).toContain('@acme/pkg-a');
    });

    it('throws a fatal error when invoked outside a git repository', () => {
      expect(() => getScopes(tempDir)).toThrow('[FATAL] Not a repository.');
    });
  });
});
