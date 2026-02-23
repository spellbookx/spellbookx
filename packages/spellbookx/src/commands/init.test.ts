import assert from 'node:assert';
import { describe, test } from 'node:test';

import esmock from 'esmock';

describe('initAction', () => {
  test('should orchestrate setup for multiple tools', async () => {
    let editorConfigCalled = false;

    const init = await esmock('./init.js', {
      inquirer: {
        prompt: async (questions: unknown) => {
          const q = questions as { name: string }[];
          if (q[0].name === 'tools') {
            return { tools: ['eslint', 'prettier', 'commitlint'] };
          }
          if (q[0].name === 'configs') {
            return { configs: ['recommended'] };
          }
          if (q[0].name === 'gitHook') {
            return { gitHook: 'none' };
          }
          return {};
        },
      },
      '../utils/copy-asset.js': {
        copyAsset: (name: string) => {
          if (name === '.editorconfig') editorConfigCalled = true;
        },
      },
      '../utils/write-config.js': {
        writeConfig: () => {},
      },
      '../utils/get-prettier-dependencies.js': {
        getPrettierDependencies: () => ['prettier'],
      },
      execa: {
        execa: async () => ({}),
      },
    });

    // Mock internal functions by spying on them if they were separate,
    // but here they are in the same file. I'll just check if the logic flows.
    // Since setupEslint etc are NOT exported from init.ts, I can't easily spy on them
    // unless I refactor init.ts too.

    // For now, I'll just run it and ensure it doesn't crash and calls the shared utils.
    await init.initAction();

    assert.strictEqual(editorConfigCalled, true);
  });
});
