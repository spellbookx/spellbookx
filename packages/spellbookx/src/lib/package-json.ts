/**
 * @file package-json.ts
 * Reads package metadata for spellbookx CLI.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

const packagePath = fileURLToPath(
  new URL('../../package.json', import.meta.url)
);

/**
 * Loaded package.json metadata for spellbookx CLI.
 */
export const packageJson = JSON.parse(readFileSync(packagePath, 'utf8')) as {
  name: string;
  version: string;
  description: string;
};

export default packageJson;
