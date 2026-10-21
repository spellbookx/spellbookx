/**
 * @file astro-prisma-tailwind.ts
 * Prettier configuration preset combining Astro, Prisma, and Tailwind CSS formatting.
 */

import type { Config } from 'prettier';

import { plugins } from '../plugins.js';
import astroPrisma from './astro-prisma.js';

/**
 * Prettier configuration preset with Astro, Prisma, and Tailwind CSS plugins.
 */
const astroPrismaTailwind: Config = {
  ...astroPrisma,
  plugins: [...(astroPrisma.plugins ?? []), plugins.tailwind],
};

export default astroPrismaTailwind;
