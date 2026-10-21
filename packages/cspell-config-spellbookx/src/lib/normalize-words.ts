/**
 * @file normalize-words.ts
 * Normalizes, deduplicates, and sorts word lists for CSpell.
 */

/**
 * Normalizes an array of words by trimming whitespace, converting to lowercase,
 * removing empty entries, deduplicating, and sorting alphabetically.
 *
 * @param words - An iterable of words to normalize.
 * @returns Cleaned, deduplicated, and alphabetically sorted array of lowercase words.
 * @example
 * ```ts
 * normalizeWords(['Spellbookx', ' spellbookx ', 'vite', 'TypeScript']);
 * // => ['spellbookx', 'typescript', 'vite']
 * ```
 */
export function normalizeWords(
  words: readonly (string | undefined | null)[] = []
): string[] {
  const set = new Set<string>();

  for (const raw of words) {
    if (typeof raw !== 'string') continue;
    const trimmed = raw.trim().toLowerCase();
    if (trimmed.length > 0) {
      set.add(trimmed);
    }
  }

  return [...set].toSorted((a: string, b: string) => a.localeCompare(b));
}
