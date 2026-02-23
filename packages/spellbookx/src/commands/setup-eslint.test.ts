import assert from 'node:assert';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { after, before, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';

import esmock from 'esmock';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testRoot = path.resolve(__dirname, '../../temp-test-setup-eslint');

describe('setupEslint', () => {
  before(() => {
    if (existsSync(testRoot))
      rmSync(testRoot, { recursive: true, force: true });
    mkdirSync(testRoot, { recursive: true });
  });

  after(() => {
    rmSync(testRoot, { recursive: true, force: true });
  });

  test('should create eslint.config.mjs with recommended config', async () => {
    const originalCwd = process.cwd();
    process.chdir(testRoot);

    try {
      const setupEslintModule = await esmock('./setup-eslint.js', {
        inquirer: {
          prompt: async () => ({ configs: ['recommended'] }),
        },
        '../utils/ask-package-managers.js': {
          askPackageManagers: async () => ({
            globalManager: 'pnpm',
            localManager: 'pnpm',
          }),
        },
        '../utils/install-deps.js': {
          installDeps: async () => {},
        },
      });

      await setupEslintModule.setupEslint();

      const configPath = path.join(testRoot, 'eslint.config.mjs');
      assert.strictEqual(existsSync(configPath), true);
      const content = readFileSync(configPath, 'utf8');
      assert.ok(content.includes('spellbookx.configs.recommended'));
    } finally {
      process.chdir(originalCwd);
    }
  });

  test('should create eslint.config.mjs with specific configs', async () => {
    const originalCwd = process.cwd();
    process.chdir(testRoot);

    try {
      const setupEslintModule = await esmock('./setup-eslint.js', {
        inquirer: {
          prompt: async () => ({ configs: ['javascript', 'json'] }),
        },
        '../utils/ask-package-managers.js': {
          askPackageManagers: async () => ({
            globalManager: 'pnpm',
            localManager: 'pnpm',
          }),
        },
        '../utils/install-deps.js': {
          installDeps: async () => {},
        },
      });

      await setupEslintModule.setupEslint();

      const configPath = path.join(testRoot, 'eslint.config.mjs');
      const content = readFileSync(configPath, 'utf8');
      assert.ok(content.includes('spellbookx.configs.javascript'));
      assert.ok(content.includes('spellbookx.configs.json'));
    } finally {
      process.chdir(originalCwd);
    }
  });
});
