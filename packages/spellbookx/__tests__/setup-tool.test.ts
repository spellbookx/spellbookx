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

import { setupTool } from '../src/lib/setup-tool.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tempDir = path.resolve(__dirname, '../temp-setup-tool');

describe('setupTool', () => {
  beforeAll(() => {
    mkdirSync(tempDir, { recursive: true });
  });

  afterAll(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  test('should setup cspell tool files and package.json scripts', () => {
    const caseDir = path.join(tempDir, 'case-cspell');
    mkdirSync(caseDir, { recursive: true });
    writeFileSync(
      path.join(caseDir, 'package.json'),
      JSON.stringify({ name: 'cspell-test' })
    );

    const res = setupTool('cspell', { cwd: caseDir });

    expect(res.toolId).toBe('cspell');
    expect(res.createdFiles).toContain('cspell.config.cjs');
    expect(res.createdFiles).toContain('.config/cspell/custom.txt');
    expect(existsSync(path.join(caseDir, 'cspell.config.cjs'))).toBe(true);

    const pkg = JSON.parse(
      readFileSync(path.join(caseDir, 'package.json'), 'utf8')
    );
    expect(pkg.scripts.spellcheck).toBeDefined();
  });

  test('should setup commitlint tool and cz-git config', () => {
    const caseDir = path.join(tempDir, 'case-commitlint');
    mkdirSync(caseDir, { recursive: true });
    writeFileSync(
      path.join(caseDir, 'package.json'),
      JSON.stringify({ name: 'commitlint-test' })
    );

    const res = setupTool('commitlint', { cwd: caseDir });

    expect(res.toolId).toBe('commitlint');
    expect(res.createdFiles).toContain('commitlint.config.mjs');

    const pkg = JSON.parse(
      readFileSync(path.join(caseDir, 'package.json'), 'utf8')
    );
    expect(pkg.scripts.commit).toBe('cz');
    expect(pkg.config.commitizen.path).toBe('cz-git');
  });

  test('should setup eslint tool', () => {
    const caseDir = path.join(tempDir, 'case-eslint');
    mkdirSync(caseDir, { recursive: true });
    writeFileSync(
      path.join(caseDir, 'package.json'),
      JSON.stringify({ name: 'eslint-test' })
    );

    const res = setupTool('eslint', { cwd: caseDir });

    expect(res.toolId).toBe('eslint');
    expect(res.createdFiles).toContain('eslint.config.mjs');

    const pkg = JSON.parse(
      readFileSync(path.join(caseDir, 'package.json'), 'utf8')
    );
    expect(pkg.scripts.lint).toBeDefined();
  });

  test('should setup prettier tool and prettierignore', () => {
    const caseDir = path.join(tempDir, 'case-prettier');
    mkdirSync(caseDir, { recursive: true });
    writeFileSync(
      path.join(caseDir, 'package.json'),
      JSON.stringify({ name: 'prettier-test' })
    );

    const res = setupTool('prettier', { cwd: caseDir });

    expect(res.toolId).toBe('prettier');
    expect(res.createdFiles).toContain('prettier.config.mjs');
    expect(res.createdFiles).toContain('.prettierignore');

    const pkg = JSON.parse(
      readFileSync(path.join(caseDir, 'package.json'), 'utf8')
    );
    expect(pkg.scripts.fmt).toBeDefined();
  });

  test('should throw error for unknown tool', () => {
    // @ts-expect-error testing invalid tool id
    expect(() => setupTool('unknown-tool', { cwd: tempDir })).toThrow(
      /Unknown tool/
    );
  });
});
