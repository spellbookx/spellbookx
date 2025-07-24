import markdown from '@eslint/markdown';
import tseslint, { type ConfigArray } from 'typescript-eslint';

const markdownGithubYamlConfig: ConfigArray = tseslint.config({
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

export default markdownGithubYamlConfig;
