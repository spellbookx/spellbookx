# 6. Adopt ESLint 9+ Flat Configs for Linting

Date: 2026-10-21

## Status

Accepted

## Context

Code quality, security analysis, and style consistency across TypeScript, JavaScript, JSON, Markdown, React, Astro, and Svelte are foundational pillars of Spellbookx.

The ESLint ecosystem transitioned to a new architecture in ESLint 9: the Flat Config system (`eslint.config.js` / `eslint.config.mjs`). While some packages still cling to legacy `.eslintrc` structures or bridge them using `@eslint/eslintrc` `FlatCompat`, doing so introduces performance penalties, maintenance ambiguity, and fragile resolution rules.

## Decision

We adopted **ESLint** as our core linter and committed strictly to **ESLint 9+ Flat Configs**:

1. **Maturity & Extensibility**: ESLint is the most mature, extensible, and battle-tested linting platform in the JavaScript ecosystem, backed by a vast community of parser and plugin authors.
2. **Native Flat Config Design**: Rather than wrapping legacy configs, `eslint-plugin-spellbookx` builds native Flat Config arrays. This allows direct composition, explicit scoping, and standard JavaScript exports.
3. **Internal Dogfooding**: The monorepo uses its own `eslint-plugin-spellbookx` presets to lint all workspace source code.

## Consequences

### Positive

- Future-proof linting architecture aligned with ESLint's long-term direction.
- Highly composable configs without circular plugin resolution issues.
- Clean and declarative configuration syntax for end users.

### Negative or Trade-offs

- End users must be on ESLint 9 or newer. Legacy `.eslintrc` configurations are explicitly not supported.
