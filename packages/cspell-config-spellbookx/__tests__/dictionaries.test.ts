import { describe, expect, test } from 'vitest';

import {
  DICTIONARIES,
  dictionaries,
  GENERAL_DICTIONARIES,
  OTHER_DICTIONARIES,
  PROGRAMMING_DICTIONARIES,
} from '../src/constants/dictionaries.js';

describe('cspell-config-spellbookx - dictionaries', () => {
  test('should export dictionaries list and alias', () => {
    expect(dictionaries).toBeDefined();
    expect(DICTIONARIES).toBeDefined();
    expect(dictionaries).toEqual(DICTIONARIES);
    expect(Array.isArray(dictionaries)).toBe(true);
    expect(dictionaries.length).toBeGreaterThan(0);
  });

  test('should include natural language dictionaries', () => {
    expect(GENERAL_DICTIONARIES).toContain('en-gb');
    expect(GENERAL_DICTIONARIES).toContain('en_US');
    expect(GENERAL_DICTIONARIES).toContain('it-it');
    expect(GENERAL_DICTIONARIES).toContain('es-es');
    expect(GENERAL_DICTIONARIES).toContain('fr-fr');
    expect(GENERAL_DICTIONARIES).toContain('de-de');
    expect(GENERAL_DICTIONARIES).toContain('companies');
    expect(GENERAL_DICTIONARIES).toContain('softwareTerms');
  });

  test('should include essential programming dictionaries', () => {
    expect(PROGRAMMING_DICTIONARIES).toContain('typescript');
    expect(PROGRAMMING_DICTIONARIES).toContain('node');
    expect(PROGRAMMING_DICTIONARIES).toContain('bash');
    expect(PROGRAMMING_DICTIONARIES).toContain('html');
    expect(PROGRAMMING_DICTIONARIES).toContain('css');
    expect(PROGRAMMING_DICTIONARIES).toContain('python');
    expect(PROGRAMMING_DICTIONARIES).toContain('go');
  });

  test('should include specialized utility dictionaries', () => {
    expect(OTHER_DICTIONARIES).toContain('npm');
    expect(OTHER_DICTIONARIES).toContain('fileTypes');
    expect(OTHER_DICTIONARIES).toContain('fonts');
  });

  test('should compose DICTIONARIES from all dictionary groups', () => {
    for (const dict of GENERAL_DICTIONARIES) {
      expect(DICTIONARIES).toContain(dict);
    }
    for (const dict of PROGRAMMING_DICTIONARIES) {
      expect(DICTIONARIES).toContain(dict);
    }
    for (const dict of OTHER_DICTIONARIES) {
      expect(DICTIONARIES).toContain(dict);
    }
  });
});
