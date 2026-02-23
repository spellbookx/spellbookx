#!/usr/bin/env node

import { Command } from 'commander';

import { initAction } from './commands/init.js';
import { installTool } from './commands/install.js';

const program = new Command();

program
  .name('spellbookx')
  .description('Setup Spellbookx tools for your project')
  .version('0.1.0')
  .alias('sbx');

program
  .command('init')
  .description('Initialize Spellbookx tools interactively')
  .action(initAction);

program
  .command('install <tool>')
  .alias('i')
  .alias('add')
  .description(
    'Install a specific tool (eslint, prettier, cspell, commitlint, editorconfig)'
  )
  .action(async (tool: string) => {
    await installTool(tool);
  });

program.parse();
