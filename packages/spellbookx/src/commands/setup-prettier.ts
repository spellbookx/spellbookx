import chalk from 'chalk';
import { execa } from 'execa';
import inquirer from 'inquirer';

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
    },
  ]);

  let configContent = `import spellbookx from 'prettier-config-spellbookx';

export default {
`;
  for (const config of configs) {
    configContent += `  ...spellbookx['${config}'],\n`;
  }
  configContent += '};\n';
  writeConfig('prettier.config.mjs', configContent);

  console.log(chalk.blue('\nInstalling prettier-config-spellbookx first...'));
  await execa('pnpm', ['add', '-D', 'prettier-config-spellbookx'], {
    stdio: 'inherit',
  });

  const prettierDeps = getPrettierDependencies();
  await installDeps([...prettierDeps]);
}
