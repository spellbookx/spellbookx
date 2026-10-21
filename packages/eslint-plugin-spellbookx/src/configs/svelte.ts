/**
 * @file svelte.ts
 * ESLint configuration tailored for Svelte projects using `eslint-plugin-svelte`.
 */

import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import sveltePlugin from 'eslint-plugin-svelte';

/**
 * Svelte flat ESLint configuration providing parsing and recommended linting rules for `.svelte` components.
 */
export const configSvelte: Linter.Config[] = defineConfig([
  ...sveltePlugin.configs['flat/recommended'],
]);

export default configSvelte;
