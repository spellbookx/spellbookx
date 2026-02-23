/* eslint-disable unicorn/no-process-exit */
import { rm } from 'node:fs/promises';

import chalk from 'chalk';
import degit from 'degit';
import { execa } from 'execa';
import inquirer from 'inquirer';

/**
 * Interface for the repository creation options.
 */
interface CreateOptions {
  name: string;
  template: string;
  owner: string;
}

/**
 * Detects the package manager used to run the CLI.
 * Falls back to 'pnpm' if not detectable.
 */
function detectPackageManager(): string {
  const userAgent = process.env.npm_config_user_agent;
  if (userAgent?.includes('pnpm')) return 'pnpm';
  if (userAgent?.includes('yarn')) return 'yarn';
  if (userAgent?.includes('bun')) return 'bun';
  return 'npm';
}

/**
 * Handles the repository initialization logic.
 */
export async function createAction(
  projectName?: string,
  options: Partial<CreateOptions> = {}
) {
  let name = projectName;
  let template = options.template;
  const owner = options.owner || 'spellbookx';

  if (!name) {
    const response = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?',
        default: 'my-spellbookx-project',
      },
    ]);
    name = response.name;
  }

  if (!name) {
    console.log(chalk.yellow('Operation cancelled.'));
    return;
  }

  if (!template) {
    const response = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'Which template would you like to use?',
        choices: [
          {
            name: 'Turborepo Monorepo (A monorepo setup using Turborepo.)',
            value: 'turborepo-monorepo',
          },
        ],
        default: 'turborepo-monorepo',
      },
    ]);

    template = response.template;
  }

  if (!template) {
    console.log(chalk.yellow('Operation cancelled.'));
    return;
  }

  const pm = detectPackageManager();

  console.log(
    chalk.bold.magenta(
      `\n✨ Initializing new repository "${name}" with template: ${template} ✨\n`
    )
  );

  try {
    const emitter = degit(`${owner}/${template}`, {
      cache: false,
      force: true,
      verbose: true,
    });

    emitter.on('info', (info) => {
      console.log(chalk.blue(info.message));
    });

    await emitter.clone(name);

    console.log(chalk.blue(`\nInstalling dependencies using ${pm}...`));
    await execa(pm, ['install'], {
      cwd: name,
      stdio: 'inherit',
    });

    console.log(
      chalk.bold.green(`\n✅ Repository successfully created in "${name}"!`)
    );
    console.log('\nNext steps:');
    console.log(chalk.cyan(`  cd ${name}`));
    console.log(chalk.cyan(`  ${pm === 'npm' ? 'npm run dev' : `${pm} dev`}`));
    console.log();
  } catch (error: unknown) {
    console.error(chalk.red('\n❌ Failed to create repository.'));

    // Cleanup if directory was created but process failed
    if (name) {
      try {
        await rm(name, { recursive: true, force: true });
        console.log(chalk.yellow(`Cleaned up directory "${name}".`));
      } catch (cleanupError: unknown) {
        console.error(chalk.red('Could not clean up directory.'));
        if (cleanupError instanceof Error) {
          console.error(chalk.red(cleanupError.message));
        }
      }
    }

    if (error instanceof Error) {
      if (error.message.includes('could not find')) {
        console.error(
          chalk.red(
            `Template "${template}" was not found in the ${owner} organization.`
          )
        );
      } else {
        console.error(chalk.red(error.message));
      }
    }
    process.exit(1);
  }
}
