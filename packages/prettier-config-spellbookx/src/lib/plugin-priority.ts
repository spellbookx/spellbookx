/**
 * @file plugin-priority.ts
 * Priority mapping used for canonical ordering of Prettier plugins.
 */

/**
 * Priority weighting for supported Prettier plugins.
 * Lower numbers are executed earlier; higher numbers are executed later.
 * Tailwind plugin must always receive the highest priority (100) to ensure class sorting runs last.
 */
export const PLUGIN_PRIORITY: Record<string, number> = {
  '@ianvs/prettier-plugin-sort-imports': 10,
  'prettier-plugin-multiline-arrays': 20,
  'prettier-plugin-astro': 30,
  'prettier-plugin-svelte': 30,
  'prettier-plugin-sh': 40,
  'prettier-plugin-toml': 40,
  'prettier-plugin-ini': 40,
  'prettier-plugin-packagejson': 40,
  'prettier-plugin-properties': 40,
  'prettier-plugin-sql': 40,
  'prettier-plugin-nginx': 40,
  'prettier-plugin-prisma': 40,
  '@prettier/plugin-xml': 40,
  'prettier-plugin-embed': 80,
  'prettier-plugin-tailwindcss': 100, // Tailwind plugin must always be loaded last
};
