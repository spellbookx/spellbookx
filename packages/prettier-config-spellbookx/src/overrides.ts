/**
 * @file overrides.ts
 * Prettier parser and path overrides for specific file formats.
 */

import type { Config } from 'prettier';

/**
 * Single file override entry type for Prettier configuration.
 */
export type OverrideEntry = NonNullable<Config['overrides']>[number];

/**
 * File override configuring JSON parser for Commitizen rc configuration files (`.czrc`).
 */
export const czrcOverride: OverrideEntry = {
  files: '**/.czrc',
  options: {
    parser: 'json',
  },
};

/**
 * File override for JSON with Comments (`.jsonc`) files to disable trailing commas.
 */
export const jsoncOverride: OverrideEntry = {
  files: '*.jsonc',
  options: {
    trailingComma: 'none',
  },
};

/**
 * File override for TOML configuration files with an expanded print width.
 */
export const tomlOverride: OverrideEntry = {
  files: ['*.toml'],
  options: {
    printWidth: 100,
  },
};

/**
 * File override configuring XML parser for SVG, XML, plist, project files, and application manifests.
 */
export const xmlOverride: OverrideEntry = {
  files: [
    '**/*.xml',
    '**/*.svg',
    '**/*.xhtml',
    '**/*.xsd',
    '**/*.xsl',
    '**/*.xslt',
    '**/*.plist',
    '**/*.axml',
    '**/*.xaml',
    '**/*.config',
    '**/*.resx',
    '**/*.csproj',
    '**/*.vbproj',
  ],
  options: {
    parser: 'xml',
  },
};

/**
 * File override configuring Astro parser for `.astro` files.
 */
export const astroOverride: OverrideEntry = {
  files: ['*.astro'],
  options: {
    parser: 'astro',
  },
};

/**
 * File override configuring Svelte parser for `.svelte` files.
 */
export const svelteOverride: OverrideEntry = {
  files: ['*.svelte'],
  options: {
    parser: 'svelte',
  },
};

/**
 * Aggregated override entries included in the base configuration preset.
 */
export const baseOverrides: OverrideEntry[] = [
  czrcOverride,
  jsoncOverride,
  tomlOverride,
  xmlOverride,
];

/**
 * All file override entries combined for the comprehensive preset.
 */
export const allOverrides: OverrideEntry[] = [
  ...baseOverrides,
  astroOverride,
  svelteOverride,
];

/**
 * Dictionary of individual and aggregated file override presets.
 */
export const overrides = {
  czrc: czrcOverride,
  jsonc: jsoncOverride,
  toml: tomlOverride,
  xml: xmlOverride,
  astro: astroOverride,
  svelte: svelteOverride,
  base: baseOverrides,
  all: allOverrides,
} as const;

/**
 * Valid override identifier keys.
 */
export type OverrideKey = keyof typeof overrides;
