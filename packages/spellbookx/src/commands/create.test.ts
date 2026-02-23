import assert from 'node:assert';
import { describe, test } from 'node:test';

import esmock from 'esmock';

describe('createAction', () => {
  test('should orchestrate project creation', async () => {
    let degitCalled = false;
    let execaCalled = false;

    const create = await esmock('./create.js', {
      degit: (_src: string, _options: unknown) => {
        degitCalled = true;
        return {
          on: () => {},
          clone: async (dest: string) => {
            assert.strictEqual(dest, 'test-project');
          },
        };
      },
      execa: {
        execa: async (
          _cmd: string,
          args: string[],
          options: { cwd: string }
        ) => {
          execaCalled = true;
          assert.strictEqual(args[0], 'install');
          assert.strictEqual(options.cwd, 'test-project');
        },
      },
      inquirer: {
        prompt: async (_questions: unknown) => {
          return { name: 'test-project', template: 'turborepo-monorepo' };
        },
      },
    });

    await create.createAction('test-project', {
      template: 'turborepo-monorepo',
    });

    assert.strictEqual(degitCalled, true);
    assert.strictEqual(execaCalled, true);
  });
});
