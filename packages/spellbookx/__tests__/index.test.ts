import { describe, expect, test } from 'vitest';

import { createProgram } from '../src/index.js';

describe('spellbookx cli program', () => {
  test('should create commander program with spellbookx name and sbx alias', () => {
    const program = createProgram();

    expect(program.name()).toBe('spellbookx');
    expect(program.alias()).toBe('sbx');
  });

  test('should have init subcommand configured', () => {
    const program = createProgram();
    const initCmd = program.commands.find((cmd) => cmd.name() === 'init');

    expect(initCmd).toBeDefined();
    expect(initCmd?.description()).toContain('initialize');
  });

  test('should have version defined', () => {
    const program = createProgram();
    expect(program.version()).toBe('0.11.1');
  });
});
