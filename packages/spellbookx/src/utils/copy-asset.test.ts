import assert from 'node:assert';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { after, before, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testRoot = path.resolve(__dirname, '../../temp-test-copy-asset');

describe('copyAsset', () => {
  before(() => {
    if (existsSync(testRoot))
      rmSync(testRoot, { recursive: true, force: true });
    mkdirSync(testRoot, { recursive: true });
  });

  after(() => {
    rmSync(testRoot, { recursive: true, force: true });
  });

  test('should copy real asset to ROOT_DIR', async () => {
    const originalCwd = process.cwd();
    process.chdir(testRoot);

    try {
      const { copyAsset } = await import('./copy-asset.js');

      // Use a real asset from assets/configs/
      copyAsset('.czrc', 'copied-czrc.json');

      const destPath = path.join(testRoot, 'copied-czrc.json');
      assert.strictEqual(existsSync(destPath), true);
      // Verify content (should be the cz-git config)
      const content = JSON.parse(readFileSync(destPath, 'utf8'));
      assert.strictEqual(content.path, 'cz-git');
    } finally {
      process.chdir(originalCwd);
    }
  });
});
