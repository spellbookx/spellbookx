/**
 * @file merge-cspell-configs.ts
 * Deep merger for CSpell configuration objects.
 */

import type { CSpellSettings } from '@cspell/cspell-types';
import { mergeConfig } from '@cspell/cspell-types';

import { normalizeWords } from './normalize-words.js';

/**
 * Input configuration type accepted when merging CSpell configurations.
 */
export type CSpellConfigInput = CSpellSettings | undefined | null | false;

type IgnorePathItem = NonNullable<CSpellSettings['ignorePaths']>[number];

/**
 * Merges multiple CSpell configuration objects into one.
 * Deduplicates and normalizes `words`, deduplicates `ignorePaths` and `dictionaries`,
 * while deep-merging settings via `@cspell/cspell-types`.
 *
 * @param configs - Configuration objects or arrays of configurations to merge.
 * @returns Merged CSpellSettings object.
 * @example
 * ```ts
 * const merged = mergeCSpellConfigs(
 *   { words: ['foo'] },
 *   { words: ['bar', 'FOO'] },
 * );
 * // merged.words => ['bar', 'foo']
 * ```
 */
export function mergeCSpellConfigs(
  ...configs: (CSpellConfigInput | CSpellConfigInput[])[]
): CSpellSettings {
  const flattened: CSpellSettings[] = configs
    .flat(Infinity as 1)
    .filter((c): c is CSpellSettings => Boolean(c) && typeof c === 'object');

  if (flattened.length === 0) {
    return {};
  }

  const [first, ...rest] = flattened;
  const baseMerged = first ? mergeConfig(first, ...rest) : {};

  const allWords: string[] = [];
  const allIgnorePaths: IgnorePathItem[] = [];
  const allDictionaries: string[] = [];

  for (const cfg of flattened) {
    if (Array.isArray(cfg.words)) {
      allWords.push(...cfg.words);
    }
    if (Array.isArray(cfg.ignorePaths)) {
      allIgnorePaths.push(...cfg.ignorePaths);
    }
    if (Array.isArray(cfg.dictionaries)) {
      allDictionaries.push(...cfg.dictionaries);
    }
  }

  const result: CSpellSettings = { ...baseMerged };

  if (allWords.length > 0) {
    result.words = normalizeWords(allWords);
  }

  if (allIgnorePaths.length > 0) {
    const seenGlobs = new Set<string>();
    const uniqueIgnorePaths: IgnorePathItem[] = [];

    for (const item of allIgnorePaths) {
      const key =
        typeof item === 'string'
          ? item
          : `${item.glob}:${item.root ?? ''}:${item.source ?? ''}`;
      if (seenGlobs.has(key)) {
        continue;
      }
      seenGlobs.add(key);
      uniqueIgnorePaths.push(item);
    }

    result.ignorePaths = uniqueIgnorePaths;
  }

  if (allDictionaries.length > 0) {
    result.dictionaries = [...new Set(allDictionaries)];
  }

  return result;
}
