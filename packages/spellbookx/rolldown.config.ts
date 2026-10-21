import { defineConfig } from 'rolldown';

export default defineConfig([
  {
    input: {
      cli: 'src/cli.ts',
      index: 'src/index.ts',
      'commands/index': 'src/commands/index.ts',
      'commands/init': 'src/commands/init.ts',
      'constants/index': 'src/constants/index.ts',
      'constants/theme': 'src/constants/theme.ts',
      'constants/tools': 'src/constants/tools.ts',
      'constants/templates': 'src/constants/templates.ts',
      'lib/index': 'src/lib/index.ts',
      'lib/banner': 'src/lib/banner.ts',
      'lib/detect-pm': 'src/lib/detect-pm.ts',
      'lib/get-install-args': 'src/lib/get-install-args.ts',
      'lib/install-deps': 'src/lib/install-deps.ts',
      'lib/prompt-tools': 'src/lib/prompt-tools.ts',
      'lib/setup-tool': 'src/lib/setup-tool.ts',
      'lib/update-package-json': 'src/lib/update-package-json.ts',
      'lib/write-config': 'src/lib/write-config.ts',
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
