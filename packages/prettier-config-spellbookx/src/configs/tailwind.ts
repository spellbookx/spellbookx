/**
 * @file tailwind.ts
 * Prettier configuration preset extending base with Tailwind CSS class sorting.
 */

import type { Config } from 'prettier';

import { plugins } from '../plugins.js';
import base from './base.js';

/**
 * Prettier configuration preset with Tailwind CSS plugin.
 */
const tailwind: Config = {
  ...base,
  plugins: [...(base.plugins ?? []), plugins.tailwind],
};

export default tailwind;
