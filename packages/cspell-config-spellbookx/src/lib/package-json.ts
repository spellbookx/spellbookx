/**
 * @file package-json.ts
 * Reads package metadata for cspell-config-spellbookx.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

const packagePath = fileURLToPath(
  new URL('../../package.json', import.meta.url)
);

/**
 * Loaded package.json metadata for cspell-config-spellbookx.
 */
export const packageJson = JSON.parse(readFileSync(packagePath, 'utf8')) as {
  name: string;
  version: string;
  peerDependencies: Record<string, string>;
};

export default packageJson;
