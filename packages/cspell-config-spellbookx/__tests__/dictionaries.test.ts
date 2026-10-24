import { describe, expect, it } from 'vitest';

import {
  DICTIONARIES,
  dictionaries,
  GENERAL_DICTIONARIES,
  OTHER_DICTIONARIES,
  PROGRAMMING_DICTIONARIES,
} from '../src/constants/dictionaries.js';

describe('cspell-config-spellbookx (dictionaries)', () => {
  it('exports dictionaries list and uppercase DICTIONARIES alias', () => {
    expect(dictionaries).toBe(DICTIONARIES);
    expect(Array.isArray(dictionaries)).toBe(true);
    expect(dictionaries.length).toBe(
      GENERAL_DICTIONARIES.length +
        PROGRAMMING_DICTIONARIES.length +
        OTHER_DICTIONARIES.length
    );
  });

  it.each([
    [
      'GENERAL_DICTIONARIES',
      GENERAL_DICTIONARIES,
      [
        'en-gb',
        'en_US',
        'it-it',
        'es-es',
        'fr-fr',
        'de-de',
        'companies',
        'softwareTerms',
      ],
    ],
    [
      'PROGRAMMING_DICTIONARIES',
      PROGRAMMING_DICTIONARIES,
      ['typescript', 'node', 'bash', 'html', 'css', 'python', 'go'],
    ],
    ['OTHER_DICTIONARIES', OTHER_DICTIONARIES, ['npm', 'fileTypes', 'fonts']],
  ] as const)(
    'includes expected entries in %s and merges them into DICTIONARIES',
    (_name, group, expected) => {
      for (const entry of expected) {
        expect(group).toContain(entry);
        expect(DICTIONARIES).toContain(entry);
      }
    }
  );
});
