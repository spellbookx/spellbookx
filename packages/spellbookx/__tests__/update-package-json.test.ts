import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import { didUpdatePackageJson } from '../src/lib/update-package-json.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tempDir = path.resolve(__dirname, '../temp-update-package-json');

describe('didUpdatePackageJson', () => {
  beforeAll(() => {
    mkdirSync(tempDir, { recursive: true });
  });

  afterAll(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  test('should merge scripts and keep them in alphabetical order', () => {
    const caseDir = path.join(tempDir, 'case-sort');
    mkdirSync(caseDir, { recursive: true });
    writeFileSync(
      path.join(caseDir, 'package.json'),
      JSON.stringify({
        name: 'test-app',
        scripts: {
          test: 'vitest',
          build: 'tsup',
        },
      })
    );

    const updated = didUpdatePackageJson({
      cwd: caseDir,
      scripts: {
        lint: 'eslint .',
        check: 'pnpm lint',
      },
    });

    expect(updated).toBe(true);
    const result = JSON.parse(
      readFileSync(path.join(caseDir, 'package.json'), 'utf8')
    );

    const scriptKeys = Object.keys(result.scripts);
    expect(scriptKeys).toEqual(['build', 'check', 'lint', 'test']);
  });

  test('should merge extra configuration objects recursively', () => {
    const caseDir = path.join(tempDir, 'case-extra');
    mkdirSync(caseDir, { recursive: true });
    writeFileSync(
      path.join(caseDir, 'package.json'),
      JSON.stringify({
        name: 'test-extra',
        config: {
          existingSetting: true,
        },
      })
    );

    didUpdatePackageJson({
      cwd: caseDir,
      extra: {
        config: {
          commitizen: {
            path: 'cz-git',
          },
        },
      },
    });

    const result = JSON.parse(
      readFileSync(path.join(caseDir, 'package.json'), 'utf8')
    );
    expect(result.config.existingSetting).toBe(true);
    expect(result.config.commitizen.path).toBe('cz-git');
  });

  test('should return false if package.json does not exist', () => {
    const emptyDir = path.join(tempDir, 'case-none');
    mkdirSync(emptyDir, { recursive: true });

    const updated = didUpdatePackageJson({
      cwd: emptyDir,
      scripts: { test: 'vitest' },
    });
    expect(updated).toBe(false);
  });
});
