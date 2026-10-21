import { describe, expect, test } from 'vitest';

import { getInstallArgs } from '../src/lib/get-install-args.js';

describe('getInstallArgs', () => {
  const deps = ['eslint', 'prettier'];

  test('should return correct args for pnpm', () => {
    const res = getInstallArgs('pnpm', deps);
    expect(res.command).toBe('pnpm');
    expect(res.args).toEqual(['add', '-D', 'eslint', 'prettier']);
  });

  test('should return correct args for bun', () => {
    const res = getInstallArgs('bun', deps);
    expect(res.command).toBe('bun');
    expect(res.args).toEqual(['add', '-d', 'eslint', 'prettier']);
  });

  test('should return correct args for yarn', () => {
    const res = getInstallArgs('yarn', deps);
    expect(res.command).toBe('yarn');
    expect(res.args).toEqual(['add', '-D', 'eslint', 'prettier']);
  });

  test('should return correct args for npm', () => {
    const res = getInstallArgs('npm', deps);
    expect(res.command).toBe('npm');
    expect(res.args).toEqual(['install', '--save-dev', 'eslint', 'prettier']);
  });
});
