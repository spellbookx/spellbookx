import { describe, expect, it } from 'vitest';

import defaultIgnorePaths, {
  CORE_IGNORE_PATHS,
  GO_IGNORE_PATHS,
  ignorePaths,
  LOCK_FILES_IGNORE_PATHS,
  MISC_IGNORE_PATHS,
  NODE_IGNORE_PATHS,
  PYTHON_IGNORE_PATHS,
  RUST_IGNORE_PATHS,
  TOOLCHAINS_IGNORE_PATHS,
  WINDOWS_IGNORE_PATHS,
} from '../src/constants/ignore-paths.js';

describe('cspell-config-spellbookx (ignorePaths)', () => {
  it('exports ignorePaths as both default and named export', () => {
    expect(defaultIgnorePaths).toBe(ignorePaths);
    expect(Array.isArray(ignorePaths)).toBe(true);
    expect(ignorePaths.length).toBeGreaterThan(0);
  });

  it.each([
    [
      'CORE_IGNORE_PATHS',
      CORE_IGNORE_PATHS,
      ['**/*LICENSE*', '**/CHANGELOG.md', '**/.cache/**', '**/.DS_Store'],
    ],
    [
      'NODE_IGNORE_PATHS',
      NODE_IGNORE_PATHS,
      ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.turbo/**'],
    ],
    [
      'LOCK_FILES_IGNORE_PATHS',
      LOCK_FILES_IGNORE_PATHS,
      ['**/pnpm-lock.yaml', '**/package-lock.json', '**/yarn.lock'],
    ],
    ['RUST_IGNORE_PATHS', RUST_IGNORE_PATHS, ['**/target/**', '**/Cargo.lock']],
    ['GO_IGNORE_PATHS', GO_IGNORE_PATHS, ['**/go.sum']],
    ['PYTHON_IGNORE_PATHS', PYTHON_IGNORE_PATHS, ['**/__pycache__/**']],
    [
      'TOOLCHAINS_IGNORE_PATHS',
      TOOLCHAINS_IGNORE_PATHS,
      ['**/.git/**', '**/.gradle/**'],
    ],
    ['WINDOWS_IGNORE_PATHS', WINDOWS_IGNORE_PATHS, ['**/Thumbs.db']],
    ['MISC_IGNORE_PATHS', MISC_IGNORE_PATHS, ['**/connect.lock', '**/*.hbs']],
  ] as const)(
    'merges %s into root ignorePaths',
    (_name, category, expectedPatterns) => {
      expect(category.length).toBeGreaterThan(0);
      for (const pattern of expectedPatterns) {
        expect(category).toContain(pattern);
      }
      for (const pattern of category) {
        expect(ignorePaths).toContain(pattern);
      }
    }
  );
});
