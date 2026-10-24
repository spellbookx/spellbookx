import { describe, expect, it } from 'vitest';

import { getInstallArgs } from '../src/lib/get-install-args.js';

describe('spellbookx (getInstallArgs)', () => {
  const deps = ['eslint', 'prettier'];

  it.each([
    ['pnpm', 'pnpm', ['add', '-D', 'eslint', 'prettier']],
    ['bun', 'bun', ['add', '-d', 'eslint', 'prettier']],
    ['yarn', 'yarn', ['add', '-D', 'eslint', 'prettier']],
    ['npm', 'npm', ['install', '--save-dev', 'eslint', 'prettier']],
  ] as const)(
    'returns expected command and dev-dependency args for "%s"',
    (pm, expectedCommand, expectedArgs) => {
      const result = getInstallArgs(pm, deps);

      expect(result).toEqual({
        command: expectedCommand,
        args: expectedArgs,
      });
    }
  );
});
