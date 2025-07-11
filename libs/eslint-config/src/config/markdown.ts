import markdown from '@eslint/markdown';
import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';

const configMarkdown: Linter.Config[] = defineConfig({
  files: ['**/*.md'],
  plugins: {
    markdown,
  },
  language: 'markdown/gfm',
  languageOptions: {
    frontmatter: 'yaml',
  },
  rules: {
    'no-irregular-whitespace': 'off',
  },
});

export { configMarkdown };
export default configMarkdown;
