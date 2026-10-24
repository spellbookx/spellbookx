import { describe, expect, test } from 'vitest';

import {
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
  test('ignorePaths should contain standard essential monorepo patterns', () => {
    expect(ignorePaths).toContain('**/node_modules/**');
    expect(ignorePaths).toContain('**/dist/**');
    expect(ignorePaths).toContain('**/.turbo/**');
    expect(ignorePaths).toContain('**/pnpm-lock.yaml');
    expect(ignorePaths).toContain('**/.git/**');
    expect(ignorePaths).toContain('**/.cache/**');
    expect(ignorePaths.length).toBeGreaterThan(0);
  });

  test('ignores dictionary should contain expected ignore groups', () => {
    expect(ignores.core).toBe(core);
    expect(ignores.node).toBe(node);
    expect(ignores.lockFiles).toBe(lockFiles);
    expect(ignores.rust).toBe(rust);
    expect(ignores.go).toBe(go);
    expect(ignores.python).toBe(python);
    expect(ignores.toolchains).toBe(toolchains);
    expect(ignores.windows).toBe(windows);
    expect(ignores.misc).toBe(misc);
    expect(ignores.all).toBe(all);
  });

  test('node group should contain standard build output directories', () => {
    expect(node).toContain('**/node_modules/**');
    expect(node).toContain('**/dist/**');
    expect(node).toContain('**/build/**');
    expect(node).toContain('**/.turbo/**');
    expect(node).toContain('**/.next/**');
  });

  test('lockFiles group should contain common package manager lock files', () => {
    expect(lockFiles).toContain('**/package-lock.json');
    expect(lockFiles).toContain('**/pnpm-lock.yaml');
    expect(lockFiles).toContain('**/yarn.lock');
    expect(lockFiles).toContain('**/bun.lockb');
  });

  test('all group should contain patterns from multiple categories', () => {
    expect(all.length).toBeGreaterThan(node.length);
    expect(all).toContain('**/node_modules/**');
    expect(all).toContain('**/Cargo.lock');
    expect(all).toContain('**/Thumbs.db');
  });
});
