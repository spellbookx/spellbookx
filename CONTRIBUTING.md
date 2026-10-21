# Contributing to Spellbookx

Thank you for your interest in contributing to **Spellbookx**! 🧙✨

This document outlines the guidelines, development setup, code standards, and workflows required to contribute to the Spellbookx monorepo.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Monorepo Architecture](#monorepo-architecture)
- [Development Workflow](#development-workflow)
- [Commit Conventions & Git Hooks](#commit-conventions--git-hooks)
- [Testing Guidelines](#testing-guidelines)
- [Creating a Pull Request](#creating-a-pull-request)
- [Release Process](#release-process)

---

## Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free experience for everyone. All participants are expected to adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md).

For vulnerability reporting, please see our [Security Policy](./SECURITY.md).

---

## Prerequisites

Before contributing, make sure your development environment meets the following requirements:

- **Node.js**: LTS version >= `24.0.0` (see [`.nvmrc`](.nvmrc)).
- **pnpm**: Version `10.x` or later. We recommend using [Corepack](https://nodejs.org/api/corepack.html):

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

---

## Getting Started

1. **Fork and clone the repository:**

   ```bash
   git clone https://github.com/ < your-username > /spellbookx.git
   cd spellbookx
   ```

2. **Ensure correct Node.js version:**

   ```bash
   nvm use
   ```

3. **Install dependencies:**

   ```bash
   pnpm install
   ```

   > **Note**: Running `pnpm install` automatically configures git hooks using [Lefthook](https://github.com/evilmartians/lefthook).

4. **Build all packages:**

   ```bash
   pnpm run build
   ```

---

## Monorepo Architecture

Spellbookx is organized as a pnpm monorepo managed with [Turborepo](https://turbo.build/):

```text
spellbookx/
├── @spellbookx/
│   └── recipes/                       # Shared import sorting & ignore glob definitions
├── packages/
│   ├── commitlint-config-spellbookx/  # Conventional Commits + cz-git prompt
│   ├── cspell-config-spellbookx/      # CSpell multi-language & tech dictionaries
│   ├── eslint-plugin-spellbookx/      # ESLint 9+ flat configs (16 presets)
│   ├── prettier-config-spellbookx/    # Prettier configs (19 presets + composer)
│   └── spellbookx/                    # 🧙 The Spellbookx CLI (`sbx`)
├── scripts/
│   └── publish-packages.mjs           # Automated npmjs multi-package publisher
├── .config/cspell/                    # Shared spellcheck custom dictionaries
├── .agents/skills/                    # AI Agent skills for developer assistants
├── pnpm-workspace.yaml                # Workspace package mappings
└── turbo.json                         # Turborepo task pipeline configuration
```

---

## Development Workflow

### Useful Commands

| Command                | Description                                                                             |
| :--------------------- | :-------------------------------------------------------------------------------------- |
| `pnpm run build`       | Compiles all packages using Rolldown and TypeScript (`tsc`).                            |
| `pnpm run build:force` | Rebuilds all packages bypassing Turborepo cache.                                        |
| `pnpm run test`        | Runs unit tests across all packages using Vitest.                                       |
| `pnpm run test:watch`  | Runs Vitest in interactive watch mode.                                                  |
| `pnpm run test:force`  | Re-runs all test suites bypassing Turborepo cache.                                      |
| `pnpm run lint`        | Lints and auto-fixes JavaScript, TypeScript, JSON, and Markdown.                        |
| `pnpm run lint:check`  | Verifies ESLint rules without applying automated fixes.                                 |
| `pnpm run fmt`         | Formats all code files using Prettier.                                                  |
| `pnpm run fmt:check`   | Verifies code formatting with Prettier without writing.                                 |
| `pnpm run spellcheck`  | Runs CSpell across the entire codebase.                                                 |
| `pnpm run check:ci`    | **Full verification suite**: lints, checks formatting, spellchecks, and runs all tests. |
| `pnpm run clean`       | Cleans build caches (`.turbo/` and `dist/` folders).                                    |

### Targeting Specific Packages

You can run commands for an individual package using pnpm's `--filter` option:

```bash
# Build only the CLI package
pnpm --filter spellbookx run build

# Run tests only for the ESLint plugin
pnpm --filter eslint-plugin-spellbookx test

# Add a dependency to a specific package
pnpm --filter @spellbookx/recipes add <package-name>
```

---

## Commit Conventions & Git Hooks

We strictly enforce the [Conventional Commits](https://www.conventionalcommits.org/) specification using `commitlint-config-spellbookx`.

### Commit Message Format

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- **Scopes**: Corresponds to package names or monorepo areas:
  - `recipes`
  - `commitlint`
  - `cspell`
  - `eslint`
  - `prettier`
  - `spellbookx`
  - `workspace`
  - `deps`
  - `docs`
  - `ci`
- **Subject line**: Maximum 72 characters, lowercase, imperative mood, no ending period.

### Interactive Commits

To ensure your commit conforms to the rules, use the built-in interactive commit prompt powered by `cz-git`:

```bash
git add <files>
pnpm run commit
```

### Git Hooks with Lefthook

When you commit, [Lefthook](https://github.com/evilmartians/lefthook) runs:

1. **Pre-commit**: Lints and formats all staged files automatically.
2. **Commit-msg**: Validates the commit message format with Commitlint.

---

## Testing Guidelines

- Every new feature, utility function, or bugfix must be accompanied by unit tests.
- Place tests in a `__tests__/` directory located at the root of the respective package.
- Keep test files split, focused, and named after the module under test (e.g., `banner.test.ts`, `detect-pm.test.ts`).
- Ensure all tests pass with:

```bash
pnpm run test:force
```

---

## Creating a Pull Request

1. **Create a topic branch:**

   ```bash
   git checkout -b feat/my-new-feature
   ```

2. **Make your changes:**
   - Adhere to existing code conventions and atomic modular architecture.
   - Preserve comments, JSDocs, and type annotations.
   - If introducing new words or technical terms, add them to [`.config/cspell/custom.txt`](.config/cspell/custom.txt).

3. **Verify everything passes:**

   ```bash
   pnpm run check:ci
   ```

4. **Commit your changes using Conventional Commits:**

   ```bash
   git add .
   pnpm run commit
   ```

5. **Push your branch and open a Pull Request:**

   ```bash
   git push origin feat/my-new-feature
   ```

6. **PR Review:**
   - Clearly explain the problem solved or the feature added.
   - Reference any relevant GitHub issues.

---

## Release Process

Releases and versioning are managed using [Changesets](https://github.com/changesets/changesets) and Turborepo:

1. **`pnpm run changeset`**: Creates a changeset describing your change (or use `pnpm run changeset:conventional` to extract changesets from Conventional Commits).
2. **`pnpm run version`**: Consumes changesets, bumps package versions in lockstep, and updates package changelogs.
3. **`pnpm run release`**: Builds all packages and publishes `@spellbookx/*` and `packages/*` to npmjs via `turbo run release`.
4. **`pnpm run publish`**: Runs the complete release flow (`pnpm run version && pnpm run release`).
