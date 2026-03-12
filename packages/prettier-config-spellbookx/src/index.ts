import type { Config } from 'prettier';

import {
  astro,
  astroPrisma,
  astroPrismaTailwind,
  astroTailwind,
  base,
  prisma,
  prismaTailwind,
  tailwind,
} from './configs/index.js';
import type { SbxPrettierConfig } from './types.js';

const configs: Record<SbxPrettierConfig, Config> = {
  base: base,
  astro: astro,
  'astro-prisma': astroPrisma,
  'astro-tailwind': astroTailwind,
  'astro-prisma-tailwind': astroPrismaTailwind,
  tailwind: tailwind,
  prisma: prisma,
  'prisma-tailwind': prismaTailwind,
};

export default configs;
