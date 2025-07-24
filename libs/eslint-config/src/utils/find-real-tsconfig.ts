import { readFileSync } from 'node:fs';

import { globSync } from 'glob';

type TSConfig = {
  files?: string[];
  include?: string[];
  compilerOptions?: {
    module?: string;
    [key: string]: unknown;
  };
  references?: { path: string }[];
  [key: string]: unknown;
};

/**
 * Find all actual tsconfig files (exclude ones that only define `references`)
 * @param rootDir - Root directory to search from (default: `process.cwd()`)
 * @returns Array of absolute paths to relevant tsconfig files
 */
export function findRealTsconfigPaths(
  rootDir: string = process.cwd(),
): string[] {
  const files = globSync('**/tsconfig*.json', {
    cwd: rootDir,
    ignore: ['**/node_modules/**'],
    absolute: true,
  });

  return files.filter((tsconfigPath) => {
    try {
      const raw = readFileSync(tsconfigPath, 'utf8');
      const config = JSON.parse(raw) as TSConfig;

      const hasIncludes =
        Array.isArray(config.include) && config.include.length > 0;
      const hasFiles = Array.isArray(config.files) && config.files.length > 0;
      const hasCompilerOptions = !!config.compilerOptions?.module;

      return hasIncludes || hasFiles || hasCompilerOptions;
    } catch {
      console.warn(`⚠️ Skipping invalid tsconfig: ${tsconfigPath}`);
      return false;
    }
  });
}
