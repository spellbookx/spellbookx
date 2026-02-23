import chalk from 'chalk';

import { askPackageManagers } from '../utils/ask-package-managers.js';
import { installDeps } from '../utils/install-deps.js';
import { TOOL_DEPENDENCIES } from '../utils/tool-dependencies.js';
import { writeConfig } from '../utils/write-config.js';

/**
 * Sets up CSpell.
 */
export async function setupCspell() {
  const configContent = `const { defineConfig } = require('@cspell/cspell-types');

module.exports = defineConfig({
  version: '0.2',
  import: ['cspell-config-spellbookx'],
  dictionaryDefinitions: [
    {
      name: 'custom-dict',
      path: './.config/cspell/custom.txt',
      addWords: true,
    },
  ],
  dictionaries: ['custom-dict'],
});
`;
  writeConfig('cspell.config.cjs', configContent);
  writeConfig('.config/cspell/custom.txt', '');

  const { globalManager, localManager } = await askPackageManagers();

  // Install local dependencies
  await installDeps(TOOL_DEPENDENCIES.cspell, { pkgManager: localManager });

  // Install global tool
  console.log(chalk.blue('\nInstalling CSpell globally...'));
  await installDeps(['cspell'], { pkgManager: globalManager, isGlobal: true });
}
