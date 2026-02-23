import chalk from 'chalk';
import { execa } from 'execa';
import inquirer from 'inquirer';

import { copyAsset } from '../utils/copy-asset.js';
import {
  getPrettierDependencies,
  TOOL_DEPENDENCIES,
} from '../utils/dependencies.js';
import { writeConfig } from '../utils/write-config.js';

/**
 *
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

/**
 *
 */
async function setupEslint() {
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
  await installDeps(TOOL_DEPENDENCIES.eslint);
}

/**
 *
 */
async function setupPrettier() {
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

  const prettierDeps = getPrettierDependencies();
  await installDeps([...TOOL_DEPENDENCIES.prettier, ...prettierDeps]);
}

/**
 *
 */
async function setupCspell() {
  const configContent = `const config = require('cspell-config-spellbookx');

module.exports = config;
`;
  writeConfig('cspell.config.cjs', configContent);
  await installDeps(TOOL_DEPENDENCIES.cspell);
}

/**
 *
 */
async function setupCommitlint() {
  const commitlintContent = `import config from 'commitlint-config-spellbookx';

export default config;
`;
  writeConfig('commitlint.config.mjs', commitlintContent);
  copyAsset('.czrc');

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

  await installDeps(deps);
}

/**
 *
 */
async function installDeps(deps: string[]) {
  console.log(chalk.blue(`\nInstalling dependencies: ${deps.join(', ')}...`));
  try {
    await execa('pnpm', ['add', '-D', ...deps], { stdio: 'inherit' });
    console.log(chalk.green('\n✅ Dependencies installed successfully!'));
  } catch (error) {
    console.error(chalk.red('\n❌ Failed to install dependencies:'), error);
  }
}
