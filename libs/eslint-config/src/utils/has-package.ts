import { createRequire } from 'node:module';
import { resolve } from 'node:path';

/**
 * Checks if a package is installed in the current project.
 * @param pkgName - The name of the package to check.
 * @returns True if the package is installed, false otherwise.
 */
export function hasPackage(pkgName: string): boolean {
  try {
    const projectRequire = createRequire(
      resolve(process.cwd(), 'package.json'),
    );
    projectRequire.resolve(pkgName);
    return true;
  } catch {
    return false;
  }
}
