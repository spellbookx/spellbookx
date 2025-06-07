#!/bin/sh

# ==========================
# Go installer with:
# - dependency checks & installation orchestration
# - uninstall prompt if Go detected
# - latest Go version detection via node-jq
# - automatic PATH + GOPATH + GOCACHE setup
# ==========================

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
UNINSTALLER="$SCRIPT_DIR/../uninstallers/go-linux.sh"
DEPENDENCIES="curl wget tar node pnpm"

INSTALL_DIR="/usr/local"
GO_DIR="$INSTALL_DIR/go"
TEMP_DIR=$(mktemp -d)

CUSTOM_GOPATH="/opt/gomod"
CUSTOM_GOCACHE="/opt/gocache"

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
            fail "Failed to uninstall existing Go version."
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
  printf "Fetching latest Go version...\n"
  GO_VERSION=$(curl -s "https://go.dev/dl/?mode=json" | pnpm dlx node-jq -r '.[0].version')
  [ -z "$GO_VERSION" ] && fail "Failed to determine latest Go version."

  GO_VERSION_NUMBER="${GO_VERSION#go}"
  TAR_NAME="${GO_VERSION}.linux-amd64.tar.gz"
  DOWNLOAD_URL="https://go.dev/dl/${TAR_NAME}"
}

download_and_install_go() {
  printf "Downloading %s...\n" "$TAR_NAME"
  wget -P "$TEMP_DIR" "$DOWNLOAD_URL" || fail "Download failed."

  printf "Removing existing Go installation in %s...\n" "$GO_DIR"
  sudo rm -rf "$GO_DIR"

  printf "Extracting Go to %s...\n" "$INSTALL_DIR"
  sudo tar -C "$INSTALL_DIR" -xzf "$TEMP_DIR/$TAR_NAME" || fail "Extraction failed."

  printf "Go %s installed successfully.\n" "$GO_VERSION_NUMBER"
}

setup_go_environment() {
  printf "Setting up GOPATH and GOCACHE directories...\n"
  sudo mkdir -p "$CUSTOM_GOPATH" "$CUSTOM_GOCACHE"
  sudo chown -R "$USER":"$USER" "$CUSTOM_GOPATH" "$CUSTOM_GOCACHE"

  GOPATH_LINE="export GOPATH=$CUSTOM_GOPATH"
  GOCACHE_LINE="export GOCACHE=$CUSTOM_GOCACHE"
  PATH_LINE="export PATH=\$PATH:$GO_DIR/bin:$CUSTOM_GOPATH/bin"

  case "$SHELL" in
    */bash) PROFILE="$HOME/.bashrc" ;;
    */zsh)  PROFILE="$HOME/.zshrc" ;;
    */fish)
      echo "Please manually add the following to your fish config:"
      echo "$GOPATH_LINE"; echo "$GOCACHE_LINE"; echo "$PATH_LINE"
      return
      ;;
    *) PROFILE="$HOME/.profile" ;;
  esac

  for LINE in "$GOPATH_LINE" "$GOCACHE_LINE" "$PATH_LINE"; do
    if ! grep -qF "$LINE" "$PROFILE" 2>/dev/null; then
      printf "\n# spellbookx Go setup\n%s\n" "$LINE" >> "$PROFILE"
    fi
  done

  echo "Added Go environment to $PROFILE"
  echo "Please run: source $PROFILE"
}

cleanup() {
  rm -rf "$TEMP_DIR"
}

main() {
  ensure_dependencies
  detect_go
  fetch_latest_go_version
  download_and_install_go
  setup_go_environment
  cleanup
}

main "$@"
