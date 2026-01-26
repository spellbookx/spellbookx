# prettier-config-spellbookx

Shared Prettier configuration - harmonizing code and text formatting across JS, TS, Markdown, YAML, TOML, Prisma, and shell scripts.  
Clean. Opinionated. Always consistent.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Resources](#resources)
- [License](#license)

---

## Features

- **Plugins**
  - [`prettier-plugin-sh`](https://github.com/un-ts/prettier/tree/master/packages/prettier-plugin-sh) -> Formats shell scripts (`.sh`).
  - [`prettier-plugin-toml`](https://github.com/bd82/toml-tools/tree/master/packages/prettier-plugin-toml) -> Formats `.toml` files.
  - [`prettier-plugin-ini`](https://github.com/kddnewton/prettier-plugin-ini) -> Formats `.ini` files.
  - [`prettier-plugin-packagejson`](https://github.com/matzkoh/prettier-plugin-packagejson) -> Formats `package.json` files.
  - [`prettier-plugin-properties`](https://github.com/eemeli/prettier-plugin-properties) -> Formats `.properties` files.
  - [`prettier-plugin-prisma`](https://github.com/omar-dulaimi/prettier-plugin-prisma) -> Formats Prisma schema files.
  - [`prettier-plugin-astro`](https://github.com/withastro/prettier-plugin-astro) -> Formats `.astro` files.
  - [`@prettier/plugin-xml`](https://github.com/prettier/plugin-xml) -> Formats `.xml` files.
  - [`prettier-plugin-tailwindcss`](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) -> Formats `.css` files.

- **Base Style Rules**
  - Trailing commas: `es5`
  - Tab width: `2`
  - Semicolons: `true`
  - Single quotes: `true`
  - Print width: `80`
  - End of line: `lf`

-- **File-specific Overrides**

- **TOML (`.toml`)** -> Uses wider `printWidth` of 100 characters.

---

## Installation

```bash
npm install -g prettier
npm install -D prettier prettier-config-spellbookx
```

or

```bash
pnpm add -g prettier
pnpm add -D prettier prettier-config-spellbookx
```

With pnpm you may still need to install Prettier plugins or peer dependencies manually in some workspaces. If you prefer installing plugins together, add them explicitly (examples below).

Example: install Prettier, this config package and the common Prettier plugins used by the package in one command:

```bash
pnpm add -D prettier prettier-config-spellbookx \
  prettier-plugin-astro prettier-plugin-sh prettier-plugin-toml \
  prettier-plugin-ini prettier-plugin-packagejson prettier-plugin-properties \
  prettier-plugin-prisma @prettier/plugin-xml prettier-plugin-tailwindcss
```

If your workspace already provides `prettier` globally or as a dependency, you can omit it from the command above.

or

```bash
yarn global add prettier
yarn add -D prettier prettier-config-spellbookx
```

or

```bash
bun add -g prettier
bun add -D prettier prettier-config-spellbookx
```

---

## Usage

Create a `prettier.config.mjs` file at your project root.

There are two convenient ways to consume this package. The package exposes both:

- named exports for each preset (recommended), and
- a default export which is an object that contains all presets as properties.

Named-export example (recommended):

```ts
import { base } from 'prettier-config-spellbookx';

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...base,
};

export default config;
```

Default-export example (all presets available as properties):

```js
import presets from 'prettier-config-spellbookx';

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...presets.base,
};

export default config;
```

Available preset names (all exported as named exports and as keys on the default export):

- `base`
- `tailwind`
- `prisma`
- `prisma-tailwind` (named export `prismaTailwind`)
- `astro`
- `astro-prisma` (named export: `astroPrisma`)
- `astro-tailwind` (named export: `astroTailwind`)
- `astro-prisma-tailwind` (named export: `astroPrismaTailwind`)

### Editor integration

Most editors (VSCode, JetBrains, etc.) detect Prettier automatically if the plugin is installed.
For VSCode, ensure the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) is installed and enable **Format on Save**:

```jsonc
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
}
```

---

## Resources

- [Prettier Documentation](https://prettier.io/docs/en/configuration.html)
- [Prettier Options](https://prettier.io/docs/en/options.html)

---

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
