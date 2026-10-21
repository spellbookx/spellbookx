# 3. Use Rolldown for Rust-Based Package Builds

Date: 2026-10-21

## Status

Accepted

## Context

The TypeScript and JavaScript packages in this monorepo need to be bundled into high-quality, tree-shakeable ECMAScript Modules (ESM) with minimal build times and clean configuration.

Traditional tools such as Webpack or standard Rollup introduce slower build steps, while esbuild alone lacks some of the advanced bundling and plugin capabilities required for complex multi-entry setups.

## Decision

We adopted **Rolldown** (`rolldown`) for package bundling, complemented by `tsc` for generating TypeScript declaration files (`.d.ts`):

1. **Rust-Based Performance**: Built in Rust, Rolldown delivers modern, ultra-fast compilation and bundling times.
2. **Rollup Compatibility**: Offers intuitive Rollup-compatible configuration syntax with native ESM output support.
3. **Clean Dual-Stage Pipeline**: Rolldown handles the JS bundling at maximum speed, while TypeScript compiler (`tsc`) guarantees accurate type declarations.

## Consequences

### Positive

- Near-instantaneous builds across all packages, accelerating Turborepo pipeline runs.
- Clean and consistent modern ESM build output.
- Future-proof stack aligned with the next generation of JavaScript tooling.

### Negative or Trade-offs

- Rolldown is relatively new in the ecosystem compared to classic Rollup, requiring occasional tracking of upstream release updates.
