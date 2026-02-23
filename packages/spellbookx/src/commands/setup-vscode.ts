import { copyAsset } from '../utils/copy-asset.js';

/**
 * Sets up VS Code configuration.
 */
export async function setupVscode() {
  copyAsset('vscode/extensions.json', '.vscode/extensions.json');
  copyAsset('vscode/settings.json', '.vscode/settings.json');
}
