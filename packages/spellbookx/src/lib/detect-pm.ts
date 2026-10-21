/**
 * @file detect-pm.ts
 * Detects the active package manager in a directory.
 */

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import type { PackageManager } from '../types/index.js';

/**
 * Detects the active package manager from package.json or lockfiles.
 *
 * @param cwd - Target directory path (defaults to process.cwd()).
 * @returns The detected PackageManager ('pnpm', 'bun', 'yarn', or 'npm').
 */
export function detectPackageManager(
  cwd: string = process.cwd()
): PackageManager {
  const packageJsonPath = path.join(cwd, 'package.json');

  if (existsSync(packageJsonPath)) {
    try {
      const content = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {
        packageManager?: string;
      };

      if (content.packageManager) {
        if (content.packageManager.startsWith('pnpm')) return 'pnpm';
        if (content.packageManager.startsWith('bun')) return 'bun';
        if (content.packageManager.startsWith('yarn')) return 'yarn';
        if (content.packageManager.startsWith('npm')) return 'npm';
      }
    } catch {
      // ignore invalid package.json and fallback to lockfiles
    }
  }

  if (existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (
    existsSync(path.join(cwd, 'bun.lock')) ||
    existsSync(path.join(cwd, 'bun.lockb'))
  ) {
    return 'bun';
  }
  if (existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  return existsSync(path.join(cwd, 'package-lock.json')) ? 'npm' : 'pnpm';
}
