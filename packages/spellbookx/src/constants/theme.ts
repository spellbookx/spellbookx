/**
 * @file theme.ts
 * Purple brand styling, wizard emoji icons, and terminal formatters.
 */

import chalk from 'chalk';

/**
 * Primary purple brand colors for the Spellbookx CLI.
 */
export const COLORS = {
  primary: '#a855f7',
  secondary: '#c084fc',
  dark: '#7e22ce',
  accent: '#f472b6',
  muted: '#94a3b8',
  bgPrimary: '#581c87',
} as const;

/**
 * Wizard icon emoji for the Spellbookx theme.
 */
export const WIZARD_EMOJI = '🧙';

/**
 * Styles text with the bold primary purple brand color.
 */
export const brand = (text: string): string =>
  chalk.hex(COLORS.primary).bold(text);

/**
 * Styles text with the lighter secondary purple color.
 */
export const brandSecondary = (text: string): string =>
  chalk.hex(COLORS.secondary)(text);

/**
 * Styles text with the dark accent purple color.
 */
export const brandDark = (text: string): string => chalk.hex(COLORS.dark)(text);

/**
 * Prefixes text with the wizard emoji.
 */
export const wizard = (text: string): string => `${WIZARD_EMOJI} ${text}`;

/**
 * Styles a numbered step indicator with purple badge style.
 */
export const step = (current: number, total: number, label: string): string =>
  `${chalk.bgHex(COLORS.dark).white.bold(` [${current}/${total}] `)} ${brand(label)}`;

/**
 * Formats a success message with green tick.
 */
export const success = (text: string): string =>
  `${chalk.green.bold('✔')} ${chalk.green(text)}`;

/**
 * Formats an informational note with purple bullet.
 */
export const info = (text: string): string =>
  `${chalk.hex(COLORS.secondary)('ℹ')} ${text}`;

/**
 * Formats a warning message with yellow warning icon.
 */
export const warn = (text: string): string =>
  `${chalk.yellow.bold('⚠')} ${chalk.yellow(text)}`;

/**
 * Formats an error message with red cross.
 */
export const error = (text: string): string =>
  `${chalk.red.bold('✖')} ${chalk.red(text)}`;

/**
 * Formats dimmed text for auxiliary details.
 */
export const dim = (text: string): string => chalk.dim(text);
