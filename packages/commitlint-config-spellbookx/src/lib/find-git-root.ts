/**
 * @file find-git-root.ts
 * Utility to locate the root directory of a git repository.
 */

import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Finds the git root directory by traversing upwards from startDir.
 *
 * @param startDir - Directory to start searching from (defaults to process.cwd()).
 * @returns Path to git root directory, or null if not within a git repository.
 * @example
 * ```ts
 * const root = findGitRoot();
 * ```
 */
export function findGitRoot(startDir: string = process.cwd()): string | null {
  let current = path.resolve(startDir);
  while (true) {
    if (existsSync(path.join(current, '.git'))) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      return null;
    }
    current = parent;
  }
}
