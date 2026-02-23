import assert from 'node:assert';
import { describe, test } from 'node:test';

import esmock from 'esmock';

describe('installTool', () => {
  test('should call setupEslint for eslint', async () => {
    let called = false;
    const install = await esmock('./install.js', {
      './setup-eslint.js': {
        setupEslint: async () => {
          called = true;
        },
      },
    });

    await install.installTool('eslint');
    assert.strictEqual(called, true);
  });

  test('should call setupPrettier for prettier', async () => {
    let called = false;
    const install = await esmock('./install.js', {
      './setup-prettier.js': {
        setupPrettier: async () => {
          called = true;
        },
      },
    });

    await install.installTool('prettier');
    assert.strictEqual(called, true);
  });

  test('should call setupCspell for cspell', async () => {
    let called = false;
    const install = await esmock('./install.js', {
      './setup-cspell.js': {
        setupCspell: async () => {
          called = true;
        },
      },
    });

    await install.installTool('cspell');
    assert.strictEqual(called, true);
  });

  test('should call setupCommitlint for commitlint', async () => {
    let called = false;
    const install = await esmock('./install.js', {
      './setup-commitlint.js': {
        setupCommitlint: async () => {
          called = true;
        },
      },
    });

    await install.installTool('commitlint');
    assert.strictEqual(called, true);
  });

  test('should call setupVscode for vscode', async () => {
    let called = false;
    const install = await esmock('./install.js', {
      './setup-vscode.js': {
        setupVscode: async () => {
          called = true;
        },
      },
    });

    await install.installTool('vscode');
    assert.strictEqual(called, true);
  });

  test('should call copyAsset for editorconfig', async () => {
    let calledWith: string | null = null;
    const install = await esmock('./install.js', {
      '../utils/copy-asset.js': {
        copyAsset: (name: string) => {
          calledWith = name;
        },
      },
    });

    await install.installTool('editorconfig');
    assert.strictEqual(calledWith, '.editorconfig');
  });
});
