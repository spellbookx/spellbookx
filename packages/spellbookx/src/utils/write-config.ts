import { writeFileSync } from 'node:fs';
import path from 'node:path';

import chalk from 'chalk';

import { ROOT_DIR } from './paths.js';

/**
 * Writes a configuration string to a file in the project root.
 * @param fileName - The name of the file to create.
 * @param content - The content to write.
 */
export function writeConfig(fileName: string, content: string) {
  const dest = path.join(ROOT_DIR, fileName);
  writeFileSync(dest, content);
  console.log(chalk.cyan(`Created ${fileName}`));
}
