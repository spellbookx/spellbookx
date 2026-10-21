/**
 * @file install-deps.ts
 * Executes dependency installation using the selected package manager.
 */

import { execa } from 'execa';
import ora from 'ora';

import type { PackageManager } from '../types/index.js';
import { getInstallArgs } from './get-install-args.js';

export interface InstallDepsOptions {
  cwd?: string;
  silent?: boolean;
}

/**
 * Installs a list of dependencies as devDependencies.
 *
 * @param pm - The package manager to use ('pnpm', 'npm', 'yarn', 'bun').
 * @param dependencies - Array of package names to install.
 * @param options - Execution options (cwd, silent).
 */
export async function installDeps(
  pm: PackageManager,
  dependencies: string[],
  options: InstallDepsOptions = {}
): Promise<void> {
  if (dependencies.length === 0) return;

  const { command, args } = getInstallArgs(pm, dependencies);
  const spinner = ora({
    text: `Installing ${dependencies.length} packages via ${pm}...`,
    color: 'magenta',
  });

  if (!options.silent) {
    spinner.start();
  }

  try {
    await execa(command, args, {
      cwd: options.cwd || process.cwd(),
      stdio: 'pipe',
    });

    if (!options.silent) {
      spinner.succeed(`Installed dependencies successfully using ${pm}.`);
    }
  } catch (error_) {
    if (!options.silent) {
      spinner.fail(`Failed to install dependencies with ${pm}.`);
    }
    throw error_;
  }
}
