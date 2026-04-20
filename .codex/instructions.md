# 10x — Codex Instructions

You have access to the **10x UI upgrade engine** — a set of design analysis skills that detect and fix spacing, depth, motion, typography, hierarchy, color, and responsive design issues in web codebases.

## Available Skills

| Skill | What it does |
|-------|-------------|
| `spacing` | Finds spacing inconsistencies. Enforces a 4pt/8pt scale and "tight groups, loose between" rule. |
| `depth` | Adds visual depth through multi-stop shadows, surface layering, and elevation tokens. Handles light/dark themes. |
| `motion` | Adds purposeful transitions with tokenized durations. Flags dangerous animations. Always adds reduced-motion support. |
| `typography` | Fixes type scale, hierarchy, line-height, letter-spacing, weight, font usage, and alignment. |
| `hierarchy` | Fixes visual priority, scan path, CTA dominance, grouping, and competing focal points. |
| `color` | Fixes color system, palette generation, contrast, and semantic color roles. |
| `responsive` | Converts fixed layouts to fluid systems. Enforces mobile-first breakpoints, responsive spacing, and typography scaling. |
| `polish` | Runs the six core implementation skills against one shared scope and produces one merged report. |

## How to Use

Each skill runs in three modes:
- **analyse** — report issues only
- **plan** — report issues + show proposed fixes (default)
- **apply** — report + fix

Use only `analyse`, `plan`, and `apply` as mode values. If the user says "analyze", normalize it to `analyse`. Never edit files in `analyse` or `plan` mode.

### Example Prompts

```
Use $spacing in apply mode for src/components.
Use $depth with shadow-style soft-ui.
Use $typography with scale-ratio major-third.
Use $hierarchy in plan mode for the dashboard page.
Use $motion in plan mode.
Use $color to analyse the palette.
Use $responsive to check layout adaptability.
Use $polish in plan mode across the app shell.
```

## Skill Files

The skill definitions are located in `skills/` at the project root — each skill has a `SKILL.md` with the full analysis procedure and a `reference/` folder with design guidelines. Both Claude Code (via `.claude/skills/` symlinks) and Codex reference this same shared source.

## Configuration

The project uses `10x.config.json` at the root for customizing behavior. Read it before running any skill to respect project-specific settings.

## Key Principles

1. **Spacing comes first** — fix spacing before depth, typography, or motion
2. **Typography reinforces spacing** — consistent type scale creates natural rhythm
3. **Hierarchy clarifies priority** — one primary path should lead each view
4. **Depth reinforces grouping** — elevated surfaces need appropriate spacing
5. **Motion reinforces depth** — elevation changes should include transitions
6. **Color reinforces hierarchy** — saturated color for CTAs, neutrals for everything else
7. **Responsive ties everything together** — all properties must scale with screen size
8. **Be conservative** — report rather than fix when confidence is below 80%
