<div align="center">

# 10x

### AI skills for systematic UI polish.

[![Claude Code](https://img.shields.io/badge/Claude_Code-skill-7c3aed?style=flat-square)](https://docs.anthropic.com/en/docs/claude-code)
[![Codex](https://img.shields.io/badge/OpenAI_Codex-compatible-10a37f?style=flat-square)](https://openai.com/codex)
[![License: MIT](https://img.shields.io/badge/License-MIT-f59e0b?style=flat-square)](LICENSE)
[![Skills](https://img.shields.io/badge/skills-7-3b82f6?style=flat-square)](#skills)

Six focused UI quality skills plus one orchestrator: **typography, color, spacing, depth, motion, responsive**, and **polish**.

[Install](#install) · [Usage](#usage) · [Skills](#skills) · [Configuration](#configuration) · [Contributing](#contributing)

</div>

---

## What 10x Is

10x is a dependency-free skill pack for Claude Code and Codex. It gives your agent concrete procedures for finding UI inconsistencies, proposing reviewable fixes, and applying changes only when you explicitly ask for `apply` mode.

It is not a runtime library and it does not ship a deterministic scanner yet. The source of truth is structured Markdown in `skills/`, backed by reference docs for scales, tokens, accessibility rules, and responsive patterns.

## Install

```bash
git clone https://github.com/fariraimasocha/10x.git
cd 10x
./scripts/install.sh --dry-run
./scripts/install.sh
```

The installer symlinks every skill into the available agent skill directories:

| Agent | Target |
| --- | --- |
| Claude Code | `~/.claude/skills/` |
| Codex | `$CODEX_HOME/skills`, `~/.codex/skills`, or `~/.agents/skills` when present |

Useful commands:

```bash
./scripts/install.sh --verify     # check installed symlinks
./scripts/uninstall.sh --dry-run  # preview removal
./scripts/uninstall.sh            # remove 10x skills
./scripts/update.sh               # pull latest main and refresh symlinks
```

## Usage

All skills use the same modes:

| Mode | Behavior |
| --- | --- |
| `analyse` | Scan and report findings only. |
| `plan` | Report findings plus concrete proposed edits. This is the default. |
| `apply` | Make scoped edits after inspecting the relevant files. |

`analyze` is accepted as user language, but the skills normalize the mode to `analyse`.

### Claude Code

Run skills as slash commands from the target project:

```bash
/spacing
/typography --mode apply --scope src/components
/color --mode analyse
/responsive --focus layout
/polish
```

### Codex

Reference skills by name in your prompt:

```text
Use $spacing in plan mode for src/components.
Use $typography in apply mode for the dashboard components.
Use $color to analyse the palette and contrast.
Use $polish in plan mode across the app shell.
```

## Skills

| Skill | What it checks | Typical output |
| --- | --- | --- |
| `spacing` | Off-scale padding, margin, gaps, grouping rhythm, token opportunities. | Old spacing value -> nearest scale value, risk-rated by layout impact. |
| `typography` | Type scale, hierarchy, line-height, tracking, weight, font proliferation. | Type token proposal and concrete class/CSS replacements. |
| `color` | Palette fragmentation, contrast, semantic roles, hardcoded colors. | Brand/neutral/semantic scale proposal and token mappings. |
| `depth` | Surface layers, shadows, elevation roles, z-index consistency. | Elevation token proposal and shadow/surface normalization. |
| `motion` | Transition safety, duration/easing drift, reduced-motion support. | Motion token proposal and safe transform/opacity changes. |
| `responsive` | Rigid widths, stacking, breakpoints, mobile-first spacing/type. | Mobile-first layout transformations with risk ratings. |
| `polish` | Runs the six quality skills against one shared scope. | One merged report with conflicts resolved before edits. |

## How It Works

Each skill follows the same four phases:

```text
Prepare -> Analyse -> Plan -> Apply
```

- **Prepare** loads `10x.config.json`, detects framework/styling, and resolves scope.
- **Analyse** scans files and records line-referenced findings.
- **Plan** proposes concrete edits with risk levels and token definitions.
- **Apply** edits files only when the user explicitly requests `apply`.

Shared behavior lives in `skills/10x-foundation/SKILL.md`. Individual skills contain only domain-specific checks and rules.

## Configuration

Put `10x.config.json` in the target project root to customize behavior:

```jsonc
{
  "spacing": { "baseUnit": "rem", "gridStep": 4, "groupStepRem": 1.0 },
  "depth": { "shadowStyle": "material-like", "elevationLevels": 5, "themeModes": ["light", "dark"] },
  "typography": { "baseSizePx": 16, "scaleRatio": "minor-third", "maxFontFamilies": 2 },
  "motion": { "style": "standard", "respectReducedMotion": true, "preferTransforms": true },
  "color": { "baseHue": "auto", "neutralTint": true, "contrastMinimum": "AA" },
  "responsive": {
    "approach": "mobile-first",
    "breakpoints": { "sm": "640px", "md": "768px", "lg": "1024px", "xl": "1280px" }
  },
  "tokens": { "outputPath": "./tokens", "format": "css-variables" },
  "exclude": ["node_modules", "dist", ".next", "build", "vendor", "*.min.css"]
}
```

If no config exists, the foundation skill uses the defaults bundled in this repo.

## Project Structure

```text
10x/
|-- skills/
|   |-- 10x-foundation/
|   |-- spacing/
|   |-- typography/
|   |-- color/
|   |-- depth/
|   |-- motion/
|   |-- responsive/
|   `-- polish/
|-- scripts/
|   |-- install.sh
|   |-- uninstall.sh
|   `-- update.sh
|-- docs/
|   `-- design-tool.md
|-- 10x.config.json
`-- README.md
```

## Contributing

This repo is a skill distribution, so quality mostly comes from clear procedures and reliable boundaries.

When changing a skill:

- Keep `SKILL.md` concise and procedural.
- Put detailed design knowledge in `reference/`.
- Use the shared `analyse | plan | apply` contract.
- Include line-referenced findings and concrete proposed edits.
- Add or update `agents/openai.yaml` for public skills.
- Prefer reporting over editing when confidence is below 80%.

When adding a new public skill:

1. Add `skills/{name}/SKILL.md`.
2. Add focused reference docs under `skills/{name}/reference/` when needed.
3. Add `skills/{name}/agents/openai.yaml`.
4. Add defaults to `10x.config.json` if the skill needs configuration.
5. Update `.codex/instructions.md`, this README, and any shared foundation rules.
6. Run `./scripts/install.sh --dry-run` and `./scripts/install.sh --verify`.

## License

MIT
