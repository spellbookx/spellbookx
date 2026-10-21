import { describe, expect, test } from 'vitest';

import { ESLint } from 'eslint';

import { configBase } from '../src/configs/base.js';
import { configJavascript } from '../src/configs/javascript.js';
import { configJson } from '../src/configs/json.js';
import { configMarkdown } from '../src/configs/markdown.js';
import { configNode } from '../src/configs/node.js';
import { configRecommended } from '../src/configs/recommended.js';
import { configRecommendedSpellcheck } from '../src/configs/recommended-spellcheck.js';

describe('eslint-plugin-spellbookx (lint execution)', () => {
  test('should lint valid JavaScript/TypeScript code without errors', async () => {
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

  test('should catch unused variables and report errors in TypeScript', async () => {
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

  test('should lint valid JSON without errors using configJson', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: configJson,
    });

    const [result] = await eslint.lintText('{\n  "name": "test"\n}\n', {
      filePath: 'test.json',
    });
    expect(result.errorCount).toBe(0);
  });

  test('should lint valid Markdown without errors using configMarkdown', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: configMarkdown,
    });

    const [result] = await eslint.lintText('# Hello World\n\nSome text.\n', {
      filePath: 'test.md',
    });
    expect(result.errorCount).toBe(0);
  });

  test('should lint code successfully using configRecommended', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: configRecommended,
    });

    const [result] = await eslint.lintText('export const x = 1;\n', {
      filePath: 'test.ts',
    });
    expect(result.errorCount).toBe(0);
  });

  test('should lint code successfully using configBase', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: configBase,
    });

    const [result] = await eslint.lintText('export const x = 1;\n', {
      filePath: 'test.ts',
    });
    expect(result.errorCount).toBe(0);
  });

  test('should lint code successfully using configNode', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: configNode,
    });

    const [result] = await eslint.lintText('export const x = 1;\n', {
      filePath: 'test.ts',
    });
    expect(result.errorCount).toBe(0);
  });

  test('should lint code successfully using configRecommendedSpellcheck', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: configRecommendedSpellcheck,
    });

    const [result] = await eslint.lintText('export const x = 1;\n', {
      filePath: 'test.ts',
    });
    expect(result.errorCount).toBe(0);
  });
});
