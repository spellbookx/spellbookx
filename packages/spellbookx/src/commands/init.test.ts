import assert from 'node:assert';
import { describe, test } from 'node:test';

import esmock from 'esmock';

describe('initAction', () => {
  test('should orchestrate setup for multiple tools', async () => {
    let editorConfigCalled = false;

    // We need to mock the setup functions that initAction now calls
    const init = await esmock('./init.js', {
      './setup-eslint.js': {
        setupEslint: async () => {},
      },
      './setup-prettier.js': {
        setupPrettier: async () => {},
      },
      './setup-cspell.js': {
        setupCspell: async () => {},
      },
      './setup-commitlint.js': {
        setupCommitlint: async () => {},
      },
      './setup-vscode.js': {
        setupVscode: async () => {},
      },
      '../utils/ask-package-managers.js': {
        askPackageManagers: async () => ({
          globalManager: 'pnpm',
          localManager: 'pnpm',
        }),
      },
      inquirer: {
        prompt: async (questions: unknown) => {
          const q = questions as { name: string }[];
          if (q[0].name === 'tools') {
            return { tools: ['eslint', 'prettier', 'commitlint', 'vscode'] };
          }
          return {};
        },
      },
      '../utils/copy-asset.js': {
        copyAsset: (name: string) => {
          if (name === '.editorconfig') editorConfigCalled = true;
        },
      },
    });

    await init.initAction();

    assert.strictEqual(editorConfigCalled, true);
  });
});
