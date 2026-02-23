import chalk from 'chalk';
import inquirer from 'inquirer';

import { askPackageManagers } from '../utils/ask-package-managers.js';
import { installDeps } from '../utils/install-deps.js';
import { TOOL_DEPENDENCIES } from '../utils/tool-dependencies.js';
import { writeConfig } from '../utils/write-config.js';

/**
 * Sets up ESLint with selected configurations.
 */
export async function setupEslint() {
  const { configs } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'configs',
      message: 'Select ESLint configurations:',
      choices: [
        { name: 'Recommended', value: 'recommended' },
        { name: 'CSpell', value: 'cspell' },
        { name: 'Ignores', value: 'ignores' },
        { name: 'JavaScript/TypeScript', value: 'javascript' },
        { name: 'JSON', value: 'json' },
        { name: 'Markdown', value: 'markdown' },
        { name: 'Vuoto', value: 'vuoto' },
      ],
    },
  ]);

  let configContent = `import { defineConfig } from 'eslint/config';
import spellbookx from 'eslint-plugin-spellbookx';

export default defineConfig([
`;
  if (configs.includes('recommended')) {
    configContent += '  spellbookx.configs.recommended,\n';
  } else {
    for (const config of configs) {
      configContent += `  spellbookx.configs.${config},\n`;
    }
  }
  configContent += ']);\n';
  writeConfig('eslint.config.mjs', configContent);

  const { globalManager, localManager } = await askPackageManagers();

  // Install local dependencies
  await installDeps(TOOL_DEPENDENCIES.eslint, { pkgManager: localManager });

  // Install global tool
  console.log(chalk.blue('\nInstalling ESLint globally...'));
  await installDeps(['eslint'], { pkgManager: globalManager, isGlobal: true });
}
