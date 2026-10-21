import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import { detectPackageManager } from '../src/lib/detect-pm.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tempDir = path.resolve(__dirname, '../temp-detect-pm');

describe('detectPackageManager', () => {
  beforeAll(() => {
    mkdirSync(tempDir, { recursive: true });
  });

  afterAll(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  test('should detect from package.json packageManager field', () => {
    const caseDir = path.join(tempDir, 'case-pm-field');
    mkdirSync(caseDir, { recursive: true });
    writeFileSync(
      path.join(caseDir, 'package.json'),
      JSON.stringify({ packageManager: 'bun@1.2.0' })
    );

    expect(detectPackageManager(caseDir)).toBe('bun');
  });

  test('should detect pnpm from pnpm-lock.yaml', () => {
    const caseDir = path.join(tempDir, 'case-pnpm');
    mkdirSync(caseDir, { recursive: true });
    writeFileSync(path.join(caseDir, 'pnpm-lock.yaml'), '');

    expect(detectPackageManager(caseDir)).toBe('pnpm');
  });

  test('should detect bun from bun.lockb', () => {
    const caseDir = path.join(tempDir, 'case-bun');
    mkdirSync(caseDir, { recursive: true });
    writeFileSync(path.join(caseDir, 'bun.lockb'), '');

    expect(detectPackageManager(caseDir)).toBe('bun');
  });

  test('should detect yarn from yarn.lock', () => {
    const caseDir = path.join(tempDir, 'case-yarn');
    mkdirSync(caseDir, { recursive: true });
    writeFileSync(path.join(caseDir, 'yarn.lock'), '');

    expect(detectPackageManager(caseDir)).toBe('yarn');
  });

  test('should detect npm from package-lock.json', () => {
    const caseDir = path.join(tempDir, 'case-npm');
    mkdirSync(caseDir, { recursive: true });
    writeFileSync(path.join(caseDir, 'package-lock.json'), '');

    expect(detectPackageManager(caseDir)).toBe('npm');
  });

  test('should default to pnpm when no indicators are present', () => {
    const caseDir = path.join(tempDir, 'case-empty');
    mkdirSync(caseDir, { recursive: true });

    expect(detectPackageManager(caseDir)).toBe('pnpm');
  });
});
