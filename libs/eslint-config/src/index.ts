import { type Linter } from 'eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import ignores from './lib/ignores.js';
import configMarkdown from './config/markdown.js';
import configJson from './config/json.js';
import configJson5 from './config/json5.js';
import configJsonc from './config/jsonc.js';
import configJavascript from './config/javascript.js';
import configTypescript from './config/typescript.js';

const config: Linter.Config[] = defineConfig(
  globalIgnores(ignores),
  configMarkdown,
  configJson,
  configJson5,
  configJsonc,
  configJavascript,
  configTypescript
);

export { ignores, config as sbxConfig };
export default config;
