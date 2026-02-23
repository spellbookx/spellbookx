import assert from 'node:assert';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { after, before, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testRoot = path.resolve(__dirname, '../../temp-test-write-config');

describe('writeConfig', () => {
  before(() => {
    if (existsSync(testRoot))
      rmSync(testRoot, { recursive: true, force: true });
    mkdirSync(testRoot, { recursive: true });
  });

  after(() => {
    rmSync(testRoot, { recursive: true, force: true });
  });

  test('should write configuration to a file', async () => {
    const originalCwd = process.cwd();
    process.chdir(testRoot);

    try {
      const { writeConfig } = await import('./write-config.js');
      const content = 'export default { foo: "bar" };';
      writeConfig('my-config.mjs', content);

      const destPath = path.join(testRoot, 'my-config.mjs');
      assert.strictEqual(existsSync(destPath), true);
      assert.strictEqual(readFileSync(destPath, 'utf8'), content);
    } finally {
      process.chdir(originalCwd);
    }
  });
});
