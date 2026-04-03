# 10x

A set of Claude Code and Codex skills that upgrade your UI. Three skills analyze spacing, depth, and motion in any web codebase and propose systematic improvements.

## Skills

| Skill | What it does |
|---------|-------------|
| `spacing` | Finds spacing inconsistencies. Enforces a 4pt/8pt scale and the "tight groups, loose between" rule. |
| `depth` | Adds visual depth through multi-stop shadows, surface layering, and elevation tokens. Handles light/dark themes. |
| `motion` | Adds purposeful transitions with tokenized durations. Flags dangerous animations. Always adds reduced-motion support. |

Each skill runs in three modes:
- **analyse** — report issues only
- **plan** — report issues + show proposed fixes (default)
- **apply** — report + fix

## Install

```bash
git clone https://github.com/fariraimasocha/10x.git
cd 10x
./install.sh
```

This symlinks the skills into:
- `~/.claude/skills/` (Claude Code)
- Codex skills directory:
  - `$CODEX_HOME/skills` if `CODEX_HOME` is set
  - otherwise `~/.agents/skills` if it already exists
  - otherwise `~/.codex/skills`

## Usage

### Claude Code

Open any project and run:

```
/spacing
/spacing --mode apply
/spacing --scope src/components

/depth
/depth --shadow-style soft-ui
/depth --mode apply

/motion
/motion --style expressive
/motion --mode apply
```

### Codex

Open any project and invoke skills by name in your prompt:

```text
Use $spacing in apply mode for src/components.
Use $depth with shadow-style soft-ui.
Use $motion in plan mode.
```

## Configuration

Drop a `10x.config.json` in your project root to customize behavior:

```json
{
  "spacing": {
    "baseUnit": "rem",
    "gridStep": 4,
    "groupStepRem": 1.0
  },
  "depth": {
    "shadowStyle": "material-like",
    "elevationLevels": 5,
    "themeModes": ["light", "dark"]
  },
  "motion": {
    "style": "standard",
    "respectReducedMotion": true,
    "preferTransforms": true
  },
  "exclude": ["node_modules", "dist", ".next", "build"]
}
```

If no config exists, sensible defaults are used and the framework/styling approach is auto-detected.

## Supported Stacks

- React / Next.js
- Vue / Svelte
- Tailwind CSS
- CSS Modules
- Vanilla CSS

## Uninstall

```bash
cd 10x
./uninstall.sh
```

## How It Works

These are agent skills - markdown files that provide structured design knowledge and step-by-step analysis procedures. Claude Code and Codex read your code, apply the design heuristics, and propose (or apply) specific edits.

The design principles come from three areas:
- **Spacing**: Group elements tightly, then step up between groups by consistent increments
- **Depth**: Layer with 3-4 color shades + combined ambient/key shadows
- **Motion**: Tokenize durations/easing, only animate transform/opacity, always support reduced-motion
