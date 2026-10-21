/**
 * @file constants.ts
 * Standard glob patterns for paths ignored by linting, formatting, and spell-checking tools.
 */

/**
 * Core build junk and temporary cache files.
 */
export const core = [
  '**/*LICENSE*',
  '**/*.log',
  '**/.cache/**',
  '**/.temp/**',
  '**/.tmp/**',
  '**/.DS_Store',
] as const;

/**
 * Node.js, JavaScript, and TypeScript build outputs and caches.
 */
export const node = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/out/**',
  '**/out-tsc/**',
  '**/coverage/**',
  '**/.next/**',
  '**/.nuxt/**',
  '**/.svelte-kit/**',
  '**/.turbo/**',
  '**/.pnpm/**',
  '**/.npm/**',
  '**/.yarn/**',
  '**/.pnp/**',
  '**/.parcel-cache/**',
  '**/.vite/**',
  '**/.rollup.cache/**',
] as const;

/**
 * Package manager lock files across npm, pnpm, yarn, and bun.
 */
export const lockFiles = [
  '**/package-lock.json',
  '**/pnpm-lock.yaml',
  '**/yarn.lock',
  '**/bun.lockb',
] as const;

/**
 * Rust toolchain build outputs and cargo lock files.
 */
export const rust = ['**/target/**', '**/.cargo/**', '**/Cargo.lock'] as const;

/**
 * Go toolchain build outputs, vendor directories, and dependency files.
 */
export const go = [
  '**/go.sum',
  '**/go.work',
  '**/go.work.sum',
  '**/vendor/**',
  '**/.gopath/**',
  '**/.cache/go-build/**',
] as const;

/**
 * Python toolchain caches, bytecode, and virtual environments.
 */
export const python = [
  '**/__pycache__/**',
  '**/*.pyc',
  '**/*.pyo',
  '**/.mypy_cache/**',
  '**/.pytest_cache/**',
  '**/.tox/**',
  '**/.ruff_cache/**',
  '**/.venv/**',
  '**/venv/**',
  '**/env/**',
  '**/.ipynb_checkpoints/**',
] as const;

/**
 * Miscellaneous developer toolchains, IDEs, and system dotfiles.
 */
export const toolchains = [
  '**/.git/**',
  '**/.svn/**',
  '**/.hg/**',
  '**/.idea/**',
  '**/.vscode/**',
  '**/.editorconfig',
  '**/.eslintcache',
  '**/.babelrc',
  '**/.prettier*',
  '**/.nx/**',
  '**/.cspell/**',
  '**/.cursor/**',
  '**/.history/**',
  '**/.sass-cache/**',
  '**/.gradle/**',
  '**/.terraform/**',
  '**/.docker/**',
  '**/.kube/**',
  '**/.devcontainer/**',
  '**/.direnv/**',
  '**/.astro/**',
  '**/.codacy/**',
  '**/.gemini/**',
] as const;

/**
 * Windows and WSL specific metadata and system files.
 */
export const windows = [
  '**/*:Zone.Identifier',
  '**/*:Zone.Identifier*',
  '**/Thumbs.db',
  '**/desktop.ini',
  '**/$RECYCLE.BIN/**',
  '**/System Volume Information/**',
  '**/pagefile.sys',
  '**/swapfile.sys',
  '**/hiberfil.sys',
] as const;

/**
 * Specific project artifacts, documentation guides, and template files.
 */
export const misc = [
  '**/connect.lock',
  '.github/instructions/**',
  '**/*.hbs',
] as const;

/**
 * Combined list of all standard ignore glob patterns.
 */
export const all = [
  ...core,
  ...node,
  ...lockFiles,
  ...rust,
  ...go,
  ...python,
  ...toolchains,
  ...windows,
  ...misc,
] as const;

// Uppercase aliases for conventional matching
export const CORE_IGNORE_PATHS = core;
export const NODE_IGNORE_PATHS = node;
export const LOCK_FILES_IGNORE_PATHS = lockFiles;
export const RUST_IGNORE_PATHS = rust;
export const GO_IGNORE_PATHS = go;
export const PYTHON_IGNORE_PATHS = python;
export const TOOLCHAINS_IGNORE_PATHS = toolchains;
export const WINDOWS_IGNORE_PATHS = windows;
export const MISC_IGNORE_PATHS = misc;
export const ALL_IGNORE_PATHS = all;
export const ignorePaths: string[] = [...all];
