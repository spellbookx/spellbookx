/**
 * @file get-install-args.ts
 * Resolves package manager CLI arguments for installing development dependencies.
 */

import type { PackageManager } from '../types/index.js';

export interface InstallCommand {
  command: string;
  args: string[];
}

/**
 * Returns the command and arguments to install devDependencies.
 *
 * @param pm - Package manager name ('pnpm', 'npm', 'yarn', or 'bun').
 * @param dependencies - List of package dependency names to install.
 * @returns Executable command and CLI argument array.
 */
export function getInstallArgs(
  pm: PackageManager,
  dependencies: string[]
): InstallCommand {
  switch (pm) {
    case 'pnpm': {
      return {
        command: 'pnpm',
        args: ['add', '-D', ...dependencies],
      };
    }
    case 'bun': {
      return {
        command: 'bun',
        args: ['add', '-d', ...dependencies],
      };
    }
    case 'yarn': {
      return {
        command: 'yarn',
        args: ['add', '-D', ...dependencies],
      };
    }
    default: {
      return {
        command: 'npm',
        args: ['install', '--save-dev', ...dependencies],
      };
    }
  }
}
