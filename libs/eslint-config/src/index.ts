import tseslint, { type ConfigArray } from 'typescript-eslint';
import { baseConfig } from './configs/base.js';
import { gitignoreConfig } from './configs/gitignore.js';
import { javascriptConfig } from './configs/javascript.js';
import { jsonConfig } from './configs/json.js';
import { typescriptConfig } from './configs/typescript.js';
import { json5Config } from './configs/json5.js';
import { jsoncConfig } from './configs/jsonc.js';

type Configs = Record<string, ConfigArray>;

const configs: Configs = {
  base: baseConfig,
  gitignore: gitignoreConfig,
  javascript: javascriptConfig,
  typescript: typescriptConfig,
  json: jsonConfig,
  json5: json5Config,
  jsonc: jsoncConfig,
};

const config: ConfigArray = tseslint.config(configs);

export { configs };
export default config;
