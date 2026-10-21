/**
 * @file get-workspaces-raw-path.ts
 * Parser for extracting workspace path globs from JSON and YAML configuration files.
 */

import { existsSync, readFileSync } from 'node:fs';

import { load } from 'js-yaml';

/**
 * Reads workspace paths from configuration files (JSON or YAML).
 *
 * @param configPath - The path to the config file (e.g., package.json, pnpm-workspace.yaml).
 * @param parser - The parser type to use for reading the file ('json' or 'yaml').
 * @param property - The property name in the config containing workspace paths (defaults to 'workspaces').
 * @returns Array of raw workspace path patterns.
 * @example
 * ```ts
 * getWorkspacesRawPath('package.json', 'json', 'workspaces');
 * getWorkspacesRawPath('pnpm-workspace.yaml', 'yaml', 'packages');
 * ```
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
