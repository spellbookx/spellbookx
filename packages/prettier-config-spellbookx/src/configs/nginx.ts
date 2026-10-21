/**
 * @file nginx.ts
 * Prettier configuration preset extending base with Nginx configuration formatting.
 */

import type { Config } from 'prettier';

import { plugins } from '../plugins.js';
import base from './base.js';

/**
 * Prettier configuration preset with Nginx configuration plugin.
 */
const nginx: Config = {
  ...base,
  plugins: [plugins.nginx, ...(base.plugins ?? [])],
};

export default nginx;
