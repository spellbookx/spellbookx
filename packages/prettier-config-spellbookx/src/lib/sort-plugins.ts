/**
 * @file sort-plugins.ts
 * Sorts Prettier plugins in optimal resolution order and deduplicates entries.
 */

import type { Config } from 'prettier';

import { getPluginName } from './get-plugin-name.js';
import { PLUGIN_PRIORITY } from './plugin-priority.js';

/**
 * Sorts plugins in the canonical Prettier order and removes duplicates.
 * Guarantees sort-imports runs first and tailwindcss runs last.
 *
 * @param plugins - List of plugin strings or objects to sort.
 * @returns Sorted and deduplicated plugin list.
 * @example
 * ```ts
 * sortPlugins(['prettier-plugin-tailwindcss', 'prettier-plugin-sh']);
 * // ['prettier-plugin-sh', 'prettier-plugin-tailwindcss']
 * ```
 */
export function sortPlugins(
  plugins: NonNullable<Config['plugins']>
): NonNullable<Config['plugins']> {
  const seen = new Set<string>();
  const uniquePlugins: typeof plugins = [];

  for (const plugin of plugins) {
    const key = typeof plugin === 'string' ? plugin : JSON.stringify(plugin);
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    uniquePlugins.push(plugin);
  }

  return uniquePlugins.toSorted((a: unknown, b: unknown) => {
    const nameA = getPluginName(a);
    const nameB = getPluginName(b);
    const priorityA = PLUGIN_PRIORITY[nameA] ?? 50;
    const priorityB = PLUGIN_PRIORITY[nameB] ?? 50;
    return priorityA - priorityB;
  });
}
