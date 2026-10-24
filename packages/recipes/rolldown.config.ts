import { defineConfig } from 'rolldown';

export default defineConfig([
  {
    input: {
      index: 'src/index.ts',
      'imports/index': 'src/imports/index.ts',
      'ignores/index': 'src/ignores/index.ts',
    },
    output: {
      format: 'esm',
      dir: 'dist',
      entryFileNames: '[name].js',
      chunkFileNames: '[name]-[hash].js',
      assetFileNames: '[name]-[hash][extname]',
    },
    platform: 'node',
  },
]);
