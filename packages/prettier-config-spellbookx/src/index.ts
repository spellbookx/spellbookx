/**
 * @file index.ts
 * Main entry point for prettier-config-spellbookx.
 * Exports pre-configured presets, modular building blocks, and composer functions.
 */

import type { Config } from 'prettier';

import * as allConfigs from './configs/index.js';

/**
 * Names of all available Prettier configuration presets in Spellbookx.
 */
export type SbxPrettierConfig =
  | 'all'
  | 'astro'
  | 'astro-prisma'
  | 'astro-prisma-tailwind'
  | 'astro-tailwind'
  | 'base'
  | 'embed'
  | 'multiline-arrays'
  | 'nginx'
  | 'prisma'
  | 'prisma-tailwind'
  | 'recommended'
  | 'sort-imports'
  | 'sql'
  | 'svelte'
  | 'svelte-prisma'
  | 'svelte-prisma-tailwind'
  | 'svelte-tailwind'
  | 'tailwind';

/**
 * Dictionary of all available Prettier configuration presets indexed by preset name.
 */
export const configs: Record<SbxPrettierConfig, Config> = {
  all: allConfigs.all,
  astro: allConfigs.astro,
  'astro-prisma': allConfigs.astroPrisma,
  'astro-prisma-tailwind': allConfigs.astroPrismaTailwind,
  'astro-tailwind': allConfigs.astroTailwind,
  base: allConfigs.base,
  embed: allConfigs.embed,
  'multiline-arrays': allConfigs.multilineArrays,
  nginx: allConfigs.nginx,
  prisma: allConfigs.prisma,
  'prisma-tailwind': allConfigs.prismaTailwind,
  recommended: allConfigs.recommended,
  'sort-imports': allConfigs.sortImports,
  sql: allConfigs.sql,
  svelte: allConfigs.svelte,
  'svelte-prisma': allConfigs.sveltePrisma,
  'svelte-prisma-tailwind': allConfigs.sveltePrismaTailwind,
  'svelte-tailwind': allConfigs.svelteTailwind,
  tailwind: allConfigs.tailwind,
};

// Export individual configurations
export * from './configs/index.js';

// Export modular building blocks
export { defineConfig, defineSbxConfig } from './define-config.js';
export {
  defaultImportOrderParserPlugins,
  defineImports,
  importOrder,
  imports,
} from './import-order.js';
export {
  formatGroupToRegex,
  getPluginName,
  mergeOverrides,
  PLUGIN_PRIORITY,
  sortPlugins,
} from './lib/index.js';
export { overrides } from './overrides.js';
export { plugins } from './plugins.js';
export { baseRules, rules } from './rules.js';

// Default export is the community recommended preset
export default configs.recommended;
