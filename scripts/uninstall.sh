#!/usr/bin/env bash
set -euo pipefail

SKILLS=("spacing" "depth" "motion" "typography" "color" "responsive" "10x-foundation")

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

  echo "10x — Removing skills from $skills_dir"

  for skill_name in "${SKILLS[@]}"; do
    local target="$skills_dir/$skill_name"
    if [ -L "$target" ] || [ -d "$target" ]; then
      rm -rf "$target"
      echo "  Removed $skill_name"
      removed=true
    fi
  done

  if [ "$removed" = false ]; then
    echo "  No 10x skills found"
  fi
}

TARGET_DIRS=()
while IFS= read -r skills_dir; do
  TARGET_DIRS+=("$skills_dir")
done < <(get_target_dirs)

for skills_dir in "${TARGET_DIRS[@]}"; do
  remove_from_dir "$skills_dir"
done

echo "Done."
