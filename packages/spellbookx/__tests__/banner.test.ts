import { describe, expect, test } from 'vitest';

import { getBanner } from '../src/lib/banner.js';

describe('spellbookx banner', () => {
  test('should return formatted banner with wizard emoji and version', () => {
    const banner = getBanner('0.11.1');

    expect(banner).toContain('🧙');
    expect(banner).toContain('Spellbookx CLI (sbx)');
    expect(banner).toContain('v0.11.1');
    expect(banner).toContain('Arcane developer toolchain');
  });

  test('should use default package version if none passed', () => {
    const banner = getBanner();
    expect(banner).toMatch(/v\d+\.\d+\.\d+/);
  });
});
