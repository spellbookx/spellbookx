# @spellbookx/eslint-plugin

[![npm version](https://badge.fury.io/js/%40spellbookx%2Feslint-plugin.svg)](https://badge.fury.io/js/%40spellbookx%2Feslint-plugin)

A shareable ESLint plugin providing configurations for JavaScript, TypeScript, JSON, and Markdown, designed for modern development workflows with ESLint's flat config.

## Installation

First, ensure you have ESLint installed in your project. This plugin is designed for ESLint v9+ and its flat config format.

```bash
npm install eslint --save-dev
```

Next, install `@spellbookx/eslint-plugin` along with its necessary peer dependencies:

```bash
npm install @spellbookx/eslint-plugin @typescript-eslint/parser --save-dev
```

## Usage

To use this plugin, import it in your `eslint.config.js` and add the desired configurations to your config array.

The `recommended` configuration is a great starting point as it includes support for all file types.

**`eslint.config.js`**

```javascript
import spellbookx from '@spellbookx/eslint-plugin';
import globals from 'globals';

export default [
  // The recommended config includes JS, TS, JSON, and Markdown support.
  spellbookx.configs['recommended'],

  // You can add your own rules and configurations here
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // your custom rules for JS files
    },
  },
  {
    // further customizations
  },
];
```

## Available Configurations

This plugin provides several granular configurations that you can use individually or combine.

### `recommended`

This is the easiest way to get started. It bundles all the individual configurations below for a comprehensive linting setup.

```js
// eslint.config.js
import spellbookx from '@spellbookx/eslint-plugin';

export default [spellbookx.configs['recommended']];
```

### `js`

Applies base ESLint rules and import sorting for JavaScript files (`.js`, `.cjs`, `.mjs`).

### `ts`

Provides a strict, type-aware linting setup for TypeScript files (`.ts`, `.tsx`, `.cts`, `.mts`).

**Note:** This configuration requires a `tsconfig.json` file in your project root to enable type-checking rules.

### JSON Configurations

- `json/all`: A convenient bundle for linting all supported JSON-like files (`.json`, `.jsonc`, `.json5`).
- `json`: For `.json` files.
- `jsonc`: For `.jsonc` files and common VSCode/TSConfig files.
- `json5`: For `.json5` files.

### `markdown`

Enables linting of code blocks within your Markdown (`.md`) files.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the issues page.

## License

MIT
