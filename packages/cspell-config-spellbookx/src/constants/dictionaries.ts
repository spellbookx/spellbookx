/**
 * @file dictionaries.ts
 * Featured dictionary definitions and categories for CSpell.
 */

/**
 * Natural language and general technical dictionaries enabled by default.
 */
export const GENERAL_DICTIONARIES = [
  'en-gb',
  'en_US',
  'es-es',
  'it-it',
  'fr-fr',
  'de-de',
  'companies',
  'softwareTerms',
  'misc',
] as const;

/**
 * Programming languages, runtimes, and framework dictionaries enabled by default.
 */
export const PROGRAMMING_DICTIONARIES = [
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
] as const;

/**
 * Specialized utility dictionaries (fonts, file types, package ecosystems).
 */
export const OTHER_DICTIONARIES = ['fonts', 'fileTypes', 'npm'] as const;

/**
 * Complete list of all default CSpell dictionaries configured for Spellbookx.
 */
export const DICTIONARIES: string[] = [
  ...GENERAL_DICTIONARIES,
  ...PROGRAMMING_DICTIONARIES,
  ...OTHER_DICTIONARIES,
];

/**
 * Alias for {@link DICTIONARIES}.
 */
export const dictionaries = DICTIONARIES;

export default DICTIONARIES;
