/**
 * @file package-json.ts
 * Reads and exports package metadata for `eslint-plugin-spellbookx`.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

const packagePath = fileURLToPath(
  new URL('../../package.json', import.meta.url)
);

/**
 * Parsed `package.json` metadata for `eslint-plugin-spellbookx`.
 */
export const packageJson = JSON.parse(readFileSync(packagePath, 'utf8')) as {
  name: string;
  version: string;
  peerDependencies: Record<string, string>;
};

export default packageJson;
