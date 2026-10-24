import { describe, expect, it } from 'vitest';

import {
  COLORS,
  createProgram,
  packageJson,
  TOOLS,
  TOOLS_MAP,
  WIZARD_EMOJI,
} from '../src/index.js';

describe('spellbookx (CLI program & exports)', () => {
  it('creates a Commander program named "spellbookx" with alias "sbx"', () => {
    const program = createProgram();

    expect(program.name()).toBe('spellbookx');
    expect(program.alias()).toBe('sbx');
    expect(program.version()).toBe(packageJson.version);
  });

  it('registers the "init" subcommand with --pm, --skip-install, and --tools options', () => {
    const program = createProgram();
    const initCmd = program.commands.find((cmd) => cmd.name() === 'init');

    expect(initCmd).toBeDefined();
    expect(initCmd?.description()).toContain('initialize');

    const optionFlags = initCmd?.options.map((opt) => opt.long);
    expect(optionFlags).toEqual(
      expect.arrayContaining(['--pm', '--skip-install', '--tools'])
    );
  });

  it('exposes tool definitions, theme constants, and package metadata', () => {
    expect(WIZARD_EMOJI).toBe('🧙');
    expect(COLORS.primary).toBeDefined();
    expect(TOOLS).toHaveLength(4);
    expect(Object.keys(TOOLS_MAP)).toEqual([
      'cspell',
      'commitlint',
      'eslint',
      'prettier',
    ]);
  });
});
