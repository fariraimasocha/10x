#!/usr/bin/env bash
set -euo pipefail

SKILLS_DIR="$HOME/.claude/skills"
SKILLS=("spacing" "depth" "motion" "10x-foundation")

echo "10x — Removing skills from $SKILLS_DIR"

for skill_name in "${SKILLS[@]}"; do
  target="$SKILLS_DIR/$skill_name"
  if [ -L "$target" ] || [ -d "$target" ]; then
    rm -rf "$target"
    echo "  Removed $skill_name"
  fi
done

echo "Done."
