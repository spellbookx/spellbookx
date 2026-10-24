import { describe, expect, it } from 'vitest';

import defaultImports, {
  assets,
  backendFrameworks,
  backendMiddlewares,
  builtinModules,
  cssInJs,
  dataFetching,
  dotenv,
  env,
  fullstackFrameworks,
  icons,
  imports,
  internalAliases,
  json,
  monorepo,
  newline,
  nl,
  reactNativeExpo,
  reactPackages,
  relative,
  separator,
  sideEffects,
  stateManagement,
  styles,
  testing,
  thirdParty,
  uiFrameworks,
  uiLibraries,
} from '../src/imports/index.js';

describe('@spellbookx/recipes/imports', () => {
  it('exports imports dictionary as both default and named export', () => {
    expect(defaultImports).toBe(imports);
  });

  it('defines empty string separator aliases consistently', () => {
    expect(separator).toBe('');
    expect(newline).toBe('');
    expect(nl).toBe('');
    expect(imports.separator).toBe('');
    expect(imports.newline).toBe('');
    expect(imports.nl).toBe('');
  });

  it.each([
    ['dotenv', dotenv, ['@dotenvx/dotenvx', 'dotenv']],
    ['sideEffects', sideEffects, [String.raw`^\u0000`]],
    ['env', env, ['@env']],
    ['builtinModules', builtinModules, ['fs', 'path', 'node:']],
    ['backendFrameworks', backendFrameworks, ['express', 'fastify', '@nestjs']],
    ['backendMiddlewares', backendMiddlewares, ['cors', 'helmet', 'morgan']],
    ['uiFrameworks', uiFrameworks, ['react', 'svelte', 'vue', 'solid-js']],
    ['reactPackages', reactPackages, ['react-dom', 'react-router']],
    [
      'fullstackFrameworks',
      fullstackFrameworks,
      ['next', '@sveltejs/kit', '@remix-run'],
    ],
    ['reactNativeExpo', reactNativeExpo, ['react-native', 'expo']],
    ['stateManagement', stateManagement, ['zustand', 'redux', 'jotai']],
    ['dataFetching', dataFetching, ['axios', '@tanstack/react-query', 'swr']],
    ['uiLibraries', uiLibraries, ['@mui', '@radix-ui', 'shadcn-ui']],
    [
      'cssInJs',
      cssInJs,
      ['clsx', 'tailwind-merge', 'class-variance-authority'],
    ],
    ['icons', icons, ['lucide', 'react-icons', '@fortawesome']],
    ['testing', testing, ['vitest', 'jest', '@testing-library']],
    ['thirdParty', thirdParty, ['<THIRD_PARTY_MODULES>']],
    ['monorepo', monorepo, ['@org/', '^@repo/', '^@workspace/']],
    ['internalAliases', internalAliases, ['@/', '~/', '#/']],
    ['assets', assets, [String.raw`^.+\.(gif|jpe?g|png|svg|webp)$`]],
    ['json', json, [String.raw`^.+\.json$`]],
    ['styles', styles, [String.raw`^.+\.s?css$`, String.raw`^.+\.less$`]],
    ['relative', relative, ['../', './']],
  ] as const)(
    'import group "%s" is mapped in imports dictionary and contains expected entries',
    (key, group, expectedItems) => {
      expect(imports[key]).toBe(group);
      expect(Array.isArray(group)).toBe(true);
      expect(group.length).toBeGreaterThan(0);

      for (const item of expectedItems) {
        expect(group).toContain(item);
      }
    }
  );
});
