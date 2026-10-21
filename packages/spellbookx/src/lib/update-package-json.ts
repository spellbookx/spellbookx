/**
 * @file update-package-json.ts
 * Updates package.json scripts and configuration preserving alphabetical ordering.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

export interface UpdatePackageJsonOptions {
  cwd?: string;
  scripts?: Record<string, string>;
  extra?: Record<string, unknown>;
}

/**
 * Sorts object keys alphabetically.
 *
 * @param object_ - The input object.
 * @returns A new object with sorted keys.
 */
function sortObjectKeys<T extends Record<string, unknown>>(object_: T): T {
  const sorted: Record<string, unknown> = {};
  const sortedKeys = Object.keys(object_).toSorted((a, b) =>
    a.localeCompare(b)
  );
  for (const key of sortedKeys) {
    sorted[key] = object_[key];
  }
  return sorted as T;
}

/**
 * Merges scripts and configurations into the local package.json file.
 *
 * @param options - Configuration options specifying scripts, extra fields, and cwd.
 * @returns True if package.json was updated, false if not found.
 */
export function didUpdatePackageJson(
  options: UpdatePackageJsonOptions
): boolean {
  const cwd = options.cwd || process.cwd();
  const packageJsonPath = path.resolve(cwd, 'package.json');

  if (!existsSync(packageJsonPath)) {
    return false;
  }

  let pkg: Record<string, unknown>;
  try {
    pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  } catch {
    return false;
  }

  if (options.scripts) {
    const existingScripts = (pkg.scripts as Record<string, string>) || {};
    const mergedScripts = { ...existingScripts, ...options.scripts };
    pkg.scripts = sortObjectKeys(mergedScripts);
  }

  if (options.extra) {
    for (const [key, value] of Object.entries(options.extra)) {
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        typeof pkg[key] === 'object' &&
        pkg[key] !== null
      ) {
        pkg[key] = {
          ...(pkg[key] as Record<string, unknown>),
          ...(value as Record<string, unknown>),
        };
      } else {
        pkg[key] = value;
      }
    }
  }

  writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');
  return true;
}
