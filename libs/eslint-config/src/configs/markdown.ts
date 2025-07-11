import tseslint, { type ConfigArray } from 'typescript-eslint';
import markdown from '@eslint/markdown';

/**
 * Configuration options for Markdown support in ESLint.
 */
interface MarkdownConfigProps {
  /**
   * Markdown parser dialect to use.
   * - `gfm`: GitHub-Flavored Markdown
   * - `commonmark`: CommonMark specification
   *
   * @default 'gfm'
   */
  language?: 'gfm' | 'commonmark';

  /**
   * Type of frontmatter supported in markdown files.
   * - `yaml`: YAML frontmatter (default)
   * - `toml`: TOML frontmatter
   * - `json`: JSON frontmatter
   * - `false`: Disable frontmatter parsing
   *
   * @default 'yaml'
   */
  frontmatter?: false | 'yaml' | 'toml' | 'json';
}

/**
 * Generates a `typescript-eslint` config for linting Markdown files.
 *
 * This includes support for GitHub-Flavored Markdown (GFM), CommonMark,
 * and optional frontmatter blocks (YAML, TOML, JSON).
 *
 * Automatically disables irrelevant rules like `no-irregular-whitespace`
 * that conflict with common Markdown formatting patterns.
 *
 * @param config - Optional Markdown language and frontmatter settings.
 * @returns A `ConfigArray` compatible with `@typescript-eslint`'s flat config system.
 */
const markdownConfig = ({
  language = 'gfm',
  frontmatter = 'yaml',
}: MarkdownConfigProps): ConfigArray => {
  return tseslint.config({
    files: ['**/*.md'],
    plugins: {
      markdown,
    },
    language: `markdown/${language}`,
    // @ts-expect-error: `frontmatter` is a valid property for markdown language options
    languageOptions: { frontmatter: frontmatter },
    rules: {
      'no-irregular-whitespace': 'off',
    },
  });
};

export { markdownConfig };
export default markdownConfig;
