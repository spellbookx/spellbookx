/**
 * @file embed.ts
 * Prettier configuration preset extending base with embedded code formatting.
 */

import type { Config } from 'prettier';

import { plugins } from '../plugins.js';
import base from './base.js';

/**
 * Prettier configuration preset with embedded code formatting plugin.
 */
const embed: Config = {
  ...base,
  plugins: [plugins.embed, ...(base.plugins ?? [])],
};

export default embed;
