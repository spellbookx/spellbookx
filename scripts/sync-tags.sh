#!/bin/sh
set -eu

namespace="@spellbookx"

log() {
  printf '%s\n' "$*" >&2
}

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
