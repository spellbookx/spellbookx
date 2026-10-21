# 7. Centralize Shared Patterns in @spellbookx/recipes

Date: 2026-10-21

## Status

Accepted

## Context

Across different developer tools (ESLint import sorter, Prettier import sorter, CSpell file ignores, ESLint global ignores), common configuration patterns recur constantly. For example:

- Standard regex patterns for classifying imports (built-in Node modules, UI frameworks, state libraries, local relative imports).
- Standard glob patterns for ignoring directories (build outputs, cache directories, OS artifacts, package manager files).

Duplicating these definitions across distinct configuration packages leads to inconsistency, divergence, and painful updates.

## Decision

We created **`@spellbookx/recipes`** as a dedicated, standalone foundational package in the workspace:

1. **Single Point of Extension**: Created specifically to address the need to easily extend and maintain configurations in just one central location.
2. **Framework & Tool Agnostic**: Exposes pure JavaScript constants and regex patterns without tying them to any single tool's runtime.
3. **Composable Consumption**: Both `eslint-plugin-spellbookx` and `prettier-config-spellbookx` consume `@spellbookx/recipes`, guaranteeing identical import ordering and ignore behavior across linting and formatting.

## Consequences

### Positive

- Single Source of Truth (SSOT) for toolchain conventions across the entire project.
- Updating or adding an ignore pattern or import rule in `@spellbookx/recipes` immediately benefits all downstream tools.
- External consumers can import and extend standard recipes without needing to rewrite complex regular expressions.

### Negative or Trade-offs

- `@spellbookx/recipes` must be built before downstream packages in the monorepo build pipeline (enforced topologically by Turborepo's `^build` task graph).
