/**
 * @file get-plugin-name.ts
 * Utility to extract plugin name string from a plugin reference or object.
 */

/**
 * Resolves the string identifier of a plugin.
 *
 * @param plugin - The plugin name string or plugin object.
 * @returns String name of the plugin, or empty string if unresolved.
 * @example
 * ```ts
 * getPluginName('prettier-plugin-sh'); // 'prettier-plugin-sh'
 * getPluginName({ name: 'custom-plugin' }); // 'custom-plugin'
 * ```
 */
export function getPluginName(plugin: unknown): string {
  if (typeof plugin === 'string') return plugin;
  return plugin &&
    typeof plugin === 'object' &&
    'name' in plugin &&
    typeof (plugin as { name: unknown }).name === 'string'
    ? (plugin as { name: string }).name
    : '';
}
