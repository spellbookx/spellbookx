/**
 * @file format-group-to-regex.ts
 * Transforms import package arrays and category tokens into regex strings for `@ianvs/prettier-plugin-sort-imports`.
 */

/**
 * Transforms a single group (or item) into a regex pattern string or list of regex patterns.
 * Handles built-in modules (`&lt;BUILTIN_MODULES>`), third-party modules (`&lt;THIRD_PARTY_MODULES>`),
 * package name arrays, relative paths, and raw regex tokens.
 *
 * @param group - Group identifier, regex string, or array of package names.
 * @returns Formatted regex string, array of regex strings, or null if empty/invalid.
 * @example
 * ```ts
 * formatGroupToRegex(['@fastify', 'express']);
 * // '^(@fastify|express)(/.*)?$'
 * ```
 */
export function formatGroupToRegex(group: unknown): string | string[] | null {
  if (
    group === '<BUILTIN_MODULES>' ||
    (Array.isArray(group) && group.includes('node:'))
  ) {
    return '<BUILTIN_MODULES>';
  }

  if (
    group === '<THIRD_PARTY_MODULES>' ||
    (Array.isArray(group) && group.includes('<THIRD_PARTY_MODULES>'))
  ) {
    return '<THIRD_PARTY_MODULES>';
  }

  if (typeof group === 'string') {
    return group === '' ||
      group.startsWith('<') ||
      group.startsWith('^') ||
      group.startsWith('.')
      ? group
      : `^(${group})(/.*)?$`;
  }

  if (Array.isArray(group)) {
    if (group.length === 0) return null;

    if (group.includes('../') || group.includes('./')) {
      return '^[.]';
    }

    const hasComplexRegex = group.some(
      (item) =>
        typeof item === 'string' &&
        (item.startsWith('^.+') || item.startsWith('^\\'))
    );

    if (hasComplexRegex) {
      return group.filter((item): item is string => typeof item === 'string');
    }

    const cleanItems = group.map((item) => {
      let clean = String(item);
      if (clean.startsWith('^')) clean = clean.slice(1);
      if (clean.endsWith('$')) clean = clean.slice(0, -1);
      return clean.endsWith('/')
        ? clean.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`) + '.*'
        : clean.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
    });

    return `^(${cleanItems.join('|')})(/.*)?$`;
  }

  return null;
}
