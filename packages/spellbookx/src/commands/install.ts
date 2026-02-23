import chalk from 'chalk';

import { copyAsset } from '../utils/copy-asset.js';
import { setupCommitlint } from './setup-commitlint.js';
import { setupCspell } from './setup-cspell.js';
import { setupEslint } from './setup-eslint.js';
import { setupPrettier } from './setup-prettier.js';

/**
 * Entry point for the install command.
 * @param tool - The tool to install.
 */
export async function installTool(tool: string) {
  switch (tool) {
    case 'eslint': {
      await setupEslint();
      break;
    }
    case 'prettier': {
      await setupPrettier();
      break;
    }
    case 'cspell': {
      await setupCspell();
      break;
    }
    case 'commitlint': {
      await setupCommitlint();
      break;
    }
    case 'editorconfig': {
      copyAsset('.editorconfig');
      break;
    }
    default: {
      console.error(chalk.red(`Unknown tool: ${tool}`));
    }
  }
}
