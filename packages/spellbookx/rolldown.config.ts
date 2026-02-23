import { defineConfig } from 'rolldown';

const esmBanner = `
import { fileURLToPath as _fileURLToPath } from 'node:url';
import { dirname as _dirname } from 'node:path';
import { createRequire as _createRequire } from 'node:module';

const __filename = _fileURLToPath(import.meta.url);
const __dirname = _dirname(__filename);
const require = _createRequire(import.meta.url);
`;

export default defineConfig([
  {
    input: 'src/index.ts',
    output: {
      format: 'esm',
      dir: 'dist',
      entryFileNames: '[name].js',
      chunkFileNames: '[name]-[hash].js',
      assetFileNames: '[name]-[hash][extname]',
      banner: esmBanner,
    },
    platform: 'node',
  },
]);
