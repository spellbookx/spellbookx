import { describe, expect, it } from 'vitest';

import defaultIgnores, {
  all,
  core,
  go,
  ignorePaths,
  ignores,
  lockFiles,
  misc,
  node,
  python,
  rust,
  toolchains,
  windows,
} from '../src/ignores/index.js';

describe('@spellbookx/recipes/ignores', () => {
  it('exports ignores as both default and named export', () => {
    expect(defaultIgnores).toBe(ignores);
    expect(ignorePaths).toEqual(all);
  });

  it.each([
    [
      'core',
      core,
      ['**/*LICENSE*', '**/CHANGELOG.md', '**/.cache/**', '**/.DS_Store'],
    ],
    [
      'node',
      node,
      [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/.turbo/**',
        '**/.next/**',
      ],
    ],
    [
      'lockFiles',
      lockFiles,
      [
        '**/package-lock.json',
        '**/pnpm-lock.yaml',
        '**/yarn.lock',
        '**/bun.lockb',
      ],
    ],
    ['rust', rust, ['**/target/**', '**/.cargo/**', '**/Cargo.lock']],
    ['go', go, ['**/go.sum', '**/go.work', '**/vendor/**']],
    [
      'python',
      python,
      ['**/__pycache__/**', '**/.venv/**', '**/.pytest_cache/**'],
    ],
    [
      'toolchains',
      toolchains,
      ['**/.git/**', '**/.vscode/**', '**/.gradle/**', '**/.changeset/**'],
    ],
    [
      'windows',
      windows,
      ['**/Thumbs.db', '**/desktop.ini', '**/$RECYCLE.BIN/**'],
    ],
    ['misc', misc, ['**/connect.lock', '**/*.hbs', '**/*.mustache']],
  ] as const)(
    'category "%s" contains expected glob patterns',
    (key, group, expectedPatterns) => {
      expect(ignores[key]).toBe(group);
      expect(Array.isArray(group)).toBe(true);
      expect(group.length).toBeGreaterThan(0);

      for (const pattern of expectedPatterns) {
        expect(group).toContain(pattern);
      }
    }
  );

  it('aggregates all category groups into "all" and "ignorePaths"', () => {
    expect(ignores.all).toBe(all);
    expect(all.length).toBe(
      core.length +
        node.length +
        lockFiles.length +
        rust.length +
        go.length +
        python.length +
        toolchains.length +
        windows.length +
        misc.length
    );

    for (const pattern of [
      ...core,
      ...node,
      ...lockFiles,
      ...rust,
      ...go,
      ...python,
      ...toolchains,
      ...windows,
      ...misc,
    ]) {
      expect(all).toContain(pattern);
      expect(ignorePaths).toContain(pattern);
    }
  });
});
