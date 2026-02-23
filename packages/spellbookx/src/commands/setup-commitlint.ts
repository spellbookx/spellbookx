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
  const commitlintContent = `import config from 'commitlint-config-spellbookx';

export default config;
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

  const { globalManager, localManager } = await askPackageManagers();

  const { gitHook } = await inquirer.prompt([
    {
      type: 'list',
      name: 'gitHook',
      message: 'Select a git hook tool:',
      choices: [
        { name: 'Lefthook', value: 'lefthook' },
        { name: 'Husky', value: 'husky' },
        { name: 'None', value: 'none' },
      ],
    },
  ]);

  const deps = [...TOOL_DEPENDENCIES.commitlint];
  if (gitHook === 'lefthook') {
    deps.push('lefthook');
    copyAsset('lefthook.yml');
    console.log(
      chalk.yellow('Remember to update lefthook.yml manually if needed.')
    );
  } else if (gitHook === 'husky') {
    deps.push('husky');
  }

  // Install local dependencies
  await installDeps(deps, { pkgManager: localManager });

  // Install global tools
  console.log(chalk.blue('\nInstalling global tools...'));
  const globalTools = ['commitizen', 'eslint', 'lefthook', 'prettier'];
  await installDeps(globalTools, {
    pkgManager: globalManager,
    isGlobal: true,
  });
}
