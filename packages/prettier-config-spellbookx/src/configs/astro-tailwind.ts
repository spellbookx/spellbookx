/**
 * @file astro-tailwind.ts
 * Prettier configuration preset combining Astro component and Tailwind CSS formatting.
 */

import type { Config } from 'prettier';

import { plugins } from '../plugins.js';
import astro from './astro.js';

/**
 * Prettier configuration preset with Astro and Tailwind CSS plugins.
 */
const astroTailwind: Config = {
  ...astro,
  plugins: [...(astro.plugins ?? []), plugins.tailwind],
};

export default astroTailwind;
