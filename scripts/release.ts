#!/usr/bin/env node
/**
 * @file scripts/release.ts
 * Automated release pipeline for Spellbookx Monorepo.
 *
 * Automates:
 * - Pre-flight validations (git clean, remote branch sync, node engine)
 * - npm authentication and permissions verification (npm whoami & maintainer ownership)
 * - Automatic Changeset generation (no user prompts needed)
 * - Version bump via changeset version
 * - Verification that bumped version > npm registry version
 * - Package builds via Turborepo
 * - Conventional Git commit, annotated tag, and git push
 * - npm publishing with topological dependency order
 * - Comprehensive color-coded terminal reporting with emojis
 */

import { execSync, spawnSync } from 'node:child_process';
import {
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import process from 'node:process';

// ============================================================================
// ANSI Styling & Emojis
// ============================================================================

const c = {
  reset: '\u{1B}[0m',
  bold: '\u{1B}[1m',
  dim: '\u{1B}[2m',
  italic: '\u{1B}[3m',
  underline: '\u{1B}[4m',

  // Foreground colors
  black: '\u{1B}[30m',
  red: '\u{1B}[31m',
  green: '\u{1B}[32m',
  yellow: '\u{1B}[33m',
  blue: '\u{1B}[34m',
  magenta: '\u{1B}[35m',
  cyan: '\u{1B}[36m',
  white: '\u{1B}[37m',

  // Bright foreground colors
  brightRed: '\u{1B}[91m',
  brightGreen: '\u{1B}[92m',
  brightYellow: '\u{1B}[93m',
  brightBlue: '\u{1B}[94m',
  brightMagenta: '\u{1B}[95m',
  brightCyan: '\u{1B}[96m',

  // Hex / RGB custom colors
  purple: '\u{1B}[38;2;168;85;247m',
  lavender: '\u{1B}[38;2;192;132;252m',
  gold: '\u{1B}[38;2;251;191;36m',
  emerald: '\u{1B}[38;2;52;211;153m',
  coral: '\u{1B}[38;2;248;113;113m',
};

const bold = (text: string): string => `${c.bold}${text}${c.reset}`;
const dim = (text: string): string => `${c.dim}${text}${c.reset}`;
const green = (text: string): string => `${c.emerald}${text}${c.reset}`;
const red = (text: string): string => `${c.coral}${text}${c.reset}`;
const yellow = (text: string): string => `${c.gold}${text}${c.reset}`;
const cyan = (text: string): string => `${c.brightCyan}${text}${c.reset}`;

/**
 * Prints the main header banner to the console.
 */
function logBanner(): void {
  console.log(
    `\n${c.purple}${c.bold}╔════════════════════════════════════════════════════════════════════════╗${c.reset}`
  );
  console.log(
    `${c.purple}${c.bold}║       🧙  SPELLBOOKX AUTOMATED RELEASE & PUBLISH PIPELINE  🚀         ║${c.reset}`
  );
  console.log(
    `${c.purple}${c.bold}╚════════════════════════════════════════════════════════════════════════╝${c.reset}\n`
  );
}

/**
 * Logs a major release pipeline step.
 *
 * @param current - Current step number.
 * @param total - Total steps.
 * @param title - Descriptive heading for this phase.
 * @param emoji - Decorative emoji.
 */
function logStep(
  current: number,
  total: number,
  title: string,
  emoji = '⚡'
): void {
  console.log(
    `\n${c.lavender}${c.bold}[${current}/${total}] ${emoji}  ${title.toUpperCase()}${c.reset}`
  );
  console.log(`${dim('─'.repeat(72))}`);
}

/**
 * Logs a success message.
 *
 * @param msg - Success message text.
 */
function logSuccess(msg: string): void {
  console.log(`  ${green('✔')} ${msg}`);
}

/**
 * Logs an informational message.
 *
 * @param msg - Info message text.
 */
function logInfo(msg: string): void {
  console.log(`  ${cyan('ℹ')} ${msg}`);
}

/**
 * Logs a warning message.
 *
 * @param msg - Warning message text.
 */
function logWarn(msg: string): void {
  console.log(`  ${yellow('⚠')} ${msg}`);
}

/**
 * Logs an error message.
 *
 * @param msg - Error message text.
 */
function logError(msg: string): void {
  console.error(`  ${red('✖')} ${msg}`);
}

// ============================================================================
// Types & Interfaces
// ============================================================================

type BumpType = 'patch' | 'minor' | 'major';

interface CliOptions {
  bump: BumpType;
  dryRun: boolean;
  skipBuild: boolean;
  skipGit: boolean;
  skipPublish: boolean;
  allowDirty: boolean;
  tag: string;
  otp?: string;
  summary?: string;
}

interface WorkspacePackage {
  name: string;
  version: string;
  directory: string;
  relativeDir: string;
  private: boolean;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

interface NpmRegistryInfo {
  exists: boolean;
  isUnpublished?: boolean;
  latestVersion?: string;
  maintainers: string[];
}

interface SemVer {
  major: number;
  minor: number;
  patch: number;
  prerelease: (string | number)[];
}

// ============================================================================
// SemVer Helpers (Zero external dependency)
// ============================================================================

/**
 * Parses a semantic version string into structured numeric parts.
 *
 * @param version - Semver string to parse.
 * @returns Parsed SemVer structure or null if invalid.
 */
function parseSemVer(version: string): SemVer | null {
  const clean = version.trim().replace(/^v/, '');
  const semverRegex =
    /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+([0-9A-Za-z.-]+))?$/;
  const match = semverRegex.exec(clean);
  if (!match) return null;

  const major = Number(match[1]);
  const minor = Number(match[2]);
  const patch = Number(match[3]);
  const prereleaseRaw = match[4];

  const prerelease = prereleaseRaw
    ? prereleaseRaw.split('.').map((part) => {
        const num = Number(part);
        return Number.isNaN(num) ? part : num;
      })
    : [];

  return { major, minor, patch, prerelease };
}

/**
 * Compares two semantic version strings according to SemVer 2.0.0.
 *
 * @param a - First version string.
 * @param b - Second version string.
 * @returns 1 if a > b, -1 if a < b, 0 if equal.
 */
function compareSemVer(a: string, b: string): number {
  const parsedA = parseSemVer(a);
  const parsedB = parseSemVer(b);

  if (!parsedA || !parsedB) {
    throw new Error(`Invalid semver comparison: '${a}' vs '${b}'`);
  }

  if (parsedA.major !== parsedB.major)
    return parsedA.major > parsedB.major ? 1 : -1;
  if (parsedA.minor !== parsedB.minor)
    return parsedA.minor > parsedB.minor ? 1 : -1;
  if (parsedA.patch !== parsedB.patch)
    return parsedA.patch > parsedB.patch ? 1 : -1;

  if (parsedA.prerelease.length === 0 && parsedB.prerelease.length > 0)
    return 1;
  if (parsedA.prerelease.length > 0 && parsedB.prerelease.length === 0)
    return -1;
  if (parsedA.prerelease.length === 0 && parsedB.prerelease.length === 0)
    return 0;

  const minLen = Math.min(parsedA.prerelease.length, parsedB.prerelease.length);
  for (let i = 0; i < minLen; i++) {
    const idA = parsedA.prerelease[i];
    const idB = parsedB.prerelease[i];
    if (idA === idB) continue;
    const isNumA = typeof idA === 'number';
    const isNumB = typeof idB === 'number';
    if (isNumA && !isNumB) return -1;
    if (!isNumA && isNumB) return 1;
    return idA > idB ? 1 : -1;
  }

  if (parsedA.prerelease.length !== parsedB.prerelease.length) {
    return parsedA.prerelease.length > parsedB.prerelease.length ? 1 : -1;
  }

  return 0;
}

/**
 * Checks whether version a is strictly greater than version b.
 *
 * @param newVer - Prospective version.
 * @param currentVer - Baseline version.
 * @returns True if newVer > currentVer.
 */
function isSemVerGreaterThan(newVer: string, currentVer: string): boolean {
  return compareSemVer(newVer, currentVer) > 0;
}

// ============================================================================
// Command Execution Helpers
// ============================================================================

/**
 * Executes a shell command synchronously and returns standard output trimmed.
 *
 * @param cmd - Shell command string.
 * @param options - Execution options.
 * @param options.stdio - Stream configuration.
 * @param options.cwd - Custom working directory.
 * @returns Trimmed output string.
 */
function exec(
  cmd: string,
  options: { stdio?: 'inherit' | 'pipe' | 'ignore'; cwd?: string } = {}
): string {
  try {
    const res = execSync(cmd, {
      cwd: options.cwd ?? process.cwd(),
      encoding: 'utf8',
      stdio: options.stdio ?? 'pipe',
    });
    return res ? res.trim() : '';
  } catch (error: unknown) {
    const err = error as { stderr?: Buffer; stdout?: Buffer; message: string };
    const message =
      err.stderr?.toString() || err.stdout?.toString() || err.message;
    throw new Error(`Command failed: ${cmd}\n${message}`, { cause: error });
  }
}

/**
 * Spawns a shell command with inherited stdio and verifies zero exit status.
 *
 * @param cmd - Shell command string.
 * @param cwd - Target working directory.
 */
function runInherited(cmd: string, cwd = process.cwd()): void {
  const result = spawnSync(cmd, {
    shell: true,
    cwd,
    stdio: 'inherit',
  });
  if (result.status !== 0) {
    throw new Error(`Command failed with exit code ${result.status}: ${cmd}`);
  }
}

// ============================================================================
// CLI Argument Parsing
// ============================================================================

/**
 * Prints pipeline usage guidelines and available flags.
 */
function printHelp(): void {
  console.log(`
${c.purple}${c.bold}Usage:${c.reset}
  pnpm exec tsx scripts/release.ts [options]
  node scripts/release.ts [options]

${c.purple}${c.bold}Options:${c.reset}
  ${cyan('--bump <patch|minor|major>')}   Version bump level if no changeset exists (default: patch)
  ${cyan('--patch')}                       Shortcut for --bump patch
  ${cyan('--minor')}                       Shortcut for --bump minor
  ${cyan('--major')}                       Shortcut for --bump major
  ${cyan('-m, --summary <text>')}          Summary message for the automatic changeset
  ${cyan('-d, --dry-run')}                 Simulate checks, bump, build & publish without modifying remote git or npm
  ${cyan('--tag <name>')}                  npm dist-tag to publish to (default: latest)
  ${cyan('--otp <code>')}                  npm 2FA One-Time Password for publish
  ${cyan('--skip-build')}                  Skip running package builds
  ${cyan('--skip-git')}                    Skip git commit, tag, and push steps
  ${cyan('--skip-publish')}                Skip publishing packages to npmjs
  ${cyan('--allow-dirty')}                 Allow running with uncommitted git changes (warning: not recommended)
  ${cyan('-h, --help')}                    Display this help message
`);
}

/**
 * Parses command-line arguments into structured CliOptions.
 *
 * @param argv - Process argv array.
 * @returns Parsed CLI options.
 */
function parseCliArgs(argv: string[]): CliOptions {
  const args = argv.slice(2);
  const options: CliOptions = {
    bump: 'patch',
    dryRun: false,
    skipBuild: false,
    skipGit: false,
    skipPublish: false,
    allowDirty: false,
    tag: 'latest',
  };

  /**
   * Processes a single argument at index.
   *
   * @param index - Index in argv slice.
   * @returns Next argument index to process.
   */
  function handleArg(index: number): number {
    const arg = args[index];
    if (arg === '-h' || arg === '--help') {
      printHelp();
      process.exit(0);
    }
    switch (arg) {
      case '-d':
      case '--dry-run': {
        options.dryRun = true;
        return index + 1;
      }
      case '--skip-build': {
        options.skipBuild = true;
        return index + 1;
      }
      case '--skip-git': {
        options.skipGit = true;
        return index + 1;
      }
      case '--skip-publish': {
        options.skipPublish = true;
        return index + 1;
      }
      case '--allow-dirty': {
        options.allowDirty = true;
        return index + 1;
      }
      case '--patch': {
        options.bump = 'patch';
        return index + 1;
      }
      case '--minor': {
        options.bump = 'minor';
        return index + 1;
      }
      case '--major': {
        options.bump = 'major';
        return index + 1;
      }
      case '--bump': {
        const val = args[index + 1]?.toLowerCase();
        if (val && ['patch', 'minor', 'major'].includes(val)) {
          options.bump = val as BumpType;
        } else {
          logError(
            `Invalid --bump value: "${val}". Must be patch, minor, or major.`
          );
          process.exit(1);
        }
        return index + 2;
      }
      case '-m':
      case '--summary': {
        options.summary = args[index + 1];
        return index + 2;
      }
      case '--tag': {
        options.tag = args[index + 1] || 'latest';
        return index + 2;
      }
      case '--otp': {
        options.otp = args[index + 1];
        return index + 2;
      }
      default: {
        return index + 1;
      }
    }
  }

  let i = 0;
  while (i < args.length) {
    i = handleArg(i);
  }

  return options;
}

// ============================================================================
// Workspace & Package Discovery
// ============================================================================

/**
 * Scans workspace directories to find all packages and their metadata.
 *
 * @param root - Workspace root directory.
 * @returns Array of discovered workspace packages.
 */
function findWorkspacePackages(root: string): WorkspacePackage[] {
  const searchDirs = ['packages', '@spellbookx'];
  const packages: WorkspacePackage[] = [];

  for (const base of searchDirs) {
    const baseDir = path.join(root, base);
    if (!existsSync(baseDir)) continue;

    const entries = readdirSync(baseDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const pkgJsonPath = path.join(baseDir, entry.name, 'package.json');
      if (!existsSync(pkgJsonPath)) continue;

      try {
        const pkgContent = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
        const isPrivate = Boolean(pkgContent.private);

        packages.push({
          name: pkgContent.name,
          version: pkgContent.version,
          directory: path.join(baseDir, entry.name),
          relativeDir: path.join(base, entry.name),
          private: isPrivate,
          dependencies: pkgContent.dependencies || {},
          devDependencies: pkgContent.devDependencies || {},
        });
      } catch (error: unknown) {
        const err = error as Error;
        logWarn(
          `Could not parse package.json at ${pkgJsonPath}: ${err.message}`
        );
      }
    }
  }

  return packages;
}

/**
 * Topologically sorts packages so internal dependencies are published first.
 *
 * @param packages - Unsorted list of workspace packages.
 * @returns Sorted packages ordered by dependency resolution.
 */
function sortPackagesTopologically(
  packages: WorkspacePackage[]
): WorkspacePackage[] {
  const pkgMap = new Map<string, WorkspacePackage>(
    packages.map((p) => [p.name, p])
  );
  const visited = new Set<string>();
  const sorted: WorkspacePackage[] = [];

  /**
   * Depth-first traversal helper.
   *
   * @param pkg - Current package node.
   */
  function visit(pkg: WorkspacePackage): void {
    if (visited.has(pkg.name)) return;
    visited.add(pkg.name);

    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
    for (const depName of Object.keys(allDeps)) {
      const match = pkgMap.get(depName);
      if (match) {
        visit(match);
      }
    }
    sorted.push(pkg);
  }

  for (const pkg of packages) {
    visit(pkg);
  }

  return sorted;
}

// ============================================================================
// NPM Registry & Authentication Checks
// ============================================================================

/**
 * Checks npm authentication using `npm whoami`.
 *
 * @returns Logged in npm username.
 */
function checkNpmWhoami(): string {
  try {
    const user = exec(
      'npm whoami --registry https://registry.npmjs.org/'
    ).trim();
    if (!user || user.includes('npm error')) {
      throw new Error('npm whoami returned empty or invalid response');
    }
    return user;
  } catch (error: unknown) {
    const err = error as Error;
    logError('npm authentication check failed!');
    console.error(
      `\n  ${red('Reason:')} You are not authenticated with the npm registry or your token is invalid.\n` +
        `  ${yellow('Fix:')} Ensure your ${bold('NPM_TOKEN')} environment variable is set or run ${bold('npm login')}.\n` +
        `  ${dim(err.message)}\n`
    );
    throw new Error('npm authentication failure', { cause: error });
  }
}

/**
 * Fetches package details from npm registry.
 *
 * @param pkgName - Package name on npm registry.
 * @returns Registry metadata, maintainers, and publication status.
 */
async function fetchNpmRegistryInfo(pkgName: string): Promise<NpmRegistryInfo> {
  const url = `https://registry.npmjs.org/${encodeURIComponent(pkgName)}`;
  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.status === 404) {
      return { exists: false, maintainers: [] };
    }

    if (!response.ok) {
      throw new Error(`Registry responded with HTTP ${response.status}`);
    }

    const data = (await response.json()) as {
      maintainers?: Array<string | { name: string }>;
      time?: { unpublished?: unknown };
      'dist-tags'?: { latest?: string };
    };

    const isUnpublished = Boolean(
      data.time?.unpublished || !data['dist-tags']?.latest
    );
    const latestVersion = isUnpublished ? undefined : data['dist-tags']?.latest;
    const maintainers = Array.isArray(data.maintainers)
      ? data.maintainers.map((m) =>
          (typeof m === 'string' ? m : m.name).toLowerCase()
        )
      : [];

    return {
      exists: !isUnpublished,
      isUnpublished,
      latestVersion,
      maintainers,
    };
  } catch {
    try {
      const latest = exec(`npm view "${pkgName}" version --json`);
      const ownersRaw = exec(`npm owner ls "${pkgName}" 2>/dev/null || true`);
      const owners = ownersRaw
        .split('\n')
        .map((line) => line.trim().split(' ', 1)[0]?.toLowerCase())
        .filter(Boolean);

      return {
        exists: true,
        latestVersion: JSON.parse(latest),
        maintainers: owners,
      };
    } catch {
      return { exists: false, isUnpublished: true, maintainers: [] };
    }
  }
}

// ============================================================================
// Automated Changeset Generator
// ============================================================================

/**
 * Reads pending unreleased changeset files in .changeset.
 *
 * @param root - Workspace root directory.
 * @returns List of unreleased changeset filenames.
 */
function getPendingChangesets(root: string): string[] {
  const changesetDir = path.join(root, '.changeset');
  if (!existsSync(changesetDir)) return [];

  const files = readdirSync(changesetDir);
  return files.filter(
    (f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md'
  );
}

/**
 * Writes an automatic changeset markdown file for all packages.
 *
 * @param root - Workspace root.
 * @param packages - Publishable packages.
 * @param bumpType - Bump level (patch, minor, major).
 * @param summary - Changeset summary message.
 * @returns Created changeset file path.
 */
function createAutomaticChangeset(
  root: string,
  packages: WorkspacePackage[],
  bumpType: BumpType,
  summary: string
): string {
  const changesetDir = path.join(root, '.changeset');
  const filename = `auto-${Date.now()}.md`;
  const filePath = path.join(changesetDir, filename);

  const frontmatter = packages
    .filter((pkg) => !pkg.private)
    .map((pkg) => `'${pkg.name}': ${bumpType}`)
    .join('\n');

  const content = `---\n${frontmatter}\n---\n\n${summary}\n`;
  writeFileSync(filePath, content, 'utf8');

  return filePath;
}

// ============================================================================
// Main Release Workflow
// ============================================================================

/**
 * Orchestrates the full automated release pipeline.
 */
async function main(): Promise<void> {
  const rootDir = process.cwd();
  const options = parseCliArgs(process.argv);
  const totalSteps = 7;

  logBanner();

  if (options.dryRun) {
    console.log(
      `  ${yellow(bold('⚡ DRY-RUN MODE ACTIVE'))}: No changes will be pushed to git or published to npm.\n`
    );
  }

  // --------------------------------------------------------------------------
  // STEP 1: Pre-flight checks (Git & Node environment)
  // --------------------------------------------------------------------------
  logStep(1, totalSteps, 'Pre-flight Environment Validations', '🔍');

  const nodeVersion = process.versions.node;
  const majorNode = Number(nodeVersion.split('.', 1)[0]);
  if (majorNode < 24) {
    logError(`Node.js >= 24 is required. Current version: v${nodeVersion}`);
    process.exit(1);
  }
  logSuccess(`Node.js version check passed: v${nodeVersion}`);

  try {
    exec('git rev-parse --is-inside-work-tree');
  } catch {
    logError(
      'Not inside a Git repository. Pipeline must be executed at repository root.'
    );
    process.exit(1);
  }

  const gitStatus = exec('git status --porcelain');
  if (gitStatus.length > 0 && !options.allowDirty) {
    logError('Git working directory has uncommitted changes!');
    console.error(`\n${dim(gitStatus)}\n`);
    console.error(
      `  ${yellow('Fix:')} Commit or stash changes before releasing, or pass ${bold('--allow-dirty')}.\n`
    );
    process.exit(1);
  }
  logSuccess('Git working directory is clean');

  const currentBranch = exec('git rev-parse --abbrev-ref HEAD');
  logInfo(`Current Git branch: ${bold(currentBranch)}`);
  if (currentBranch !== 'main') {
    logWarn(
      `You are on branch "${currentBranch}", not "main". Proceeding with release from current branch.`
    );
  }

  try {
    const remoteUrl = exec('git remote get-url origin');
    logSuccess(`Git remote origin verified: ${dim(remoteUrl)}`);
  } catch {
    logError('Git remote "origin" is not configured.');
    process.exit(1);
  }

  try {
    exec('git fetch origin');
    const behindCount = exec(
      `git rev-list --count HEAD..origin/${currentBranch} 2>/dev/null || echo 0`
    );
    if (Number(behindCount) > 0) {
      logError(
        `Local branch "${currentBranch}" is behind remote origin by ${behindCount} commit(s)!`
      );
      console.error(
        `  ${yellow('Fix:')} Run 'git pull origin ${currentBranch}' before publishing.\n`
      );
      process.exit(1);
    }
    logSuccess('Local branch is up to date with remote origin');
  } catch (error: unknown) {
    const err = error as Error;
    logWarn(`Could not verify remote sync status: ${err.message}`);
  }

  // --------------------------------------------------------------------------
  // STEP 2: NPM Authentication & Package Access Verification
  // --------------------------------------------------------------------------
  logStep(2, totalSteps, 'NPM Authentication & Permissions Verification', '🔐');

  const npmUser = checkNpmWhoami();
  logSuccess(`Authenticated on npmjs as user: ${bold(green(npmUser))}`);

  const allPackages = findWorkspacePackages(rootDir);
  const publishablePackages = sortPackagesTopologically(
    allPackages.filter((p) => !p.private)
  );

  if (publishablePackages.length === 0) {
    logError('No publishable packages found in workspace!');
    process.exit(1);
  }

  logInfo(
    `Found ${bold(String(publishablePackages.length))} publishable package(s) in monorepo:`
  );
  for (const pkg of publishablePackages) {
    console.log(
      `    ${dim('•')} ${bold(pkg.name)} ${dim(`(${pkg.relativeDir})`)} - current v${pkg.version}`
    );
  }

  logInfo('Verifying npm owner / collaborator permissions...');
  const initialRegistryInfo = new Map<string, NpmRegistryInfo>();

  for (const pkg of publishablePackages) {
    const regInfo = await fetchNpmRegistryInfo(pkg.name);
    initialRegistryInfo.set(pkg.name, regInfo);

    if (regInfo.exists && regInfo.maintainers.length > 0) {
      const isOwner = regInfo.maintainers.includes(npmUser.toLowerCase());
      if (!isOwner) {
        logError(
          `Permission denied: user "${npmUser}" is NOT in the maintainer list for package "${pkg.name}"!`
        );
        console.error(
          `    ${dim('Current owners:')} ${regInfo.maintainers.join(', ')}`
        );
        process.exit(1);
      }
      logSuccess(
        `${bold(pkg.name)}: Verified owner permissions for ${green(npmUser)} (registry v${regInfo.latestVersion})`
      );
    } else if (regInfo.isUnpublished) {
      logInfo(
        `${bold(pkg.name)}: Package is unpublished on npm registry ${cyan('(will be published as new release)')}`
      );
    } else {
      logInfo(
        `${bold(pkg.name)}: Package does not exist on npm registry yet ${cyan('(First release)')}`
      );
    }
  }

  // --------------------------------------------------------------------------
  // STEP 3: Automated Changeset & Version Bump
  // --------------------------------------------------------------------------
  logStep(3, totalSteps, 'Automated Changeset Generation & Version Bump', '📦');

  const existingChangesets = getPendingChangesets(rootDir);
  let createdChangesetPath: string | null = null;

  if (existingChangesets.length > 0) {
    logInfo(
      `Found ${bold(String(existingChangesets.length))} existing pending changeset(s):`
    );
    for (const file of existingChangesets) {
      console.log(`    ${dim('•')} ${file}`);
    }
  } else {
    const defaultSummary =
      options.summary ||
      `chore(release): automated ${options.bump} release bump`;
    createdChangesetPath = createAutomaticChangeset(
      rootDir,
      publishablePackages,
      options.bump,
      defaultSummary
    );
    logSuccess(
      `Created automated changeset without user input: ${cyan(createdChangesetPath.replace(rootDir, ''))} (${bold(options.bump)})`
    );
  }

  logInfo('Executing changeset version bump...');
  try {
    exec('pnpm exec changeset version');
    logSuccess('Changeset version bump executed successfully');
  } catch (error: unknown) {
    const err = error as Error;
    logError(`Changeset version bump failed: ${err.message}`);
    if (createdChangesetPath && existsSync(createdChangesetPath)) {
      rmSync(createdChangesetPath, { force: true });
    }
    process.exit(1);
  }

  const updatedPackages = findWorkspacePackages(rootDir).filter(
    (p) => !p.private
  );
  const updatedMap = new Map(updatedPackages.map((p) => [p.name, p.version]));

  const versionBumps: {
    name: string;
    oldVersion: string;
    newVersion: string;
  }[] = [];
  for (const pkg of publishablePackages) {
    const newVersion = updatedMap.get(pkg.name) || pkg.version;
    versionBumps.push({
      name: pkg.name,
      oldVersion: pkg.version,
      newVersion,
    });
  }

  const primaryVersion = versionBumps[0]?.newVersion;
  logSuccess(`Packages updated to version: ${bold(green(primaryVersion))}`);
  for (const bump of versionBumps) {
    console.log(
      `    ${dim('•')} ${bold(bump.name)}: ${dim(`v${bump.oldVersion}`)} ➜ ${bold(green(`v${bump.newVersion}`))}`
    );
  }

  // --------------------------------------------------------------------------
  // STEP 4: Registry Version Comparison (Bump MUST be > npm registry)
  // --------------------------------------------------------------------------
  logStep(
    4,
    totalSteps,
    'Validation: Bumped Version > npmjs Registry Version',
    '⚖️'
  );

  let isVersionComparisonFailed = false;

  for (const bump of versionBumps) {
    const regInfo = initialRegistryInfo.get(bump.name);

    if (regInfo && regInfo.exists && regInfo.latestVersion) {
      const isGreater = isSemVerGreaterThan(
        bump.newVersion,
        regInfo.latestVersion
      );

      if (isGreater) {
        logSuccess(
          `${bold(bump.name)}: local v${bump.newVersion} is strictly greater than npm v${regInfo.latestVersion} ` +
            `${green('(valid release)')}`
        );
      } else {
        logError(
          `Version bump check FAILED for "${bump.name}": ` +
            `bumped version (v${bump.newVersion}) is NOT greater than npm registry version (v${regInfo.latestVersion})!`
        );
        isVersionComparisonFailed = true;
      }
    } else {
      logSuccess(
        `${bold(bump.name)}: v${bump.newVersion} is a new/unpublished package on npm registry ${cyan('(first release)')}`
      );
    }
  }

  if (isVersionComparisonFailed) {
    logError(
      'Aborting release because one or more packages do not have a version strictly greater than npmjs!'
    );
    if (options.dryRun) {
      logWarn('Reverting version changes due to dry-run...');
      exec(
        'git checkout -- packages @spellbookx CHANGELOG.md 2>/dev/null || true'
      );
      if (createdChangesetPath && existsSync(createdChangesetPath))
        rmSync(createdChangesetPath, { force: true });
    }
    process.exit(1);
  }

  // --------------------------------------------------------------------------
  // STEP 5: Build Packages
  // --------------------------------------------------------------------------
  logStep(5, totalSteps, 'Building Packages via Turborepo', '🏗️');

  if (options.skipBuild) {
    logWarn('Skipping package build step (--skip-build specified)');
  } else {
    logInfo('Running "pnpm run build"...');
    try {
      runInherited('pnpm run build', rootDir);
      logSuccess('All packages built successfully');
    } catch (error: unknown) {
      const err = error as Error;
      logError(`Build failed: ${err.message}`);
      if (options.dryRun) {
        exec(
          'git checkout -- packages @spellbookx CHANGELOG.md 2>/dev/null || true'
        );
      }
      process.exit(1);
    }

    for (const pkg of publishablePackages) {
      const distDir = path.join(pkg.directory, 'dist');
      if (existsSync(distDir) && readdirSync(distDir).length > 0) {
        continue;
      }

      logError(
        `Package "${pkg.name}" build verification failed: dist directory is missing or empty!`
      );
      process.exit(1);
    }
    logSuccess(
      'Artifact verification passed for all packages (dist/ verified)'
    );
  }

  // --------------------------------------------------------------------------
  // STEP 6: Git Commit, Tag & Push
  // --------------------------------------------------------------------------
  logStep(6, totalSteps, 'Git Commit, Tag & Remote Push', '🏷️');

  const gitTagName = `v${primaryVersion}`;

  const existingLocalTag = exec(`git tag -l "${gitTagName}"`);
  if (existingLocalTag) {
    logError(`Git tag "${gitTagName}" already exists locally!`);
    process.exit(1);
  }

  const existingRemoteTag = exec(
    `git ls-remote origin "refs/tags/${gitTagName}" 2>/dev/null || true`
  );
  if (existingRemoteTag) {
    logError(`Git tag "${gitTagName}" already exists on remote origin!`);
    process.exit(1);
  }

  if (options.skipGit) {
    logWarn('Skipping git commit, tag, and push (--skip-git specified)');
  } else if (options.dryRun) {
    logInfo(
      `[DRY-RUN] Would stage changes and commit: ${bold(`chore(release): bump to ${gitTagName}`)}`
    );
    logInfo(`[DRY-RUN] Would create annotated git tag: ${bold(gitTagName)}`);
    logInfo(
      `[DRY-RUN] Would push commit and tag "${gitTagName}" to origin/${currentBranch}`
    );
  } else {
    logInfo('Staging modified version and changelog files...');
    exec('git add .');

    const commitMsg = `chore(release): bump to ${gitTagName}`;
    logInfo(`Committing changes: "${commitMsg}"...`);
    exec(`git commit -m "${commitMsg}"`);
    logSuccess('Git commit created');

    logInfo(`Creating annotated Git tag: "${gitTagName}"...`);
    exec(`git tag -a "${gitTagName}" -m "Release ${gitTagName}"`);
    logSuccess(`Git tag "${gitTagName}" created successfully`);

    logInfo(
      `Pushing commit and tag "${gitTagName}" to origin/${currentBranch}...`
    );
    try {
      exec(`git push origin "${currentBranch}"`);
      exec(`git push origin "${gitTagName}"`);
      logSuccess(
        `Pushed commit and tag "${gitTagName}" to origin/${currentBranch}`
      );
    } catch (error: unknown) {
      const err = error as Error;
      logError(`Failed to push to remote git: ${err.message}`);
      process.exit(1);
    }
  }

  // --------------------------------------------------------------------------
  // STEP 7: Publish Packages to npmjs
  // --------------------------------------------------------------------------
  logStep(7, totalSteps, 'Publishing Packages to npmjs Registry', '🚀');

  const publishResults: {
    name: string;
    version: string;
    success: boolean;
    reason?: string;
  }[] = [];

  for (const pkg of publishablePackages) {
    const targetVersion = updatedMap.get(pkg.name) || pkg.version;
    logInfo(`Publishing ${bold(pkg.name)}@${bold(targetVersion)} to npmjs...`);

    const publishCmdParts = [
      'pnpm',
      `--filter "${pkg.name}"`,
      'publish',
      '--access public',
      '--no-git-checks',
      `--tag ${options.tag}`,
    ];

    if (options.otp) {
      publishCmdParts.push(`--otp ${options.otp}`);
    }

    if (options.dryRun) {
      publishCmdParts.push('--dry-run');
    }

    const publishCmd = publishCmdParts.join(' ');
    logInfo(`Executing: ${dim(publishCmd)}`);

    if (options.skipPublish) {
      logWarn(`Skipped publishing ${pkg.name} (--skip-publish specified)`);
      publishResults.push({
        name: pkg.name,
        version: targetVersion,
        success: true,
        reason: 'skipped',
      });
      continue;
    }

    try {
      exec(publishCmd, { stdio: 'inherit', cwd: rootDir });
      logSuccess(
        `Successfully published ${bold(green(`${pkg.name}@${targetVersion}`))}`
      );
      publishResults.push({
        name: pkg.name,
        version: targetVersion,
        success: true,
      });
    } catch (error: unknown) {
      const err = error as Error;
      logError(
        `Failed to publish ${pkg.name}@${targetVersion}: ${err.message}`
      );
      publishResults.push({
        name: pkg.name,
        version: targetVersion,
        success: false,
        reason: err.message,
      });
      if (!options.dryRun) {
        logError('Halting remaining publishes due to failure.');
        break;
      }
    }
  }

  // --------------------------------------------------------------------------
  // Summary & Cleanup
  // --------------------------------------------------------------------------
  if (options.dryRun) {
    logInfo('Cleaning up temporary version bumps created for dry-run...');
    exec(
      'git checkout -- packages @spellbookx CHANGELOG.md 2>/dev/null || true'
    );
    if (createdChangesetPath && existsSync(createdChangesetPath)) {
      rmSync(createdChangesetPath, { force: true });
    }
    logSuccess('Working directory cleaned and restored to previous state.');
  }

  console.log(
    `\n${c.purple}${c.bold}╔════════════════════════════════════════════════════════════════════════╗${c.reset}`
  );
  console.log(
    `${c.purple}${c.bold}║                           RELEASE SUMMARY                              ║${c.reset}`
  );
  console.log(
    `${c.purple}${c.bold}╚════════════════════════════════════════════════════════════════════════╝${c.reset}\n`
  );

  console.log(
    `  ${bold('Package Name'.padEnd(35))} ${bold('Version'.padEnd(14))} ${bold('Status')}`
  );
  console.log(`  ${dim('─'.repeat(65))}`);

  for (const res of publishResults) {
    const statusText = res.success
      ? options.dryRun
        ? yellow('SIMULATED (dry-run)')
        : green('PUBLISHED')
      : red('FAILED');
    console.log(
      `  ${res.name.padEnd(35)} v${res.version.padEnd(13)} ${statusText}`
    );
  }

  const isAllSucceeded = publishResults.every((r) => r.success);

  if (isAllSucceeded) {
    const actionWord = options.dryRun ? 'simulated' : 'published';
    console.log(
      `\n${green(bold(`🎉 All packages ${actionWord} successfully at version ${gitTagName}! 🧙✨`))}\n`
    );
  } else {
    console.log(
      `\n${red(bold('❌ Release finished with errors. Review the logs above.'))}\n`
    );
    process.exit(1);
  }
}

void main().catch((error: unknown) => {
  const err = error as Error;
  logError(`Unhandled release pipeline error: ${err.message}`);
  process.exit(1);
});
