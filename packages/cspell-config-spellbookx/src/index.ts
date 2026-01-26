import type { CSpellSettings } from '@cspell/cspell-types';

import { packageJson } from './helpers.js';
import { ignorePaths } from './ignore-paths.js';
import { words } from './words.js';

export const config: CSpellSettings = {
  version: '0.2',

  name: packageJson.name, // The name of this config

  enabled: true,
  enableGlobDot: true,

  language: 'en,es,it,fr,de',

  loadDefaultConfiguration: true,

  ignorePaths: ignorePaths,

  allowCompoundWords: true,

  // list of featured dictionaries
  dictionaries: [
    // General dictionaries
    'en-gb',
    'en_US',
    'es-es',
    'it-it',
    'fr-fr',
    'de-de',
    'companies',
    'softwareTerms',
    'misc',

    // Programming languages
    'typescript',
    'node',
    'php',
    'go',
    'python',
    'powershell',
    'html',
    'css',
    'csharp',
    'latex',
    'bash',

    // others
    'fonts',
    'fileTypes',
    'npm',
  ],

  words: words,
};

export default config;
