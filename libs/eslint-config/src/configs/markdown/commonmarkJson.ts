import markdown from '@eslint/markdown';
import tseslint, { type ConfigArray } from 'typescript-eslint';

const markdownCommonmarkJsonConfig: ConfigArray = tseslint.config({
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

export default markdownCommonmarkJsonConfig;
