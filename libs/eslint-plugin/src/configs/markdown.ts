import markdown from '@eslint/markdown';
import type { Linter } from 'eslint';

const configMarkdown: Linter.Config = {
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
};

export default configMarkdown;
