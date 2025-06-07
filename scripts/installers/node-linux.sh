#!/bin/sh

# ============================================
# Node.js installer (via pnpm + .nvmrc)
# - requires pnpm to be already installed
# - reads Node version from .nvmrc
# - installs Node using: pnpm env use --global
# ============================================

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
ROOT_DIR=$(realpath "$SCRIPT_DIR/../../")
NVMRC="$ROOT_DIR/.nvmrc"

fail() {
  printf "Error: %s\n" "$1" >&2
  exit 1
}

check_pnpm() {
  if ! command -v pnpm >/dev/null 2>&1; then
    fail "pnpm is required but not found. Please install pnpm first."
  fi
}

read_node_version() {
  if [ ! -f "$NVMRC" ]; then
    fail ".nvmrc file not found at $NVMRC"
  fi

  NODE_VERSION=$(tr -d '\r\n' <"$NVMRC")
  if [ -z "$NODE_VERSION" ]; then
    fail ".nvmrc file is empty or invalid."
  fi
}

install_node() {
  printf "Installing Node.js %s using pnpm...\n" "$NODE_VERSION"

  if ! pnpm env use --global "$NODE_VERSION"; then
    fail "pnpm failed to install Node.js $NODE_VERSION"
  fi

  printf "Node.js %s installed successfully.\n" "$NODE_VERSION"
}

check_pnpm
read_node_version
install_node
