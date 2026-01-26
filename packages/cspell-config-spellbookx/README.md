# cspell-config-spellbookx

Shared configuration for [CSpell](https://cspell.org) - tuned for polyglot monorepos (Node, Rust, Go, Python, and more).  
Clean. Opinionated. No junk, no false positives.

---

## Table of Content

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [License](#license)

---

## Features

- Pre-tuned dictionaries for:
  - English (US/GB)
  - Common programming languages (TypeScript, Node, Python, Go, PHP, etc.)
  - Framework & tooling terms (npm, softwareTerms, misc)
- Smart `ignorePaths` that skip all build artifacts, lock files, and temp directories:
  - Node / JS / TS (`dist`, `node_modules`, `.next`, `.turbo`, etc.)
  - Rust (`target/`, `.cargo/`, `Cargo.lock`)
  - Go (`go.sum`, `vendor/`, etc.)
  - Python (`__pycache__`, `.venv/`, `.tox/`, `.ruff_cache/`, etc.)
  - Windows / WSL cruft (`:Zone.Identifier`, `Thumbs.db`, `desktop.ini`, etc.)
- Works seamlessly with modern CSpell (`>=6.0`) using native ESM & `defineConfig`

---

## Installation

```bash
npm install -g cspell
npm install -D cspell @cspell/cspell-types cspell-config-spellbookx
```

or

```bash
pnpm add -g cspell
pnpm add -D cspell @cspell/cspell-types cspell-config-spellbookx
```

or

```bash
yarn global add cspell
yarn add -D cspell @cspell/cspell-types cspell-config-spellbookx
```

or

```bash
bun add -g cspell
bun add -D cspell @cspell/cspell-types cspell-config-spellbookx
```

---

## Usage

Create a custom dictionary:

```bash
mkdir .cspell
touch .cspell/custom-words.txt
```

Then create or update your `cspell.config.cjs` at the root of your project:

```js
const { defineConfig } = require('@cspell/cspell-types');

module.exports = defineConfig({
  version: '0.2',
  import: ['cspell-config-spellbookx'],
  words: [],
  dictionaryDefinitions: [
    {
      name: 'custom-words',
      path: './.cspell/custom-words.txt',
      addWords: true,
    },
  ],
  dictionaries: ['custom-words'],
});
```

Then, run:

```bash
npx cspell lint '**/*.{ts,js,tsx,jsx,md}'
```

or integrate with Nx, Husky, Lefthook, or your CI.

---

## Development

If you are contributing inside the monorepo:

```bash
nx run cspell-config:build
```

Test the config locally:

```bash
npx cspell lint --config path-to/packages/cspell-config/dist/index.js .
```

---

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
