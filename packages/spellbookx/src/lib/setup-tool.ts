/**
 * @file setup-tool.ts
 * Configures an individual tool by writing files and updating package.json.
 */

import { TOOLS_MAP } from '../constants/tools.js';
import type { ToolId } from '../types/index.js';
import { didUpdatePackageJson } from './update-package-json.js';
import { hasWrittenConfigFile } from './write-config.js';

export interface SetupToolOptions {
  cwd?: string;
  overwrite?: boolean;
}

export interface SetupToolResult {
  toolId: ToolId;
  createdFiles: string[];
}

/**
 * Executes file generation and package.json configuration for a single tool.
 *
 * @param toolId - The tool to configure ('cspell', 'commitlint', 'eslint', 'prettier').
 * @param options - Options specifying target directory and file overwrite behavior.
 * @returns Result object containing toolId and list of files created.
 */
export function setupTool(
  toolId: ToolId,
  options: SetupToolOptions = {}
): SetupToolResult {
  const tool = TOOLS_MAP[toolId];
  if (!tool) {
    throw new Error(`Unknown tool: ${toolId}`);
  }

  const createdFiles: string[] = [];

  for (const file of tool.configFiles) {
    const written = hasWrittenConfigFile(file.path, file.content, options);
    if (written) {
      createdFiles.push(file.path);
    }
  }

  if (tool.scripts || tool.extraPackageJson) {
    didUpdatePackageJson({
      cwd: options.cwd,
      scripts: tool.scripts,
      extra: tool.extraPackageJson,
    });
  }

  return {
    toolId,
    createdFiles,
  };
}
