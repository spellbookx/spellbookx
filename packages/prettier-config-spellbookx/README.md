# prettier-config-spellbookx

A modern, highly modular, and opinionated [Prettier](https://prettier.io/) configuration for the Spellbookx ecosystem. It supports 19 ready-to-use configurations, modular building blocks (`rules`, `plugins`, `overrides`), and the `defineSbxConfig` composer for effortless customization.

---

## Available Configurations

| Configuration                 | Description                                                 | Included Plugins                                                                                       |
| :---------------------------- | :---------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| **`recommended`** _(default)_ | Community-recommended standard for modern web development   | `sh`, `toml`, `ini`, `packagejson`, `properties`, `xml`, `tailwindcss`                                 |
| **`all`**                     | Complete configuration with all 15 supported plugins        | All plugins (Astro, Svelte, Prisma, SQL, Nginx, Embed, Sort Imports, Multiline Arrays, Tailwind, etc.) |
| **`base`**                    | Universal formatting foundation for multi-language projects | `sh`, `toml`, `ini`, `packagejson`, `properties`, `@prettier/plugin-xml`                               |
| **`astro`**                   | Base configuration + Astro component support                | `base` + `prettier-plugin-astro`                                                                       |
| **`astro-prisma`**            | Base + Astro + Prisma schema formatting                     | `astro` + `prettier-plugin-prisma`                                                                     |
| **`astro-tailwind`**          | Base + Astro + Tailwind CSS class sorting                   | `astro` + `prettier-plugin-tailwindcss`                                                                |
| **`astro-prisma-tailwind`**   | Base + Astro + Prisma + Tailwind CSS                        | `astro-prisma` + `prettier-plugin-tailwindcss`                                                         |
| **`svelte`**                  | Base configuration + Svelte component support               | `base` + `prettier-plugin-svelte`                                                                      |
| **`svelte-prisma`**           | Base + Svelte + Prisma schema formatting                    | `svelte` + `prettier-plugin-prisma`                                                                    |
| **`svelte-tailwind`**         | Base + Svelte + Tailwind CSS class sorting                  | `svelte` + `prettier-plugin-tailwindcss`                                                               |
| **`svelte-prisma-tailwind`**  | Base + Svelte + Prisma + Tailwind CSS                       | `svelte-prisma` + `prettier-plugin-tailwindcss`                                                        |
| **`prisma`**                  | Base + Prisma schema formatting                             | `base` + `prettier-plugin-prisma`                                                                      |
| **`prisma-tailwind`**         | Base + Prisma + Tailwind CSS                                | `prisma` + `prettier-plugin-tailwindcss`                                                               |
| **`tailwind`**                | Base + Tailwind CSS class sorting                           | `base` + `prettier-plugin-tailwindcss`                                                                 |
| **`sql`**                     | Base + SQL query & migration formatting                     | `base` + `prettier-plugin-sql`                                                                         |
| **`nginx`**                   | Base + Nginx server configuration files                     | `base` + `prettier-plugin-nginx`                                                                       |
| **`embed`**                   | Base + embedded template languages formatting               | `base` + `prettier-plugin-embed`                                                                       |
| **`sort-imports`**            | Base + regex-based import statement sorting                 | `base` + `@ianvs/prettier-plugin-sort-imports`                                                         |
| **`multiline-arrays`**        | Base + multiline array literal formatting                   | `base` + `prettier-plugin-multiline-arrays`                                                            |

---

## Installation

Install the package and Prettier using **npm**:

```bash
npm install --save-dev prettier-config-spellbookx prettier
```

_(For `pnpm` users, see the [Troubleshooting](#troubleshooting) section below regarding plugin resolution)._

---

## Usage

Prettier searches for configuration files starting from the directory of the file being formatted. You can use this package in multiple ways depending on your project requirements:

### 1. Default Export (Recommended Preset)

The easiest way to get started with the community-recommended preset (`base` formatters + Tailwind CSS class sorting):

```javascript
// prettier.config.mjs or .prettierrc.mjs
export { default } from 'prettier-config-spellbookx';
```

### 2. Named `configs` Dictionary

Access any of the 19 configurations using indexed access:

```javascript
// prettier.config.mjs
import { configs } from 'prettier-config-spellbookx';

export default configs['svelte-prisma-tailwind'];
```

### 3. Direct Subpath Imports

Import only the specific configuration bundle your project needs:

```javascript
// prettier.config.mjs
export { default } from 'prettier-config-spellbookx/base';
// or:
// export { default } from 'prettier-config-spellbookx/astro';
// export { default } from 'prettier-config-spellbookx/svelte';
// export { default } from 'prettier-config-spellbookx/all';
```

### 4. Direct Named Imports

```javascript
// prettier.config.mjs
import { sveltePrismaTailwind } from 'prettier-config-spellbookx';

export default sveltePrismaTailwind;
```

### 5. Composing with `defineSbxConfig`

`defineSbxConfig` (also exported as `defineConfig`) merges multiple configurations into one. It automatically:

- Eliminates duplicate plugins.
- Sorts plugins in the canonical Prettier 3 order (ensuring `prettier-plugin-tailwindcss` is always loaded last).
- Merges parser overrides without duplicating file patterns.

```javascript
// prettier.config.mjs
import { defineSbxConfig, configs } from 'prettier-config-spellbookx';

export default defineSbxConfig([
  configs.base,
  configs.svelte,
  configs.sql,
  {
    printWidth: 100,
    semi: false,
  },
]);
```

### 6. Fully Modular Building Blocks

For total control, assemble your own custom configuration from raw `rules`, `plugins`, and `overrides`:

```javascript
// prettier.config.mjs
import { rules, plugins, overrides } from 'prettier-config-spellbookx';

export default {
  ...rules.base,
  printWidth: 100,
  plugins: [
    plugins.sh,
    plugins.toml,
    plugins.svelte,
    plugins.sql,
    plugins.tailwind, // Tailwind must always be placed last!
  ],
  overrides: [overrides.czrc, overrides.toml, overrides.svelte],
};
```

Available building blocks:

- `rules.base`: Base formatting rules (`tabWidth: 2`, `singleQuote: true`, `semi: true`, `trailingComma: 'es5'`, `printWidth: 80`, `endOfLine: 'lf'`, `bracketSpacing: true`).
- `plugins.*`: `sh`, `toml`, `ini`, `packagejson`, `properties`, `xml`, `astro`, `svelte`, `prisma`, `sql`, `nginx`, `embed`, `sortImports`, `multilineArrays`, `tailwind`.
- `overrides.*`: `czrc`, `toml`, `xml`, `astro`, `svelte`, `base`, `all`.
- `importOrder`: Complete regex patterns for `@ianvs/prettier-plugin-sort-imports`, aligned with `eslint-plugin-spellbookx` (Node.js built-ins, frameworks, state, UI libraries, testing, workspace packages, internal aliases, assets, styles, and relatives).

### 7. Atomic Utility Functions (`lib`)

Every helper and utility function is implemented atomically under `lib/` and can be imported either from the package root or from `prettier-config-spellbookx/lib`:

```javascript
import {
  defineImports,
  defineSbxConfig,
  formatGroupToRegex,
  getPluginName,
  mergeOverrides,
  sortPlugins,
} from 'prettier-config-spellbookx/lib';
```

- `sortPlugins(plugins)`: Deduplicates and places plugins in priority order (Tailwind always last).
- `mergeOverrides(overrides)`: Merges file overrides without duplicating pattern entries.
- `getPluginName(plugin)`: Resolves canonical string name from plugin instances or objects.
- `formatGroupToRegex(group)`: Converts package name arrays and tokens into Prettier-compatible regex patterns.
- `defineImports(...inputs)`: Composes custom `importOrder` lists with blank line separators.
- `defineSbxConfig(...configs)`: Deep-merges configurations, plugins, and overrides.

---

## Configuration File Formats

According to the [Prettier Configuration Documentation](https://prettier.io/docs/configuration), you can define your configuration in any of the following files:

### In `package.json`

Add a `"prettier"` field pointing to the package or subpath:

```json
{
  "name": "my-project",
  "prettier": "prettier-config-spellbookx"
}
```

Or targeting a specific preset:

```json
{
  "name": "my-project",
  "prettier": "prettier-config-spellbookx/base"
}
```

### In `.prettierrc` or `.prettierrc.json`

```json
"prettier-config-spellbookx"
```

### In `.prettierrc.yml` or `.prettierrc.yaml`

```yaml
prettier-config-spellbookx
```

### In `.prettierrc.js` or `prettier.config.js` (CommonJS)

```javascript
const { configs } = require('prettier-config-spellbookx');

module.exports = configs.recommended;
```

### In `.prettierrc.mjs` or `prettier.config.mjs` (ES Modules)

```javascript
export { default } from 'prettier-config-spellbookx';
```

### In `prettier.config.ts` (TypeScript)

```typescript
import { defineSbxConfig, configs } from 'prettier-config-spellbookx';

export default defineSbxConfig([
  configs.recommended,
  {
    singleQuote: true,
  },
]);
```

---

## Troubleshooting

### Plugin Resolution with `pnpm`

`pnpm` uses a strict, non-flat `node_modules` layout based on symlinks and an isolated content-addressable store.

When Prettier formats a file, it attempts to load configured plugins from the `node_modules` directory of the project where Prettier is invoked. If your project uses `pnpm`, Prettier might fail to resolve transitively installed plugins (e.g., `Error: Cannot find package 'prettier-plugin-tailwindcss'`).

#### Solution A: Install Plugins Locally (Recommended for pnpm)

Install the required plugins as dev dependencies in your project:

```bash
pnpm add -D prettier prettier-config-spellbookx \
  @prettier/plugin-xml \
  prettier-plugin-sh \
  prettier-plugin-toml \
  prettier-plugin-ini \
  prettier-plugin-packagejson \
  prettier-plugin-properties \
  prettier-plugin-sql \
  prettier-plugin-nginx \
  prettier-plugin-astro \
  prettier-plugin-svelte \
  prettier-plugin-prisma \
  prettier-plugin-embed \
  @ianvs/prettier-plugin-sort-imports \
  prettier-plugin-multiline-arrays \
  prettier-plugin-tailwindcss
```

_(You only need to install the plugins corresponding to the configurations you actually use, e.g. only `prettier-plugin-tailwindcss` if using `recommended`)._

#### Solution B: Enable Hoisting via `.npmrc`

Alternatively, configure `pnpm` to hoist Prettier plugins to the root `node_modules` by creating or updating `.npmrc`:

```ini
# .npmrc
public-hoist-pattern[]=*prettier*
```

After modifying `.npmrc`, run `pnpm install` to update the symlink structure.

---

## License

This project is licensed under the MIT License.

- **Author & Creator**: [Davide Di Criscito](https://github.com/dcdavidev)
- **GitHub Organization**: [Spellbookx](https://github.com/spellbookx)
- **Copyright**: © 2026 Davide Di Criscito and [Spellbookx](https://github.com/spellbookx) contributors.

For full details, see the [LICENSE](LICENSE) file.
