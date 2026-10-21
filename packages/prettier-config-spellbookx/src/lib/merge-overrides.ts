/**
 * @file merge-overrides.ts
 * Merges Prettier override entries deduplicating by matched file patterns.
 */

import type { OverrideEntry } from '../overrides.js';

/**
 * Merges multiple override lists into a deduplicated list.
 * Preserves entry order and merges options for identical file patterns.
 *
 * @param allOverrides - Array of override definitions to merge.
 * @returns Merged and deduplicated list of overrides.
 * @example
 * ```ts
 * mergeOverrides([
 *   { files: '*.toml', options: { printWidth: 80 } },
 *   { files: '*.toml', options: { printWidth: 100 } },
 * ]);
 * // [{ files: '*.toml', options: { printWidth: 100 } }]
 * ```
 */
export function mergeOverrides(allOverrides: OverrideEntry[]): OverrideEntry[] {
  const merged: OverrideEntry[] = [];
  const map = new Map<string, OverrideEntry>();

  for (const entry of allOverrides) {
    const key = Array.isArray(entry.files)
      ? [...entry.files]
          .toSorted((a: string, b: string) => a.localeCompare(b))
          .join('::')
      : String(entry.files);

    const existing = map.get(key);
    if (existing) {
      existing.options = {
        ...existing.options,
        ...entry.options,
      };
      if (entry.excludeFiles) {
        existing.excludeFiles = entry.excludeFiles;
      }
    } else {
      const copy: OverrideEntry = {
        ...entry,
        options: entry.options ? { ...entry.options } : undefined,
      };
      map.set(key, copy);
      merged.push(copy);
    }
  }

  return merged;
}
