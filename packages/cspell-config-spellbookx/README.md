# cspell-config-spellbookx

A modern, highly modular, and opinionated [CSpell](https://cspell.org/) configuration for the Spellbookx ecosystem. It provides comprehensive multi-language spell-checking, extensive ignore glob patterns for modern monorepos and toolchains, a curated dictionary of accepted technical words, and the `defineSbxConfig` composer for effortless project customization.

---

## Features

| Feature                        | Description                                                                                                                                                        |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Multi-Language Support**     | Built-in dictionary coverage for English (`en_US`, `en-gb`), Spanish (`es-es`), Italian (`it-it`), French (`fr-fr`), and German (`de-de`).                         |
| **Curated Technical Words**    | Centralized list of domain terms, modern frameworks (`shadcn`, `bunfig`, `czrc`, `dotenvx`, `esmock`), and toolchain keywords.                                     |
| **Comprehensive Ignore Paths** | Pre-configured glob patterns ignoring build artifacts (`dist`, `out`), caches, toolchains (Rust, Go, Python), IDE metadata, and OS system files.                   |
| **Programming Dictionaries**   | Technical dictionaries for TypeScript, Node.js, Python, Go, PHP, PowerShell, HTML, CSS, C#, LaTeX, Bash, npm, and file types.                                      |
| **Deep Composer**              | Easily extend or customize settings with `defineSbxConfig` (or `defineConfig`), automatically deduplicating words, ignore paths, and dictionaries.                 |
| **Modular Architecture**       | Direct subpath imports for constants (`./constants`, `./constants/words`, `./constants/ignore-paths`, `./constants/dictionaries`) and atomic utilities in `./lib`. |

---

## Included Dictionaries

| Category                  | Included Dictionaries                                                                               |
| :------------------------ | :-------------------------------------------------------------------------------------------------- |
| **Natural Languages**     | `en-gb`, `en_US`, `es-es`, `it-it`, `fr-fr`, `de-de`                                                |
| **Programming Runtimes**  | `typescript`, `node`, `php`, `go`, `python`, `powershell`, `html`, `css`, `csharp`, `latex`, `bash` |
| **Specialized & Package** | `companies`, `softwareTerms`, `misc`, `npm`, `fonts`, `fileTypes`                                   |

---

## Ignore Path Categories

| Category               | Target Globs                                                                                                                            |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **Core & Caches**      | `**/*LICENSE*`, `**/*.log`, `**/.cache/**`, `**/.temp/**`, `**/.tmp/**`, `**/.DS_Store`                                                 |
| **Node.js / Web**      | `**/node_modules/**`, `**/dist/**`, `**/build/**`, `**/out/**`, `**/.next/**`, `**/.nuxt/**`, `**/.svelte-kit/**`, `**/.turbo/**`, etc. |
| **Lock Files**         | `**/package-lock.json`, `**/pnpm-lock.yaml`, `**/yarn.lock`, `**/bun.lockb`                                                             |
| **Rust / Go / Python** | `**/target/**`, `**/.cargo/**`, `**/go.sum`, `**/.gopath/**`, `**/__pycache__/**`, `**/.venv/**`, `**/.mypy_cache/**`, etc.             |
| **Toolchains & IDEs**  | `**/.git/**`, `**/.vscode/**`, `**/.idea/**`, `**/.docker/**`, `**/.terraform/**`, `**/.astro/**`, `**/.gemini/**`, etc.                |
| **Operating Systems**  | Zone identifiers, `Thumbs.db`, `desktop.ini`, recycle bins, page files, swap files, and hibernation files                               |

---

## Installation

Install the package and CSpell using **npm**:

```bash
npm install --save-dev cspell-config-spellbookx cspell
```

Or using **pnpm**:

```bash
pnpm add -D cspell-config-spellbookx cspell
```

Or using **yarn**:

```bash
yarn add -D cspell-config-spellbookx cspell
```

Or using **bun**:

```bash
bun add -d cspell-config-spellbookx cspell
```

---

## Usage

CSpell supports configuration through JSON, YAML, or JavaScript/TypeScript config files. You can use this package in multiple ways depending on your repository architecture:

### 1. Default Import (Recommended for cspell.config.cjs)

The simplest and most common setup in a CommonJS or Node configuration file:

```javascript
// cspell.config.cjs
const config = require('cspell-config-spellbookx');

module.exports = config;
```

Or with CSpell's built-in package loader:

```javascript
// cspell.config.cjs
const { defineConfig } = require('@cspell/cspell-types');

module.exports = defineConfig({
  version: '0.2',
  import: ['cspell-config-spellbookx'],
});
```

### 2. Composing with `defineSbxConfig` (ESM or TypeScript)

The `defineSbxConfig` function (also exported as `defineConfig`) merges your custom rules and word additions on top of the Spellbookx presets. It automatically normalizes words (converting to lowercase, trimming whitespace, and sorting alphabetically) and eliminates duplicate ignore patterns and dictionaries:

```javascript
// cspell.config.mjs
import { defineSbxConfig } from 'cspell-config-spellbookx';

export default defineSbxConfig({
  words: ['customword', 'internalword'],
  ignorePaths: ['**/generated-fixtures/**'],
});
```

### 3. Direct Subpath Imports

Import only the specific parts needed for custom setups:

```javascript
// Curated custom words
import { words } from 'cspell-config-spellbookx/constants/words';

// Ignore paths list
import { ignorePaths } from 'cspell-config-spellbookx/constants/ignore-paths';

// Dictionary presets
import {
  dictionaries,
  PROGRAMMING_DICTIONARIES,
} from 'cspell-config-spellbookx/constants/dictionaries';
```

### 4. Atomic Utility Functions (`lib`)

Every utility function is implemented atomically under `lib/` and can be imported either from the package root or directly from `cspell-config-spellbookx/lib`:

```javascript
import {
  defineConfig,
  defineSbxConfig,
  mergeCSpellConfigs,
  normalizeWords,
  packageJson,
} from 'cspell-config-spellbookx/lib';
```

| Function                             | Description                                                                                                     |
| :----------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| **`normalizeWords(words)`**          | Trims whitespace, converts to lowercase, eliminates empty/falsy values, deduplicates, and sorts alphabetically. |
| **`mergeCSpellConfigs(...configs)`** | Deep-merges multiple CSpell settings objects, cleanly deduplicating words, ignore paths, and dictionaries.      |
| **`defineSbxConfig(...overrides)`**  | Extends the default Spellbookx configuration with custom settings or overrides.                                 |
| **`defineConfig(...overrides)`**     | Alias for `defineSbxConfig`.                                                                                    |
| **`packageJson`**                    | Loaded package metadata (`name`, `version`, `peerDependencies`).                                                |

---

## Configuration File Formats

According to the [CSpell Configuration Documentation](https://cspell.org/configuration/), you can define your configuration in any of the following files:

### In `cspell.config.cjs` (CommonJS)

```javascript
module.exports = {
  import: ['cspell-config-spellbookx'],
};
```

### In `cspell.config.mjs` (ES Modules)

```javascript
import { defineSbxConfig } from 'cspell-config-spellbookx';

export default defineSbxConfig({
  words: ['customword'],
});
```

### In `cspell.json` or `.cspell.json`

```json
{
  "version": "0.2",
  "import": ["cspell-config-spellbookx"]
}
```

---

## NPM Scripts

Add convenient check and fix scripts to your project's `package.json`:

```json
{
  "scripts": {
    "lint:spelling": "cspell .",
    "lint:spelling:list": "cspell --words-only --unique ."
  }
}
```

---

## Git Hook Integration

Prevent typos and misspelled terms from entering your codebase before they are committed:

### With Lefthook

```yaml
# lefthook.yml
pre-commit:
  commands:
    cspell:
      glob: '*.{js,ts,jsx,tsx,json,md,yml,yaml}'
      run: pnpm exec cspell --no-must-find-files {staged_files}
```

### With Husky

```bash
# .husky/pre-commit
npx cspell --no-must-find-files $(git diff --cached --name-only)
```

---

## License

This project is licensed under the MIT License.

- **Author & Creator**: [Davide Di Criscito](https://github.com/dcdavidev)
- **GitHub Organization**: [Spellbookx](https://github.com/spellbookx)
- **Copyright**: © 2026 Davide Di Criscito and [Spellbookx](https://github.com/spellbookx) contributors.

For full details, see the [LICENSE](LICENSE) file.
