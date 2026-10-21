/**
 * @file multiline-arrays.ts
 * Prettier configuration preset extending base with multiline array formatting.
 */

import type { Config } from 'prettier';

import { plugins } from '../plugins.js';
import base from './base.js';

/**
 * Prettier configuration preset with multiline arrays plugin.
 */
const multilineArrays: Config = {
  ...base,
  plugins: [plugins.multilineArrays, ...(base.plugins ?? [])],
  multilineArraysWrapThreshold: 1,
};

export default multilineArrays;
