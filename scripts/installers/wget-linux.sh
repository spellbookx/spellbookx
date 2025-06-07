#!/bin/sh

# Installer for wget on Debian/Ubuntu and similar Linux systems

fail() {
  printf "Error: %s\n" "$1" >&2
  exit 1
}

check_if_already_installed() {
  if command -v wget >/dev/null 2>&1; then
    printf "wget is already installed.\n"
    exit 0
  fi
}

install_wget_core() {
  printf "Installing wget...\n"

  if command -v apt-get >/dev/null 2>&1; then
    if ! (sudo apt-get update && sudo apt-get install -y wget); then
      fail "wget installation using apt-get failed."
    fi
  elif command -v yum >/dev/null 2>&1; then
    if ! sudo yum install -y wget; then
      fail "wget installation using yum failed."
    fi
  else
    fail "Unsupported package manager. Please install wget manually."
  fi
}

main() {
  check_if_already_installed
  install_wget_core
  printf "wget installed successfully.\n"
}

main "$@"
