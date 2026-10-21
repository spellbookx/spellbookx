#!/usr/bin/env node
/**
 * @file cli.ts
 * Executable entry point for the Spellbookx CLI (`sbx` / `spellbookx`).
 */

import { createProgram } from './index.js';

const program = createProgram();
await program.parseAsync(process.argv);
