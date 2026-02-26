import chalk from 'chalk';
import { execa } from 'execa';

/**
 * Package managers supported.
 */
export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

/**
 * Installs dependencies using the specified package manager.
 * @param deps - Array of dependency names.
 * @param options - Installation options.
 * @param options.pkgManager - The package manager to use.
 * @param options.isGlobal - Whether to install globally.
 * @param options.isDev - Whether to install as a dev dependency.
 */
export async function installDeps(
  deps: string[],
  options: {
    pkgManager?: PackageManager;
    isGlobal?: boolean;
    isDev?: boolean;
  } = {}
) {
  const { pkgManager = 'pnpm', isGlobal = false, isDev = true } = options;

  console.log(
    chalk.blue(
      `\nInstalling ${isGlobal ? 'global ' : ''}dependencies: ${deps.join(
        ', '
      )} using ${pkgManager}...`
    )
  );

  const args: string[] = [];

  if (isGlobal) {
    if (pkgManager === 'yarn') {
      args.push('global', 'add', ...deps);
    } else {
      args.push('install', '-g', ...deps);
    }
  } else {
    if (pkgManager === 'npm') {
      args.push('install', isDev ? '--save-dev' : '--save', ...deps);
    } else if (pkgManager === 'pnpm') {
      args.push(
        'add',
        isDev ? '-D' : '',
        '--ignore-workspace-root-check',
        ...deps
      );
    } else {
      args.push('add', isDev ? '-D' : '', ...deps);
    }
  }

  // Filter out empty strings from args if any (e.g., if isDev is false and we added an empty string)
  const cleanArgs = args.filter(Boolean);

  try {
    await execa(pkgManager, cleanArgs, { stdio: 'inherit' });
    console.log(
      chalk.green(
        `\n✅ ${isGlobal ? 'Global dependencies' : 'Dependencies'} installed successfully!`
      )
    );
  } catch (error) {
    console.error(
      chalk.red(
        `\n❌ Failed to install ${isGlobal ? 'global ' : ''}dependencies:`
      ),
      error
    );
  }
}
