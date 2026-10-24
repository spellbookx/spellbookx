import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { detectPackageManager } from '../src/lib/detect-pm.js';

describe('spellbookx (detectPackageManager)', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(path.join(os.tmpdir(), 'sbx-detect-pm-'));
  });

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  it.each([
    ['pnpm@9.0.0', 'pnpm'],
    ['bun@1.2.0', 'bun'],
    ['yarn@4.0.0', 'yarn'],
    ['npm@10.0.0', 'npm'],
  ] as const)(
    'detects "%s" from package.json packageManager field as "%s"',
    (pmField, expected) => {
      writeFileSync(
        path.join(tempDir, 'package.json'),
        JSON.stringify({ packageManager: pmField })
      );

      expect(detectPackageManager(tempDir)).toBe(expected);
    }
  );

  it.each([
    ['pnpm-lock.yaml', 'pnpm'],
    ['bun.lock', 'bun'],
    ['bun.lockb', 'bun'],
    ['yarn.lock', 'yarn'],
    ['package-lock.json', 'npm'],
  ] as const)(
    'detects package manager from lockfile "%s" as "%s"',
    (lockfile, expected) => {
      writeFileSync(path.join(tempDir, lockfile), '');

      expect(detectPackageManager(tempDir)).toBe(expected);
    }
  );

  it('falls back to lockfile detection when package.json contains invalid JSON', () => {
    writeFileSync(path.join(tempDir, 'package.json'), '{ malformed json');
    writeFileSync(path.join(tempDir, 'yarn.lock'), '');

    expect(detectPackageManager(tempDir)).toBe('yarn');
  });

  it('defaults to "pnpm" when no package.json or lockfiles exist', () => {
    expect(detectPackageManager(tempDir)).toBe('pnpm');
  });
});
