import chalk from 'chalk';
import inquirer from 'inquirer';

import { askPackageManagers } from '../utils/ask-package-managers.js';
import { copyAsset } from '../utils/copy-asset.js';
import { setupCommitlint } from './setup-commitlint.js';
import { setupCspell } from './setup-cspell.js';
import { setupEslint } from './setup-eslint.js';
import { setupPrettier } from './setup-prettier.js';
import { setupVscode } from './setup-vscode.js';

/**
 * Initializes Spellbookx tools interactively.
 */
export async function initAction() {
  console.log(chalk.bold.magenta('\n✨ Welcome to Spellbookx CLI! ✨\n'));

  const { tools } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'tools',
      message: 'Select the tools you want to install:',
      choices: [
        { name: 'ESLint', value: 'eslint' },
        { name: 'Prettier', value: 'prettier' },
        { name: 'CSpell', value: 'cspell' },
        { name: 'Commitlint', value: 'commitlint' },
        { name: 'VS Code Config', value: 'vscode' },
      ],
      default: ['eslint', 'prettier', 'cspell', 'commitlint', 'vscode'],
    },
  ]);

  if (tools.length === 0) {
    console.log(chalk.yellow('No tools selected. Exiting.'));
    return;
  }

  // Ask package managers once at the beginning
  await askPackageManagers();

  // Always ensure .editorconfig
  copyAsset('.editorconfig');

  if (tools.includes('eslint')) {
    await setupEslint();
  }

  if (tools.includes('prettier')) {
    await setupPrettier();
  }

  if (tools.includes('cspell')) {
    await setupCspell();
  }

  if (tools.includes('commitlint')) {
    await setupCommitlint();
  }

  if (tools.includes('vscode')) {
    await setupVscode();
  }

  console.log(
    chalk.bold.green('\n✨ All selected tools have been set up! ✨\n')
  );
}
