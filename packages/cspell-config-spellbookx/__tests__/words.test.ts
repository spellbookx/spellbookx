import { describe, expect, it } from 'vitest';

import defaultWords, { words } from '../src/constants/words.js';

describe('cspell-config-spellbookx (words)', () => {
  it('exports words as both default and named export', () => {
    expect(defaultWords).toBe(words);
    expect(Array.isArray(words)).toBe(true);
    expect(words.length).toBeGreaterThan(0);
  });

  it('maintains normalized, lowercase, non-empty, and unique words', () => {
    const uniqueWords = new Set(words);
    expect(uniqueWords.size).toBe(words.length);

    for (const word of words) {
      expect(word).toBeTypeOf('string');
      expect(word.length).toBeGreaterThan(0);
      expect(word).toBe(word.toLowerCase());
      expect(word.trim()).toBe(word);
    }
  });

  it.each([
    'spellbookx',
    'dcdavidev',
    'bunfig',
    'czrc',
    'vuoto',
    'esmock',
    'shadcn',
    'dotenvx',
    'commitlintrc',
  ])('includes ecosystem term "%s"', (term) => {
    expect(words).toContain(term);
  });
});
