# commitlint-config-spellbookx

A modern, highly modular, and opinionated [Commitlint](https://commitlint.js.org/) configuration for the Spellbookx ecosystem. It enforces the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification, automatically discovers monorepo package scopes, and provides an interactive [cz-git](https://cz-git.qbenben.com/) Commitizen prompt with emojis.

---

## Features

| Feature                       | Description                                                                                                                               |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **Conventional Commits**      | Extends `@commitlint/config-conventional` with strict, opinionated rules (72-char headers, 100-char bodies/footers, no trailing periods). |
| **Dynamic Monorepo Scopes**   | Automatically discovers workspace packages from `pnpm-workspace.yaml`, `package.json`, and `lerna.json`.                                  |
| **Standard Special Scopes**   | Built-in support for `workspace` (root/infra changes) and `release` (versioning commits).                                                 |
| **Interactive cz-git Prompt** | Out-of-the-box support for `commitizen` with rich emojis, descriptions, and multi-scope selection.                                        |
| **Modular Architecture**      | Import individual building blocks (`rules`, `prompt`, `scopes`, `COMMIT_TYPES`) or atomic functions (`lib/`).                             |

---

## Supported Commit Types

| Type           | Emoji | Title                   | Description                                                                       |
| :------------- | :---: | :---------------------- | :-------------------------------------------------------------------------------- |
| **`feat`**     |  ✨   | Features                | A new feature for the user or codebase                                            |
| **`fix`**      |  🐛   | Bug Fixes               | A bug fix                                                                         |
| **`docs`**     |  📚   | Documentation           | Documentation only changes                                                        |
| **`style`**    |  💎   | Styles                  | Changes that do not affect the meaning of the code (whitespace, formatting, etc.) |
| **`refactor`** |  📦   | Code Refactoring        | A code change that neither fixes a bug nor adds a feature                         |
| **`perf`**     |  🚀   | Performance             | A code change that improves performance                                           |
| **`test`**     |  🚨   | Tests                   | Adding missing tests or correcting existing tests                                 |
| **`build`**    |   🛠   | Builds                  | Changes that affect the build system or external dependencies                     |
| **`ci`**       |  ⚙️   | Continuous Integrations | Changes to CI configuration files and scripts                                     |
| **`chore`**    |  ♻️   | Chores                  | Other changes that don't modify src or test files                                 |
| **`revert`**   |   🗑   | Reverts                 | Reverts a previous commit                                                         |

---

## Installation

Install the package and commitlint using **npm**:

```bash
npm install --save-dev commitlint-config-spellbookx @commitlint/cli
```

---

## Usage

Commitlint loads configuration from standard config files in your repository root. You can use this package in multiple ways depending on your project needs:

### 1. Default Export (Recommended)

The simplest way to use this preset:

```javascript
// commitlint.config.mjs
export { default } from 'commitlint-config-spellbookx';
```

### 2. Customizing Rules

Extend and customize specific commitlint rules while keeping the shared defaults:

```javascript
// commitlint.config.mjs
import { config, rules } from 'commitlint-config-spellbookx';

export default {
  ...config,
  rules: {
    ...rules,
    'header-max-length': [2, 'always', 100],
  },
};
```

### 3. Adding Custom Scopes

You can extend the dynamically discovered monorepo scopes with custom scopes:

```javascript
// commitlint.config.mjs
import { config, rules, scopesArray } from 'commitlint-config-spellbookx';

export default {
  ...config,
  rules: {
    ...rules,
    'scope-enum': [2, 'always', [...scopesArray, 'custom-scope', 'analytics']],
  },
};
```

### 4. Fully Modular Building Blocks

Assemble your configuration from modular pieces:

```javascript
// commitlint.config.mjs
import {
  rules,
  prompt,
  scopesArray,
  scopesEnum,
  COMMIT_TYPES,
} from 'commitlint-config-spellbookx';

export default {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules,
  prompt,
};
```

Available building blocks:

- `config`: Complete, ready-to-use commitlint configuration object.
- `rules`: Strict Conventional Commit rules (`type-enum`, `scope-enum`, `header-max-length`, etc.).
- `prompt`: Commitizen / `cz-git` interactive questionnaire configuration with emojis and multi-scope support.
- `scopesArray`: Array of discovered workspace package names plus `'workspace'` and `'release'`.
- `scopesEnum`: Record of scopes with human-readable descriptions for interactive CLI prompts.
- `COMMIT_TYPES`: Array of all 11 allowed commit type strings.
- `SCOPE_WORKSPACE`: Constant `'workspace'`.
- `SCOPE_RELEASE`: Constant `'release'`.

### 5. Atomic Utility Functions (`lib`)

Every helper and utility function is implemented atomically under `lib/` and can be imported either from the package root or from `commitlint-config-spellbookx/lib`:

```javascript
import {
  findGitRoot,
  getScopes,
  getScopeDescription,
  getWorkspacesRawPath,
} from 'commitlint-config-spellbookx/lib';
```

- `getScopes(cwd?)`: Scans the monorepo configuration files and returns all workspace package names.
- `findGitRoot(startDir?)`: Traverses upwards to locate the root of the current git repository.
- `getScopeDescription(scope)`: Generates a human-friendly description string for a given scope identifier.
- `getWorkspacesRawPath(configPath, parser, property?)`: Parses JSON or YAML configuration files to extract workspace glob patterns.

---

## Configuration File Formats

According to the [Commitlint Configuration Documentation](https://commitlint.js.org/#/reference-configuration), you can define your configuration in any of the following formats:

### In `commitlint.config.mjs` (ES Modules)

```javascript
export { default } from 'commitlint-config-spellbookx';
```

### In `commitlint.config.cjs` (CommonJS)

```javascript
module.exports = require('commitlint-config-spellbookx').default;
```

### In `commitlint.config.ts` (TypeScript)

```typescript
import type { UserConfig } from '@commitlint/types';
import config from 'commitlint-config-spellbookx';

const userConfig: UserConfig = {
  ...config,
};

export default userConfig;
```

### In `.commitlintrc.json`

```json
{
  "extends": ["commitlint-config-spellbookx"]
}
```

### In `.commitlintrc.yml`

```yaml
extends:
  - commitlint-config-spellbookx
```

### In `package.json`

```json
{
  "name": "my-project",
  "commitlint": {
    "extends": ["commitlint-config-spellbookx"]
  }
}
```

---

## Git Hooks Integration

To enforce commit message conventions automatically before commits are finalized, configure a git hook manager:

### Using Lefthook

Add a `commit-msg` hook in your `lefthook.yml`:

```yaml
commit-msg:
  commands:
    commitlint:
      run: pnpm exec commitlint --edit {1}
```

### Using Husky

Add a `commit-msg` hook with Husky:

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

---

## Interactive Commits with Commitizen

For a guided, interactive commit experience with `cz-git`, configure Commitizen in your `package.json`:

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

Then run:

```bash
npm run commit
```

---

## License

This project is licensed under the MIT License.

- **Author & Creator**: [Davide Di Criscito](https://github.com/dcdavidev)
- **GitHub Organization**: [Spellbookx](https://github.com/spellbookx)
- **Copyright**: © 2026 Davide Di Criscito and [Spellbookx](https://github.com/spellbookx) contributors.

For full details, see the [LICENSE](LICENSE) file.
