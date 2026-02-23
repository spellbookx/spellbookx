#!/usr/bin/env node

import { readFileSync } from 'node:fs';

import { Command } from 'commander';

import { createAction } from './commands/create.js';
import { initAction } from './commands/init.js';
import { installTool } from './commands/install.js';

const pkg = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8')
);

const program = new Command();

program
  .name('spellbookx')
  .description('Setup Spellbookx tools for your project')
  .version(pkg.version)
  .alias('sbx');

program
  .command('create [workspace-name]')
  .description('Create a new Spellbookx workspace')
  .option(
    '-t, --template <template>',
    'The template to use for the repository (e.g., turborepo-monorepo)'
  )
  .option(
    '-o, --owner <owner>',
    'The GitHub owner/organization to use for the template',
    'spellbookx'
  )
  .action(
    async (
      workspaceName: string | undefined,
      options: { template?: string; owner?: string }
    ) => {
      await createAction(workspaceName, options);
    }
  );

program
  .command('init')
  .description('Initialize Spellbookx tools interactively')
  .action(initAction);

program
  .command('install <tool>')
  .alias('i')
  .alias('add')
  .description(
    'Install a specific tool (eslint, prettier, cspell, commitlint, vscode, editorconfig)'
  )
  .action(async (tool: string) => {
    await installTool(tool);
  });

program.parse();
