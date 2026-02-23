import chalk from 'chalk';
import { execa } from 'execa';

/**
 * Installs development dependencies using pnpm.
 * @param deps - Array of dependency names.
 */
export async function installDeps(deps: string[]) {
  console.log(chalk.blue(`\nInstalling dependencies: ${deps.join(', ')}...`));
  try {
    await execa('pnpm', ['add', '-D', ...deps], { stdio: 'inherit' });
    console.log(chalk.green('\n✅ Dependencies installed successfully!'));
  } catch (error) {
    console.error(chalk.red('\n❌ Failed to install dependencies:'), error);
  }
}
