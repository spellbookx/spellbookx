/**
 * @file astro.ts
 * Prettier configuration preset extending base with Astro component formatting.
 */

import type { Config } from 'prettier';

import { overrides } from '../overrides.js';
import { plugins } from '../plugins.js';
import base from './base.js';

/**
 * File override applied for Astro files.
 */
export const astroOverride = overrides.astro;

/**
 * Prettier configuration preset for Astro projects.
 */
const astro: Config = {
  ...base,
  plugins: [plugins.astro, ...(base.plugins ?? [])],
  overrides: [...(base.overrides ?? []), astroOverride],
};

export default astro;
