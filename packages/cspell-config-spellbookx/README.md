# cspell-config-spellbookx

Shared [CSpell](https://cspell.org/) configuration for the Spellbookx project. This package provides a consistent and robust spell-checking setup for all packages in the monorepo.

## Description

This package offers a comprehensive CSpell configuration that includes:

- A curated list of custom words and technical terms specific to the Spellbookx ecosystem.
- An extensive list of ignored paths to prevent spell-checking in irrelevant files and directories (e.g., `node_modules`, `dist`, lock files).
- A rich set of dictionaries for various languages and technologies, including English, Spanish, Italian, French, German, and numerous programming languages.
- Support for multiple languages: English, Spanish, Italian, French, and German.

## Why use this?

By using this shared configuration, we ensure that:

- Spell-checking is consistent across all packages.
- False positives are minimized by maintaining a central list of accepted words.
- The configuration is easily maintainable and extendable.

## Installation

Install the package using your favorite package manager:

**npm**

```bash
npm install --save-dev cspell-config-spellbookx cspell
```

**pnpm**

```bash
pnpm add -D cspell-config-spellbookx cspell
```

**yarn**

```bash
yarn add -D cspell-config-spellbookx cspell
```

**bun**

```bash
bun add -d cspell-config-spellbookx cspell
```

## Usage

To use this configuration, create a `cspell.config.cjs` file in your project's root and extend this package:

```javascript
const config = require('cspell-config-spellbookx');

module.exports = config;
```

You can then add a script to your `package.json` to run the spell checker:

```json
{
  "scripts": {
    "spellcheck": "cspell \"**/*.{js,jsx,ts,tsx,md,json}\""
  }
}
```

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
