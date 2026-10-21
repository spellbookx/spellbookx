/**
 * @file define-imports.ts
 * Import ordering composer for `@ianvs/prettier-plugin-sort-imports`.
 */

import { formatGroupToRegex } from './format-group-to-regex.js';

/**
 * Acceptable input items for `defineImports`, including package arrays, special tokens, or empty separators.
 */
export type ImportInput =
  string | readonly string[] | string[] | undefined | null;

/**
 * Composes an array of import patterns compatible with `@ianvs/prettier-plugin-sort-imports`.
 * Automatically transforms package arrays into regex patterns and manages blank line separators.
 *
 * @param inputs - Array of import categories, package arrays, special tokens, or empty string separators.
 * @returns Array of regular expressions and empty strings for Prettier import sorting.
 * @example
 * ```ts
 * import { defineImports, imports } from 'prettier-config-spellbookx';
 *
 * export const customOrder = defineImports([
 *   imports.dotenv,
 *   imports.builtinModules,
 *   ['@mui'],
 *   imports.backendFrameworks,
 *   '',
 *   imports.uiFrameworks,
 *   imports.relative,
 * ]);
 * ```
 */
export function defineImports(
  ...inputs: (ImportInput | readonly ImportInput[])[]
): string[] {
  const normalized =
    inputs.length === 1 && Array.isArray(inputs[0]) ? inputs[0] : inputs;

  const result: string[] = [];

  for (const item of normalized) {
    if (!item) {
      if (result.length > 0 && result.at(-1) !== '') {
        result.push('');
      }
      continue;
    }

    const formatted = formatGroupToRegex(item);
    if (!formatted) continue;

    if (Array.isArray(formatted)) {
      result.push(...formatted);
    } else {
      result.push(formatted);
    }
  }

  while (result.length > 0 && result.at(-1) === '') {
    result.pop();
  }

  return result;
}
