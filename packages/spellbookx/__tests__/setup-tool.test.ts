import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { setupTool } from '../src/lib/setup-tool.js';

describe('spellbookx (setupTool)', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(path.join(os.tmpdir(), 'sbx-setup-tool-'));
    writeFileSync(
      path.join(tempDir, 'package.json'),
      JSON.stringify({ name: 'setup-tool-test' })
    );
  });

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  it('sets up cspell configuration files and package.json scripts', () => {
    const res = setupTool('cspell', { cwd: tempDir });

    expect(res.toolId).toBe('cspell');
    expect(res.createdFiles).toEqual([
      'cspell.config.cjs',
      '.config/cspell/custom.txt',
    ]);
    expect(existsSync(path.join(tempDir, 'cspell.config.cjs'))).toBe(true);
    expect(existsSync(path.join(tempDir, '.config/cspell/custom.txt'))).toBe(
      true
    );

    const pkg = JSON.parse(
      readFileSync(path.join(tempDir, 'package.json'), 'utf8')
    );
    expect(pkg.scripts.spellcheck).toBeDefined();
  });

  it('sets up commitlint configuration and cz-git commitizen settings', () => {
    const res = setupTool('commitlint', { cwd: tempDir });

    expect(res.toolId).toBe('commitlint');
    expect(res.createdFiles).toEqual(['commitlint.config.mjs']);

    const pkg = JSON.parse(
      readFileSync(path.join(tempDir, 'package.json'), 'utf8')
    );
    expect(pkg.scripts.commit).toBe('cz');
    expect(pkg.config.commitizen.path).toBe('cz-git');
  });

  it('sets up eslint flat configuration and lint scripts', () => {
    const res = setupTool('eslint', { cwd: tempDir });

    expect(res.toolId).toBe('eslint');
    expect(res.createdFiles).toEqual(['eslint.config.mjs']);

    const pkg = JSON.parse(
      readFileSync(path.join(tempDir, 'package.json'), 'utf8')
    );
    expect(pkg.scripts.lint).toBeDefined();
  });

  it('sets up prettier configuration, .prettierignore, and fmt scripts', () => {
    const res = setupTool('prettier', { cwd: tempDir });

    expect(res.toolId).toBe('prettier');
    expect(res.createdFiles).toEqual([
      'prettier.config.mjs',
      '.prettierignore',
    ]);

    const pkg = JSON.parse(
      readFileSync(path.join(tempDir, 'package.json'), 'utf8')
    );
    expect(pkg.scripts.fmt).toBeDefined();
  });

  it('throws an error for an unknown tool identifier', () => {
    // @ts-expect-error Testing runtime validation for invalid toolId
    expect(() => setupTool('unknown-tool', { cwd: tempDir })).toThrow(
      /Unknown tool: unknown-tool/
    );
  });
});
