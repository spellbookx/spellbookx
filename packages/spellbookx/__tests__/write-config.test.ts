import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import { hasWrittenConfigFile } from '../src/lib/write-config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tempDir = path.resolve(__dirname, '../temp-write-config');

describe('writeConfigFile', () => {
  beforeAll(() => {
    mkdirSync(tempDir, { recursive: true });
  });

  afterAll(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  test('should write file and create parent directory recursively', () => {
    const relPath = '.nested/folder/config.mjs';
    const written = hasWrittenConfigFile(relPath, 'export default {};', {
      cwd: tempDir,
    });

    expect(written).toBe(true);
    expect(existsSync(path.join(tempDir, relPath))).toBe(true);
    expect(readFileSync(path.join(tempDir, relPath), 'utf8')).toBe(
      'export default {};'
    );
  });

  test('should not overwrite file by default if already exists', () => {
    const relPath = 'existing.txt';
    hasWrittenConfigFile(relPath, 'initial', { cwd: tempDir });

    const rewritten = hasWrittenConfigFile(relPath, 'modified', {
      cwd: tempDir,
    });
    expect(rewritten).toBe(false);
    expect(readFileSync(path.join(tempDir, relPath), 'utf8')).toBe('initial');
  });

  test('should overwrite when overwrite option is true', () => {
    const relPath = 'overwrite.txt';
    hasWrittenConfigFile(relPath, 'v1', { cwd: tempDir });

    const overwritten = hasWrittenConfigFile(relPath, 'v2', {
      cwd: tempDir,
      overwrite: true,
    });
    expect(overwritten).toBe(true);
    expect(readFileSync(path.join(tempDir, relPath), 'utf8')).toBe('v2');
  });
});
