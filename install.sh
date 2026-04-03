#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SOURCE_DIR="$SCRIPT_DIR/.claude/skills"
SKILL_NAMES=("spacing" "depth" "motion" "10x-foundation")

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

install_to_dir() {
  local skills_dir="$1"

  echo "10x — Installing skills to $skills_dir"
  mkdir -p "$skills_dir"

  for skill_name in "${SKILL_NAMES[@]}"; do
    local skill_dir="$SOURCE_DIR/$skill_name"
    local target="$skills_dir/$skill_name"

    if [ ! -d "$skill_dir" ]; then
      echo "Error: Skill not found: $skill_dir"
      exit 1
    fi

    if [ -L "$target" ]; then
      rm "$target"
    elif [ -e "$target" ]; then
      echo "  Updating $skill_name (replacing existing)"
      rm -rf "$target"
    fi

    ln -s "$skill_dir" "$target"
    echo "  Linked $skill_name"
  done

  echo ""
}

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: Skills not found at $SOURCE_DIR"
  exit 1
fi

TARGET_DIRS=()
while IFS= read -r skills_dir; do
  TARGET_DIRS+=("$skills_dir")
done < <(get_target_dirs)

for skills_dir in "${TARGET_DIRS[@]}"; do
  install_to_dir "$skills_dir"
done

echo ""
echo "Done. Skills installed for Claude Code + Codex:"
echo "  /spacing  — Fix spacing inconsistencies"
echo "  /depth    — Add elevation and visual depth"
echo "  /motion   — Add purposeful motion and transitions"
echo ""
echo "Claude Code: run /spacing, /depth, /motion"
echo "Codex: invoke the spacing, depth, or motion skills in your prompt."
