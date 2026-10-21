/**
 * @file prompt-tools.ts
 * Interactive multi-select prompt for selecting Spellbookx tools.
 */

import { checkbox } from '@inquirer/prompts';

import { brand, brandSecondary } from '../constants/theme.js';
import { TOOLS } from '../constants/tools.js';
import type { ToolId } from '../types/index.js';

/**
 * Prompts the user to select which Spellbookx tools to install and configure.
 *
 * @returns Promise resolving to an array of selected ToolId strings.
 */
export async function promptTools(): Promise<ToolId[]> {
  const selected = await checkbox<ToolId>({
    message: `${brand('Select Spellbookx tools')} ${brandSecondary('to install and configure:')}`,
    choices: TOOLS.map((tool) => ({
      name: tool.title,
      value: tool.id,
      checked: tool.defaultChecked,
      description: tool.description,
    })),
  });

  return selected;
}
