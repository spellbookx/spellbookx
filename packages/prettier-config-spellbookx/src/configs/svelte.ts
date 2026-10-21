/**
 * @file svelte.ts
 * Prettier configuration preset extending base with Svelte component formatting.
 */

import type { Config } from 'prettier';

import { overrides } from '../overrides.js';
import { plugins } from '../plugins.js';
import base from './base.js';

/**
 * File override applied for Svelte files.
 */
export const svelteOverride = overrides.svelte;

/**
 * Prettier configuration preset for Svelte projects.
 */
const svelte: Config = {
  ...base,
  plugins: [plugins.svelte, ...(base.plugins ?? [])],
  overrides: [...(base.overrides ?? []), svelteOverride],
};

export default svelte;
