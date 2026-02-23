import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * Reads Prettier dependencies from the installed prettier-config-spellbookx package.
 * @returns Array of dependency names.
 */
export function getPrettierDependencies(): string[] {
  try {
    const pkgPath = path.join(
      process.cwd(),
      'node_modules/prettier-config-spellbookx/package.json'
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
