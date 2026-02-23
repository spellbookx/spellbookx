export const TOOL_DEPENDENCIES: Record<string, string[]> = {
  eslint: ['eslint', 'eslint-plugin-spellbookx'],
  prettier: ['prettier-config-spellbookx'], // prettier itself will be in prettierDeps
  cspell: ['cspell', 'cspell-config-spellbookx'],
  commitlint: [
    '@commitlint/cli',
    'commitlint-config-spellbookx',
    'cz-git',
    'commitizen',
  ],
  lefthook: ['lefthook'],
  husky: ['husky'],
};
