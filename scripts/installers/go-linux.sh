#!/bin/sh

# ==========================
# Go installer with:
# - dependency checks & installation orchestration
# - uninstall prompt if Go detected
# - latest Go version detection via node-jq
# - automatic PATH update to /usr/local/go/bin
# ==========================

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
UNINSTALLER="$SCRIPT_DIR/../uninstallers/go-linux.sh"
DEPENDENCIES="curl wget tar node pnpm"

INSTALL_DIR="/usr/local"
GO_DIR="$INSTALL_DIR/go"
TEMP_DIR=$(mktemp -d)

fail() {
  printf "Error: %s\n" "$1" >&2
  rm -rf "$TEMP_DIR"
  exit 1
}

check_dependency() {
  dep=$1
  if ! command -v "$dep" >/dev/null 2>&1; then
    printf "Missing required tool: %s\n" "$dep"
    return 1
  fi
  return 0
}

install_dependency() {
  dep=$1
  installer_script="$SCRIPT_DIR/installers/$dep-linux.sh"
  if [ -x "$installer_script" ]; then
    printf "Installing missing dependency '%s' via %s...\n" "$dep" "$installer_script"
    sh "$installer_script" || fail "Failed to install $dep"
  else
    fail "Installer script for $dep not found: $installer_script"
  fi
}

ensure_dependencies() {
  for dep in $DEPENDENCIES; do
    check_dependency "$dep" || install_dependency "$dep"
  done
}

detect_go() {
  if command -v go >/dev/null 2>&1 || [ -d "$GO_DIR" ]; then
    printf "Detected existing Go installation.\n"
    printf "Do you want to uninstall it? [y/N] "
    read -r ans
    case "$ans" in
    y | Y)
      if [ -f "$UNINSTALLER" ]; then
        # shellcheck source=../uninstallers/go-linux.sh
        . "$UNINSTALLER"
        if ! go_uninstall; then
          fail "Failed to uninstall the existing Go version. Please check errors above."
        fi
      else
        fail "Uninstaller not found at $UNINSTALLER"
      fi
      ;;
    *)
      fail "Installation aborted by user."
      ;;
    esac
  fi
}

fetch_latest_go_version() {
  printf "Fetching latest Go version information...\n"

  GO_VERSION=$(curl -s "https://go.dev/dl/?mode=json" | pnpm dlx node-jq -r '.[0].version')

  if [ -z "$GO_VERSION" ]; then
    fail "Failed to determine latest Go version."
  fi

  GO_VERSION_NUMBER="${GO_VERSION#go}"
  TAR_NAME="${GO_VERSION}.linux-amd64.tar.gz"
  DOWNLOAD_URL="https://go.dev/dl/${TAR_NAME}"
}

download_and_install_go() {
  printf "Downloading %s...\n" "$TAR_NAME"
  if ! wget -P "$TEMP_DIR" "$DOWNLOAD_URL"; then
    fail "Download failed."
  fi

  printf "Removing any existing Go installation in %s...\n" "$GO_DIR"
  sudo rm -rf "$GO_DIR"

  printf "Extracting Go to %s...\n" "$INSTALL_DIR"
  if ! sudo tar -C "$INSTALL_DIR" -xzf "$TEMP_DIR/$TAR_NAME"; then
    fail "Extraction failed."
  fi

  printf "Go %s installed successfully.\n" "$GO_VERSION_NUMBER"
}

add_path_to_profile() {
  GO_PATH="/usr/local/go/bin"
  EXPORT_LINE="export PATH=\$PATH:$GO_PATH"

  case "$SHELL" in
  */bash)
    PROFILE="$HOME/.bashrc"
    ;;
  */zsh)
    PROFILE="$HOME/.zshrc"
    ;;
  */fish)
    printf "Please add %s to your fish shell PATH manually.\n" "$GO_PATH"
    return 1
    ;;
  *)
    PROFILE="$HOME/.profile"
    ;;
  esac

  if ! grep -qF "$GO_PATH" "$PROFILE" 2>/dev/null; then
    printf "\n# Added by spellbookx go installer\n%s\n" "$EXPORT_LINE" >>"$PROFILE"
    printf "Added %s to PATH in %s\n" "$GO_PATH" "$PROFILE"
    printf "Please reload your shell or run: source %s\n" "$PROFILE"
  else
    printf "%s is already in PATH (checked in %s)\n" "$GO_PATH" "$PROFILE"
  fi
}

cleanup() {
  rm -rf "$TEMP_DIR"
}

main() {
  ensure_dependencies
  detect_go
  fetch_latest_go_version
  download_and_install_go
  add_path_to_profile
  cleanup
}

main "$@"
