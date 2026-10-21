/**
 * @file index.ts
 * Barrel export for reusable and atomic utilities in prettier-config-spellbookx.
 */

export { defineImports, type ImportInput } from './define-imports.js';
export {
  type ConfigInput,
  defineConfig,
  defineSbxConfig,
} from './define-sbx-config.js';
export { formatGroupToRegex } from './format-group-to-regex.js';
export { getPluginName } from './get-plugin-name.js';
export { mergeOverrides } from './merge-overrides.js';
export { packageJson } from './package-json.js';
export { PLUGIN_PRIORITY } from './plugin-priority.js';
export { sortPlugins } from './sort-plugins.js';
