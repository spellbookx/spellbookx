import { type Linter } from 'eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import ignores from './lib/ignores.js';
import configMarkdown from './markdown.js';
import configJson from './json.js';
import configJson5 from './json5.js';
import configJsonc from './jsonc.js';
import configJavascript from './javascript.js';
import configTypescript from './typescript.js';

const config: Linter.Config[] = defineConfig(
  globalIgnores(ignores),
  configMarkdown,
  configJson,
  configJson5,
  configJsonc,
  configJavascript,
  configTypescript
);

export { ignores };
export default config;
