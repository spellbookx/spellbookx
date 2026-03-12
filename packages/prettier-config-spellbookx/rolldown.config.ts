import { defineConfig } from 'rolldown';

export default defineConfig([
  {
    input: {
      index: 'src/index.ts',
      types: 'src/types.ts',
      'configs/index': 'src/configs/index.ts',
      'configs/astro-prisma-tailwind': 'src/configs/astro-prisma-tailwind.ts',
      'configs/astro-prisma': 'src/configs/astro-prisma.ts',
      'configs/astro-tailwind': 'src/configs/astro-tailwind.ts',
      'configs/astro': 'src/configs/astro.ts',
      'configs/base': 'src/configs/base.ts',
      'configs/prisma-tailwind': 'src/configs/prisma-tailwind.ts',
      'configs/prisma': 'src/configs/prisma.ts',
      'configs/tailwind': 'src/configs/tailwind.ts',
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
