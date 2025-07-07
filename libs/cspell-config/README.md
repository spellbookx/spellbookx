# @spellbookx/cspell-config

[![npm version](https://badge.fury.io/js/%40spellbookx%2Fcspell-config.svg)](https://badge.fury.io/js/%40spellbookx%2Fcspell-config)

An opinionated, shareable [CSpell](https://cspell.org/) configuration for modern development projects. This package provides a solid foundation for spell checking in your codebase, including a wide range of dictionaries for general and technical terms.

## Features

- Comprehensive set of dictionaries for common software development terms.
- Support for multiple programming languages out of the box.
- Sensible defaults for ignoring common files and directories like `node_modules`, `dist`, and lockfiles.
- Easy to extend and customize for your project's specific needs.

## Installation

You need to have `cspell` and this configuration package installed in your project.

```sh
npm install --save-dev cspell @spellbookx/cspell-config
```

Or with Yarn:

```sh
yarn add --dev cspell @spellbookx/cspell-config
```

Or with pnpm:

```sh
pnpm add -D cspell @spellbookx/cspell-config
```

## Usage

Create a `cspell.json` or `cspell.config.mjs` file in the root of your project and import this configuration.

Here is an example using `cspell.config.mjs`:

```javascript
// cspell.config.mjs
import { defineConfig } from 'cspell';

export default defineConfig({
  import: ['@spellbookx/cspell-config'],
});
```

Now you can run CSpell from your terminal:

```sh
npx cspell "**/*.{js,ts,md}"
```

Or add a script to your `package.json`:

```json
{
  "scripts": {
    "spellcheck": "cspell \"**/*.{js,ts,md}\""
  }
}
```

## Extending the Configuration

You can easily extend the base configuration to fit your project's needs. CSpell will merge your configuration with the imported one.

Here is an example of how to add custom words and ignore additional paths, based on a stripped-down version of a `cspell.config.mjs` file:

```javascript
// cspell.config.mjs
import { defineConfig } from 'cspell';

export default defineConfig({
  import: ['@spellbookx/cspell-config'],

  // Add project-specific words to the dictionary
  words: ['mycustomword', 'anotherone', 'projectspecificterm'],

  // Ignore additional paths
  ignorePaths: ['**/dist-custom/**', '**/generated-docs/**'],
});
```

## Included Dictionaries

This configuration includes a curated list of dictionaries to cover a wide range of development scenarios:

### General Dictionaries

- `en-gb` (British English)
- `en_US` (US English)
- `companies`
- `softwareTerms`
- `misc`

### Programming Languages

- `typescript`
- `node`
- `php`
- `go`
- `python`
- `powershell`
- `html`
- `css`
- `csharp`
- `latex`
- `bash`

### Other

- `fonts`
- `fileTypes`
- `npm`

## License

MIT
