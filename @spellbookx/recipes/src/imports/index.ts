/**
 * @file index.ts
 * Main exports for `@spellbookx/recipes/imports`.
 * Exposes all modular import groups, types, and the unified `imports` dictionary.
 */

import * as constants from './constants.js';

/**
 * Dictionary of all import recipe categories and separator tokens.
 */
export const imports = {
  assets: constants.assets,
  backendFrameworks: constants.backendFrameworks,
  backendMiddlewares: constants.backendMiddlewares,
  builtinModules: constants.builtinModules,
  cssInJs: constants.cssInJs,
  dataFetching: constants.dataFetching,
  dotenv: constants.dotenv,
  env: constants.env,
  fullstackFrameworks: constants.fullstackFrameworks,
  icons: constants.icons,
  internalAliases: constants.internalAliases,
  json: constants.json,
  monorepo: constants.monorepo,
  newline: constants.newline,
  nl: constants.nl,
  reactNativeExpo: constants.reactNativeExpo,
  reactPackages: constants.reactPackages,
  relative: constants.relative,
  separator: constants.separator,
  sideEffects: constants.sideEffects,
  stateManagement: constants.stateManagement,
  styles: constants.styles,
  testing: constants.testing,
  thirdParty: constants.thirdParty,
  uiFrameworks: constants.uiFrameworks,
  uiLibraries: constants.uiLibraries,
} as const;

/**
 * Valid keys in the `imports` dictionary.
 */
export type ImportRecipeKey = keyof typeof imports;

/**
 * Type of the unified `imports` dictionary.
 */
export type ImportsDictionary = typeof imports;

export * from './constants.js';

/**
 * Default export of the unified imports dictionary.
 */
export default imports;
