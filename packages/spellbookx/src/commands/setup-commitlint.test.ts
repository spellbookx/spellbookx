import assert from 'node:assert';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { after, before, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';

import esmock from 'esmock';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testRoot = path.resolve(__dirname, '../../temp-test-setup-commitlint');

describe('setupCommitlint', () => {
  before(() => {
    if (existsSync(testRoot))
      rmSync(testRoot, { recursive: true, force: true });
    mkdirSync(testRoot, { recursive: true });
  });

  after(() => {
    rmSync(testRoot, { recursive: true, force: true });
  });

  test('should create commitlint configs and handle lefthook', async () => {
    const originalCwd = process.cwd();
    process.chdir(testRoot);

    try {
      const setupCommitlint = await esmock('./setup-commitlint.js', {
        inquirer: {
          prompt: async () => ({ gitHook: 'lefthook' }),
        },
        '../utils/copy-asset.js': {
          copyAsset: (name: string) => {
            // Mock copying by creating an empty file
            writeFileSync(path.join(testRoot, name), 'mocked content');
          },
        },
        '../utils/install-deps.js': {
          installDeps: async () => {},
        },
      });

      await setupCommitlint.setupCommitlint();

      assert.strictEqual(
        existsSync(path.join(testRoot, 'commitlint.config.mjs')),
        true
      );
      assert.strictEqual(existsSync(path.join(testRoot, '.czrc')), true);
      assert.strictEqual(existsSync(path.join(testRoot, 'lefthook.yml')), true);
    } finally {
      process.chdir(originalCwd);
    }
  });
});
