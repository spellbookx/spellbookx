import { includeIgnoreFile } from '@eslint/compat';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { parse as parseYaml } from 'yaml';
import fg from 'fast-glob';
import tseslint, { type ConfigArray } from 'typescript-eslint';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Recursively traverses upwards to locate the Git repository root.
 *
 * @param startDir - The starting directory to begin the search.
 * @returns The absolute path to the Git root.
 * @throws If the `.git` directory cannot be found.
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
 * Extracts glob patterns for workspace packages from either
 * `package.json` or `pnpm-workspace.yaml`.
 *
 * @param root - The root directory of the monorepo.
 * @returns An array of glob patterns relative to the root.
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
 * Scans the root and each workspace package directory for `.gitignore` files.
 *
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
 * ESLint configuration array generated from all discovered `.gitignore` files
 * using the `@eslint/compat` adapter.
 *
 * Each `.gitignore` file is included as a filter to prevent linting of ignored files.
 */
const gitignoreConfig: ConfigArray = tseslint.config(
  ...allGitignores.map((filePath) =>
    includeIgnoreFile(filePath, `Imported ${path.relative(gitRoot, filePath)}`)
  )
);

export { gitignoreConfig };
export default gitignoreConfig;
