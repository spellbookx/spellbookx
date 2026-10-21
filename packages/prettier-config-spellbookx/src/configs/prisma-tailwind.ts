/**
 * @file prisma-tailwind.ts
 * Prettier configuration preset combining Prisma schema formatting and Tailwind CSS class sorting.
 */

import type { Config } from 'prettier';

import { plugins } from '../plugins.js';
import prisma from './prisma.js';

/**
 * Prettier configuration preset with Prisma and Tailwind CSS plugins.
 */
const prismaTailwind: Config = {
  ...prisma,
  plugins: [...(prisma.plugins ?? []), plugins.tailwind],
};

export default prismaTailwind;
