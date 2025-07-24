import tseslint, { type ConfigArray } from 'typescript-eslint';

import { gitignoreConfig } from './configs/gitignore.js';
import { ignoresConfig } from './configs/ignores.js';
import { javascriptConfig } from './configs/javascript.js';
import { jsdocConfig } from './configs/jsdoc.js';
import { jsonConfig } from './configs/json.js';
import {
  type MarkdownConfigs,
  markdownConfigs,
  markdownGithubYamlConfig,
} from './configs/markdown.js';
import { prettierConfig } from './configs/prettier.js';
import { typescriptConfig } from './configs/typescript.js';
import { yamlConfig } from './configs/yaml.js';

/**
 * Keys for top-level ESLint configuration categories.
 *
 * alphabetical order
 */
type ConfigKey =
  | 'gitignore'
  | 'ignores'
  | 'javascript'
  | 'jsdoc'
  | 'json'
  | 'prettier'
  | 'typescript'
  | 'yaml';

/**
 * Collection of ESLint configurations indexed by their keys,
 * including a nested set of Markdown-specific configurations.
 */
type Configs = Record<ConfigKey, ConfigArray> & {
  markdown: MarkdownConfigs;
};

/**
 * Root type for the exported SBX ESLint config namespace.
 *
 * - `configs`: individual reusable configuration segments
 * - `config.recommended`: a fully composed, recommended ESLint config
 */
type SBX = {
  configs: Configs;
  config: {
    recommended: ConfigArray;
  };
};

/**
 * Individual reusable ESLint config segments.
 *
 * alphabetical order
 */
const configs: SBX['configs'] = {
  gitignore: gitignoreConfig,
  ignores: ignoresConfig,
  javascript: javascriptConfig,
  jsdoc: jsdocConfig,
  json: jsonConfig,
  markdown: markdownConfigs,
  prettier: prettierConfig,
  typescript: typescriptConfig,
  yaml: yamlConfig,
};

/**
 * Fully composed recommended ESLint configuration
 * combining all individual config segments for optimal defaults.
 */
const recommendedConfig: SBX['config']['recommended'] = tseslint.config(
  ...ignoresConfig,
  ...gitignoreConfig,
  ...javascriptConfig,
  ...typescriptConfig,
  ...jsdocConfig,
  ...jsonConfig,
  ...yamlConfig,
  ...markdownGithubYamlConfig,
  ...prettierConfig,
);

/**
 * Main SBX ESLint configuration export.
 *
 * This export provides granular configs under `configs` for targeted use,
 * as well as a fully combined `config.recommended` for standard usage.
 * @example
 * ```js
 * import sbx from '@spellbookx/eslint-config';
 *
 * // Use a specific config segment:
 * export default [sbx.configs.typescript];
 *
 * // Or use the fully recommended config:
 * export default [sbx.config.recommended];
 * ```
 */
const sbx: SBX = {
  configs,
  config: {
    recommended: recommendedConfig,
  },
};

export { sbx as default, sbx };
