/**
 * @file ignore-paths.ts
 * Standard glob patterns for paths ignored during spell-checking.
 * Shared presets re-exported from `@spellbookx/recipes/ignores`.
 */

export {
  CORE_IGNORE_PATHS,
  ignorePaths as default,
  GO_IGNORE_PATHS,
  ignorePaths,
  LOCK_FILES_IGNORE_PATHS,
  MISC_IGNORE_PATHS,
  NODE_IGNORE_PATHS,
  PYTHON_IGNORE_PATHS,
  RUST_IGNORE_PATHS,
  TOOLCHAINS_IGNORE_PATHS,
  WINDOWS_IGNORE_PATHS,
} from '@spellbookx/recipes/ignores';
