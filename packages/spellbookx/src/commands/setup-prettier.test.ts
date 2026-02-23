import assert from 'node:assert';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { after, before, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';

import esmock from 'esmock';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testRoot = path.resolve(__dirname, '../../temp-test-setup-prettier');

describe('setupPrettier', () => {
  before(() => {
    if (existsSync(testRoot))
      rmSync(testRoot, { recursive: true, force: true });
    mkdirSync(testRoot, { recursive: true });
  });

  after(() => {
    rmSync(testRoot, { recursive: true, force: true });
  });

  test('should create prettier.config.mjs and install dependencies', async () => {
    const originalCwd = process.cwd();
    process.chdir(testRoot);

    try {
      const setupPrettier = await esmock('./setup-prettier.js', {
        inquirer: {
          prompt: async () => ({ configs: ['base', 'tailwind'] }),
        },
        execa: {
          execa: async () => ({}),
        },
        '../utils/install-deps.js': {
          installDeps: async () => {},
        },
        '../utils/get-prettier-dependencies.js': {
          getPrettierDependencies: () => ['prettier', 'plugin-tailwind'],
        },
      });

      await setupPrettier.setupPrettier();

      const configPath = path.join(testRoot, 'prettier.config.mjs');
      assert.strictEqual(existsSync(configPath), true);
      const content = readFileSync(configPath, 'utf8');
      assert.ok(content.includes("...spellbookx['base']"));
      assert.ok(content.includes("...spellbookx['tailwind']"));
    } finally {
      process.chdir(originalCwd);
    }
  });
});
