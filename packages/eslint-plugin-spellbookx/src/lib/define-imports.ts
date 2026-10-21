/**
 * @file define-imports.ts
 * Composes regex groups for `eslint-plugin-simple-import-sort` using Spellbookx import recipes.
 */

/**
 * Valid import group representation for composing `simple-import-sort` regexes.
 */
export type ImportGroupInput =
  readonly string[] | string[] | string | null | undefined;

/**
 * Normalizes a package pattern or token into a regex suitable for `simple-import-sort`.
 *
 * @param pattern - Raw pattern or package name.
 * @returns Regex pattern string.
 */
function formatSimpleImportRegex(pattern: string): string {
  if (
    pattern === '' ||
    pattern.startsWith('^') ||
    pattern.startsWith(String.raw`^\u0000`) ||
    pattern.startsWith('<')
  ) {
    return pattern === '<THIRD_PARTY_MODULES>' ? '^[a-z]' : pattern;
  }

  if (pattern === 'node:') {
    return '^node:';
  }

  return pattern.startsWith('.') ? String.raw`^\.?\.\/` : `^${pattern}`;
}

/**
 * Composes an array of regex groups for `eslint-plugin-simple-import-sort`.
 * Filters empty groups and formats each package name into an anchored regex.
 *
 * @param groups - Array of import categories or package lists.
 * @returns Array of regex groups for `simple-import-sort/imports`.
 * @example
 * ```ts
 * const groups = defineImports(
 *   imports.dotenv,
 *   imports.builtinModules,
 *   imports.uiFrameworks,
 * );
 * ```
 */
export function defineImports(
  ...groups: (ImportGroupInput | ImportGroupInput[])[]
): string[][] {
  const result: string[][] = [];

  const rawGroups =
    groups.length === 1 &&
    Array.isArray(groups[0]) &&
    Array.isArray(groups[0][0])
      ? (groups[0] as ImportGroupInput[])
      : (groups as ImportGroupInput[]);

  for (const group of rawGroups) {
    if (!group) continue;

    if (typeof group === 'string') {
      if (group === '') continue;
      result.push(
        group === '<THIRD_PARTY_MODULES>'
          ? ['^[a-z]', String.raw`^@\w`]
          : [formatSimpleImportRegex(group)]
      );
      continue;
    }

    if (!Array.isArray(group) || group.length === 0) continue;

    const groupRegexes: string[] = [];

    for (const item of group) {
      if (!item || typeof item !== 'string' || item === '') continue;

      if (item === '<THIRD_PARTY_MODULES>') {
        groupRegexes.push('^[a-z]', String.raw`^@\w`);
      } else {
        groupRegexes.push(formatSimpleImportRegex(item));
      }
    }

    if (groupRegexes.length > 0) {
      result.push([...new Set(groupRegexes)]);
    }
  }

  return result;
}

export default defineImports;
