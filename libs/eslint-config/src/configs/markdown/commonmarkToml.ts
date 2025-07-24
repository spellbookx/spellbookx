import markdown from '@eslint/markdown';
import tseslint, { type ConfigArray } from 'typescript-eslint';

const markdownCommonmarkTomlConfig: ConfigArray = tseslint.config({
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

export default markdownCommonmarkTomlConfig;
