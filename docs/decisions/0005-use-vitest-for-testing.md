# 5. Use Vitest for Testing

Date: 2026-10-21

## Status

Accepted

## Context

Each package in the Spellbookx monorepo (ESLint rules, Prettier configuration builders, Commitlint dynamic scope resolvers, CSpell integrations, and the CLI wizard) requires fast, reliable unit and integration testing.

Jest has long been the standard testing tool, but configuring Jest in a modern, pure-ESM TypeScript monorepo introduces friction, requiring heavy transform chains (ts-jest or babel-jest) and complex module mapping.

## Decision

We adopted **Vitest** (`vitest`) as the unified test framework across all workspace packages:

1. **Fast & Modern**: Blazing-fast test runner powered by Vite's architecture.
2. **Native ESM & TypeScript**: Runs TypeScript and ECMAScript Modules out of the box with zero compilation or transpile configuration overhead.
3. **API Compatibility**: Provides standard `describe`, `it`, `expect` APIs, offering familiarity without the legacy baggage of older test runners.

## Consequences

### Positive

- Unified test configuration and execution across all monorepo packages.
- Instant test runs and responsive watch mode.
- Native TypeScript and ESM support without polyfills or complex mocks.

### Negative or Trade-offs

- Node.js test environment requires explicit Node version compatibility (guaranteed via `.nvmrc`).
