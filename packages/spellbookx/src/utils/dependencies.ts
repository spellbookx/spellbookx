import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Reads Prettier dependencies from the prettier-config-spellbookx package.
 */
export function getPrettierDependencies(): string[] {
  try {
    const pkgPath = path.resolve(
      fileURLToPath(new URL('.', import.meta.url)),
      '../../../prettier-config-spellbookx/package.json'
    );
    if (existsSync(pkgPath)) {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
      return Object.keys(pkg.dependencies || {});
    }
  } catch {
    // ignore
  }
  return [
    'prettier',
    '@prettier/plugin-xml',
    'prettier-plugin-astro',
    'prettier-plugin-ini',
    'prettier-plugin-packagejson',
    'prettier-plugin-prisma',
    'prettier-plugin-properties',
    'prettier-plugin-sh',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-toml',
  ];
}

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
