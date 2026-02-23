import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const ASSETS_DIR = path.resolve(__dirname, '../../assets/configs');
export const ROOT_DIR = process.cwd();
