#!/bin/sh

# ============================================
# pnpm installer (installs pnpm globally)
# - uses official pnpm install script
# ============================================

PNPM_DEFAULT_DIR="$HOME/.local/share/pnpm"

fail() {
  printf "Error: %s\n" "$1" >&2
  exit 1
}

check_if_already_installed() {
  if command -v pnpm >/dev/null 2>&1; then
    printf "pnpm is already installed.\n"
    exit 0
  fi
}

install_pnpm_core() {
  printf "Installing pnpm...\n"

  # Official install method
  # The pnpm install script (install.sh) typically handles its own output and error reporting.
  # We capture the exit status of the piped command using a subshell.
  if ! (curl -fsSL https://get.pnpm.io/install.sh | sh -); then
    fail "Failed to install pnpm using the official script."
  fi

  # After the script runs, pnpm might have modified shell profile files,
  # but the current shell session's PATH might not be updated yet.
  # Attempt to find pnpm in its default installation location and add it to PATH
  # for the current session to allow immediate verification.
  if ! command -v pnpm >/dev/null 2>&1; then
    # Check if the pnpm executable exists in the default location
    if [ -x "$PNPM_DEFAULT_DIR/pnpm" ]; then
      export PATH="$PNPM_DEFAULT_DIR:$PATH"
      printf "Note: Temporarily added %s to PATH for this session.\n" "$PNPM_DEFAULT_DIR"
      printf "You may need to reload your shell or open a new terminal for permanent changes.\n"
    fi
  fi
}

verify_pnpm_installation() {
  # Final verification that pnpm command is available
  if ! command -v pnpm >/dev/null 2>&1; then
    error_message=$(
      cat <<EOF
pnpm installation script ran, but the 'pnpm' command was not found in your PATH.
1. Ensure pnpm's installation directory (commonly '$PNPM_DEFAULT_DIR') is in your PATH.
2. You might need to reload your shell (e.g., 'source ~/.bashrc', 'source ~/.zshrc') or open a new terminal.
3. Check the output of the pnpm installation script for any specific instructions or errors.
EOF
    )
    fail "$error_message"
  fi
}

main() {
  check_if_already_installed
  install_pnpm_core
  verify_pnpm_installation
  printf "pnpm installed successfully.\n"
}

main "$@"
