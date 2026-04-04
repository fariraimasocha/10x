# 10x — Codex Instructions

You have access to the **10x UI upgrade engine** — a set of design analysis skills that detect and fix spacing, depth, motion, typography, color, and responsive design issues in web codebases.

## Available Skills

| Skill | What it does |
|-------|-------------|
| `spacing` | Finds spacing inconsistencies. Enforces a 4pt/8pt scale and "tight groups, loose between" rule. |
| `depth` | Adds visual depth through multi-stop shadows, surface layering, and elevation tokens. Handles light/dark themes. |
| `motion` | Adds purposeful transitions with tokenized durations. Flags dangerous animations. Always adds reduced-motion support. |
| `typography` | Fixes type scale, hierarchy, line-height, letter-spacing, weight, font usage, and alignment. |
| `color` | Fixes color system, palette generation, contrast, and semantic color roles. |
| `responsive` | Converts fixed layouts to fluid systems. Enforces mobile-first breakpoints, responsive spacing, and typography scaling. |

## How to Use

Each skill runs in three modes:
- **analyse** — report issues only
- **plan** — report issues + show proposed fixes (default)
- **apply** — report + fix

### Example Prompts

```
Use $spacing in apply mode for src/components.
Use $depth with shadow-style soft-ui.
Use $typography with scale-ratio major-third.
Use $motion in plan mode.
Use $color to analyze the palette.
Use $responsive to check layout adaptability.
```

## Skill Files

The skill definitions are located in `skills/` at the project root — each skill has a `SKILL.md` with the full analysis procedure and a `reference/` folder with design guidelines. Both Claude Code (via `.claude/skills/` symlinks) and Codex reference this same shared source.

## Configuration

The project uses `10x.config.json` at the root for customizing behavior. Read it before running any skill to respect project-specific settings.

## Key Principles

1. **Spacing comes first** — fix spacing before depth, typography, or motion
2. **Typography reinforces spacing** — consistent type scale creates natural rhythm
3. **Depth reinforces grouping** — elevated surfaces need appropriate spacing
4. **Motion reinforces depth** — elevation changes should include transitions
5. **Color reinforces hierarchy** — saturated color for CTAs, neutrals for everything else
6. **Responsive ties everything together** — all properties must scale with screen size
7. **Be conservative** — report rather than fix when confidence is below 80%
