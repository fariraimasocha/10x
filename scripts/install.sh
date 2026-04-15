#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SOURCE_DIR="$REPO_DIR/skills"
DRY_RUN=false
VERIFY=false

usage() {
  cat <<'EOF'
Usage: ./scripts/install.sh [--dry-run] [--verify]

Options:
  --dry-run   Print the symlinks that would be created without changing files.
  --verify    Check that expected 10x skill symlinks are installed.
  -h, --help  Show this help.
EOF
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --dry-run)
      DRY_RUN=true
      ;;
    --verify)
      VERIFY=true
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

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: Skills not found at $SOURCE_DIR" >&2
  exit 1
fi

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

verify_dir() {
  local skills_dir="$1"
  local failures=0

  echo "10x - Verifying skills in $skills_dir"

  for skill_name in "${SKILL_NAMES[@]}"; do
    local target="$skills_dir/$skill_name"
    local expected="$SOURCE_DIR/$skill_name"

    if [ ! -L "$target" ]; then
      echo "  Missing: $skill_name"
      failures=$((failures + 1))
      continue
    fi

    local actual
    actual="$(readlink "$target")"
    if [ "$actual" != "$expected" ]; then
      echo "  Incorrect: $skill_name -> $actual (expected $expected)"
      failures=$((failures + 1))
      continue
    fi

    echo "  OK: $skill_name"
  done

  return "$failures"
}

install_to_dir() {
  local skills_dir="$1"

  echo "10x - Installing skills to $skills_dir"

  if [ "$DRY_RUN" = true ]; then
    for skill_name in "${SKILL_NAMES[@]}"; do
      echo "  Would link $skills_dir/$skill_name -> $SOURCE_DIR/$skill_name"
    done
    echo ""
    return
  fi

  mkdir -p "$skills_dir"

  for skill_name in "${SKILL_NAMES[@]}"; do
    local skill_dir="$SOURCE_DIR/$skill_name"
    local target="$skills_dir/$skill_name"

    if [ -L "$target" ]; then
      rm "$target"
    elif [ -e "$target" ]; then
      echo "  Skipped $skill_name: $target exists and is not a symlink"
      continue
    fi

    ln -s "$skill_dir" "$target"
    echo "  Linked $skill_name -> $skill_dir"
  done

  echo ""
}

TARGET_DIRS=()
while IFS= read -r skills_dir; do
  TARGET_DIRS+=("$skills_dir")
done < <(get_target_dirs)

if [ "$VERIFY" = true ]; then
  VERIFY_FAILURES=0
  for skills_dir in "${TARGET_DIRS[@]}"; do
    if ! verify_dir "$skills_dir"; then
      VERIFY_FAILURES=$((VERIFY_FAILURES + 1))
    fi
  done

  if [ "$VERIFY_FAILURES" -gt 0 ]; then
    echo ""
    echo "Verification failed. Run ./scripts/install.sh to refresh symlinks."
    exit 1
  fi

  echo ""
  echo "Verification passed."
  exit 0
fi

for skills_dir in "${TARGET_DIRS[@]}"; do
  install_to_dir "$skills_dir"
done

if [ "$DRY_RUN" = true ]; then
  echo "Dry run complete. No files changed."
  exit 0
fi

echo "Done. Skills installed for Claude Code + Codex:"
SLASH_LIST=""
for skill_name in "${SKILL_NAMES[@]}"; do
  if grep -q "^user-invokable: false" "$SOURCE_DIR/$skill_name/SKILL.md" 2>/dev/null; then
    continue
  fi
  echo "  /$skill_name"
  if [ -z "$SLASH_LIST" ]; then
    SLASH_LIST="/$skill_name"
  else
    SLASH_LIST="$SLASH_LIST, /$skill_name"
  fi
done
echo ""
echo "Claude Code: run $SLASH_LIST"
echo "Codex: invoke skills by name in your prompt, for example: Use \$spacing in plan mode."
