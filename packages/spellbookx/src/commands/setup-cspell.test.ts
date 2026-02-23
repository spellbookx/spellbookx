import assert from 'node:assert';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { after, before, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';

import esmock from 'esmock';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testRoot = path.resolve(__dirname, '../../temp-test-setup-cspell');

describe('setupCspell', () => {
  before(() => {
    if (existsSync(testRoot))
      rmSync(testRoot, { recursive: true, force: true });
    mkdirSync(testRoot, { recursive: true });
  });

  after(() => {
    rmSync(testRoot, { recursive: true, force: true });
  });

  test('should create cspell.config.cjs', async () => {
    const originalCwd = process.cwd();
    process.chdir(testRoot);

    try {
      const setupCspell = await esmock('./setup-cspell.js', {
        '../utils/install-deps.js': {
          installDeps: async () => {},
        },
      });

      await setupCspell.setupCspell();

      const configPath = path.join(testRoot, 'cspell.config.cjs');
      assert.strictEqual(existsSync(configPath), true);
      const content = readFileSync(configPath, 'utf8');
      assert.ok(content.includes("require('cspell-config-spellbookx')"));
    } finally {
      process.chdir(originalCwd);
    }
  });
});
