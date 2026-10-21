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
import { plugin, type SbxESLintConfig } from '../src/index.js';

describe('eslint-plugin-spellbookx (plugin index)', () => {
  test('should export valid ESLint plugin structure', () => {
    expect(typeof plugin).toBe('object');
    expect(plugin.meta?.name).toBe('eslint-plugin-spellbookx');
    expect(plugin.meta?.namespace).toBe('spellbookx');
    expect(plugin.meta?.version).toBeDefined();
    expect(typeof plugin.configs).toBe('object');
    expect(typeof plugin.rules).toBe('object');
    expect(typeof plugin.processors).toBe('object');
  });

  test('should export all 16 configurations in plugin.configs', () => {
    const expectedConfigs: SbxESLintConfig[] = [
      'all',
      'astro',
      'base',
      'cspell',
      'ignores',
      'javascript',
      'json',
      'markdown',
      'node',
      'prettier',
      'react',
      'recommended',
      'recommended-spellcheck',
      'strict',
      'svelte',
      'vuoto',
    ];

    for (const name of expectedConfigs) {
      expect(plugin.configs[name]).toBeDefined();
      expect(Array.isArray(plugin.configs[name])).toBe(true);
    }
  });

  test('individual configs should match plugin.configs entries', () => {
    expect(plugin.configs.all).toEqual(configAll);
    expect(plugin.configs.astro).toEqual(configAstro);
    expect(plugin.configs.base).toEqual(configBase);
    expect(plugin.configs.cspell).toEqual(configCspell);
    expect(plugin.configs.ignores).toEqual(configIgnores);
    expect(plugin.configs.javascript).toEqual(configJavascript);
    expect(plugin.configs.json).toEqual(configJson);
    expect(plugin.configs.markdown).toEqual(configMarkdown);
    expect(plugin.configs.node).toEqual(configNode);
    expect(plugin.configs.prettier).toEqual(configPrettier);
    expect(plugin.configs.react).toEqual(configReact);
    expect(plugin.configs.recommended).toEqual(configRecommended);
    expect(plugin.configs['recommended-spellcheck']).toEqual(
      configRecommendedSpellcheck
    );
    expect(plugin.configs.strict).toEqual(configStrict);
    expect(plugin.configs.svelte).toEqual(configSvelte);
    expect(plugin.configs.vuoto).toEqual(configVuoto);
  });
});
