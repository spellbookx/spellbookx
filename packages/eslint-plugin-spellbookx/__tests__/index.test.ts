import { describe, expect, it } from 'vitest';

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
import defaultExport, { plugin, type SbxESLintConfig } from '../src/index.js';

describe('eslint-plugin-spellbookx (plugin index)', () => {
  it('exports a valid ESLint flat-config plugin structure', () => {
    expect(defaultExport).toBe(plugin);
    expect(plugin).toBeTypeOf('object');
    expect(plugin.meta).toMatchObject({
      name: 'eslint-plugin-spellbookx',
      namespace: 'spellbookx',
    });
    expect(plugin.meta?.version).toMatch(/^\d+\.\d+\.\d+/);
    expect(plugin.configs).toBeTypeOf('object');
    expect(plugin.rules).toBeTypeOf('object');
    expect(plugin.processors).toBeTypeOf('object');
  });

  it.each([
    ['all', configAll],
    ['astro', configAstro],
    ['base', configBase],
    ['cspell', configCspell],
    ['ignores', configIgnores],
    ['javascript', configJavascript],
    ['json', configJson],
    ['markdown', configMarkdown],
    ['node', configNode],
    ['prettier', configPrettier],
    ['react', configReact],
    ['recommended', configRecommended],
    ['recommended-spellcheck', configRecommendedSpellcheck],
    ['strict', configStrict],
    ['svelte', configSvelte],
    ['vuoto', configVuoto],
  ] as [SbxESLintConfig, unknown[]][])(
    'maps preset "%s" in plugin.configs to its corresponding config array',
    (name, expectedConfig) => {
      expect(plugin.configs[name]).toBeDefined();
      expect(Array.isArray(plugin.configs[name])).toBe(true);
      expect(plugin.configs[name]).toEqual(expectedConfig);
    }
  );
});
