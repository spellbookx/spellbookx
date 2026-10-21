/**
 * @file sort-imports.ts
 * Prettier configuration preset extending base with deterministic import sorting.
 */

import type { Config } from 'prettier';

import {
  defaultImportOrderParserPlugins,
  importOrder,
} from '../import-order.js';
import { plugins } from '../plugins.js';
import base from './base.js';

/**
 * Prettier configuration preset with import sorting plugin.
 */
const sortImports: Config = {
  ...base,
  plugins: [plugins.sortImports, ...(base.plugins ?? [])],
  importOrder,
  importOrderParserPlugins: [...defaultImportOrderParserPlugins],
  importOrderBuiltinModulesToTop: false,
};

export default sortImports;
