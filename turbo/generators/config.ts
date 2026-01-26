import type { PlopTypes } from '@turbo/gen';

/**
 * Turbo generator configuration for creating new Node libraries.
 *
 * @param plop - The Plop API instance.
 */
export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('node-lib', {
    description: 'Generates a new Node library with Vite',
    prompts: [
      {
        type: 'input',
        name: 'directory',
        message:
          'The name of the directory that will be created inside packages (e.g. spellbookx-node-lib):',
        validate: (input: string) => {
          if (input.includes(' ')) return 'The name cannot contain spaces';
          if (!input) return 'The directory name is required';
          return true;
        },
      },
      {
        type: 'input',
        name: 'name',
        message: 'Library name (e.g. @spellbookx/node-lib):',
        validate: (input: string) => {
          if (input.includes(' ')) return 'The name cannot contain spaces';
          if (!input) return 'The name is required';
          return true;
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'Library description (e.g. Spellbookx Node library for...):',
        validate: (input: string) => {
          if (!input) return 'The description is required';
          return true;
        },
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'packages/{{name}}',
        base: 'templates/node-lib',
        templateFiles: 'templates/node-lib/**',
      },
    ],
  });
}
