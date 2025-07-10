#!/bin/sh
# release-affected.sh
# POSIX-compliant script to detect Nx workspace projects with version changes,
# run `nx release version` accordingly, commit, and optionally push changes.
#
# It:
# - Detects affected Nx projects based on git diff between origin/main and HEAD
# - Checks if project tags exist and decides if a first release flag is needed
# - Runs Nx release version command with appropriate flags
# - Commits version bumps with a conventional commit message
# - Pushes commits only if running in a CI environment (e.g., CI=true)
#
# Usage:
#   ./release-affected.sh
#
# Requirements:
#   - git
#   - jq
#   - pnpm (with nx available globally or via pnpm exec)
#
# Automatically attempts to install missing commands where possible (apt/corepack).
#
# Note:
#   Ensure that your git environment is configured properly for push,
#   and that NX CLI is installed or accessible via pnpm exec.

set -eu

namespace="@spellbookx"

# Get directory of the current script
script_path="$(dirname -- "$0")"
cd "$script_path"
script_dir="$(pwd)"

# Log helper
log() {
  printf '%s\n' "$*" >&2
}

# Check command availability and optionally install it
check_command_install() {
  cmd="$1"
  install_cmd="${2:-}"

  if ! command -v "$cmd" >/dev/null 2>&1; then
    if [ -n "$install_cmd" ]; then
      log "⚙️ Installing missing command '$cmd'..."
      if sh -c "$install_cmd"; then
        log "✅ Installed '$cmd' successfully."
      else
        log "❌ Failed to install '$cmd'. Aborting."
        exit 1
      fi
    else
      log "❌ Required command not found: $cmd and no install command specified."
      exit 1
    fi
  fi
}

# Check mandatory dependencies
check_command_install git "sudo apt install git -y"
check_command_install jq "sudo apt install jq -y"
check_command_install pnpm "corepack enable && corepack prepare pnpm@latest --activate"

tag_exists() {
  tag="$1"
  git tag | grep -Fx -- "$tag" >/dev/null
}

get_project_version() {
  proj_name="$1"
  pkg_json=$("$nx_bin" show project "$proj_name" --json | jq -r '.root')/package.json
  if [ -f "$pkg_json" ]; then
    jq -r '.version' "$pkg_json"
  else
    echo "0.0.0"
  fi
}

# Step 0: Detect Nx executable (global or pnpm exec)
if command -v nx >/dev/null 2>&1; then
  nx_bin="nx"
elif pnpm exec -- nx --version >/dev/null 2>&1; then
  nx_bin="pnpm exec nx"
else
  log "❌ Nx CLI not found. Please install it globally or ensure pnpm can exec it."
  exit 1
fi

# Step 1: Sync existing tags
log "🔃 Running sync-tags.sh..."
# shellcheck source=./sync-tags.sh disable=SC1091
. "$script_dir/sync-tags.sh"

# Step 2: Get affected projects
log "🔍 Detecting affected projects..."
affected_projects=$($nx_bin show projects --affected --base=origin/main --head=HEAD | jq -r '.[]')

[ -z "$affected_projects" ] && {
  log "✅ No affected projects detected."
  exit 0
}

project_args=""
needs_first_release=0

# Step 3: Check each affected project for version and tag presence
for project in $affected_projects; do
  pkg_json=$($nx_bin show project "$project" --json | jq -r '.root')/package.json
  [ ! -f "$pkg_json" ] && continue

  name=$(jq -r '.name' "$pkg_json")
  case "$name" in
  "$namespace"/*) ;; # Only process packages in the namespace
  *)
    log "⏭️ Skipping $name (not in $namespace)"
    continue
    ;;
  esac

  version=$(jq -r '.version' "$pkg_json")
  tag="$name@$version"

  if ! tag_exists "$tag"; then
    log "🆕 First release detected for $name"
    needs_first_release=1
  fi

  project_args="$project_args --project=$project"
done

[ -z "$project_args" ] && {
  log "✅ No eligible projects to version."
  exit 0
}

# Step 4: Run Nx version release command with optional --first-release flag
log "🚀 Running version command with Nx..."
if [ "$needs_first_release" -eq 1 ]; then
  # shellcheck disable=SC2086
  eval "$nx_bin release version --first-release $project_args"
else
  # shellcheck disable=SC2086
  eval "$nx_bin release version $project_args"
fi

# Step 5: Commit and push version changes if any
if ! git diff --quiet; then
  log "💾 Committing version changes..."

  git add .

  # Commit message: conventional commits style for version bump
  git commit -m "chore(release): bump versions of affected projects"

  # Push only if running in CI (common env var), otherwise skip push
  if [ "${CI:-}" = "true" ]; then
    current_branch=$(git rev-parse --abbrev-ref HEAD)
    log "🚀 Pushing changes to origin/$current_branch..."
    git push origin "$current_branch"
    log "✅ Changes pushed."
  else
    log "ℹ️ Local run detected. Skipping git push."
  fi
else
  log "ℹ️ No changes to commit."
fi
