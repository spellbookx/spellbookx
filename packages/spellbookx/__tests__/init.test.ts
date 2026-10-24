import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { runInit } from '../src/commands/init.js';
import * as installDepsModule from '../src/lib/install-deps.js';
import * as promptToolsModule from '../src/lib/prompt-tools.js';

describe('spellbookx (runInit)', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(path.join(os.tmpdir(), 'sbx-init-'));
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    rmSync(tempDir, { recursive: true, force: true });
  });

  it('initializes selected tools non-interactively when skipInstall is true', async () => {
    writeFileSync(
      path.join(tempDir, 'package.json'),
      JSON.stringify({ name: 'init-test' })
    );

    const res = await runInit({
      cwd: tempDir,
      tools: ['eslint', 'prettier'],
      packageManager: 'pnpm',
      skipInstall: true,
      silent: true,
    });

    expect(res.selectedTools).toEqual(['eslint', 'prettier']);
    expect(res.packageManager).toBe('pnpm');
    expect(res.createdFiles).toEqual(
      expect.arrayContaining([
        'eslint.config.mjs',
        'prettier.config.mjs',
        '.prettierignore',
      ])
    );
    expect(existsSync(path.join(tempDir, 'eslint.config.mjs'))).toBe(true);
    expect(existsSync(path.join(tempDir, 'prettier.config.mjs'))).toBe(true);

    const pkg = JSON.parse(
      readFileSync(path.join(tempDir, 'package.json'), 'utf8')
    );
    expect(pkg.scripts.lint).toBeDefined();
    expect(pkg.scripts.fmt).toBeDefined();
  });

  it('prompts for tools interactively and invokes installDeps when skipInstall is false', async () => {
    writeFileSync(
      path.join(tempDir, 'package.json'),
      JSON.stringify({ name: 'interactive-test' })
    );

    const promptSpy = vi
      .spyOn(promptToolsModule, 'promptTools')
      .mockResolvedValue(['cspell']);
    const installSpy = vi
      .spyOn(installDepsModule, 'installDeps')
      .mockResolvedValue();

    const res = await runInit({
      cwd: tempDir,
      packageManager: 'bun',
      skipInstall: false,
      silent: true,
    });

    expect(promptSpy).toHaveBeenCalledTimes(1);
    expect(installSpy).toHaveBeenCalledWith(
      'bun',
      expect.arrayContaining(['cspell', 'cspell-config-spellbookx']),
      { cwd: tempDir, silent: true }
    );
    expect(res.selectedTools).toEqual(['cspell']);
    expect(res.createdFiles).toContain('cspell.config.cjs');
  });

  it('returns an empty result without installing or creating files when no tools are selected', async () => {
    const installSpy = vi
      .spyOn(installDepsModule, 'installDeps')
      .mockResolvedValue();

    const res = await runInit({
      cwd: tempDir,
      tools: [],
      skipInstall: false,
      silent: true,
    });

    expect(installSpy).not.toHaveBeenCalled();
    expect(res).toEqual({
      selectedTools: [],
      packageManager: 'pnpm',
      installedDependencies: [],
      createdFiles: [],
    });
  });
});
