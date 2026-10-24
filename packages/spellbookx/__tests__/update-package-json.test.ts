import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { didUpdatePackageJson } from '../src/lib/update-package-json.js';

describe('spellbookx (didUpdatePackageJson)', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(path.join(os.tmpdir(), 'sbx-update-pkg-'));
  });

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  it('merges scripts and sorts script keys alphabetically', () => {
    writeFileSync(
      path.join(tempDir, 'package.json'),
      JSON.stringify({
        name: 'test-app',
        scripts: {
          test: 'vitest',
          build: 'tsup',
        },
      })
    );

    const updated = didUpdatePackageJson({
      cwd: tempDir,
      scripts: {
        lint: 'eslint .',
        check: 'pnpm lint',
      },
    });

    expect(updated).toBe(true);
    const result = JSON.parse(
      readFileSync(path.join(tempDir, 'package.json'), 'utf8')
    );
    expect(Object.keys(result.scripts)).toEqual([
      'build',
      'check',
      'lint',
      'test',
    ]);
  });

  it('shallow-merges nested object keys in extra configuration', () => {
    writeFileSync(
      path.join(tempDir, 'package.json'),
      JSON.stringify({
        name: 'test-extra',
        config: {
          existingSetting: true,
        },
      })
    );

    const updated = didUpdatePackageJson({
      cwd: tempDir,
      extra: {
        config: {
          commitizen: {
            path: 'cz-git',
          },
        },
      },
    });

    expect(updated).toBe(true);
    const result = JSON.parse(
      readFileSync(path.join(tempDir, 'package.json'), 'utf8')
    );
    expect(result.config).toEqual({
      existingSetting: true,
      commitizen: {
        path: 'cz-git',
      },
    });
  });

  it('returns false when package.json is missing or contains invalid JSON', () => {
    expect(
      didUpdatePackageJson({
        cwd: tempDir,
        scripts: { test: 'vitest' },
      })
    ).toBe(false);

    writeFileSync(path.join(tempDir, 'package.json'), '{ invalid json');
    expect(
      didUpdatePackageJson({
        cwd: tempDir,
        scripts: { test: 'vitest' },
      })
    ).toBe(false);
  });
});
