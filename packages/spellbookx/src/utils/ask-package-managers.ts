import inquirer from 'inquirer';

import { PackageManager } from './install-deps.js';

let cachedManagers: {
  globalManager: PackageManager;
  localManager: PackageManager;
} | null = null;

/**
 * Asks the user which package manager they use globally and locally.
 */
export async function askPackageManagers() {
  if (cachedManagers) return cachedManagers;

  const { globalManager, localManager } = await inquirer.prompt([
    {
      type: 'list',
      name: 'globalManager',
      message: 'Select your global package manager:',
      choices: ['pnpm', 'npm', 'yarn', 'bun'],
      default: 'pnpm',
    },
    {
      type: 'list',
      name: 'localManager',
      message: 'Select your local package manager for this repo:',
      choices: ['pnpm', 'npm', 'yarn', 'bun'],
      default: 'pnpm',
    },
  ]);

  cachedManagers = { globalManager, localManager };
  return cachedManagers;
}
