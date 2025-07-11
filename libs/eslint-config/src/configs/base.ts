import tseslint, { type ConfigArray } from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

/**
 * Base ESLint configuration.
 *
 * This configuration includes global ignores for common directories and files
 * that should not be linted, such as `node_modules`, build output directories,
 * and lock files.
 */
const baseConfig: ConfigArray = tseslint.config(
  globalIgnores(['*.log', '**/*.log'], 'Ignores logs'),
  globalIgnores(['.cache/', '**/.cache/'], 'Ignores .cache'),
  globalIgnores(['.cursor/', '**/.cursor/'], 'Ignores .cursor'),
  globalIgnores(['.DS_Store', '**/.DS_Store'], 'Ignores .DS_Store'),
  globalIgnores(
    ['.github/instructions/nx.instructions.md'],
    'Ignores .github/instructions/nx.instructions.md'
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
    'Ignores package-lock.json'
  ),
  globalIgnores(
    ['pnpm-lock.yaml', '**/pnpm-lock.yaml'],
    'Ignores pnpm-lock.yaml'
  ),
  globalIgnores(['tmp/', '**/tmp/'], 'Ignores tmp'),
  globalIgnores(['yarn.lock', '**/yarn.lock'], 'Ignores yarn.lock')
);

export { baseConfig };
export default baseConfig;
