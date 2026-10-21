/**
 * @file svelte-prisma-tailwind.ts
 * Prettier configuration preset combining Svelte, Prisma, and Tailwind CSS formatting.
 */

import type { Config } from 'prettier';

import { plugins } from '../plugins.js';
import sveltePrisma from './svelte-prisma.js';

/**
 * Prettier configuration preset with Svelte, Prisma, and Tailwind CSS plugins.
 */
const sveltePrismaTailwind: Config = {
  ...sveltePrisma,
  plugins: [...(sveltePrisma.plugins ?? []), plugins.tailwind],
};

export default sveltePrismaTailwind;
