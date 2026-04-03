#!/usr/bin/env bash
set -euo pipefail

SKILLS_DIR="$HOME/.claude/skills"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SOURCE_DIR="$SCRIPT_DIR/.claude/skills"

echo "10x — Installing skills to $SKILLS_DIR"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: Skills not found at $SOURCE_DIR"
  exit 1
fi

mkdir -p "$SKILLS_DIR"

for skill_dir in "$SOURCE_DIR"/*/; do
  skill_name="$(basename "$skill_dir")"
  target="$SKILLS_DIR/$skill_name"

  if [ -L "$target" ]; then
    rm "$target"
  elif [ -d "$target" ]; then
    echo "  Updating $skill_name (replacing existing)"
    rm -rf "$target"
  fi

  ln -s "$skill_dir" "$target"
  echo "  Linked $skill_name"
done

echo ""
echo "Done. Skills installed:"
echo "  /spacing  — Fix spacing inconsistencies"
echo "  /depth    — Add elevation and visual depth"
echo "  /motion   — Add purposeful motion and transitions"
echo ""
echo "Open any project in Claude Code and use the commands."
