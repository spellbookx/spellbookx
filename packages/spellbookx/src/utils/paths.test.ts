import assert from 'node:assert';
import { existsSync } from 'node:fs';
import { describe, test } from 'node:test';

import { ASSETS_DIR, ROOT_DIR } from './paths.js';

describe('paths.ts', () => {
  test('ASSETS_DIR should be a valid path and exist', () => {
    assert.ok(ASSETS_DIR, 'ASSETS_DIR should be defined');
    assert.strictEqual(
      existsSync(ASSETS_DIR),
      true,
      `ASSETS_DIR should exist: ${ASSETS_DIR}`
    );
  });

  test('ROOT_DIR should be the current working directory', () => {
    assert.strictEqual(ROOT_DIR, process.cwd());
  });
});
