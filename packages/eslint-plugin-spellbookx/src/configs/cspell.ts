/**
 * @file cspell.ts
 * ESLint configuration for CSpell spell-checking integration.
 */

import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import * as cspell from '@cspell/eslint-plugin/configs';

/**
 * Flat ESLint configuration activating `@cspell/eslint-plugin` for automated source code spell-checking.
 */
export const configCspell: Linter.Config[] = defineConfig([cspell.recommended]);

export default configCspell;
