/**
 * @file define-sbx-config.ts
 * Configuration builder extending the Spellbookx default CSpell settings.
 */

import type { CSpellSettings } from '@cspell/cspell-types';

import { config as baseConfig } from '../config.js';
import {
  type CSpellConfigInput,
  mergeCSpellConfigs,
} from './merge-cspell-configs.js';

/**
 * Creates a complete CSpell configuration extending the default Spellbookx settings.
 * Accepts one or more partial CSpell configuration objects or arrays.
 *
 * @param overrides - Optional additional configuration(s) or overrides.
 * @returns Fully merged CSpellSettings object.
 * @example
 * ```ts
 * import { defineSbxConfig } from 'cspell-config-spellbookx';
 *
 * export default defineSbxConfig({
 *   words: ['my-brand'],
 *   ignorePaths: ['**\/fixtures\/**'],
 * });
 * ```
 */
export function defineSbxConfig(
  ...overrides: (CSpellConfigInput | CSpellConfigInput[])[]
): CSpellSettings {
  return mergeCSpellConfigs(baseConfig, ...overrides);
}

/**
 * Alias for {@link defineSbxConfig}.
 */
export const defineConfig = defineSbxConfig;
