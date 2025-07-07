import { defineConfig } from '@cspell/cspell-types';

export default defineConfig({
  version: '0.2',

  enabled: true,
  enableGlobDot: true,

  language: 'en',

  loadDefaultConfiguration: true,

  ignorePaths: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/coverage/**',
    '**/out/**',
    '**/vendor/**',
    '**/.git/**',
    '**/.svn/**',
    '**/.hg/**',
    '**/pnpm-lock.yaml',
    '**/yarn.lock',
    '**/package-lock.json',
  ],

  allowCompoundWords: true,

  words: ['spellbookx', 'lefthook', 'davide', 'criscito'],

  // list of featured dictionaries
  dictionaries: [
    // General dictionaries
    'en-gb',
    'en_US',
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
});
