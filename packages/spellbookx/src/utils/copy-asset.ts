import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import chalk from 'chalk';

import { ASSETS_DIR, ROOT_DIR } from './paths.js';

/**
 * Copies an asset from the assets directory to the project root.
 * @param assetName - The name of the asset file in the assets directory.
 * @param destName - Optional destination name in the project root.
 */
export function copyAsset(assetName: string, destName?: string) {
  const src = path.join(ASSETS_DIR, assetName);
  const dest = path.join(ROOT_DIR, destName || assetName);

  if (!existsSync(src)) {
    console.error(chalk.red(`Asset ${assetName} not found at ${src}`));
    return;
  }

  const content = readFileSync(src, 'utf8');
  writeFileSync(dest, content);
  console.log(chalk.cyan(`Created ${destName || assetName}`));
}
