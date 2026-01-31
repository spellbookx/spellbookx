# commitlint-config-spellbookx

Shared [Commitlint](https://commitlint.js.org/) configuration for the Spellbookx project. This package ensures that all commits adhere to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

## Description

This package provides a base commitlint configuration that:

- Extends the widely-used `@commitlint/config-conventional`.
- Dynamically generates commit scopes based on the packages present in the `@spellbookx` monorepo.
- Includes pre-defined commit types with emojis for better readability.
- Offers a customized `commitizen` prompt for an enhanced commit experience.

## Why use this?

Using this package ensures consistent and readable commit messages across the entire project. This helps in:

- Automatically generating changelogs.
- Simplifying the release process.
- Improving the readability of the project's history.

## Installation

Install the package using your favorite package manager:

**npm**

```bash
npm install --save-dev commitlint-config-spellbookx @commitlint/cli
```

**pnpm**

```bash
pnpm add -D commitlint-config-spellbookx @commitlint/cli
```

**yarn**

```bash
yarn add -D commitlint-config-spellbookx @commitlint/cli
```

**bun**

```bash
bun add -d commitlint-config-spellbookx @commitlint/cli
```

## Usage

To use this configuration, create a `commitlint.config.mjs` file in your project's root and extend this package:

```javascript
import config from 'commitlint-config-spellbookx';

export default config;
```

For an interactive commit experience, you can use `commitizen` with `cz-git`. Update your `package.json` with the following configuration:

```json
{
  "scripts": {
    "commit": "cz"
  },
  "config": {
    "commitizen": {
      "path": "cz-git"
    }
  }
}
```

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
