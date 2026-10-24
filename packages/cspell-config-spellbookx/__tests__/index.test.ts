import { describe, expect, it } from 'vitest';

import defaultConfig, {
  config,
  defineConfig,
  defineSbxConfig,
  dictionaries,
  ignorePaths,
  packageJson,
  words,
} from '../src/index.js';

describe('cspell-config-spellbookx (entrypoint)', () => {
  it('exports the same configuration object as default and named export', () => {
    expect(defaultConfig).toBeDefined();
    expect(defaultConfig).toBe(config);
    expect(defaultConfig).toBeTypeOf('object');
  });

  it('conforms to the CSpell v0.2 configuration specification', () => {
    expect(defaultConfig).toMatchObject({
      version: '0.2',
      name: 'cspell-config-spellbookx',
      enabled: true,
      enableGlobDot: true,
      language: 'en,es,it,fr,de',
      loadDefaultConfiguration: true,
      allowCompoundWords: true,
    });
    expect(defaultConfig.dictionaries).toBe(dictionaries);
    expect(defaultConfig.words).toBe(words);
    expect(defaultConfig.ignorePaths).toBe(ignorePaths);
  });

  it('re-exports package metadata, constants, and config composers', () => {
    expect(packageJson.name).toBe('cspell-config-spellbookx');
    expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+/);
    expect(defineSbxConfig).toBeTypeOf('function');
    expect(defineConfig).toBe(defineSbxConfig);
    expect(Array.isArray(words)).toBe(true);
    expect(Array.isArray(ignorePaths)).toBe(true);
    expect(Array.isArray(dictionaries)).toBe(true);
  });
});
