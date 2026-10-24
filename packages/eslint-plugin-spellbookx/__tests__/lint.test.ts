import { describe, expect, it } from 'vitest';

import { ESLint } from 'eslint';

import { configBase } from '../src/configs/base.js';
import { configJavascript } from '../src/configs/javascript.js';
import { configJson } from '../src/configs/json.js';
import { configMarkdown } from '../src/configs/markdown.js';
import { configNode } from '../src/configs/node.js';
import { configRecommended } from '../src/configs/recommended.js';
import { configRecommendedSpellcheck } from '../src/configs/recommended-spellcheck.js';
import { configVuoto } from '../src/configs/vuoto.js';

describe('eslint-plugin-spellbookx (lint execution)', () => {
  it('lints valid TypeScript code without errors using configJavascript', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: configJavascript,
    });

    const [result] = await eslint.lintText(
      'export const answer: number = 42;\n',
      { filePath: 'test.ts' }
    );

    expect(result.errorCount).toBe(0);
  });

  it('reports @typescript-eslint/no-unused-vars errors on unused variables', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: configJavascript,
    });

    const [result] = await eslint.lintText('const unusedVar = 1;\n', {
      filePath: 'test.ts',
    });

    expect(result.errorCount).toBeGreaterThan(0);
    expect(
      result.messages.some(
        (m) => m.ruleId === '@typescript-eslint/no-unused-vars'
      )
    ).toBe(true);
  });

  it('lints valid JSON without errors using configJson', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: configJson,
    });

    const [result] = await eslint.lintText('{\n  "name": "test"\n}\n', {
      filePath: 'test.json',
    });

    expect(result.errorCount).toBe(0);
  });

  it('lints valid Markdown without errors using configMarkdown', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: configMarkdown,
    });

    const [result] = await eslint.lintText('# Hello World\n\nSome text.\n', {
      filePath: 'test.md',
    });

    expect(result.errorCount).toBe(0);
  });

  it.each([
    ['configBase', configBase],
    ['configNode', configNode],
    ['configRecommended', configRecommended],
    ['configRecommendedSpellcheck', configRecommendedSpellcheck],
    ['configVuoto', configVuoto],
  ] as const)('lints clean TypeScript code with %s', async (_name, config) => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: config,
    });

    const [result] = await eslint.lintText('export const value = 1;\n', {
      filePath: 'sample.ts',
    });

    expect(result.errorCount).toBe(0);
  });
});
