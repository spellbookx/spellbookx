/**
 * @file banner.ts
 * Visual brand banner with wizard emoji and purple styling for Spellbookx.
 */

import chalk from 'chalk';

import { COLORS, WIZARD_EMOJI } from '../constants/theme.js';
import { packageJson } from './package-json.js';

/**
 * Returns the stylized terminal banner for Spellbookx CLI.
 *
 * @param version - Package version string (defaults to packageJson.version).
 * @returns Formatted ANSI banner string.
 */
export function getBanner(version: string = packageJson.version): string {
  const line = chalk.hex(COLORS.dark)('─'.repeat(54));
  const title = chalk
    .hex(COLORS.primary)
    .bold(`${WIZARD_EMOJI}  Spellbookx CLI (sbx)`);
  const vTag = chalk.hex(COLORS.muted)(`v${version}`);
  const slogan = chalk.hex(COLORS.secondary)(
    'Arcane developer toolchain automation & presets'
  );

  return [line, `  ${title}  ${vTag}`, `  ${slogan}`, line].join('\n');
}

/**
 * Prints the Spellbookx CLI banner to console.
 *
 * @param version - Package version string.
 */
export function printBanner(version?: string): void {
  console.log(`\n${getBanner(version)}\n`);
}
