# spellbookx CLI

A CLI tool for the Spellbookx ecosystem to quickly setup linting, formatting, and commit standards.

## Installation

```bash
pnpm add -D spellbookx
```

## Usage

```bash
pnpm spellbookx init
```

or using the alias:

```bash
pnpm sbx init
```

## Features

- **ESLint**: Setup `eslint-plugin-spellbookx` with customizable configurations.
- **Prettier**: Setup `prettier-config-spellbookx` with customizable configurations.
- **CSpell**: Setup `cspell-config-spellbookx`.
- **Commitlint**: Setup `commitlint-config-spellbookx` and `cz-git`.
- **Git Hooks**: Choose between `Lefthook` and `Husky` for git hooks.
- **EditorConfig**: Ensures a `.editorconfig` file is present.

## License

MIT
