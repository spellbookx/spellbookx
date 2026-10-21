# spellbookx

🧙 **The Spellbookx CLI** (`sbx`) — Automated setup and configuration wizard for the Spellbookx developer toolchain (ESLint, Prettier, CSpell, Commitlint, and recipes).

---

## Installation

Run instantly without global installation using your preferred runner:

```bash
# Using npx
npx spellbookx

# Using pnpm dlx
pnpm dlx spellbookx
# or with alias
pnpm dlx sbx

# Using bunx
bunx spellbookx
```

Or install globally:

```bash
npm install -g spellbookx
```

---

## Usage

Running `sbx` or `spellbookx` interactively launches the setup wizard:

```bash
sbx
```

### Options

```text
Usage: spellbookx [options] [command]

🧙 Spellbookx developer toolchain CLI

Options:
  -V, --version                   output the version number
  -h, --help                      display help for command

Commands:
  init [options]                  Interactively initialize Spellbookx configurations
  help [command]                  display help for command
```

### Non-Interactive Setup

```bash
# Generate configuration files without installing npm dependencies
sbx init --skip-install

# Select specific tools and package manager
sbx init --tools eslint prettier --pm pnpm
```

---

## Managed Tools

| Tool             | Integrated Packages                                                                                          | Generated Configurations                         |
| :--------------- | :----------------------------------------------------------------------------------------------------------- | :----------------------------------------------- |
| **`cspell`**     | `@cspell/cspell-types`, `cspell`, `cspell-config-spellbookx`                                                 | `cspell.config.cjs`, `.config/cspell/custom.txt` |
| **`commitlint`** | `@commitlint/cli`, `@commitlint/config-conventional`, `commitizen`, `cz-git`, `commitlint-config-spellbookx` | `commitlint.config.mjs`, `package.json` config   |
| **`eslint`**     | `eslint`, `eslint-plugin-spellbookx`, `@spellbookx/recipes`                                                  | `eslint.config.mjs`                              |
| **`prettier`**   | `prettier`, `prettier-config-spellbookx`                                                                     | `prettier.config.mjs`, `.prettierignore`         |

---

## License

This project is licensed under the MIT License.

- **Author & Creator**: [Davide Di Criscito](https://github.com/dcdavidev)
- **GitHub Organization**: [Spellbookx](https://github.com/spellbookx)
- **Copyright**: © 2026 Davide Di Criscito and [Spellbookx](https://github.com/spellbookx) contributors.

For full details, see the [LICENSE](LICENSE) file.
