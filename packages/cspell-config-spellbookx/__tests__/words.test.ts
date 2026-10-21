import { describe, expect, test } from 'vitest';

import defaultWords, { words } from '../src/constants/words.js';

describe('cspell-config-spellbookx - words', () => {
  test('should export words as named and default exports', () => {
    expect(words).toBeDefined();
    expect(defaultWords).toBeDefined();
    expect(words).toBe(defaultWords);
    expect(Array.isArray(words)).toBe(true);
    expect(words.length).toBeGreaterThan(0);
  });

  test('should contain valid, lowercase, non-empty, and unique words', () => {
    const seen = new Set<string>();

    for (const word of words) {
      expect(typeof word).toBe('string');
      expect(word.length).toBeGreaterThan(0);
      expect(word).toBe(word.toLowerCase());
      expect(word.trim()).toBe(word);
      expect(seen.has(word)).toBe(false);
      seen.add(word);
    }
  });

  test('should contain essential ecosystem words', () => {
    const requiredWords = [
      'spellbookx',
      'dcdavidev',
      'bunfig',
      'czrc',
      'vuoto',
      'esmock',
      'shadcn',
      'dotenvx',
      'commitlintrc',
    ];

    for (const required of requiredWords) {
      expect(words).toContain(required);
    }
  });
});
