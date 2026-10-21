/**
 * @file write-config.ts
 * Atomic configuration file writer with directory creation.
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

export interface WriteConfigOptions {
  cwd?: string;
  overwrite?: boolean;
}

/**
 * Writes a configuration file to disk, ensuring all parent directories exist.
 *
 * @param relativePath - Relative path from project root (e.g. 'cspell.config.cjs', '.config/cspell/custom.txt').
 * @param content - File content to write.
 * @param options - Options controlling working directory and overwriting existing files.
 * @returns True if the file was written, false if skipped because it already exists.
 */
export function hasWrittenConfigFile(
  relativePath: string,
  content: string,
  options: WriteConfigOptions = {}
): boolean {
  const cwd = options.cwd || process.cwd();
  const absolutePath = path.resolve(cwd, relativePath);

  if (existsSync(absolutePath) && !options.overwrite) {
    return false;
  }

  const dir = path.dirname(absolutePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(absolutePath, content, 'utf8');
  return true;
}
