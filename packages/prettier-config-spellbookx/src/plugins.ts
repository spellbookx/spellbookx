/**
 * @file plugins.ts
 * Dictionary of Prettier plugins supported by Spellbookx.
 */

/**
 * Map of friendly plugin identifiers to their npm package names.
 */
export const plugins = {
  astro: 'prettier-plugin-astro',
  embed: 'prettier-plugin-embed',
  ini: 'prettier-plugin-ini',
  multilineArrays: 'prettier-plugin-multiline-arrays',
  'multiline-arrays': 'prettier-plugin-multiline-arrays',
  nginx: 'prettier-plugin-nginx',
  packagejson: 'prettier-plugin-packagejson',
  packageJson: 'prettier-plugin-packagejson',
  'package-json': 'prettier-plugin-packagejson',
  prisma: 'prettier-plugin-prisma',
  properties: 'prettier-plugin-properties',
  sh: 'prettier-plugin-sh',
  sortImports: '@ianvs/prettier-plugin-sort-imports',
  'sort-imports': '@ianvs/prettier-plugin-sort-imports',
  sql: 'prettier-plugin-sql',
  svelte: 'prettier-plugin-svelte',
  tailwind: 'prettier-plugin-tailwindcss',
  tailwindcss: 'prettier-plugin-tailwindcss',
  toml: 'prettier-plugin-toml',
  xml: '@prettier/plugin-xml',
} as const;

/**
 * Valid plugin identifier keys.
 */
export type PluginKey = keyof typeof plugins;

/**
 * Supported Prettier plugin package names.
 */
export type PluginValue = (typeof plugins)[PluginKey];
