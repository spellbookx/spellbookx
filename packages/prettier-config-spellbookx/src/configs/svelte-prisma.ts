/**
 * @file svelte-prisma.ts
 * Prettier configuration preset combining Svelte component and Prisma schema formatting.
 */

import type { Config } from 'prettier';

import { plugins } from '../plugins.js';
import svelte from './svelte.js';

/**
 * Prettier configuration preset with Svelte and Prisma plugins.
 */
const sveltePrisma: Config = {
  ...svelte,
  plugins: [...(svelte.plugins ?? []), plugins.prisma],
};

export default sveltePrisma;
