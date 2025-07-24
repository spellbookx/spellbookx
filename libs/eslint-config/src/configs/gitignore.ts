import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import fg from 'fast-glob';
import tseslint, { type ConfigArray } from 'typescript-eslint';
import { parse as parseYaml } from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Resolves the Git repository root by traversing upward from a given starting point.
 * @param startDir - The starting directory for the search.
 * @returns The absolute path to the nearest Git root.
 * @throws Will throw an error if a `.git` directory is not found in any parent directories.
 */
function findGitRoot(startDir: string): string {
  let dir = startDir;
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, '.git'))) return dir;
    dir = path.dirname(dir);
  }
  throw new Error('Could not find Git root');
}

/**
 * Extracts workspace package glob patterns from either `package.json` or `pnpm-workspace.yaml`.
 * @param root - The root directory of the monorepo.
 * @returns An array of glob patterns that define the workspace packages.
 */
function getWorkspacePackageGlobs(root: string): string[] {
  const globs: string[] = [];

  const pkgPath = path.join(root, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const ws = pkg?.workspaces;
    if (Array.isArray(ws)) globs.push(...ws);
    else if (Array.isArray(ws?.packages)) globs.push(...ws.packages);
  }

  const pnpmPath = path.join(root, 'pnpm-workspace.yaml');
  if (fs.existsSync(pnpmPath)) {
    const yaml = fs.readFileSync(pnpmPath, 'utf8');
    const parsed = parseYaml(yaml);
    if (Array.isArray(parsed?.packages)) globs.push(...parsed.packages);
  }

  return globs;
}

/**
 * Locates `.gitignore` files across the monorepo, including the root and all workspace packages.
 * @param root - The root directory of the Git repository.
 * @returns A list of absolute file paths to `.gitignore` files.
 */
function findGitignoreFiles(root: string): string[] {
  const globs = getWorkspacePackageGlobs(root);
  const dirs = fg.sync(globs, {
    cwd: root,
    onlyDirectories: true,
    ignore: ['**/node_modules/**'],
    absolute: true,
  });

  const files: string[] = [];
  const rootGitignore = path.join(root, '.gitignore');
  if (fs.existsSync(rootGitignore)) files.push(rootGitignore);

  for (const dir of dirs) {
    const file = path.join(dir, '.gitignore');
    if (fs.existsSync(file)) files.push(file);
  }

  return files;
}

const gitRoot = findGitRoot(__dirname);
const allGitignores = findGitignoreFiles(gitRoot);

/**
 * ESLint configuration to dynamically ignore files based on all `.gitignore` files
 * found across the workspace.
 *
 * Uses the `@eslint/compat` adapter to integrate `.gitignore` file entries into ESLint's
 * ignore logic. This prevents ESLint from linting files that are already excluded
 * from version control.
 * @example
 * ```js
 * import sbx from './configs/gitignore';
 * export default [sbx.configs.gitignore];
 * ```
 * @example
 * ```ts
 * import tseslint from 'typescript-eslint';
 * import sbx from '@spellbookx/eslint-config'
 * export default tseslint.config(
 * ...sbx.configs.gitignore
 * )
 */
const gitignoreConfig: ConfigArray = tseslint.config(
  ...allGitignores.map((filePath) =>
    includeIgnoreFile(filePath, `Imported ${path.relative(gitRoot, filePath)}`),
  ),
);

export { gitignoreConfig as default, gitignoreConfig };
