/**
 * @file import-order.ts
 * Import ordering composer and parser presets for `@ianvs/prettier-plugin-sort-imports`.
 * Re-exports shared constants from `@spellbookx/recipes/imports` and provides `defineImports`.
 */

import { imports } from '@spellbookx/recipes/imports';

import { defineImports } from './lib/define-imports.js';

export * from '@spellbookx/recipes/imports';

/**
 * Canonical import order pattern array configured for `@ianvs/prettier-plugin-sort-imports`.
 * Aligned with the ESLint simple-import-sort rule groups from `eslint-plugin-spellbookx`.
 */
export const importOrder: string[] = defineImports([
  imports.dotenv,
  imports.separator,
  imports.sideEffects,
  imports.separator,
  imports.env,
  imports.separator,
  imports.builtinModules,
  imports.separator,
  imports.backendFrameworks,
  imports.separator,
  imports.backendMiddlewares,
  imports.separator,
  imports.uiFrameworks,
  imports.separator,
  imports.reactPackages,
  imports.separator,
  imports.fullstackFrameworks,
  imports.separator,
  imports.reactNativeExpo,
  imports.separator,
  imports.stateManagement,
  imports.separator,
  imports.dataFetching,
  imports.separator,
  imports.uiLibraries,
  imports.separator,
  imports.cssInJs,
  imports.separator,
  imports.icons,
  imports.separator,
  imports.testing,
  imports.separator,
  imports.thirdParty,
  imports.separator,
  imports.monorepo,
  imports.separator,
  imports.internalAliases,
  imports.separator,
  imports.assets,
  imports.separator,
  imports.json,
  imports.separator,
  imports.styles,
  imports.separator,
  imports.relative,
]);

/**
 * Default parser plugins enabling TypeScript, JSX, and legacy decorators during import sorting.
 */
export const defaultImportOrderParserPlugins = [
  'typescript',
  'jsx',
  'decorators-legacy',
] as const;

export { defineImports, type ImportInput } from './lib/define-imports.js';
