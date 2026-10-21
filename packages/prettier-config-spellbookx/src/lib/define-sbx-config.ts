/**
 * @file define-sbx-config.ts
 * Deep-merging configuration composer for Prettier configs.
 */

import type { Config } from 'prettier';

import type { OverrideEntry } from '../overrides.js';
import { mergeOverrides } from './merge-overrides.js';
import { sortPlugins } from './sort-plugins.js';

/**
 * Configuration input type accepted by `defineSbxConfig`, including single configs, falsy values, or undefined.
 */
export type ConfigInput = Config | undefined | null | false;

/**
 * Composes and deep-merges Prettier configurations in order.
 * Automatically eliminates duplicate plugins, places plugins in optimal order
 * (with prettier-plugin-tailwindcss guaranteed last), and deduplicates overrides.
 *
 * @param configs - Prettier configuration objects or arrays of configurations.
 * @returns Fully merged and validated Prettier Config.
 * @example
 * ```ts
 * import { defineSbxConfig, configs } from 'prettier-config-spellbookx';
 *
 * export default defineSbxConfig([
 *   configs.base,
 *   configs.svelte,
 *   configs.tailwind,
 *   { printWidth: 100 },
 * ]);
 * ```
 */
export function defineSbxConfig(
  ...configs: (ConfigInput | ConfigInput[])[]
): Config {
  const flattened: Config[] = configs
    .flat(Infinity as 1)
    .filter((c): c is Config => Boolean(c) && typeof c === 'object');

  if (flattened.length === 0) {
    return {};
  }

  const result: Config = {};
  const pluginsCollector: NonNullable<Config['plugins']> = [];
  const overridesCollector: OverrideEntry[] = [];

  for (const config of flattened) {
    for (const [key, value] of Object.entries(config)) {
      if (key === 'plugins') {
        if (Array.isArray(value)) {
          pluginsCollector.push(...(value as NonNullable<Config['plugins']>));
        }
      } else if (key === 'overrides') {
        if (Array.isArray(value)) {
          overridesCollector.push(...(value as OverrideEntry[]));
        }
      } else if (value !== undefined) {
        (result as Record<string, unknown>)[key] = value;
      }
    }
  }

  if (pluginsCollector.length > 0) {
    result.plugins = sortPlugins(pluginsCollector);
  }

  if (overridesCollector.length > 0) {
    result.overrides = mergeOverrides(overridesCollector);
  }

  return result;
}

/**
 * Alias for `defineSbxConfig` to facilitate conventional configuration declaration.
 */
export const defineConfig = defineSbxConfig;
