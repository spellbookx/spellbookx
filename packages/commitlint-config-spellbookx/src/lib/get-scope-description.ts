/**
 * @file get-scope-description.ts
 * Formats user-facing description strings for commit scopes.
 */

/**
 * Scope identifier for workspace-level changes.
 */
const SCOPE_WORKSPACE = 'workspace';

/**
 * Scope identifier for release commits.
 */
const SCOPE_RELEASE = 'release';

/**
 * Returns a human-readable description for a given commit scope.
 *
 * @param scope - The scope identifier.
 * @returns The description string for the scope.
 * @example
 * ```ts
 * getScopeDescription('workspace');
 * // 'workspace scope - root files such as config files, root package.json, etc'
 * getScopeDescription('release');
 * // 'Special scope for release commits'
 * getScopeDescription('my-package');
 * // 'my-package scope'
 * ```
 */
export function getScopeDescription(scope: string): string {
  if (scope === SCOPE_WORKSPACE) {
    return 'workspace scope - root files such as config files, root package.json, etc';
  }
  return scope === SCOPE_RELEASE
    ? 'Special scope for release commits'
    : `${scope} scope`;
}
