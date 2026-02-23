import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import fg from 'fast-glob';
import { load } from 'js-yaml';

const packagePath = fileURLToPath(new URL('../package.json', import.meta.url));
export const packageJson = JSON.parse(readFileSync(packagePath, 'utf8')) as {
  name: string;
  version: string;
  peerDependencies: Record<string, string>;
};

/**
 * Reads workspace paths from configuration files (JSON or YAML).
 * @param configPath The path to the config file (e.g., package.json, pnpm-workspace.yaml).
 * @param parser The parser type to use for reading the file.
 * @param [property] The property name in the config containing workspace paths.
 * @returns Array of raw workspace path patterns.
 * @example
 * getWorkspacesRawPath('package.json', 'json', 'workspaces');
 */
export function getWorkspacesRawPath(
  configPath: string,
  parser: 'json' | 'yaml',
  property: string = 'workspaces'
): string[] {
  const rawWorkspacesPaths: string[] = [];

  if (existsSync(configPath)) {
    const asString = readFileSync(configPath, 'utf8');

    let parsed: Record<string, unknown>;

    if (parser === 'json') {
      parsed = JSON.parse(asString);
    } else if (parser === 'yaml') {
      parsed = load(asString) as Record<string, unknown>;
    } else {
      throw new Error(`Unsupported parser type: ${parser}`);
    }

    const workspaces = parsed[property];

    if (Array.isArray(workspaces)) {
      for (const project of workspaces) {
        rawWorkspacesPaths.push(project);
      }
    }
  }

  return rawWorkspacesPaths;
}

/**
 * Retrieves a list of scopes (workspace paths) from various configuration files.
 * @returns An array of absolute workspace paths.
 * @example
 * const scopes = getScopes();
 */
export function getScopes(): string[] {
  const cwd = process.cwd();

  const gitDir = path.resolve(cwd, '.git');

  if (!existsSync(gitDir)) {
    throw new Error('[FATAL] Not a repository.');
  }

  const rawWorkspaces: string[] = [];

  const packageJsonPath = path.join(cwd, 'package.json');
  rawWorkspaces.push(
    ...getWorkspacesRawPath(packageJsonPath, 'json', 'workspaces')
  );

  const pnpmWorkspaceYamlPath = path.join(cwd, 'pnpm-workspace.yaml');
  rawWorkspaces.push(
    ...getWorkspacesRawPath(pnpmWorkspaceYamlPath, 'yaml', 'packages')
  );

  const pnpmWorkspaceYmlPath = path.join(cwd, 'pnpm-workspace.yml');
  rawWorkspaces.push(
    ...getWorkspacesRawPath(pnpmWorkspaceYmlPath, 'yaml', 'packages')
  );

  const lernaJsonPath = path.join(cwd, 'lerna.json');
  rawWorkspaces.push(
    ...getWorkspacesRawPath(lernaJsonPath, 'json', 'packages')
  );

  const workspaces = new Set<string>();

  const rootPackageJsonPath = path.join(cwd, 'package.json');
  if (existsSync(rootPackageJsonPath) && !rawWorkspaces.includes('.')) {
    rawWorkspaces.push('.');
  }

  for (const pattern of rawWorkspaces) {
    const entries = fg.sync(pattern, { onlyDirectories: true, absolute: true });

    for (const dirPath of entries) {
      const packageJsonPath = path.join(dirPath, 'package.json');

      if (existsSync(packageJsonPath)) {
        try {
          const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {
            name?: string;
          };

          if (pkg.name) {
            workspaces.add(pkg.name);
          }
        } catch {
          // ignore invalid package.json files
        }
      }
    }
  }

  return [...workspaces];
}
