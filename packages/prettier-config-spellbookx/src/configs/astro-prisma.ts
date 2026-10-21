/**
 * @file astro-prisma.ts
 * Prettier configuration preset combining Astro component and Prisma schema formatting.
 */

import type { Config } from 'prettier';

import { plugins } from '../plugins.js';
import astro from './astro.js';

/**
 * Prettier configuration preset with Astro and Prisma plugins.
 */
const astroPrisma: Config = {
  ...astro,
  plugins: [...(astro.plugins ?? []), plugins.prisma],
};

export default astroPrisma;
