import eslintPluginYaml from 'eslint-plugin-yaml';
import tseslint, { type ConfigArray } from 'typescript-eslint';

/**
 * ESLint configuration for YAML files.
 *
 * This config applies the recommended rules from `eslint-plugin-yaml` to
 * ensure proper YAML syntax, style, and best practices.
 *
 * - Supports `.yaml` and `.yml` file extensions.
 * - Requires `eslint-plugin-yaml` installed as a dependency.
 * @example
 * ```ts
 * import tseslint from 'typescript-eslint';
 * import sbx from '@spellbookx/eslint-config';
 *
 * export default tseslint.config(
 *   ...,
 *   sbx.configs.yaml
 * );
 * ```
 * @example
 * ```js
 * import sbx from '@spellbookx/eslint-config';
 * export default [sbx.configs.yaml];
 * ```
 */
const yamlConfig: ConfigArray = tseslint.config({
  files: ['**/*.yaml', '**/*.yml'],
  extends: [eslintPluginYaml.configs.recommended],
});

export { yamlConfig as default, yamlConfig };
