# eslint-plugin-spellbookx

A modern, highly modular, and opinionated [ESLint](https://eslint.org/) flat configuration plugin for the Spellbookx ecosystem. It bundles 16 ready-to-use configurations, fine-tuned rules for JavaScript, TypeScript, React, Astro, Svelte, and Node.js, and automated import sorting using Spellbookx recipes.

---

## Available Configurations

| Configuration                 | Description                                                | Included Modules / Plugins                                                |
| :---------------------------- | :--------------------------------------------------------- | :------------------------------------------------------------------------ |
| **`recommended`** _(default)_ | Standard bundle for modern web and Node.js projects        | `ignores`, `javascript`, `react`, `json`, `markdown`, `vuoto`, `prettier` |
| **`recommended-spellcheck`**  | Recommended bundle + automated spell-checking              | `recommended` + `cspell`                                                  |
| **`all`**                     | All-inclusive bundle for multi-framework monorepos         | All 16 configurations and framework rules bundled together                |
| **`base`**                    | Minimal baseline for JS/TS codebases                       | `ignores`, `javascript`, `prettier`                                       |
| **`node`**                    | Tailored for Node.js backend services, APIs, and CLI tools | `ignores`, `javascript`, `json`, `vuoto`, `prettier`                      |
| **`strict`**                  | Strict TypeScript rule definitions                         | `typescript-eslint` strict configs                                        |
| **`react`**                   | React & React Native TSX/JSX components                    | `@eslint-react/eslint-plugin`                                             |
| **`astro`**                   | Astro `.astro` component linting and parsing               | `eslint-plugin-astro`                                                     |
| **`svelte`**                  | Svelte `.svelte` component linting and parsing             | `eslint-plugin-svelte`                                                    |
| **`javascript`**              | Comprehensive JS/TS rules, Unicorn, JSDoc, and import sort | `@eslint/js`, `typescript-eslint`, `unicorn`, `simple-import-sort`, etc.  |
| **`json`**                    | JSON and JSONC linting                                     | `@eslint/json`, `jsonc-eslint-parser`                                     |
| **`markdown`**                | Markdown file linting                                      | `@eslint/markdown`                                                        |
| **`prettier`**                | Prettier formatting integration and conflict resolution    | `eslint-plugin-prettier/recommended`                                      |
| **`cspell`**                  | Spell-checking for source code, comments, and strings      | `@cspell/eslint-plugin`                                                   |
| **`ignores`**                 | Universal monorepo ignore patterns                         | Ignore patterns for build outputs, dependencies, and lockfiles            |
| **`vuoto`**                   | Code cleanliness and empty-block hygiene                   | `eslint-plugin-vuoto`                                                     |

---

## Installation

Install the package and ESLint using **npm**:

```bash
npm install --save-dev eslint-plugin-spellbookx eslint
```

Or with your preferred package manager:

```bash
# pnpm
pnpm add -D eslint-plugin-spellbookx eslint

# yarn
yarn add -D eslint-plugin-spellbookx eslint

# bun
bun add -d eslint-plugin-spellbookx eslint
```

---

## Usage

In your project root, configure ESLint using `eslint.config.js` or `eslint.config.mjs` (ESLint Flat Config format):

### 1. Default Recommended Preset

```javascript
// eslint.config.mjs
import spellbookx from 'eslint-plugin-spellbookx';

export default [
  ...spellbookx.configs.recommended,
  // Your custom rules or overrides here
];
```

### 2. Direct Subpath Imports

Import only the configurations relevant to your project:

```javascript
// eslint.config.mjs
import configBase from 'eslint-plugin-spellbookx/base';
import configReact from 'eslint-plugin-spellbookx/react';

export default [...configBase, ...configReact];
```

Available subpaths:

- `eslint-plugin-spellbookx/recommended`
- `eslint-plugin-spellbookx/recommended-spellcheck`
- `eslint-plugin-spellbookx/all`
- `eslint-plugin-spellbookx/base`
- `eslint-plugin-spellbookx/node`
- `eslint-plugin-spellbookx/strict`
- `eslint-plugin-spellbookx/react`
- `eslint-plugin-spellbookx/astro`
- `eslint-plugin-spellbookx/svelte`
- `eslint-plugin-spellbookx/javascript`
- `eslint-plugin-spellbookx/json`
- `eslint-plugin-spellbookx/markdown`
- `eslint-plugin-spellbookx/prettier`
- `eslint-plugin-spellbookx/cspell`
- `eslint-plugin-spellbookx/ignores`
- `eslint-plugin-spellbookx/vuoto`

### 3. Named Imports from Root

```javascript
// eslint.config.mjs
import { configNode, configStrict } from 'eslint-plugin-spellbookx';

export default [...configNode, ...configStrict];
```

### 4. Customizing Import Sorting with `defineImports`

You can customize or compose import sorting regex groups using `defineImports`:

```javascript
// eslint.config.mjs
import { defineImports } from 'eslint-plugin-spellbookx/lib';
import { imports } from '@spellbookx/recipes/imports';

export default [
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: defineImports(
            imports.dotenv,
            imports.builtinModules,
            imports.uiFrameworks,
            imports.relative
          ),
        },
      ],
    },
  },
];
```

---

## License

This project is licensed under the MIT License.

- **Author & Creator**: [Davide Di Criscito](https://github.com/dcdavidev)
- **GitHub Organization**: [Spellbookx](https://github.com/spellbookx)
- **Copyright**: © 2026 Davide Di Criscito and [Spellbookx](https://github.com/spellbookx) contributors.

For full details, see the [LICENSE](LICENSE) file.
