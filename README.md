![spellbookx](./images/gh-banner.png)

# spellbookx

Welcome to Spellbookx, a collection of shareable configurations for various development tools. This monorepo is designed to streamline your development workflow by providing consistent and opinionated setups for linting, formatting, commit messaging, and more.

## Packages

This repository contains the following packages:

### [commitlint-config-spellbookx](./packages/commitlint-config-spellbookx)

Shared [Commitlint](https://commitlint.js.org/) configuration for the Spellbookx project. This package ensures that all commits adhere to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

**Installation:**

```bash
pnpm add -D commitlint-config-spellbookx @commitlint/cli
```

**Usage:**
Create a `commitlint.config.mjs` file in your project's root:

```javascript
import config from 'commitlint-config-spellbookx';

export default config;
```

### [cspell-config-spellbookx](./packages/cspell-config-spellbookx)

Shared [CSpell](https://cspell.org/) configuration for the Spellbookx project. This package provides a consistent and robust spell-checking setup for all packages in the monorepo.

**Installation:**

```bash
pnpm add -D cspell-config-spellbookx cspell
```

**Usage:**
Create a `cspell.config.cjs` file in your project's root:

```javascript
const config = require('cspell-config-spellbookx');

module.exports = config;
```

### [eslint-plugin-spellbookx](./packages/eslint-plugin-spellbookx)

An ESLint plugin containing shared configurations for the Spellbookx project. This package bundles and pre-configures a variety of essential ESLint plugins for a consistent and high-quality codebase.

**Installation:**

```bash
pnpm add -D eslint-plugin-spellbookx eslint
```

**Usage:**
Create an `eslint.config.mjs` file in your project's root:

```javascript
import spellbookx from 'eslint-plugin-spellbookx';

export default [
  ...spellbookx.configs.recommended,
  // Add your custom rules here
];
```

### [prettier-config-spellbookx](./packages/prettier-config-spellbookx)

Shared [Prettier](https://prettier.io/) configuration for the Spellbookx project. This package provides a consistent and opinionated code formatting setup for a wide range of file types.

**Installation:**

```bash
pnpm add -D prettier-config-spellbookx prettier
```

**Usage:**
Create a `prettier.config.mjs` file in your project's root:

```javascript
import { base } from 'prettier-config-spellbookx';

export default base;
```

### [spellbookx](./packages/spellbookx)

The official CLI for the Spellbookx ecosystem. It provides tools for project scaffolding and interactive setup of linting, formatting, and commit standards.

**Usage:**

```bash
pnpm dlx spellbookx create [workspace-name]
```

Or in an existing project:

```bash
pnpm add -D spellbookx
pnpm sbx init
```

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
