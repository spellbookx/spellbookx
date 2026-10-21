/**
 * @file sql.ts
 * Prettier configuration preset extending base with SQL formatting.
 */

import type { Config } from 'prettier';

import { plugins } from '../plugins.js';
import base from './base.js';

/**
 * Prettier configuration preset with SQL plugin.
 */
const sql: Config = {
  ...base,
  plugins: [plugins.sql, ...(base.plugins ?? [])],
};

export default sql;
