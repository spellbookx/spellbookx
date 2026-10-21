import { defineConfig } from 'rolldown';

const esmBanner = `
import { fileURLToPath as _fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { createRequire as _createRequire } from 'node:module';

const __filename = _fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = _createRequire(import.meta.url);
`;

export default defineConfig([
  {
    input: {
      index: 'src/index.ts',
      'lib/index': 'src/lib/index.ts',
      'lib/package-json': 'src/lib/package-json.ts',
      'lib/define-imports': 'src/lib/define-imports.ts',
      'configs/all': 'src/configs/all.ts',
      'configs/astro': 'src/configs/astro.ts',
      'configs/base': 'src/configs/base.ts',
      'configs/cspell': 'src/configs/cspell.ts',
      'configs/ignores': 'src/configs/ignores.ts',
      'configs/javascript': 'src/configs/javascript.ts',
      'configs/json': 'src/configs/json.ts',
      'configs/markdown': 'src/configs/markdown.ts',
      'configs/node': 'src/configs/node.ts',
      'configs/prettier': 'src/configs/prettier.ts',
      'configs/react': 'src/configs/react.ts',
      'configs/recommended': 'src/configs/recommended.ts',
      'configs/recommended-spellcheck': 'src/configs/recommended-spellcheck.ts',
      'configs/strict': 'src/configs/strict.ts',
      'configs/svelte': 'src/configs/svelte.ts',
      'configs/vuoto': 'src/configs/vuoto.ts',
    },
    output: {
      format: 'esm',
      dir: 'dist',
      entryFileNames: '[name].js',
      chunkFileNames: '[name]-[hash].js',
      assetFileNames: '[name]-[hash][extname]',
      banner: esmBanner,
    },
    platform: 'node',
    external: (id) => {
      return (
        id.startsWith('node:') || !(id.startsWith('.') || id.startsWith('/'))
      );
    },
  },
]);
