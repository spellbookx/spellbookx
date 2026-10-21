import { describe, expect, test } from 'vitest';

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

describe('cspell-config-spellbookx - ignore-paths', () => {
  test('should export ignorePaths as named and default exports', () => {
    expect(ignorePaths).toBeDefined();
    expect(defaultIgnorePaths).toBeDefined();
    expect(ignorePaths).toBe(defaultIgnorePaths);
    expect(Array.isArray(ignorePaths)).toBe(true);
    expect(ignorePaths.length).toBeGreaterThan(0);
  });

  test('should contain essential root ignore patterns', () => {
    const requiredPatterns = [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.turbo/**',
      '**/pnpm-lock.yaml',
      '**/.git/**',
      '**/.cache/**',
    ];

    for (const pattern of requiredPatterns) {
      expect(ignorePaths).toContain(pattern);
    }
  });

  test('should define and combine all category ignore path groups', () => {
    const categories = [
      CORE_IGNORE_PATHS,
      NODE_IGNORE_PATHS,
      LOCK_FILES_IGNORE_PATHS,
      RUST_IGNORE_PATHS,
      GO_IGNORE_PATHS,
      PYTHON_IGNORE_PATHS,
      TOOLCHAINS_IGNORE_PATHS,
      WINDOWS_IGNORE_PATHS,
      MISC_IGNORE_PATHS,
    ];

    for (const category of categories) {
      expect(Array.isArray(category)).toBe(true);
      expect(category.length).toBeGreaterThan(0);

      for (const pattern of category) {
        expect(ignorePaths).toContain(pattern);
      }
    }
  });
});
