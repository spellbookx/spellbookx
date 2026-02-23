import chalk from 'chalk';
import inquirer from 'inquirer';

import { askPackageManagers } from '../utils/ask-package-managers.js';
import { getPrettierDependencies } from '../utils/get-prettier-dependencies.js';
import { installDeps } from '../utils/install-deps.js';
import { writeConfig } from '../utils/write-config.js';

/**
 * Sets up Prettier with selected configurations.
 */
export async function setupPrettier() {
  const { configs } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'configs',
      message: 'Select Prettier configurations:',
      choices: [
        { name: 'Base', value: 'base' },
        { name: 'Astro', value: 'astro' },
        { name: 'Astro-Prisma', value: 'astro-prisma' },
        { name: 'Astro-Tailwind', value: 'astro-tailwind' },
        { name: 'Astro-Prisma-Tailwind', value: 'astro-prisma-tailwind' },
        { name: 'Tailwind', value: 'tailwind' },
        { name: 'Prisma', value: 'prisma' },
        { name: 'Prisma-Tailwind', value: 'prisma-tailwind' },
      ],
      default: ['base'],
    },
  ]);

  let configContent = `import spellbookx from 'prettier-config-spellbookx';

export default {
`;
  for (const config of configs) {
    configContent += `  ...spellbookx.${config},\n`;
  }
  configContent += '};\n';
  writeConfig('prettier.config.mjs', configContent);

  const { globalManager, localManager } = await askPackageManagers();

  console.log(chalk.blue('\nInstalling prettier-config-spellbookx first...'));
  await installDeps(['prettier-config-spellbookx'], {
    pkgManager: localManager,
    isDev: true,
  });

  const prettierDeps = getPrettierDependencies();
  await installDeps([...prettierDeps], { pkgManager: localManager });

  // Install global tool
  console.log(chalk.blue('\nInstalling Prettier globally...'));
  await installDeps(['prettier'], {
    pkgManager: globalManager,
    isGlobal: true,
  });
}
