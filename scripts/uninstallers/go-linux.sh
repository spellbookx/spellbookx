#!/bin/sh

# Go uninstaller script
# Supports sourcing and direct invocation

INSTALL_DIR="/usr/local"
GO_DIR_PATH="$INSTALL_DIR/go"
GO_BIN_PATH_TO_REMOVE="/usr/local/go/bin"
PROFILES_TO_CHECK="$HOME/.bashrc $HOME/.zshrc $HOME/.profile"

# _remove_go_installation_dir attempts to remove the Go installation directory.
# Returns 0 on success or if directory doesn't exist, 1 on failure to remove.
_remove_go_installation_dir() {
  if [ ! -d "$GO_DIR_PATH" ]; then
    printf "Go installation directory %s not found. Skipping removal of directory.\n" "$GO_DIR_PATH"
    return 0 # Not an error for the uninstaller's goal
  fi

  printf "Removing Go installation from %s...\n" "$GO_DIR_PATH"
  if sudo rm -rf "$GO_DIR_PATH"; then
    printf "Successfully removed %s.\n" "$GO_DIR_PATH"
    return 0
  else
    printf "Error: Failed to remove Go installation directory %s. Please check permissions or remove manually.\n" "$GO_DIR_PATH" >&2
    return 1
  fi
}

# _remove_go_path_from_profiles attempts to remove the Go PATH from common shell profiles.
# Prints messages, does not cause script failure itself by returning error codes.
_remove_go_path_from_profiles() {
  printf "Attempting to remove Go PATH (%s) from shell profiles...\n" "$GO_BIN_PATH_TO_REMOVE"
  profile_updated_count=0
  for profile in $PROFILES_TO_CHECK; do
    if [ -f "$profile" ]; then
      if grep -qF "$GO_BIN_PATH_TO_REMOVE" "$profile"; then
        # POSIX-compliant way to remove line and create a .bak file
        if ! tmp_sed_output_file=$(mktemp); then
          printf "Error: Failed to create temporary file for processing %s. Skipping.\n" "$profile" >&2
        else
          # Use '#' as a delimiter for sed to avoid issues with slashes in GO_PATH
          if sed "#${GO_BIN_PATH_TO_REMOVE}#d" "$profile" >"$tmp_sed_output_file"; then
            # sed command succeeded. Now, create backup and replace.
            if cp "$profile" "$profile.bak"; then           # Create backup of the original
              if mv "$tmp_sed_output_file" "$profile"; then # Replace original with modified content
                printf "Removing PATH update from %s (original saved as %s.bak)\n" "$profile" "$profile"
              else
                printf "Error: Failed to move temporary file to %s. Original is %s, backup is %s.bak. Edited content was in %s (now removed).\n" \
                  "$profile" "$profile" "$profile" "$tmp_sed_output_file" >&2
                rm -f "$tmp_sed_output_file"             # Clean up temp file as mv failed
                mv "$profile.bak" "$profile" 2>/dev/null # Best effort restore
              fi
            else
              printf "Error: Failed to create backup %s.bak. No changes made to %s.\n" "$profile" "$profile" >&2
              rm -f "$tmp_sed_output_file" # Clean up temp file, original is untouched
            fi
            profile_updated_count=$((profile_updated_count + 1))
          else
            # sed command failed
            printf "Error: sed command failed for %s. No changes made.\n" "$profile" >&2
            rm -f "$tmp_sed_output_file" # Clean up temp file
          fi
        fi # if mktemp
      fi   # if grep
    fi     # if -f
  done     # for profile

  if [ "$profile_updated_count" -eq 0 ]; then
    printf "No Go PATH entries found to remove in specified profiles (%s).\n" "$PROFILES_TO_CHECK"
  fi
}

# go_uninstall is the main public function for uninstalling Go.
# It can be called when this script is sourced.
# Returns 0 on success, 1 on failure (e.g. if directory removal fails).
go_uninstall() {
  printf "Starting Go uninstallation process...\n"

  if ! _remove_go_installation_dir; then
    # _remove_go_installation_dir already printed an error.
    printf "Go uninstallation reported an error during directory removal.\n" >&2
    return 1
  fi

  _remove_go_path_from_profiles # This function handles its own error reporting, doesn't stop uninstallation.

  printf "Go uninstallation process finished.\n"
  return 0
}

# Check if the script is being executed directly
main() {
  if go_uninstall; then
    # Success message already printed by go_uninstall or its helpers
    exit 0
  else
    # Error messages already printed by go_uninstall or its helpers
    exit 1
  fi
}

# Check if the script is being executed directly or sourced.
# If 'return 0' succeeds, it's sourced (SOURCED_MODE=1). Otherwise, executed (SOURCED_MODE=0).
(return 0 2>/dev/null) && SOURCED_MODE=1 || SOURCED_MODE=0

if [ "$SOURCED_MODE" -eq 0 ]; then
  # Script is executed directly, call its main function.
  main
fi
