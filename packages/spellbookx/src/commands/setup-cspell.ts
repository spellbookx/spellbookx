import { installDeps } from '../utils/install-deps.js';
import { TOOL_DEPENDENCIES } from '../utils/tool-dependencies.js';
import { writeConfig } from '../utils/write-config.js';

/**
 * Sets up CSpell.
 */
export async function setupCspell() {
  const configContent = `const config = require('cspell-config-spellbookx');

module.exports = config;
`;
  writeConfig('cspell.config.cjs', configContent);
  await installDeps(TOOL_DEPENDENCIES.cspell);
}
