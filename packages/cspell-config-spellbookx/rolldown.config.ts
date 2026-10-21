import { defineConfig } from 'rolldown';

export default defineConfig([
  {
    input: {
      index: 'src/index.ts',
      config: 'src/config.ts',
      'constants/index': 'src/constants/index.ts',
      'constants/dictionaries': 'src/constants/dictionaries.ts',
      'constants/ignore-paths': 'src/constants/ignore-paths.ts',
      'constants/words': 'src/constants/words.ts',
      'lib/index': 'src/lib/index.ts',
      'lib/define-sbx-config': 'src/lib/define-sbx-config.ts',
      'lib/merge-cspell-configs': 'src/lib/merge-cspell-configs.ts',
      'lib/normalize-words': 'src/lib/normalize-words.ts',
      'lib/package-json': 'src/lib/package-json.ts',
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
