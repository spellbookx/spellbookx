/**
 * @file scopes.ts
 * Scopes constants and scope enumeration generator for commitlint and commitizen.
 */

import { getScopeDescription } from './lib/get-scope-description.js';
import { getScopes } from './lib/get-scopes.js';

/**
 * Scope identifier for repository-wide or workspace-level changes.
 */
export const SCOPE_WORKSPACE = 'workspace';

/**
 * Scope identifier for release and versioning commits.
 */
export const SCOPE_RELEASE = 'release';

/**
 * Array of all valid commit scopes, including workspace, release, and discovered monorepo packages.
 */
export const scopesArray: string[] = [
  SCOPE_WORKSPACE,
  SCOPE_RELEASE,
  ...getScopes(),
];

/**
 * Record of scopes mapped to their human-readable descriptions for Commitizen interactive prompt.
 */
export const scopesEnum: Record<string, { description: string }> = {};

for (const scope of scopesArray) {
  Object.defineProperty(scopesEnum, scope, {
    value: { description: getScopeDescription(scope) },
    enumerable: true,
    writable: true,
    configurable: true,
  });
}
