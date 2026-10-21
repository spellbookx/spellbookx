#!/usr/bin/env node
/**
 * @file publish-packages.mjs
 * Publishes all packages in `packages/*` and `@spellbookx/*` to the npmjs registry.
 */

import { execSync } from 'node:child_process';
import process from 'node:process';

// Terminal colors and styling using Unicode escapes
const PURPLE = '\u{1B}[38;2;168;85;247m';
const LIGHT_PURPLE = '\u{1B}[38;2;192;132;252m';
const GREEN = '\u{1B}[32m';
const YELLOW = '\u{1B}[33m';
const RED = '\u{1B}[31m';
const DIM = '\u{1B}[2m';
const BOLD = '\u{1B}[1m';
const RESET = '\u{1B}[0m';

/**
 * Logs a styled header banner to the console.
 */
function logBanner() {
  console.log(`\n${PURPLE}${BOLD}🧙 Spellbookx Monorepo Publisher${RESET}`);
  console.log(`${DIM}${'─'.repeat(50)}${RESET}\n`);
}

/**
 * Checks whether the current user is authenticated on npm.
 *
 * @returns Username if authenticated, or null.
 */
function checkNpmAuth() {
  try {
    const user = execSync('npm whoami', {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
    return user;
  } catch {
    return null;
  }
}

/**
 * Runs a command inheriting stdio and exits on failure.
 *
 * @param command - Command line to execute.
 * @param errorMessage - Message displayed on failure.
 */
function runCommand(command, errorMessage) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`\n${RED}✖ ${errorMessage}${RESET}`);
    process.exit(error.status ?? 1);
  }
}

logBanner();

const rawArgs = process.argv.slice(2);
const isDryRun = rawArgs.includes('--dry-run');
const skipBuild = rawArgs.includes('--skip-build');

// Verify npm login
process.stdout.write(
  `${LIGHT_PURPLE}▶ Checking npm authentication...${RESET} `
);
const npmUser = checkNpmAuth();
if (!npmUser) {
  console.log(`${RED}FAILED${RESET}`);
  console.error(
    `\n${RED}✖ You are not logged into npm.${RESET}\n` +
      `  Please run ${BOLD}npm login${RESET} first and retry.\n`
  );
  process.exit(1);
}
console.log(`${GREEN}Authenticated as ${BOLD}${npmUser}${RESET}\n`);

// Build packages unless explicitly skipped
if (skipBuild) {
  console.log(
    `${YELLOW}⚠ Skipping build step (--skip-build specified).${RESET}\n`
  );
} else {
  console.log(
    `${LIGHT_PURPLE}▶ Building all packages via Turborepo...${RESET}`
  );
  runCommand('pnpm run build', 'Build failed. Aborting publish.');
  console.log(`${GREEN}✔ All packages built successfully.${RESET}\n`);
}

// Construct pnpm publish command
const publishArgs = [
  '--filter "./packages/*"',
  '--filter "./@spellbookx/*"',
  'publish',
  '--access public',
  '--no-git-checks',
];

// Pass through all user flags (e.g. --dry-run, --tag, --otp)
for (const arg of rawArgs) {
  if (arg !== '--skip-build') {
    publishArgs.push(arg);
  }
}

const publishCmd = `pnpm ${publishArgs.join(' ')}`;

const modeMessage = isDryRun
  ? `${YELLOW}${BOLD}🔍 DRY RUN MODE ACTIVATED${RESET} — No packages will actually be published.\n`
  : `${PURPLE}${BOLD}🚀 Publishing packages to npmjs registry...${RESET}\n`;

console.log(modeMessage);
console.log(`${DIM}$ ${publishCmd}${RESET}\n`);
runCommand(publishCmd, 'Publishing encountered an error.');

console.log(
  `\n${GREEN}${BOLD}✔ All targeted packages published successfully! 🧙✨${RESET}\n`
);
