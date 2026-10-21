/**
 * @file all.ts
 * Comprehensive Prettier configuration preset containing all supported plugins and file overrides.
 */

import type { Config } from 'prettier';

import {
  defaultImportOrderParserPlugins,
  importOrder,
} from '../import-order.js';
import { overrides } from '../overrides.js';
import { plugins } from '../plugins.js';
import { rules } from '../rules.js';

/**
 * Aggregated file overrides applied in the comprehensive preset.
 */
export const allOverrides = overrides.all;

/**
 * Comprehensive Prettier configuration preset.
 */
const all: Config = {
  ...rules.base,
  plugins: [
    plugins.sortImports,
    plugins.multilineArrays,
    plugins.astro,
    plugins.svelte,
    plugins.sh,
    plugins.toml,
    plugins.ini,
    plugins.packagejson,
    plugins.properties,
    plugins.sql,
    plugins.nginx,
    plugins.prisma,
    plugins.xml,
    plugins.embed,
    plugins.tailwind, // must be loaded last
  ],
  overrides: [...allOverrides],
  importOrder,
  importOrderParserPlugins: [...defaultImportOrderParserPlugins],
  importOrderBuiltinModulesToTop: false,
};

export default all;
