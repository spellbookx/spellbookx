/**
 * @file base.ts
 * Base Prettier configuration covering core formatting, shell scripts, TOML, INI, package.json, and XML.
 */

import type { Config } from 'prettier';

import { overrides } from '../overrides.js';
import { plugins } from '../plugins.js';
import { rules } from '../rules.js';

/**
 * Base formatting rules.
 */
export const baseRules = rules.base;

/**
 * Base file overrides.
 */
export const baseOverrides = overrides.base;

/**
 * List of plugins included in the base configuration.
 */
export const basePlugins: string[] = [
  plugins.sh,
  plugins.toml,
  plugins.ini,
  plugins.packagejson,
  plugins.properties,
  plugins.xml,
];

/**
 * Base Prettier configuration preset.
 */
const base: Config = {
  ...baseRules,
  plugins: [...basePlugins],
  overrides: [...baseOverrides],
};

export default base;
