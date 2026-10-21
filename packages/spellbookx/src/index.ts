/**
 * @file index.ts
 * Programmatic API and command factory for Spellbookx CLI.
 */

import { Command } from 'commander';

import { runInit } from './commands/init.js';
import { brand, WIZARD_EMOJI } from './constants/theme.js';
import { packageJson } from './lib/package-json.js';
import type { PackageManager, ToolId } from './types/index.js';

export * from './commands/index.js';
export * from './constants/index.js';
export * from './lib/index.js';
export * from './types/index.js';

/**
 * Creates and configures the Commander CLI program.
 *
 * @returns Configured Command instance.
 */
export function createProgram(): Command {
  const program = new Command();

  program
    .name('spellbookx')
    .alias('sbx')
    .description(
      `${WIZARD_EMOJI} ${brand('Spellbookx')} developer toolchain CLI`
    )
    .version(packageJson.version);

  program
    .command('init')
    .description('Interactively initialize Spellbookx configurations')
    .option(
      '-p, --pm <packageManager>',
      'Package manager to use (pnpm, npm, yarn, bun)'
    )
    .option(
      '--skip-install',
      'Generate configurations without installing packages'
    )
    .option(
      '-t, --tools <tools...>',
      'Tools to configure (cspell, commitlint, eslint, prettier)'
    )
    .action(
      async (options: {
        pm?: PackageManager;
        skipInstall?: boolean;
        tools?: ToolId[];
      }) => {
        await runInit({
          packageManager: options.pm,
          skipInstall: options.skipInstall,
          tools: options.tools,
        });
      }
    );

  // Default action when running `sbx` or `spellbookx` without subcommands
  program.action(async () => {
    await runInit();
  });

  return program;
}
