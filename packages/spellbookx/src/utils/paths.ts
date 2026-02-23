import { fileURLToPath } from 'node:url';

export const ASSETS_DIR = fileURLToPath(
  new URL('../../assets/configs', import.meta.url)
);
export const ROOT_DIR = process.cwd();
