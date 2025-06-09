# 🪄 spellbookx

**The source-of-truth for reproducible, multi-scope development environments.**

`spellbookx` is your central brain for configuring machines, shells, tools, editors, and workspaces — designed for scale, built for clarity, and automated from the ground up.

## 🔧 Overview

`spellbookx` enables full-stack environment bootstrapping and lifecycle management across:

| Scope      | Examples                                                           |
| ---------- | ------------------------------------------------------------------ |
| 🖥️ Machine | Hostnames, hardware quirks, WSL2-specific config                   |
| 🛠️ System  | OS packages, systemd, PATH entries, Go/Node toolchains             |
| 👤 User    | Dotfiles, shell themes, git identity, CLI tools                    |
| 🧪 Project | `.env`, `.vscode`, `lefthook.yaml`, lint configs, runtime settings |

Everything lives under version control and is validated, portable, and programmable.

---

## 🧠 Philosophy

- **Dev environments are code**: Declarative config. Versioned. Repeatable.
- **Convention over configuration**: Opinionated defaults with flexible overrides.
- **Scope-aware**: Isolated state across machine, user, and workspace boundaries.
- **Editor-native**: VSCode-first with automatic `.vscode` generation.
- **CLI-first**: Powered by `sbx` (in development) for fast, context-aware operations.

---

## ⚙️ Toolchain

| Tool                | Purpose                                     |
| ------------------- | ------------------------------------------- |
| `pnpm`              | Package and script orchestration            |
| `nvm` via `pnpm`    | Node version management                     |
| `semantic-release`  | Automated versioning & changelog generation |
| `lefthook`          | Git hooks manager                           |
| `shfmt` via `bingo` | Shell script formatting                     |
| `Rust` (planned)    | Native CLI tooling (`sbx`)                  |

---

## 🗂 Repo Structure

```text
spellbookx/
├── spellbookx.json           # Project manifest (source-of-truth)
├── schemas/                  # JSON schemas for each config scope
│   └── std/                  # Standard schemas
├── scripts/                  # POSIX-compliant setup logic
│   ├── installers/           # Toolchain installation scripts
│   └── uninstallers/         # Toolchain teardown
├── .vscode/                  # VSCode workspace scaffolding
├── dotfiles/                 # Shell/user-level config
└── tasks/                    # Reusable ops (planned: Makefile replacement in PowerShell)
```

---

## 📦 Installation

> ⚠️ Fully automated bootstrap in progress. Until then, follow manual steps.

```bash
# 1. Clone
git clone https://github.com/spellbookx/spellbookx ~/spellbookx/spellbookx

# 2. Enter WSL2 (if applicable)
wsl

# 3. Bootstrap pnpm + Node.js
curl -fsSL https://get.pnpm.io/install.sh | sh -
pnpm env use --global
```

---

## 🚀 Roadmap

- [x] Git Flow + Conventional Branching
- [x] Scoped manifest and schema validation
- [x] VSCode-first support
- [x] `pnpm`-first bootstrapping
- [ ] `sbx` CLI (Rust-native)
- [ ] Graph-based config resolution
- [ ] Interactive project scaffolding
- [ ] Workspace sync + cloud profiles

---

## 🧪 Contributing

> This repo is still in the R&D phase. Core standards and automation are being finalized.

If you'd like to propose structure, workflows, or tool integrations, open an issue or contact [@PwrX](https://github.com/spellbookx).

---

## 📜 License

[MIT](LICENSE) — Build your own spellbook.
