import assert from 'node:assert';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { after, before, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';

import esmock from 'esmock';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testRoot = path.resolve(__dirname, '../../temp-test-setup-vscode');

describe('setupVscode', () => {
  before(() => {
    if (existsSync(testRoot))
      rmSync(testRoot, { recursive: true, force: true });
    mkdirSync(testRoot, { recursive: true });
  });

  after(() => {
    rmSync(testRoot, { recursive: true, force: true });
  });

  test('should copy vscode configs', async () => {
    const originalCwd = process.cwd();
    process.chdir(testRoot);

    try {
      const copiedFiles: string[] = [];
      const setupVscodeModule = await esmock('./setup-vscode.js', {
        '../utils/copy-asset.js': {
          copyAsset: (src: string, dest: string) => {
            copiedFiles.push(dest);
          },
        },
      });

      await setupVscodeModule.setupVscode();

      assert.ok(copiedFiles.includes('.vscode/extensions.json'));
      assert.ok(copiedFiles.includes('.vscode/settings.json'));
    } finally {
      process.chdir(originalCwd);
    }
  });
});
