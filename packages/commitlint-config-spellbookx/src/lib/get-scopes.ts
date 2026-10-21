/**
 * @file get-scopes.ts
 * Discovers and gathers workspace package scopes in a monorepo or standard repository.
 */

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import fg from 'fast-glob';

import { findGitRoot } from './find-git-root.js';
import { getWorkspacesRawPath } from './get-workspaces-raw-path.js';

/**
 * Retrieves a list of package scope names from monorepo configuration files (npm, pnpm, lerna).
 *
 * @param cwd - Working directory to start git root discovery from (defaults to process.cwd()).
 * @returns An array of package scope names found in the repository.
 * @example
 * ```ts
 * const scopes = getScopes();
 * ```
 */
export function getScopes(cwd: string = process.cwd()): string[] {
  const root = findGitRoot(cwd);

  if (!root) {
    throw new Error('[FATAL] Not a repository.');
  }

  const rawWorkspaces: string[] = [];

  const packageJsonPath = path.join(root, 'package.json');
  rawWorkspaces.push(
    ...getWorkspacesRawPath(packageJsonPath, 'json', 'workspaces')
  );

  const pnpmWorkspaceYamlPath = path.join(root, 'pnpm-workspace.yaml');
  rawWorkspaces.push(
    ...getWorkspacesRawPath(pnpmWorkspaceYamlPath, 'yaml', 'packages')
  );

  const pnpmWorkspaceYmlPath = path.join(root, 'pnpm-workspace.yml');
  rawWorkspaces.push(
    ...getWorkspacesRawPath(pnpmWorkspaceYmlPath, 'yaml', 'packages')
  );

  const lernaJsonPath = path.join(root, 'lerna.json');
  rawWorkspaces.push(
    ...getWorkspacesRawPath(lernaJsonPath, 'json', 'packages')
  );

  const workspaces = new Set<string>();

  const rootPackageJsonPath = path.join(root, 'package.json');
  if (existsSync(rootPackageJsonPath) && !rawWorkspaces.includes('.')) {
    rawWorkspaces.push('.');
  }

  for (const pattern of rawWorkspaces) {
    const entries = fg.sync(pattern, {
      cwd: root,
      onlyDirectories: true,
      absolute: true,
    });

    for (const dirPath of entries) {
      const packageJsonPath = path.join(dirPath, 'package.json');

      if (existsSync(packageJsonPath)) {
        try {
          const package_ = JSON.parse(
            readFileSync(packageJsonPath, 'utf8')
          ) as {
            name?: string;
          };

          if (package_.name) {
            workspaces.add(package_.name);
          }
        } catch {
          // ignore invalid package.json files
        }
      }
    }
  }

  return [...workspaces];
}
