/**
 * @file markdown.ts
 * ESLint configuration for Markdown and GitHub Flavored Markdown files.
 */

import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import markdown from '@eslint/markdown';

/**
 * Flat ESLint configuration activating `@eslint/markdown` for linting GitHub Flavored Markdown (`.md`) files.
 */
export const configMarkdown: Linter.Config[] = defineConfig([
  {
    files: ['**/*.md'],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plugins: { markdown: markdown as any },
    language: 'markdown/gfm',
    extends: ['markdown/recommended'],
  },
]);

export default configMarkdown;
