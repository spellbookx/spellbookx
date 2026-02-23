import chalk from 'chalk';
import inquirer from 'inquirer';

import { askPackageManagers } from '../utils/ask-package-managers.js';
import { copyAsset } from '../utils/copy-asset.js';
import { installDeps } from '../utils/install-deps.js';
import { TOOL_DEPENDENCIES } from '../utils/tool-dependencies.js';
import { updatePackageJson } from '../utils/update-package-json.js';
import { writeConfig } from '../utils/write-config.js';

/**
 * Sets up Commitlint and Git hooks.
 */
export async function setupCommitlint() {
  const { globalManager, localManager } = await askPackageManagers();

  const { gitHooks } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'gitHooks',
      message: 'Select git hook tools to install:',
      choices: [
        { name: 'Lefthook', value: 'lefthook' },
        { name: 'Husky', value: 'husky' },
      ],
      default: ['lefthook'],
    },
  ]);

  const commitlintContent = `export default {
  extends: ['spellbookx'],
};
`;
  writeConfig('commitlint.config.mjs', commitlintContent);
  copyAsset('.czrc');

  // Make repo commitizen friendly
  updatePackageJson({
    config: {
      commitizen: {
        path: 'cz-git',
      },
    },
  });

  const deps = [...TOOL_DEPENDENCIES.commitlint];
  if (gitHooks.includes('lefthook')) {
    deps.push('lefthook');
    copyAsset('lefthook.yml');
    console.log(
      chalk.yellow('Remember to update lefthook.yml manually if needed.')
    );
  }
  if (gitHooks.includes('husky')) {
    deps.push('husky');
  }

  // Install local dependencies
  await installDeps(deps, { pkgManager: localManager });

  // Install global tools
  if (gitHooks.length > 0) {
    console.log(chalk.blue('\nInstalling global tools...'));
    const globalTools = ['commitizen', 'eslint', 'lefthook', 'prettier'];
    await installDeps(globalTools, {
      pkgManager: globalManager,
      isGlobal: true,
    });
  }
}
