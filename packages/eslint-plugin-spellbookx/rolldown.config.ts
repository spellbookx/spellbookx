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
      types: 'src/types.ts',
      'configs/cspell': 'src/configs/cspell.ts',
      'configs/ignores': 'src/configs/ignores.ts',
      'configs/javascript': 'src/configs/javascript.ts',
      'configs/json': 'src/configs/json.ts',
      'configs/markdown': 'src/configs/markdown.ts',
      'configs/recommended': 'src/configs/recommended.ts',
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
      if (id.startsWith('node:')) return true;
      if (id.startsWith('.') || id.startsWith('/')) return false;
      return true;
    },
  },
]);
