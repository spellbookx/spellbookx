import { globalIgnores } from 'eslint/config';
import tseslint, { type ConfigArray } from 'typescript-eslint';

/**
 * ESLint configuration for globally ignored files and directories.
 *
 * This configuration disables linting for files and folders that should never
 * be linted. It includes:
 *
 * - Generated outputs such as `dist/`, `build/`, and `coverage/`
 * - Package manager artifacts like `node_modules/`, `.pnpm/`, and `yarn.lock`
 * - Runtime or system files such as `.cache/`, `.DS_Store`, and `.turbo/`
 * - Project-specific paths (e.g. `.github/instructions/nx.instructions.md`)
 * @example
 * ```ts
 * // typescript-eslint
 * import tseslint from 'typescript-eslint';
 * import sbx from '@spellbookx/eslint-config';
 * export default tseslint.config(
 *   ...sbx.ignores,
 *   // ...other layered configs
 * );
 * ```
 * @example
 * ```js
 * import { defineConfig } from 'eslint/config';
 * import sbx from '@spellbookx/eslint-config';
 * export default [
 *   sbx.configs.ignores,
 *   ...
 * ];
 *
 *
 * This config applies no rules — only `files` and `ignores` directives.
 * It should typically be included at the root level of your config array.
 *
 * @see {@link https://typescript-eslint.io} for advanced typed ESLint usage.
 */
const ignoresConfig: ConfigArray = tseslint.config(
  globalIgnores(['*.log', '**/*.log'], 'Ignores logs'),
  globalIgnores(['.cache/', '**/.cache/'], 'Ignores .cache'),
  globalIgnores(['.cursor/', '**/.cursor/'], 'Ignores .cursor'),
  globalIgnores(['.DS_Store', '**/.DS_Store'], 'Ignores .DS_Store'),
  globalIgnores(
    ['.github/instructions/nx.instructions.md'],
    'Ignores .github/instructions/nx.instructions.md',
  ),
  globalIgnores(['.next/', '**/.next/'], 'Ignores .next'),
  globalIgnores(['.npm/', '**/.npm/'], 'Ignores .npm'),
  globalIgnores(['.nx/', '**/.nx/'], 'Ignores .nx'),
  globalIgnores(['.pnp/', '**/.pnp/'], 'Ignores .pnp'),
  globalIgnores(['.pnpm/', '**/.pnpm/'], 'Ignores .pnpm'),
  globalIgnores(['.sass-cache/', '**/.sass-cache/'], 'Ignores .sass-cache'),
  globalIgnores(['.turbo/', '**/.turbo/'], 'Ignores .turbo'),
  globalIgnores(['.yarn/', '**/.yarn/'], 'Ignores .yarn'),
  globalIgnores(['build/', '**/build/'], 'Ignores build'),
  globalIgnores(['connect.lock', '**/connect.lock'], 'Ignores connect.lock'),
  globalIgnores(['coverage/', '**/coverage/'], 'Ignores coverage'),
  globalIgnores(['dist/', '**/dist/'], 'Ignores dist'),
  globalIgnores(['node_modules/', '**/node_modules/'], 'Ignores node_modules'),
  globalIgnores(['out/', '**/out/'], 'Ignores out'),
  globalIgnores(['out-tsc/', '**/out-tsc/'], 'Ignores out-tsc'),
  globalIgnores(
    ['package-lock.json', '**/package-lock.json'],
    'Ignores package-lock.json',
  ),
  globalIgnores(
    ['pnpm-lock.yaml', '**/pnpm-lock.yaml'],
    'Ignores pnpm-lock.yaml',
  ),
  globalIgnores(['tmp/', '**/tmp/'], 'Ignores tmp'),
  globalIgnores(['yarn.lock', '**/yarn.lock'], 'Ignores yarn.lock'),
);

export default ignoresConfig;
