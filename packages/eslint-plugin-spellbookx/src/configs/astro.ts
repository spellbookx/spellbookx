/**
 * @file astro.ts
 * ESLint configuration tailored for Astro projects using `eslint-plugin-astro`.
 */

import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import astroPlugin from 'eslint-plugin-astro';

/**
 * Astro flat ESLint configuration providing parsing and recommended linting rules for `.astro` components.
 */
export const configAstro: Linter.Config[] = defineConfig([
  ...astroPlugin.configs['flat/recommended'],
]);

export default configAstro;
