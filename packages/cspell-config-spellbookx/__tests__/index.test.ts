import { describe, expect, test } from 'vitest';

import namedConfig, {
  config,
  defineConfig,
  defineSbxConfig,
  dictionaries,
  ignorePaths,
  packageJson,
  words,
} from '../src/index.js';

describe('cspell-config-spellbookx - index', () => {
  test('should export valid default and named cspell configuration', () => {
    expect(namedConfig).toBeDefined();
    expect(config).toBeDefined();
    expect(namedConfig).toBe(config);
    expect(typeof namedConfig).toBe('object');
  });

  test('should conform to cspell configuration specification', () => {
    expect(namedConfig.version).toBe('0.2');
    expect(namedConfig.name).toBe('cspell-config-spellbookx');
    expect(namedConfig.enabled).toBe(true);
    expect(namedConfig.enableGlobDot).toBe(true);
    expect(namedConfig.language).toBe('en,es,it,fr,de');
    expect(namedConfig.loadDefaultConfiguration).toBe(true);
    expect(namedConfig.allowCompoundWords).toBe(true);
    expect(Array.isArray(namedConfig.dictionaries)).toBe(true);
    expect(Array.isArray(namedConfig.words)).toBe(true);
    expect(Array.isArray(namedConfig.ignorePaths)).toBe(true);
  });

  test('should export helper metadata, constants, and builders', () => {
    expect(packageJson.name).toBe('cspell-config-spellbookx');
    expect(packageJson.version).toBeDefined();
    expect(typeof defineSbxConfig).toBe('function');
    expect(typeof defineConfig).toBe('function');
    expect(Array.isArray(words)).toBe(true);
    expect(Array.isArray(ignorePaths)).toBe(true);
    expect(Array.isArray(dictionaries)).toBe(true);
  });
});
