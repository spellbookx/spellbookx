#!/bin/sh

# ==========================
# Install shfmt via go install with:
# - custom GOPATH & GOCACHE
# - deterministic install path
# - automatic PATH export
# ==========================

set -e

SHFMT_MODULE="mvdan.cc/sh/v3/cmd/shfmt"
SHFMT_VERSION="latest" # or pin with @v3.7.0

# Custom installation paths
GOPATH="/opt/gomod"
GOCACHE="/opt/gocache"
BIN_DIR="$GOPATH/bin"

# Ensure directory ownership
sudo mkdir -p "$GOPATH" "$GOCACHE" "$BIN_DIR"
sudo chown -R "$USER":"$USER" "$GOPATH" "$GOCACHE"

# Export Go environment
export GOPATH
export GOCACHE
export PATH="$BIN_DIR:$PATH"

# Install shfmt
echo "Installing shfmt..."
go install "${SHFMT_MODULE}@${SHFMT_VERSION}"

# Verify installation
if [ ! -x "$BIN_DIR/shfmt" ]; then
  echo "shfmt installation failed." >&2
  exit 1
fi

echo "✅ shfmt installed at: $BIN_DIR/shfmt"

# Add PATH to shell profile if not already present
append_path() {
  SHELL_NAME=$(basename "$SHELL")
  case "$SHELL_NAME" in
  bash) PROFILE="$HOME/.bashrc" ;;
  zsh) PROFILE="$HOME/.zshrc" ;;
  fish)
    echo "⚠️ Add $BIN_DIR to fish config manually."
    return
    ;;
  *) PROFILE="$HOME/.profile" ;;
  esac

  if ! grep -qF "$BIN_DIR" "$PROFILE" 2>/dev/null; then
    echo "🔧 Updating PATH in $PROFILE"
    printf "\n# Added by shfmt installer\nexport PATH=%s:\$PATH\n" "$BIN_DIR" >>"$PROFILE"
    echo "ℹ️ Run 'source $PROFILE' or restart shell to apply."
  else
    echo "🔁 PATH already includes $BIN_DIR in $PROFILE"
  fi
}

append_path
