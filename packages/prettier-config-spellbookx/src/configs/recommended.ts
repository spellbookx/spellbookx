/**
 * @file recommended.ts
 * Community-recommended Prettier preset extending base with Tailwind CSS class sorting.
 */

import type { Config } from 'prettier';

import { plugins } from '../plugins.js';
import base from './base.js';

/**
 * Recommended Prettier configuration preset.
 */
const recommended: Config = {
  ...base,
  plugins: [
    ...(base.plugins ?? []),
    plugins.tailwind, // must be loaded last
  ],
};

export default recommended;
