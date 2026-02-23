#!/usr/bin/env node

import { existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import chalk from 'chalk';
import { Command } from 'commander';
import { execa } from 'execa';
import inquirer from 'inquirer';

const program = new Command();

program
  .name('spellbookx')
  .description('Setup Spellbookx tools for your project')
  .version('0.1.0')
  .alias('sbx');

program
  .command('init')
  .description('Initialize Spellbookx tools')
  .action(async () => {
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

    const cwd = process.cwd();

    // 1. Ensure .editorconfig exists
    await ensureEditorConfig(cwd);

    const dependencies: string[] = [];

    // 2. Setup ESLint
    if (tools.includes('eslint')) {
      const { eslintConfigs } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'eslintConfigs',
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
      dependencies.push('eslint', 'eslint-plugin-spellbookx');
      setupEslintConfig(cwd, eslintConfigs);
    }

    // 3. Setup Prettier
    if (tools.includes('prettier')) {
      const { prettierConfigs } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'prettierConfigs',
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
      dependencies.push('prettier', 'prettier-config-spellbookx');
      setupPrettierConfig(cwd, prettierConfigs);
    }

    // 4. Setup CSpell
    if (tools.includes('cspell')) {
      dependencies.push('cspell', 'cspell-config-spellbookx');
      setupCspellConfig(cwd);
    }

    // 5. Setup Commitlint
    if (tools.includes('commitlint')) {
      dependencies.push(
        '@commitlint/cli',
        'commitlint-config-spellbookx',
        'cz-git',
        'commitizen'
      );
      setupCommitlintConfig(cwd);

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
        dependencies.push('lefthook');
        setupLefthookConfig(cwd, tools);
      } else if (gitHook === 'husky') {
        dependencies.push('husky');
      }
    }

    // 6. Install dependencies
    if (dependencies.length > 0) {
      console.log(chalk.blue('\nInstalling dependencies...'));
      try {
        await execa('pnpm', ['add', '-D', ...dependencies], {
          stdio: 'inherit',
        });
        console.log(chalk.green('\n✅ Tools installed successfully!'));
      } catch (error) {
        console.error(chalk.red('\n❌ Failed to install dependencies:'), error);
      }
    }
  });

program.parse();

/**
 *
 */
async function ensureEditorConfig(cwd: string) {
  const editorConfigPath = path.join(cwd, '.editorconfig');
  if (!existsSync(editorConfigPath)) {
    console.log(chalk.cyan('Creating .editorconfig...'));
    const content = `# EditorConfig is awesome: https://EditorConfig.org

root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.astro]
indent_style = tab
indent_size = 4

[*.md]
trim_trailing_whitespace = false

[*.toml]
max_line_length = 100

[Makefile]
indent_style = tab
indent_size = 4
`;
    writeFileSync(editorConfigPath, content);
  }
}

/**
 *
 */
function setupEslintConfig(cwd: string, configs: string[]) {
  console.log(chalk.cyan('Creating eslint.config.mjs...'));
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
  writeFileSync(path.join(cwd, 'eslint.config.mjs'), configContent);
}

/**
 *
 */
function setupPrettierConfig(cwd: string, configs: string[]) {
  console.log(chalk.cyan('Creating prettier.config.mjs...'));
  let configContent = `import spellbookx from 'prettier-config-spellbookx';

export default {
`;
  for (const config of configs) {
    configContent += `  ...spellbookx['${config}'],\n`;
  }
  configContent += '};\n';
  writeFileSync(path.join(cwd, 'prettier.config.mjs'), configContent);
}

/**
 *
 */
function setupCspellConfig(cwd: string) {
  console.log(chalk.cyan('Creating cspell.config.cjs...'));
  const configContent = `const config = require('cspell-config-spellbookx');

module.exports = config;
`;
  writeFileSync(path.join(cwd, 'cspell.config.cjs'), configContent);
}

/**
 *
 */
function setupCommitlintConfig(cwd: string) {
  console.log(chalk.cyan('Creating commitlint.config.mjs and .czrc...'));
  const commitlintContent = `import config from 'commitlint-config-spellbookx';

export default config;
`;
  writeFileSync(path.join(cwd, 'commitlint.config.mjs'), commitlintContent);

  const czrcContent = `{
  "path": "cz-git"
}
`;
  writeFileSync(path.join(cwd, '.czrc'), czrcContent);
}

/**
 *
 */
function setupLefthookConfig(cwd: string, tools: string[]) {
  console.log(chalk.cyan('Creating lefthook.yml...'));
  let lefthookContent = `commit-msg:
  jobs:
    - name: lint-commit-msg
      run: pnpm dlx commitlint --verbose --edit {1}

pre-commit:
  parallel: false
  jobs:
`;

  if (tools.includes('eslint')) {
    lefthookContent += `    - name: lint
      run: pnpm dlx eslint --no-warn-ignored --fix {staged_files}
      stage_fixed: true
`;
  }

  if (tools.includes('prettier')) {
    lefthookContent += `    - name: fmt
      run: pnpm exec prettier --ignore-unknown --write {staged_files}
      stage_fixed: true
`;
  }

  writeFileSync(path.join(cwd, 'lefthook.yml'), lefthookContent);
}
