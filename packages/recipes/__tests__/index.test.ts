import { describe, expect, test } from 'vitest';

import * as subpathIgnores from '../src/ignores/index.js';
import * as subpathImports from '../src/imports/index.js';
import defaultExport, { ignores, imports, recipes } from '../src/index.js';

describe('@spellbookx/recipes (root index)', () => {
  test('default export should bundle both ignores and imports in a single object', () => {
    expect(defaultExport).toBe(recipes);
    expect(defaultExport.ignores).toBe(ignores);
    expect(defaultExport.imports).toBe(imports);
  });

  test('recipes named export should match default export', () => {
    expect(recipes).toEqual({
      ignores,
      imports,
    });
  });

  test('root exports should expose imports dictionary matching subpath', () => {
    expect(imports).toBeDefined();
    expect(imports).toEqual(subpathImports.imports);
    expect(imports).toEqual(subpathImports.default);
  });

  test('root exports should expose ignores dictionary matching subpath', () => {
    expect(ignores).toBeDefined();
    expect(ignores).toEqual(subpathIgnores.ignores);
    expect(ignores).toEqual(subpathIgnores.default);
  });
});
