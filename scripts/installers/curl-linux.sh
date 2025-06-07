#!/bin/sh

# Installer for curl on Debian/Ubuntu and similar Linux systems

fail() {
  printf "Error: %s\n" "$1" >&2
  exit 1
}

check_if_already_installed() {
  if command -v curl >/dev/null 2>&1; then
    printf "curl is already installed.\n"
    exit 0
  fi
}

install_curl_core() {
  printf "Installing curl...\n"

  if command -v apt-get >/dev/null 2>&1; then
    if ! (sudo apt-get update && sudo apt-get install -y curl); then
      fail "curl installation using apt-get failed."
    fi
  elif command -v yum >/dev/null 2>&1; then
    if ! sudo yum install -y curl; then
      fail "curl installation using yum failed."
    fi
  else
    fail "Unsupported package manager. Please install curl manually."
  fi
}

main() {
  check_if_already_installed
  install_curl_core
  printf "curl installed successfully.\n"
}

main "$@"
