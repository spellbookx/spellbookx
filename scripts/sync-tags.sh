#!/bin/sh
# sync-tags.sh
# POSIX-compliant script to sync Git tags for Nx workspace projects under the "@spellbookx" namespace.
#
# Features:
# - Scans PNPM workspace packages
# - Explicitly ignores the package and tag "@spellbookx/source"
# - Checks for missing Git tags in the format "@spellbookx/pkg@version" and creates/pushes them
# - Compares local package versions against the published npm versions
# - Updates package.json version if it differs from npm and commits the change
# - Commits and pushes Git tags and version updates automatically
#
# Usage:
#   ./sync-tags.sh
#
# Requirements:
#   - git
#   - jq
#   - pnpm
#   - npm
#
# Prerequisites:
#   - Git configured with push access to remote origin
#   - Packages published to npm matching the namespace and package names
#
# Note:
#   The package/tag "@spellbookx/source" is excluded from all operations.

set -eu

namespace="@spellbookx"

log() {
  printf '%s\n' "$*" >&2
}

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

# Check mandatory dependencies with install attempts where applicable
check_command_install git "sudo apt install git -y"
check_command_install jq "sudo apt install jq -y"
check_command_install pnpm "corepack enable && corepack prepare pnpm@latest --activate"

get_latest_npm_tag() {
  pkg_name="$1"
  npm view "$pkg_name" version 2>/dev/null || echo "0.0.0"
}

tag_exists() {
  tag="$1"
  git tag | grep -Fx -- "$tag" >/dev/null
}

create_and_push_tag() {
  tag="$1"
  commit_sha=$(git rev-parse HEAD)
  git tag "$tag" "$commit_sha"
  git push origin "$tag"
  log "✅ Created and pushed Git tag: $tag"
}

update_package_json_version() {
  file="$1"
  new_version="$2"
  tmp_file="${file}.tmp"
  jq --arg v "$new_version" '.version = $v' "$file" >"$tmp_file" && mv "$tmp_file" "$file"
}

log "🔍 Scanning PNPM workspace packages..."

pnpm m ls --json --depth=-1 | jq -c '.[]' | while read -r line; do
  name=$(echo "$line" | jq -r '.name')
  path=$(echo "$line" | jq -r '.path')

  # Skip non-namespaced packages
  case "$name" in
  "$namespace"/*) ;;
  *)
    log "⏭️ Skipping $name (not in $namespace)"
    continue
    ;;
  esac

  # Explicitly exclude @spellbookx/source package
  if [ "$name" = "$namespace/source" ]; then
    log "⏭️ Skipping excluded package $name"
    continue
  fi

  pkg_json="$path/package.json"
  [ ! -f "$pkg_json" ] && continue

  version=$(jq -r '.version' "$pkg_json")

  if [ "$version" = "0.0.0" ]; then
    log "⏭️ Skipping $name (version 0.0.0)"
    continue
  fi

  # Extract the short package name (after namespace)
  pkg_short=$(printf "%s\n" "$name" | sed "s|^$namespace/||")
  tag="$namespace/$pkg_short@$version"

  # Skip the tag @spellbookx/source@version explicitly
  if [ "$tag" = "$namespace/source@$version" ]; then
    log "⏭️ Skipping excluded tag $tag"
    continue
  fi

  # Check if Git tag exists
  if tag_exists "$tag"; then
    log "✔️ Git tag exists: $tag"
  else
    log "🔖 Creating missing Git tag: $tag"
    create_and_push_tag "$tag"
  fi

  # Compare with published npm version
  published_version=$(get_latest_npm_tag "$name")
  if [ "$published_version" = "$version" ]; then
    log "✔️ NPM version matches for $name: $version"
  else
    log "⚠️ Version mismatch: local=$version vs npm=$published_version"
    log "🔁 Updating $name to $published_version"

    update_package_json_version "$pkg_json" "$published_version"
    git add "$pkg_json"
    git commit -m "chore: sync $name version to $published_version"

    new_tag="$namespace/$pkg_short@$published_version"
    create_and_push_tag "$new_tag"
  fi
done

log "🏁 Done syncing tags."
