import { describe, expect, test } from 'vitest';

import {
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
  test('separator constants should be empty string', () => {
    expect(separator).toBe('');
    expect(newline).toBe('');
    expect(nl).toBe('');
    expect(imports.separator).toBe('');
    expect(imports.nl).toBe('');
    expect(imports.newline).toBe('');
  });

  test('dotenv group should contain dotenv and dotenvx', () => {
    expect(dotenv).toContain('@dotenvx/dotenvx');
    expect(dotenv).toContain('dotenv');
  });

  test('sideEffects and env groups should contain expected tokens', () => {
    expect(sideEffects).toContain(String.raw`^\u0000`);
    expect(env).toContain('@env');
  });

  test('builtinModules should contain node built-ins and node: prefix', () => {
    expect(builtinModules).toContain('fs');
    expect(builtinModules).toContain('path');
    expect(builtinModules).toContain('node:');
  });

  test('frameworks and libraries should be populated', () => {
    expect(backendFrameworks).toContain('express');
    expect(backendMiddlewares).toContain('cors');
    expect(uiFrameworks).toContain('react');
    expect(uiFrameworks).toContain('svelte');
    expect(reactPackages).toContain('react-dom');
    expect(fullstackFrameworks).toContain('next');
    expect(reactNativeExpo).toContain('expo');
    expect(stateManagement).toContain('zustand');
    expect(dataFetching).toContain('axios');
    expect(uiLibraries).toContain('@mui');
    expect(cssInJs).toContain('clsx');
    expect(icons).toContain('lucide');
    expect(testing).toContain('vitest');
    expect(thirdParty).toContain('<THIRD_PARTY_MODULES>');
    expect(monorepo).toContain('@org/');
    expect(internalAliases).toContain('@/');
    expect(assets.length).toBeGreaterThan(0);
    expect(json.length).toBeGreaterThan(0);
    expect(styles.length).toBeGreaterThan(0);
    expect(relative).toContain('../');
  });

  test('imports dictionary should reference all individual groups', () => {
    expect(imports.assets).toBe(assets);
    expect(imports.backendFrameworks).toBe(backendFrameworks);
    expect(imports.backendMiddlewares).toBe(backendMiddlewares);
    expect(imports.builtinModules).toBe(builtinModules);
    expect(imports.cssInJs).toBe(cssInJs);
    expect(imports.dataFetching).toBe(dataFetching);
    expect(imports.dotenv).toBe(dotenv);
    expect(imports.env).toBe(env);
    expect(imports.fullstackFrameworks).toBe(fullstackFrameworks);
    expect(imports.icons).toBe(icons);
    expect(imports.internalAliases).toBe(internalAliases);
    expect(imports.json).toBe(json);
    expect(imports.monorepo).toBe(monorepo);
    expect(imports.reactNativeExpo).toBe(reactNativeExpo);
    expect(imports.reactPackages).toBe(reactPackages);
    expect(imports.relative).toBe(relative);
    expect(imports.sideEffects).toBe(sideEffects);
    expect(imports.stateManagement).toBe(stateManagement);
    expect(imports.styles).toBe(styles);
    expect(imports.testing).toBe(testing);
    expect(imports.thirdParty).toBe(thirdParty);
    expect(imports.uiFrameworks).toBe(uiFrameworks);
    expect(imports.uiLibraries).toBe(uiLibraries);
  });
});
