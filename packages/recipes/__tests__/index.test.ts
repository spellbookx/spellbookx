import { describe, expect, it } from 'vitest';

import * as subpathIgnores from '../src/ignores/index.js';
import * as subpathImports from '../src/imports/index.js';
import defaultExport, { ignores, imports, recipes } from '../src/index.js';

describe('@spellbookx/recipes (root index)', () => {
  it('bundles both ignores and imports in the default export', () => {
    expect(defaultExport).toBe(recipes);
    expect(defaultExport.ignores).toBe(ignores);
    expect(defaultExport.imports).toBe(imports);
  });

  it('exposes a named recipes export matching the default export', () => {
    expect(recipes).toEqual({
      ignores,
      imports,
    });
  });

  it('re-exports the imports dictionary matching the ./imports subpath', () => {
    expect(imports).toBeDefined();
    expect(imports).toBe(subpathImports.imports);
    expect(imports).toBe(subpathImports.default);
  });

  it('re-exports the ignores dictionary matching the ./ignores subpath', () => {
    expect(ignores).toBeDefined();
    expect(ignores).toBe(subpathIgnores.ignores);
    expect(ignores).toBe(subpathIgnores.default);
  });
});
