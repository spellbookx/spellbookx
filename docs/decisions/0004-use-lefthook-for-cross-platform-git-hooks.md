# 4. Use Lefthook for Cross-Platform Git Hooks

Date: 2026-10-21

## Status

Accepted

## Context

A developer toolchain monorepo requires strict local verification before commits are created and pushed to the repository. This includes formatting checks, linting, spellchecking, and commit message validation against Conventional Commits specifications.

Historically, Husky has been the dominant choice in JavaScript repositories. However, Husky relies heavily on raw shell/bash scripts, which frequently cause cross-platform compatibility headaches on Windows, require extra plumbing (like lint-staged) for staging filters, and lack native concurrent execution.

## Decision

We adopted **Lefthook** (`lefthook.yml`) as our Git hook manager:

1. **Ease of Use & Clean Configuration**: Managed via a single, expressive YAML configuration file without bespoke bash scripts.
2. **True Cross-Platform Portability**: Packaged as a fast Go binary, ensuring completely identical behavior on Linux, macOS, and Windows environments.
3. **Parallel Task Execution**: Runs formatting, linting, and spellchecking tasks concurrently on staged files, significantly reducing commit latency.

## Consequences

### Positive

- Robust, portable hook execution across developer environments regardless of OS shell.
- Drastic reduction in hook execution time due to built-in concurrency.
- Zero bash scripting maintenance.

### Negative or Trade-offs

- Developers must have Lefthook installed (automated through `pnpm` install scripts).
