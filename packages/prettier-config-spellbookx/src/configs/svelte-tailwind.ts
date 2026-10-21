/**
 * @file svelte-tailwind.ts
 * Prettier configuration preset combining Svelte component and Tailwind CSS formatting.
 */

import type { Config } from 'prettier';

import { plugins } from '../plugins.js';
import svelte from './svelte.js';

/**
 * Prettier configuration preset with Svelte and Tailwind CSS plugins.
 */
const svelteTailwind: Config = {
  ...svelte,
  plugins: [...(svelte.plugins ?? []), plugins.tailwind],
};

export default svelteTailwind;
