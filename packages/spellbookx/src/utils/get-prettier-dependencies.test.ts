import assert from 'node:assert';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { after, before, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testRoot = path.resolve(__dirname, '../../temp-test-prettier-deps');

describe('getPrettierDependencies', () => {
  before(() => {
    if (existsSync(testRoot))
      rmSync(testRoot, { recursive: true, force: true });
    mkdirSync(path.join(testRoot, 'node_modules/prettier-config-spellbookx'), {
      recursive: true,
    });

    const pkg = {
      name: 'prettier-config-spellbookx',
      dependencies: {
        'prettier-plugin-foo': '^1.0.0',
        'prettier-plugin-bar': '^2.0.0',
      },
    };
    writeFileSync(
      path.join(
        testRoot,
        'node_modules/prettier-config-spellbookx/package.json'
      ),
      JSON.stringify(pkg)
    );
  });

  after(() => {
    rmSync(testRoot, { recursive: true, force: true });
  });

  test('should read dependencies from node_modules', async () => {
    const originalCwd = process.cwd();
    process.chdir(testRoot);

    try {
      const { getPrettierDependencies } =
        await import('./get-prettier-dependencies.js');
      const deps = getPrettierDependencies();
      assert.deepStrictEqual(deps, [
        'prettier-plugin-foo',
        'prettier-plugin-bar',
      ]);
    } finally {
      process.chdir(originalCwd);
    }
  });

  test('should return default list if file not found', async () => {
    const originalCwd = process.cwd();
    // Create a temp dir without the file
    const emptyDir = path.resolve(testRoot, '../empty-dir');
    if (!existsSync(emptyDir)) mkdirSync(emptyDir, { recursive: true });
    process.chdir(emptyDir);

    try {
      const { getPrettierDependencies } =
        await import('./get-prettier-dependencies.js');
      const deps = getPrettierDependencies();
      assert.ok(deps.includes('prettier'));
      assert.ok(deps.includes('@prettier/plugin-xml'));
    } finally {
      process.chdir(originalCwd);
      rmSync(emptyDir, { recursive: true, force: true });
    }
  });
});
