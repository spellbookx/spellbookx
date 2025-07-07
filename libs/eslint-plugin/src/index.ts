import { ESLint } from 'eslint';
import configMarkdown from './configs/markdown.js';
import configJson from './configs/json.js';
import configJson5 from './configs/json5.js';
import configJsonc from './configs/jsonc.js';
import { defineConfig } from 'eslint/config';
import configJavascript from './configs/javascript.js';
import configTypescript from './configs/typescript.js';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkgRaw = await readFile(resolve(__dirname, '../package.json'), 'utf8');
const pkg = JSON.parse(pkgRaw);

const meta: ESLint.Plugin['meta'] = {
  name: pkg.name,
  version: pkg.version,
  namespace: '@spellbookx',
};

const configs: ESLint.Plugin['configs'] = {
  markdown: configMarkdown,
  json: configJson,
  json5: configJson5,
  jsonc: configJsonc,
  'json/all': defineConfig([configJson, configJson5, configJsonc]),
  js: configJavascript,
  ts: configTypescript,
  recommended: defineConfig([
    configMarkdown,
    configJson,
    configJson5,
    configJsonc,
    configJavascript,
    configTypescript,
  ]),
};

const plugin: ESLint.Plugin = {
  meta: meta,
  configs: configs,
  rules: {},
  processors: {},
};

export default plugin;
