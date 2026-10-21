![spellbookx](./images/gh-banner.png)

# Spellbookx

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D24.0.0-brightgreen.svg)](.nvmrc)
[![pnpm Version](https://img.shields.io/badge/pnpm-%3E%3D10.0.0-orange.svg)](https://pnpm.io/)
[![Turborepo](https://img.shields.io/badge/turbo-2.x-blueviolet.svg)](https://turbo.build/repo)
[![Vitest](https://img.shields.io/badge/vitest-5.x-yellow.svg)](https://vitest.dev/)

A modern, highly modular monorepo of shareable developer tool configurations and recipes for JavaScript, TypeScript, React, Astro, Svelte, and Node.js.

Spellbookx streamlines your developer workflow by providing battle-tested, opinionated, and composable setups for linting, formatting, spell-checking, and commit conventions.

---

## Workspace Packages

| Package                                                                       | Description                                                                                                                                       |                                                               Version                                                               |
| :---------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------: |
| [**`eslint-plugin-spellbookx`**](./packages/eslint-plugin-spellbookx)         | Modern ESLint 9+ Flat Config plugin bundling 16 modular presets, framework rules (React, Astro, Svelte, Node), and automated import sorting.      |     [![npm](https://img.shields.io/npm/v/eslint-plugin-spellbookx.svg)](https://www.npmjs.com/package/eslint-plugin-spellbookx)     |
| [**`prettier-config-spellbookx`**](./packages/prettier-config-spellbookx)     | Prettier configuration with 19 ready-to-use presets, plugins for Tailwind, Prisma, Astro, Svelte, SQL, Nginx, and the `defineSbxConfig` composer. |   [![npm](https://img.shields.io/npm/v/prettier-config-spellbookx.svg)](https://www.npmjs.com/package/prettier-config-spellbookx)   |
| [**`@spellbookx/recipes`**](./@spellbookx/recipes)                            | Curated import categorization rules and comprehensive ignore patterns for toolchains, operating systems, and runtimes.                            |          [![npm](https://img.shields.io/npm/v/@spellbookx/recipes.svg)](https://www.npmjs.com/package/@spellbookx/recipes)          |
| [**`commitlint-config-spellbookx`**](./packages/commitlint-config-spellbookx) | Strict Conventional Commits configuration with automatic workspace package scope discovery and interactive `cz-git` prompt.                       | [![npm](https://img.shields.io/npm/v/commitlint-config-spellbookx.svg)](https://www.npmjs.com/package/commitlint-config-spellbookx) |
| [**`cspell-config-spellbookx`**](./packages/cspell-config-spellbookx)         | Multi-language CSpell spell-checker preset with extensive programming dictionaries, ignore globs, and technical jargon.                           |     [![npm](https://img.shields.io/npm/v/cspell-config-spellbookx.svg)](https://www.npmjs.com/package/cspell-config-spellbookx)     |
| [**`spellbookx`**](./packages/spellbookx)                                     | 🧙 The Spellbookx CLI (`sbx`) — Automated interactive setup wizard for ESLint, Prettier, CSpell, and Commitlint.                                  |                   [![npm](https://img.shields.io/npm/v/spellbookx.svg)](https://www.npmjs.com/package/spellbookx)                   |

---

## Key Highlights

- ⚡ **ESLint 9+ Flat Configs**: Native support for ESLint flat configurations without legacy `.eslintrc` overhead.
- 🎨 **Multi-Framework Prettier**: First-class formatting presets for Tailwind CSS class sorting, Astro, Svelte, Prisma, SQL, and Nginx.
- 📦 **Monorepo-Aware Commitlint**: Automatically discovers all workspace packages across `pnpm-workspace.yaml`, `package.json`, and `lerna.json` for scope validation.
- 📖 **Technical & Multi-Lang Spellcheck**: Pre-configured CSpell dictionaries for English, Italian, Spanish, French, German, and programming runtimes.
- 🗂️ **Shared Recipes**: Centralized ignore patterns and regex groups for simple-import-sort and prettier-plugin-sort-imports.
- 🤖 **AI Agent Skills**: Built-in `.agents/skills` allowing AI coding assistants (Antigravity, Cursor, Copilot, Cline) to automatically scaffold and configure the toolchain.
- 🔄 **Strict Dogfooding**: This monorepo uses its own configurations across all root configurations and packages.
- 🚀 **Modern Toolchain**: Built with Turborepo, Rolldown, TypeScript, Vitest, and Lefthook.

---

## Quick Packages Overview

### 1. ESLint Plugin (`eslint-plugin-spellbookx`)

```bash
pnpm add -D eslint-plugin-spellbookx eslint
```

```javascript
// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import spellbookx from 'eslint-plugin-spellbookx';

export default defineConfig([
  spellbookx.configs['recommended-spellcheck'],
  // or spellbookx.configs.recommended, spellbookx.configs.react, etc.
]);
```

### 2. Prettier Config (`prettier-config-spellbookx`)

```bash
pnpm add -D prettier-config-spellbookx prettier
```

```javascript
// prettier.config.mjs
export { default } from 'prettier-config-spellbookx';
// or use specific presets:
// export { default } from 'prettier-config-spellbookx/astro-tailwind';
// export { default } from 'prettier-config-spellbookx/base';
```

### 3. Spellbookx Recipes (`@spellbookx/recipes`)

```bash
pnpm add -D @spellbookx/recipes
```

```typescript
import recipes, { ignores, imports } from '@spellbookx/recipes';

console.log(imports.uiFrameworks); // Regex matching React, Vue, Svelte, Astro, etc.
console.log(ignores.node); // Array of globs for build outputs and caches
```

### 4. Commitlint Config (`commitlint-config-spellbookx`)

```bash
pnpm add -D commitlint-config-spellbookx @commitlint/cli
```

```javascript
// commitlint.config.mjs
export { default } from 'commitlint-config-spellbookx';
```

### 5. CSpell Config (`cspell-config-spellbookx`)

```bash
pnpm add -D cspell-config-spellbookx cspell
```

```javascript
// cspell.config.cjs
const { defineConfig } = require('@cspell/cspell-types');

module.exports = defineConfig({
  version: '0.2',
  import: ['cspell-config-spellbookx'],
});
```

---

## AI Agent Skills

Spellbookx includes official agent skills conforming to the open [Agent Skills specification](https://github.com/vercel-labs/skills). These skills enable AI coding assistants (such as Antigravity, Cursor, Copilot, Cline, Zed, and Warp) to automatically configure, customize, and maintain the Spellbookx developer toolchain without manual setup or prompt engineering.

### Available Skills

| Skill                       | Description                                                                                        | Location                                                                                  |
| :-------------------------- | :------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| **`spellbookx-setup`**      | Complete guided setup of the full Spellbookx suite into any JS/TS codebase or monorepo.            | [`.agents/skills/spellbookx-setup`](./.agents/skills/spellbookx-setup/SKILL.md)           |
| **`spellbookx-eslint`**     | Configures ESLint 9+ flat configs with framework presets and `@spellbookx/recipes` import sorting. | [`.agents/skills/spellbookx-eslint`](./.agents/skills/spellbookx-eslint/SKILL.md)         |
| **`spellbookx-prettier`**   | Composes Prettier presets (Tailwind, Astro, Svelte, Prisma) using the `defineSbxConfig` composer.  | [`.agents/skills/spellbookx-prettier`](./.agents/skills/spellbookx-prettier/SKILL.md)     |
| **`spellbookx-cspell`**     | Configures multi-language code spell-checking, custom dictionaries, and ignore paths.              | [`.agents/skills/spellbookx-cspell`](./.agents/skills/spellbookx-cspell/SKILL.md)         |
| **`spellbookx-commitlint`** | Sets up Conventional Commits, monorepo scope discovery, and interactive `cz-git` prompt.           | [`.agents/skills/spellbookx-commitlint`](./.agents/skills/spellbookx-commitlint/SKILL.md) |

### Installation

Install all or selected Spellbookx skills into your project using the `skills` CLI:

```bash
# Add all Spellbookx skills to your project
npx skills add spellbookx/spellbookx

# Or add a specific skill:
npx skills add spellbookx/spellbookx --skill spellbookx-setup
```

### Usage with AI Assistants

Once installed, your AI assistant automatically discovers and activates the skills. You can interact with your agent using natural prompts:

- _"Set up Spellbookx in this project using the `spellbookx-setup` skill."_
- _"Configure ESLint flat config for my Next.js and Tailwind project using `spellbookx-eslint`."_
- _"Add a custom technical dictionary and ignore paths using `spellbookx-cspell`."_
- _"Format my commit using `spellbookx-commitlint`."_

---

## Repository Structure

```text
spellbookx/
├── .agents/
│   └── skills/                        # AI agent skills (setup, eslint, prettier, etc.)
├── @spellbookx/
│   └── recipes/                       # Import sorting recipes & ignore patterns
├── packages/
│   ├── commitlint-config-spellbookx/  # Conventional Commits + cz-git prompt
│   ├── cspell-config-spellbookx/      # CSpell multi-lang & technical dicts
│   ├── eslint-plugin-spellbookx/      # ESLint 9+ flat configs (16 presets)
│   ├── prettier-config-spellbookx/    # Prettier configs (19 presets + composer)
│   └── spellbookx/                    # 🧙 The Spellbookx CLI (`sbx`)
├── .config/cspell/                    # Monorepo CSpell custom dictionary
├── .editorconfig                      # Consistent indentation and coding styles
├── .nvmrc                             # Node.js LTS version (>= v24.x)
├── .prettierignore                    # Global format exclusions
├── eslint.config.mjs                  # Monorepo ESLint flat configuration
├── lefthook.yml                       # Fast Git hooks manager
├── package.json                       # Monorepo workspace root scripts & devDeps
├── pnpm-workspace.yaml                # pnpm workspace definition
├── prettier.config.mjs                # Monorepo Prettier configuration
└── turbo.json                         # Turborepo task pipeline configuration
```

---

## Development

### Prerequisites

- **Node.js**: `>= 24.0.0` (Active LTS recommended, see [`.nvmrc`](.nvmrc))
- **Package Manager**: [pnpm](https://pnpm.io/) `>= 10.0.0`

### Setup

```bash
# Clone the repository
git clone https://github.com/spellbookx/spellbookx.git
cd spellbookx

# Install dependencies
pnpm install

# Build all packages
pnpm run build
```

### Available Scripts

| Script                    | Command                             | Purpose                                                         |
| :------------------------ | :---------------------------------- | :-------------------------------------------------------------- |
| `pnpm run build`          | `turbo run build`                   | Compiles all workspace packages using Rolldown & `tsc`          |
| `pnpm run build:force`    | `turbo run build --force`           | Rebuilds all packages ignoring Turborepo cache                  |
| `pnpm run test`           | `turbo run test`                    | Executes all unit test suites using Vitest                      |
| `pnpm run test:watch`     | `turbo run test -- --watch`         | Runs Vitest in interactive watch mode                           |
| `pnpm run test:force`     | `turbo run test --force`            | Runs all tests bypassing Turborepo cache                        |
| `pnpm run lint`           | `pnpm exec eslint --fix .`          | Lints and auto-fixes JavaScript, TypeScript, JSON, and Markdown |
| `pnpm run lint:check`     | `pnpm exec eslint .`                | Lints codebase without applying automatic fixes                 |
| `pnpm run fmt`            | `pnpm exec prettier --write .`      | Formats all supported files across the monorepo                 |
| `pnpm run fmt:check`      | `pnpm exec prettier --check .`      | Verifies formatting without writing changes                     |
| `pnpm run spellcheck`     | `pnpm exec cspell .`                | Quick spell-check without progress bar                          |
| `pnpm run spellcheck:all` | `pnpm exec cspell .`                | Complete spell-check with full reporting                        |
| `pnpm run check`          | `lint && spellcheck && test`        | Local validation suite                                          |
| `pnpm run check:ci`       | `lint:check && fmt:check && ...`    | Strict CI pipeline verification                                 |
| `pnpm run clean`          | `rm -rf ...`                        | Removes `.turbo` caches and package `dist/` folders             |
| `pnpm run commit`         | `cz`                                | Launches interactive Commitizen (`cz-git`) prompt               |
| `pnpm run commit:lint`    | `commitlint --from=HEAD~1`          | Validates recent commit messages against Conventional Commits   |
| `pnpm run version`        | `release-it`                        | Prepares releases, bumps versions, and generates changelogs     |
| `pnpm run release`        | `node scripts/publish-packages.mjs` | Builds and publishes `packages/*` and `@spellbookx/*` to npmjs  |
| `pnpm run publish`        | `pnpm run version && release`       | Full release pipeline: bumps versions, tags, and publishes      |

---

## Git Workflow & Hooks

This project enforces commit hygiene and pre-commit checks using [Lefthook](https://github.com/evilmartians/lefthook):

1. **Pre-commit**: Runs `pnpm run lint` and `pnpm run fmt` on staged files.
2. **Commit-msg**: Validates the commit message with `commitlint` according to Conventional Commits.
3. **Interactive Commits**: Run `pnpm run commit` to use the interactive CLI powered by `cz-git`.

---

## Contributing

Contributions, issues, and feature requests are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on code style, commit conventions, and development workflows.

---

## License

This project is open-source software licensed under the [MIT License](./LICENSE).

- **Author & Creator**: [Davide Di Criscito](https://github.com/dcdavidev)
- **GitHub Organization**: [Spellbookx](https://github.com/spellbookx)
- **Copyright**: © 2026 Davide Di Criscito and [Spellbookx](https://github.com/spellbookx) contributors.

For full license details and permissions, see the [LICENSE](./LICENSE) file.
