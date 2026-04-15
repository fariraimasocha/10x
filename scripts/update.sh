#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_DIR"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Error: $REPO_DIR is not a git repository."
  exit 1
fi

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "Error: Expected to be on 'main' (currently on '$CURRENT_BRANCH')."
  echo "Switch to main or stash your work before updating."
  exit 1
fi

if ! git diff-index --quiet HEAD --; then
  echo "Error: Working tree has uncommitted changes. Commit or stash them first."
  git status --short
  exit 1
fi

PREV_HEAD="$(git rev-parse HEAD)"

echo "10x — Fetching latest from origin..."
git fetch origin main

if ! git pull --ff-only origin main; then
  echo "Error: Could not fast-forward. Resolve manually with 'git pull' in $REPO_DIR."
  exit 1
fi

NEW_HEAD="$(git rev-parse HEAD)"

echo ""
if [ "$PREV_HEAD" = "$NEW_HEAD" ]; then
  echo "Already up to date."
else
  echo "Updated $PREV_HEAD → $NEW_HEAD"
  echo ""
  echo "Skill changes in this update:"
  git log --oneline "$PREV_HEAD..$NEW_HEAD" -- skills/ || true
fi

echo ""
echo "Refreshing symlinks..."
bash "$SCRIPT_DIR/install.sh"
