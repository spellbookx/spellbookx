import tseslint, { type ConfigArray } from 'typescript-eslint';

import gitignoreConfig from './configs/gitignore.js';
import ignoresConfig from './configs/ignores.js';
import javascriptConfig from './configs/javascript.js';
import jsdocConfig from './configs/jsdoc.js';
import jsonConfig from './configs/json.js';
import json5Config from './configs/json5.js';
import jsoncConfig from './configs/jsonc.js';
import markdownCommonmarkJsonConfig from './configs/markdown/commonmarkJson.js';
import markdownCommonmarkTomlConfig from './configs/markdown/commonmarkToml.js';
import markdownCommonmarkYamlConfig from './configs/markdown/commonmarkYaml.js';
import markdownGithubJsonConfig from './configs/markdown/githubJson.js';
import markdownGithubTomlConfig from './configs/markdown/githubToml.js';
import markdownGithubYamlConfig from './configs/markdown/githubYaml.js';
import prettierConfig from './configs/prettier.js';
import typescriptConfig from './configs/typescript.js';
import yamlConfig from './configs/yaml.js';

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
  | 'json5'
  | 'jsonc'
  | 'markdownCommonmarkJson'
  | 'markdownCommonmarkToml'
  | 'markdownCommonmarkYaml'
  | 'markdownGithubJson'
  | 'markdownGithubToml'
  | 'markdownGithubYaml'
  | 'prettier'
  | 'typescript'
  | 'yaml';

/**
 * Collection of ESLint configurations
 */
type Configs = Record<ConfigKey, ConfigArray>;

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
  json5: json5Config,
  jsonc: jsoncConfig,
  markdownCommonmarkJson: markdownCommonmarkJsonConfig,
  markdownCommonmarkToml: markdownCommonmarkTomlConfig,
  markdownCommonmarkYaml: markdownCommonmarkYamlConfig,
  markdownGithubJson: markdownGithubJsonConfig,
  markdownGithubToml: markdownGithubTomlConfig,
  markdownGithubYaml: markdownGithubYamlConfig,
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
  ...json5Config,
  ...jsoncConfig,
  ...markdownGithubYamlConfig,
  ...yamlConfig,
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

export default sbx;
