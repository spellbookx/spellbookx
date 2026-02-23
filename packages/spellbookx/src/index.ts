#!/usr/bin/env node

import { readFileSync } from 'node:fs';

import { Command } from 'commander';

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
