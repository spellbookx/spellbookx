import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { hasWrittenConfigFile } from '../src/lib/write-config.js';

describe('spellbookx (hasWrittenConfigFile)', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(path.join(os.tmpdir(), 'sbx-write-config-'));
  });

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  it('writes a configuration file and creates parent directories recursively', () => {
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

  it('does not overwrite an existing file when overwrite is false or omitted', () => {
    const relPath = 'existing.txt';
    hasWrittenConfigFile(relPath, 'initial', { cwd: tempDir });

    const rewritten = hasWrittenConfigFile(relPath, 'modified', {
      cwd: tempDir,
    });

    expect(rewritten).toBe(false);
    expect(readFileSync(path.join(tempDir, relPath), 'utf8')).toBe('initial');
  });

  it('overwrites an existing file when overwrite is true', () => {
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
