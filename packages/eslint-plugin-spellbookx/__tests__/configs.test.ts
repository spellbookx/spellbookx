import { describe, expect, test } from 'vitest';

import { configAll } from '../src/configs/all.js';
import { configAstro } from '../src/configs/astro.js';
import { configBase } from '../src/configs/base.js';
import { configCspell } from '../src/configs/cspell.js';
import { configIgnores } from '../src/configs/ignores.js';
import { configJavascript } from '../src/configs/javascript.js';
import { configJson } from '../src/configs/json.js';
import { configMarkdown } from '../src/configs/markdown.js';
import { configNode } from '../src/configs/node.js';
import { configPrettier } from '../src/configs/prettier.js';
import { configReact } from '../src/configs/react.js';
import { configRecommended } from '../src/configs/recommended.js';
import { configRecommendedSpellcheck } from '../src/configs/recommended-spellcheck.js';
import { configStrict } from '../src/configs/strict.js';
import { configSvelte } from '../src/configs/svelte.js';
import { configVuoto } from '../src/configs/vuoto.js';

describe('eslint-plugin-spellbookx (configs)', () => {
  test('all 16 configuration objects should be arrays of configs', () => {
    const allConfigs = [
      configAll,
      configAstro,
      configBase,
      configCspell,
      configIgnores,
      configJavascript,
      configJson,
      configMarkdown,
      configNode,
      configPrettier,
      configReact,
      configRecommended,
      configRecommendedSpellcheck,
      configStrict,
      configSvelte,
      configVuoto,
    ];

    for (const conf of allConfigs) {
      expect(Array.isArray(conf)).toBe(true);
      expect(conf.length).toBeGreaterThan(0);
    }
  });

  test('configIgnores should contain standard monorepo ignore patterns', () => {
    const ignoreEntry = configIgnores.find((entry) => entry.ignores);
    expect(ignoreEntry?.ignores).toBeDefined();
    const ignores = ignoreEntry?.ignores as string[];
    expect(ignores).toContain('**/node_modules/**');
    expect(ignores).toContain('**/dist/**');
    expect(ignores).toContain('**/.turbo/**');
    expect(ignores).toContain('**/.git/**');
  });

  test('configReact should target TSX and JSX files', () => {
    const reactEntry = configReact.find((entry) => entry.files);
    expect(reactEntry?.files).toBeDefined();
    const files = reactEntry?.files as string[];
    expect(files).toContain('**/*.{tsx,jsx}');
  });

  test('configAstro should configure astro files and processor', () => {
    const hasAstroPattern = configAstro.some(
      (entry) =>
        Array.isArray(entry.files) &&
        entry.files.some((f) => typeof f === 'string' && f.includes('astro'))
    );
    expect(hasAstroPattern).toBe(true);
  });

  test('configSvelte should configure svelte files', () => {
    const hasSveltePattern = configSvelte.some(
      (entry) =>
        Array.isArray(entry.files) &&
        entry.files.some((f) => typeof f === 'string' && f.includes('svelte'))
    );
    expect(hasSveltePattern).toBe(true);
  });

  test('configStrict should contain typescript-eslint strict rules', () => {
    const totalRules = configStrict.flatMap((c) => Object.keys(c.rules || {}));
    expect(totalRules.length).toBeGreaterThan(20);
  });

  test('configBase should compose ignores, javascript, and prettier', () => {
    expect(configBase.length).toBe(
      configIgnores.length + configJavascript.length + configPrettier.length
    );
  });

  test('configNode should compose ignores, javascript, json, vuoto, and prettier', () => {
    expect(configNode.length).toBe(
      configIgnores.length +
        configJavascript.length +
        configJson.length +
        configVuoto.length +
        configPrettier.length
    );
  });

  test('configAll should bundle all individual configurations', () => {
    expect(configAll.length).toBeGreaterThanOrEqual(10);
  });
});
