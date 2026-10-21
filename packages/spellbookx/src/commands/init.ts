/**
 * @file init.ts
 * Main interactive wizard command initializing Spellbookx configurations.
 */

import chalk from 'chalk';

import {
  brand,
  COLORS,
  dim,
  info,
  step,
  success,
  warn,
  WIZARD_EMOJI,
} from '../constants/theme.js';
import { TOOLS_MAP } from '../constants/tools.js';
import { printBanner } from '../lib/banner.js';
import { detectPackageManager } from '../lib/detect-pm.js';
import { installDeps } from '../lib/install-deps.js';
import { promptTools } from '../lib/prompt-tools.js';
import { setupTool } from '../lib/setup-tool.js';
import type { SetupOptions, SetupResult } from '../types/index.js';

/**
 * Runs the interactive Spellbookx toolchain initialization workflow.
 *
 * @param options - Setup options (working directory, tools, package manager, flags).
 * @returns Summary of tools configured and dependencies installed.
 */
export async function runInit(
  options: SetupOptions = {}
): Promise<SetupResult> {
  const cwd = options.cwd || process.cwd();

  if (!options.silent) {
    printBanner();
  }

  // Step 1: Detect package manager
  const pm = options.packageManager || detectPackageManager(cwd);
  if (!options.silent) {
    console.log(info(`Detected package manager: ${brand(pm)}\n`));
  }

  // Step 2: Select tools
  const selectedTools =
    options.tools === undefined ? await promptTools() : options.tools;

  if (selectedTools.length === 0) {
    if (!options.silent) {
      console.log(`\n${warn('No tools selected. Nothing to configure.')}\n`);
    }
    return {
      selectedTools: [],
      packageManager: pm,
      installedDependencies: [],
      createdFiles: [],
    };
  }

  if (!options.silent) {
    console.log(`\n${step(1, 2, 'Installing dependencies...')}`);
  }

  // Gather unique dependencies
  const dependenciesSet = new Set<string>();
  for (const toolId of selectedTools) {
    const tool = TOOLS_MAP[toolId];
    if (tool) {
      for (const dep of tool.dependencies) {
        dependenciesSet.add(dep);
      }
    }
  }

  const allDependencies = [...dependenciesSet];

  if (!options.skipInstall && allDependencies.length > 0) {
    await installDeps(pm, allDependencies, {
      cwd,
      silent: options.silent,
    });
  } else if (!options.silent && options.skipInstall) {
    console.log(dim('  (Skipping package installation as requested)'));
  }

  if (!options.silent) {
    console.log(`\n${step(2, 2, 'Generating configuration files...')}`);
  }

  // Step 3: Configure tools
  const createdFiles: string[] = [];
  for (const toolId of selectedTools) {
    const result = setupTool(toolId, { cwd });
    createdFiles.push(...result.createdFiles);
    if (!options.silent) {
      for (const file of result.createdFiles) {
        console.log(`  ${success(`Created ${chalk.bold(file)}`)}`);
      }
    }
  }

  if (!options.silent) {
    console.log(
      `\n${chalk.hex(COLORS.primary).bold(`${WIZARD_EMOJI} All set! Your Spellbook is ready.`)}`
    );
    console.log(
      dim(
        `Run ${brand(`${pm} run lint`)} or ${brand(`${pm} run fmt`)} to verify your code styling.\n`
      )
    );
  }

  return {
    selectedTools,
    packageManager: pm,
    installedDependencies: allDependencies,
    createdFiles,
  };
}
