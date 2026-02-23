import { readFileSync } from 'node:fs';
import path from 'node:path';

import chalk from 'chalk';
import { execa } from 'execa';
import inquirer from 'inquirer';

import {
  getPrettierDependencies,
  TOOL_DEPENDENCIES,
} from '../utils/dependencies.js';
import { copyAsset, writeConfig } from '../utils/files.js';
import { ASSETS_DIR } from '../utils/paths.js';

/**
 *
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
      ],
    },
  ]);

  if (tools.length === 0) {
    console.log(chalk.yellow('No tools selected. Exiting.'));
    return;
  }

  // Always ensure .editorconfig
  copyAsset('.editorconfig');

  const allDependencies: Set<string> = new Set();

  if (tools.includes('eslint')) {
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
    setupEslint(configs);
    for (const d of TOOL_DEPENDENCIES.eslint) allDependencies.add(d);
  }

  if (tools.includes('prettier')) {
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
    setupPrettier(configs);
    for (const d of TOOL_DEPENDENCIES.prettier) allDependencies.add(d);
    for (const d of getPrettierDependencies()) allDependencies.add(d);
  }

  if (tools.includes('cspell')) {
    setupCspell();
    for (const d of TOOL_DEPENDENCIES.cspell) allDependencies.add(d);
  }

  if (tools.includes('commitlint')) {
    setupCommitlint();
    for (const d of TOOL_DEPENDENCIES.commitlint) allDependencies.add(d);

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

    if (gitHook === 'lefthook') {
      allDependencies.add('lefthook');
      setupLefthook(tools);
    } else if (gitHook === 'husky') {
      allDependencies.add('husky');
    }
  }

  if (allDependencies.size > 0) {
    console.log(chalk.blue('\nInstalling dependencies...'));
    try {
      await execa('pnpm', ['add', '-D', ...allDependencies], {
        stdio: 'inherit',
      });
      console.log(chalk.green('\n✅ Tools installed successfully!'));
    } catch (error) {
      console.error(chalk.red('\n❌ Failed to install dependencies:'), error);
    }
  }
}

/**
 *
 */
function setupEslint(configs: string[]) {
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
}

/**
 *
 */
function setupPrettier(configs: string[]) {
  let configContent = `import spellbookx from 'prettier-config-spellbookx';

export default {
`;
  for (const config of configs) {
    configContent += `  ...spellbookx['${config}'],\n`;
  }
  configContent += '};\n';
  writeConfig('prettier.config.mjs', configContent);
}

/**
 *
 */
function setupCspell() {
  const configContent = `const config = require('cspell-config-spellbookx');

module.exports = config;
`;
  writeConfig('cspell.config.cjs', configContent);
}

/**
 *
 */
function setupCommitlint() {
  const commitlintContent = `import config from 'commitlint-config-spellbookx';

export default config;
`;
  writeConfig('commitlint.config.mjs', commitlintContent);
  copyAsset('.czrc');
}

/**
 *
 */
function setupLefthook(tools: string[]) {
  const src = path.join(ASSETS_DIR, 'lefthook.yml');
  let content = readFileSync(src, 'utf8');

  if (tools.includes('eslint')) {
    content += `    - name: lint
      run: pnpm dlx eslint --no-warn-ignored --fix {staged_files}
      stage_fixed: true
`;
  }

  if (tools.includes('prettier')) {
    content += `    - name: fmt
      run: pnpm exec prettier --ignore-unknown --write {staged_files}
      stage_fixed: true
`;
  }

  writeConfig('lefthook.yml', content);
}
