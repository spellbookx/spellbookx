/**
 * @file rules.ts
 * Standard Prettier formatting rules and presets.
 */

import type { Config } from 'prettier';

/**
 * Core formatting options applied across all Spellbookx Prettier presets.
 */
export const baseRules: Omit<Config, 'plugins' | 'overrides'> = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 80,
  endOfLine: 'lf',
  bracketSpacing: true,
};

/**
 * Dictionary of reusable formatting rule sets.
 */
export const rules = {
  base: baseRules,
} as const;

/**
 * Valid rule set identifier keys.
 */
export type RuleKey = keyof typeof rules;
