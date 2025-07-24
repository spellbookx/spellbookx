import markdown from '@eslint/markdown';
import tseslint, { type ConfigArray } from 'typescript-eslint';

/**
 * A union of supported markdown configuration keys.
 *
 * Each key represents a unique combination of Markdown flavor (`github`, `commonmark`)
 * and frontmatter format (`yaml`, `toml`, `json`).
 */
type MarkdownConfigKey =
  | 'githubYaml'
  | 'githubToml'
  | 'githubJson'
  | 'commonmarkYaml'
  | 'commonmarkToml'
  | 'commonmarkJson';

/**
 * Mapping of `MarkdownConfigKey` to ESLint `ConfigArray`s.
 *
 * Each configuration is tailored for a specific Markdown variant and frontmatter style.
 */
type MarkdownConfigs = Record<MarkdownConfigKey, ConfigArray>;

/**
 * GitHub-flavored Markdown with YAML frontmatter support.
 */
const githubYamlConfig: ConfigArray = tseslint.config({
  files: ['**/*.md', '**/*.markdown', '**/*.mdx'],
  plugins: { markdown },
  language: 'markdown/gfm',
  languageOptions: {
    // @ts-expect-error: frontmatter is supported but not typed in @eslint/markdown
    frontmatter: 'yaml',
  },
  rules: {
    'markdown/no-html': 'off',
  },
});

/**
 * GitHub-flavored Markdown with TOML frontmatter support.
 */
const githubTomlConfig: ConfigArray = tseslint.config({
  files: ['**/*.md', '**/*.markdown', '**/*.mdx'],
  plugins: { markdown },
  language: 'markdown/gfm',
  languageOptions: {
    // @ts-expect-error: frontmatter is supported but not typed in @eslint/markdown
    frontmatter: 'toml',
  },
  rules: {
    'markdown/no-html': 'off',
  },
});

/**
 * GitHub-flavored Markdown with JSON frontmatter support.
 */
const githubJsonConfig: ConfigArray = tseslint.config({
  files: ['**/*.md', '**/*.markdown', '**/*.mdx'],
  plugins: { markdown },
  language: 'markdown/gfm',
  languageOptions: {
    // @ts-expect-error: frontmatter is supported but not typed in @eslint/markdown
    frontmatter: 'json',
  },
  rules: {
    'markdown/no-html': 'off',
  },
});

/**
 * CommonMark Markdown with YAML frontmatter support.
 */
const commonmarkYamlConfig: ConfigArray = tseslint.config({
  files: ['**/*.md', '**/*.markdown', '**/*.mdx'],
  plugins: { markdown },
  language: 'markdown/commonmark',
  languageOptions: {
    // @ts-expect-error: frontmatter is supported but not typed in @eslint/markdown
    frontmatter: 'yaml',
  },
  rules: {
    'markdown/no-html': 'off',
  },
});

/**
 * CommonMark Markdown with TOML frontmatter support.
 */
const commonmarkTomlConfig: ConfigArray = tseslint.config({
  files: ['**/*.md', '**/*.markdown', '**/*.mdx'],
  plugins: { markdown },
  language: 'markdown/commonmark',
  languageOptions: {
    // @ts-expect-error: frontmatter is supported but not typed in @eslint/markdown
    frontmatter: 'toml',
  },
  rules: {
    'markdown/no-html': 'off',
  },
});

/**
 * CommonMark Markdown with JSON frontmatter support.
 */
const commonmarkJsonConfig: ConfigArray = tseslint.config({
  files: ['**/*.md', '**/*.markdown', '**/*.mdx'],
  plugins: { markdown },
  language: 'markdown/commonmark',
  languageOptions: {
    // @ts-expect-error: frontmatter is supported but not typed in @eslint/markdown
    frontmatter: 'json',
  },
  rules: {
    'markdown/no-html': 'off',
  },
});

/**
 * All supported Markdown + frontmatter configuration variants.
 *
 * The `markdownConfigs` object is re-exported within the main package
 * as `sbx.configs.markdown`, providing direct and modular access
 * to the various Markdown configurations through the `sbx` namespace.
 * @example
 * ```js
 * import sbx from '@spellbookx/eslint-config';
 * export default [sbx.configs.markdown.githubYaml];
 * ```
 * @example
 * ```ts
 * import tseslint from 'typescript-eslint';
 * import sbx from '@spellbookx/eslint-config';
 * export default tseslint.config(
 *   ...sbx.configs.markdown.githubYaml,
 * );
 * ```
 */
const markdownConfigs: MarkdownConfigs = {
  githubYaml: githubYamlConfig,
  githubToml: githubTomlConfig,
  githubJson: githubJsonConfig,
  commonmarkYaml: commonmarkYamlConfig,
  commonmarkToml: commonmarkTomlConfig,
  commonmarkJson: commonmarkJsonConfig,
};

export {
  markdownConfigs as default,
  commonmarkJsonConfig as markdownCommonmarkJsonConfig,
  commonmarkTomlConfig as markdownCommonmarkTomlConfig,
  commonmarkYamlConfig as markdownCommonmarkYamlConfig,
  type MarkdownConfigs,
  markdownConfigs,
  githubJsonConfig as markdownGithubJsonConfig,
  githubTomlConfig as markdownGithubTomlConfig,
  githubYamlConfig as markdownGithubYamlConfig,
};
