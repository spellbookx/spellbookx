/**
 * @file prisma.ts
 * Prettier configuration preset extending base with Prisma schema formatting.
 */

import type { Config } from 'prettier';

import { plugins } from '../plugins.js';
import base from './base.js';

/**
 * Prettier configuration preset with Prisma plugin.
 */
const prisma: Config = {
  ...base,
  plugins: [plugins.prisma, ...(base.plugins ?? [])],
};

export default prisma;
