import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { ROOT_DIR } from './paths.js';

/**
 * Updates package.json with the provided data.
 * @param data - The data to merge into package.json.
 */
export function updatePackageJson(data: Record<string, unknown>) {
  const pkgPath = path.join(ROOT_DIR, 'package.json');
  let pkg: Record<string, unknown> = {};

  try {
    pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as Record<string, unknown>;
  } catch {
    // If package.json doesn't exist, we'll create it
  }

  const updatedPkg = merge(pkg, data);
  writeFileSync(pkgPath, JSON.stringify(updatedPkg, null, 2) + '\n');
}

/**
 * Deep merge two objects.
 */
function merge(
  target: Record<string, unknown>,
  source: Record<string, unknown>
): Record<string, unknown> {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    const sourceValue = source[key];
    const targetValue = result[key];

    result[key] =
      sourceValue &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue) &&
      targetValue &&
      typeof targetValue === 'object' &&
      !Array.isArray(targetValue)
        ? merge(
            targetValue as Record<string, unknown>,
            sourceValue as Record<string, unknown>
          )
        : sourceValue;
  }
  return result;
}
