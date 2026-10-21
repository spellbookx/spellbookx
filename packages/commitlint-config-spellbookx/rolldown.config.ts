import { defineConfig } from 'rolldown';

export default defineConfig([
  {
    input: {
      index: 'src/index.ts',
      rules: 'src/rules.ts',
      prompt: 'src/prompt.ts',
      scopes: 'src/scopes.ts',
      'constants/commit-types': 'src/constants/commit-types.ts',
      'lib/index': 'src/lib/index.ts',
      'lib/package-json': 'src/lib/package-json.ts',
      'lib/find-git-root': 'src/lib/find-git-root.ts',
      'lib/get-scope-description': 'src/lib/get-scope-description.ts',
      'lib/get-scopes': 'src/lib/get-scopes.ts',
      'lib/get-workspaces-raw-path': 'src/lib/get-workspaces-raw-path.ts',
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
