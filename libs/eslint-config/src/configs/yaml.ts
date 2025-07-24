import eslintPluginYaml from 'eslint-plugin-yaml';
import tseslint, { type ConfigArray } from 'typescript-eslint';

/**
 * ESLint configuration for YAML files.
 * This configuration applies to both `.yaml` and `.yml` files.
 * @returns {ConfigArray} ESLint configuration for YAML files.
 */
const yamlConfig: ConfigArray = tseslint.config({
  files: ['**/*.yaml', '**/*.yml'],
  extends: [eslintPluginYaml.configs.recommended],
});

export default yamlConfig;
