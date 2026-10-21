/**
 * @file config.ts
 * Default Spellbookx CSpell configuration.
 */

import type { CSpellSettings } from '@cspell/cspell-types';

import { DICTIONARIES } from './constants/dictionaries.js';
import { ignorePaths } from './constants/ignore-paths.js';
import { words } from './constants/words.js';
import { packageJson } from './lib/package-json.js';

/**
 * Default CSpell configuration preset for Spellbookx monorepo and projects.
 */
export const config: CSpellSettings = {
  version: '0.2',
  name: packageJson.name,
  enabled: true,
  enableGlobDot: true,
  language: 'en,es,it,fr,de',
  loadDefaultConfiguration: true,
  ignorePaths,
  allowCompoundWords: true,
  dictionaries: DICTIONARIES,
  words,
};

export default config;
