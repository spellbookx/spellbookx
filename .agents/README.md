# 🤖 Spellbookx Agent Skills

Official AI agent skills for the **Spellbookx** developer toolchain conforming to the open [Agent Skills specification](https://github.com/vercel-labs/skills).

These skills provide AI coding assistants (including **Google Antigravity**, **Cursor**, **Claude Code**, **GitHub Copilot**, **Cline**, **Windsurf**, **Zed**, and **Warp**) with contextual knowledge and deterministic workflows to scaffold, configure, and maintain the Spellbookx developer ecosystem.

---

## Available Skills

| Skill                       | Description                                                                                                                                | Location                                                                           |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| **`spellbookx-setup`**      | Complete guided setup of the full Spellbookx suite (ESLint, Prettier, CSpell, Commitlint, Lefthook) into any JS/TS codebase or monorepo.   | [`skills/spellbookx-setup/SKILL.md`](./skills/spellbookx-setup/SKILL.md)           |
| **`spellbookx-eslint`**     | Composes ESLint 9+ flat configs across 16 presets, framework integrations (React, Astro, Svelte, Node), and custom import sorting recipes. | [`skills/spellbookx-eslint/SKILL.md`](./skills/spellbookx-eslint/SKILL.md)         |
| **`spellbookx-prettier`**   | Configures Prettier presets (Tailwind, Astro, Svelte, Prisma, SQL, Nginx) and multi-plugin composition via `defineSbxConfig`.              | [`skills/spellbookx-prettier/SKILL.md`](./skills/spellbookx-prettier/SKILL.md)     |
| **`spellbookx-cspell`**     | Configures code spell-checking, technical vocabularies, multi-language dictionaries (EN, IT, ES, FR, DE), and ignore globs.                | [`skills/spellbookx-cspell/SKILL.md`](./skills/spellbookx-cspell/SKILL.md)         |
| **`spellbookx-commitlint`** | Enforces Conventional Commits with automatic monorepo package scope discovery and interactive `cz-git` prompt setup.                       | [`skills/spellbookx-commitlint/SKILL.md`](./skills/spellbookx-commitlint/SKILL.md) |

---

## Installation

### Option 1: Via the `skills` CLI (Recommended)

Install skills directly into your project repository using the `skills` CLI:

```bash
# Install all Spellbookx skills into the current project
npx skills add dcdavidev/spellbookx

# Or install a specific skill:
npx skills add dcdavidev/spellbookx --skill spellbookx-setup
npx skills add dcdavidev/spellbookx --skill spellbookx-eslint
npx skills add dcdavidev/spellbookx --skill spellbookx-prettier
npx skills add dcdavidev/spellbookx --skill spellbookx-cspell
npx skills add dcdavidev/spellbookx --skill spellbookx-commitlint
```

#### Global Installation (Available across all your projects)

To make these skills available globally to your AI assistant across every repository on your machine:

```bash
npx skills add -g dcdavidev/spellbookx
```

---

### Option 2: Manual Installation

You can copy the `.agents/skills` folder directly into any project:

```bash
# In your target project root:
mkdir -p .agents/skills
git clone --depth 1 https://github.com/dcdavidev/spellbookx.git /tmp/spellbookx
cp -r /tmp/spellbookx/.agents/skills/* .agents/skills/
rm -rf /tmp/spellbookx
```

---

## Supported AI Assistants

Skills in `.agents/skills` are automatically recognized and loaded by:

- **Google Antigravity** (CLI `agy` & Antigravity IDE)
- **Cursor** (`.agents/skills` or `.cursor/skills`)
- **Claude Code** (`.agents/skills`)
- **GitHub Copilot Workspace & Chat**
- **Cline** / **Roo Code**
- **Windsurf** / **Cascade**
- **Zed** & **Warp**

---

## Usage Examples

Once installed, prompt your AI assistant naturally:

- _"Set up the Spellbookx developer toolchain in this repository using `spellbookx-setup`."_
- _"Configure ESLint flat config with Next.js and Tailwind import sorting using `spellbookx-eslint`."_
- _"Add Svelte and Prisma Prettier formatting with Tailwind sorting using `spellbookx-prettier`."_
- _"Configure CSpell with technical dictionaries and custom ignore paths using `spellbookx-cspell`."_
- _"Set up Conventional Commits with automatic monorepo scope detection using `spellbookx-commitlint`."_
