import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import { runInit } from '../src/commands/init.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tempDir = path.resolve(__dirname, '../temp-init');

describe('runInit', () => {
  beforeAll(() => {
    mkdirSync(tempDir, { recursive: true });
  });

  afterAll(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  test('should initialize selected tools non-interactively without installing', async () => {
    const caseDir = path.join(tempDir, 'case-init-run');
    mkdirSync(caseDir, { recursive: true });
    writeFileSync(
      path.join(caseDir, 'package.json'),
      JSON.stringify({ name: 'init-test' })
    );

    const res = await runInit({
      cwd: caseDir,
      tools: ['eslint', 'prettier'],
      packageManager: 'pnpm',
      skipInstall: true,
      silent: true,
    });

    expect(res.selectedTools).toEqual(['eslint', 'prettier']);
    expect(res.packageManager).toBe('pnpm');
    expect(res.createdFiles).toContain('eslint.config.mjs');
    expect(res.createdFiles).toContain('prettier.config.mjs');
    expect(existsSync(path.join(caseDir, 'eslint.config.mjs'))).toBe(true);
    expect(existsSync(path.join(caseDir, 'prettier.config.mjs'))).toBe(true);

    const pkg = JSON.parse(
      readFileSync(path.join(caseDir, 'package.json'), 'utf8')
    );
    expect(pkg.scripts.lint).toBeDefined();
    expect(pkg.scripts.fmt).toBeDefined();
  });

  test('should return empty result if no tools are selected', async () => {
    const caseDir = path.join(tempDir, 'case-init-empty');
    mkdirSync(caseDir, { recursive: true });

    const res = await runInit({
      cwd: caseDir,
      tools: [],
      skipInstall: true,
      silent: true,
    });

    expect(res.selectedTools).toEqual([]);
    expect(res.createdFiles).toEqual([]);
  });
});
