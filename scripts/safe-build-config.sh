#!/bin/sh

set -eu

# Find and rename all eslint.config.mjs → eslint.config.mjs.bak
echo "🔁 Backing up all eslint.config.mjs files..."
find . -type f -name 'eslint.config.mjs' | while IFS= read -r file; do
  mv "$file" "$file.bak"
done

echo "🚧 Building @spellbookx/eslint-config..."
if pnpm exec nx run-many -t build --projects=tag:type:config; then
  echo "✅ Build succeeded. Restoring eslint.config.mjs files..."
  find . -type f -name 'eslint.config.mjs.bak' | while IFS= read -r file; do
    mv "$file" "${file%.bak}"
  done
  echo "🏁 Done."
  exit 0
else
  echo "❌ Build failed. Leaving eslint.config.mjs.bak files in place."
  exit 1
fi
