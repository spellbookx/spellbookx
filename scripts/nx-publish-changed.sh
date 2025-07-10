#!/bin/sh
# nx-publish-changed.sh
# POSIX-compliant script to publish Nx projects that have a version change
# Compares project versions against git tags and runs `nx release publish` only on changed projects
#
# Usage:
#   ./nx-publish-changed.sh
#
# Requirements:
#   - git
#   - jq
#   - pnpm (for pnpm exec nx) or nx globally installed
#
# Automatically attempts to install missing commands if possible (via apt or corepack)

set -eu

log() {
  printf '%s\n' "$*" >&2
}

# Check command availability and optionally install
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

# Verify required tools (adjust install commands per your distro/requirements)
check_command_install git "sudo apt install git -y"
check_command_install jq "sudo apt install jq -y"
check_command_install pnpm "corepack enable && corepack prepare pnpm@latest --activate"

# Detect nx CLI binary
if command -v nx >/dev/null 2>&1; then
  nx_bin="nx"
elif pnpm exec -- nx --version >/dev/null 2>&1; then
  nx_bin="pnpm exec nx"
else
  log "❌ Nx CLI not found. Please install it globally or ensure pnpm can exec it."
  exit 1
fi

# List all Nx projects
projects=$($nx_bin show projects --json | jq -r '.[]')

if [ -z "$projects" ]; then
  log "ℹ️ No projects found."
  exit 0
fi

changed_projects=""

for project in $projects; do
  # Get project root and package.json path
  root_dir=$($nx_bin show project "$project" --json | jq -r '.root')
  pkg_json="$root_dir/package.json"

  if [ ! -f "$pkg_json" ]; then
    log "⏭️ Skipping $project: package.json not found."
    continue
  fi

  pkg_name=$(jq -r '.name' "$pkg_json")
  version=$(jq -r '.version' "$pkg_json")

  tag="$pkg_name@$version"

  # Check if git tag exists for the current version
  if git tag -l | grep -Fxq -- "$tag"; then
    log "✅ Tag exists for $pkg_name version $version. Skipping publish."
  else
    log "🆕 Version change detected for $pkg_name. Scheduling publish."
    changed_projects="$changed_projects $project"
  fi
done

if [ -z "$changed_projects" ]; then
  log "✅ No projects with version changes detected. Nothing to publish."
  exit 0
fi

for project in $changed_projects; do
  log "🚀 Publishing project $project ..."
  $nx_bin release publish --project="$project"
done
