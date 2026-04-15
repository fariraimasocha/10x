#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SOURCE_DIR="$REPO_DIR/skills"
DRY_RUN=false

usage() {
  cat <<'EOF'
Usage: ./scripts/uninstall.sh [--dry-run]

Options:
  --dry-run   Print the 10x symlinks that would be removed without changing files.
  -h, --help  Show this help.
EOF
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --dry-run)
      DRY_RUN=true
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Error: Unknown option: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
  shift
done

SKILL_NAMES=()
for skill_dir in "$SOURCE_DIR"/*/; do
  [ -f "$skill_dir/SKILL.md" ] || continue
  SKILL_NAMES+=("$(basename "$skill_dir")")
done

get_target_dirs() {
  local dirs=("$HOME/.claude/skills")

  if [ -n "${CODEX_HOME:-}" ]; then
    dirs+=("$CODEX_HOME/skills")
  else
    if [ -d "$HOME/.agents/skills" ]; then
      dirs+=("$HOME/.agents/skills")
    fi
    if [ -d "$HOME/.codex/skills" ]; then
      dirs+=("$HOME/.codex/skills")
    fi
    if [ ${#dirs[@]} -eq 1 ]; then
      dirs+=("$HOME/.codex/skills")
    fi
  fi

  printf '%s\n' "${dirs[@]}"
}

remove_from_dir() {
  local skills_dir="$1"
  local removed=false

  echo "10x - Removing skills from $skills_dir"

  for skill_name in "${SKILL_NAMES[@]}"; do
    local target="$skills_dir/$skill_name"
    local expected="$SOURCE_DIR/$skill_name"

    if [ ! -L "$target" ]; then
      continue
    fi

    local actual
    actual="$(readlink "$target")"
    if [ "$actual" != "$expected" ]; then
      echo "  Skipped $skill_name: symlink points to $actual"
      continue
    fi

    if [ "$DRY_RUN" = true ]; then
      echo "  Would remove $target"
    else
      rm "$target"
      echo "  Removed $skill_name"
    fi
    removed=true
  done

  if [ "$removed" = false ]; then
    echo "  No 10x-managed skill symlinks found"
  fi
}

TARGET_DIRS=()
while IFS= read -r skills_dir; do
  TARGET_DIRS+=("$skills_dir")
done < <(get_target_dirs)

for skills_dir in "${TARGET_DIRS[@]}"; do
  remove_from_dir "$skills_dir"
done

if [ "$DRY_RUN" = true ]; then
  echo "Dry run complete. No files changed."
else
  echo "Done."
fi
