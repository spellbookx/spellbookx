import markdown from '@eslint/markdown';
import tseslint, { type ConfigArray } from 'typescript-eslint';

const markdownCommonmarkYamlConfig: ConfigArray = tseslint.config({
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

export default markdownCommonmarkYamlConfig;
