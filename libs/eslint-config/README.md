# @spellbookx/eslint-config

[](https://www.google.com/search?q=https://badge.fury.io/js/%2540spellbookx%252Feslint-config)

An opinionated, shareable [ESLint](https://eslint.org/) configuration for modern JavaScript and TypeScript development projects. This package provides a solid foundation for consistent code style and error prevention across your codebase, incorporating best practices from various ecosystems.

## Features

- Comprehensive set of rules for common JavaScript and TypeScript patterns.
- Support for multiple environments out of the box (Node.js, Browser, ES Modules).
- Sensible defaults for ignoring common files and directories like `node_modules` and `dist`.
- Integrates with popular tools and frameworks like React, Prettier, and TypeScript.
- Easy to extend and customize for your project's specific needs.

## Installation

You need to have `eslint` and this configuration package installed in your project.

```sh
npm install --save-dev eslint @spellbookx/eslint-config
```

Or with Yarn:

```sh
yarn add --dev eslint @spellbookx/eslint-config
```

Or with pnpm:

```sh
pnpm add -D eslint @spellbookx/eslint-config
```

## Usage

Create an `.eslintrc.js` or `eslint.config.mjs` file in the root of your project and extend this configuration.

Here is an example using `.eslintrc.js`:

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    '@spellbookx/eslint-config',
    // You might add specific configs here, e.g., for React:
    // '@spellbookx/eslint-config/react',
    // or for TypeScript:
    // '@spellbookx/eslint-config/typescript',
  ],
};
```

If you are using the new flat config system (ESLint v9+), here is an example using `eslint.config.mjs`:

```javascript
// eslint.config.mjs
import spellbookxEslintConfig from '@spellbookx/eslint-config';

export default [
  ...spellbookxEslintConfig,
  // You can add additional configurations or overrides here.
  // For example, to target specific files:
  // {
  //   files: ['src/**/*.ts'],
  //   rules: {
  //     'no-console': 'warn',
  //   },
  // },
];
```

## Extending the Configuration

You can easily extend the base configuration to fit your project's needs. ESLint will merge your configuration with the extended one.

Here is an example of how to add custom rules or override existing ones, based on a stripped-down version of an `.eslintrc.js` file:

```javascript
// .eslintrc.js
module.exports = {
  extends: ['@spellbookx/eslint-config'],

  // Add project-specific rules or override existing ones
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },

  // Define additional environments or globals
  env: {
    browser: true,
    node: true,
  },

  // Specify global variables that are not defined in the source code
  globals: {
    __MY_GLOBAL_VAR__: 'readonly',
  },
};
```

For flat config (`eslint.config.mjs`), you can extend and override like this:

```javascript
// eslint.config.mjs
import spellbookxEslintConfig from '@spellbookx/eslint-config';

export default [
  ...spellbookxEslintConfig,
  {
    // Override specific rules globally or for certain files
    rules: {
      'no-console': 'warn',
      'import/no-unused-modules': [
        'warn',
        { unusedExports: true, ignoreExports: ['**/index.ts'] },
      ],
    },
  },
  // Example for TypeScript specific overrides
  // {
  //   files: ['**/*.ts', '**/*.tsx'],
  //   rules: {
  //     '@typescript-eslint/explicit-module-boundary-types': 'off',
  //   },
  // },
];
```

## License

MIT

---
