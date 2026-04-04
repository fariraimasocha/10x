<div align="center">

# 10x

**Ship polished UI, not pixel-guessing.**

[![Claude Code](https://img.shields.io/badge/Claude_Code-skill-7c3aed?style=flat-square)](https://docs.anthropic.com/en/docs/claude-code)
[![Codex](https://img.shields.io/badge/OpenAI_Codex-compatible-10a37f?style=flat-square)](https://openai.com/codex)
[![License: MIT](https://img.shields.io/badge/License-MIT-f59e0b?style=flat-square)](LICENSE)
[![Skills](https://img.shields.io/badge/skills-6-3b82f6?style=flat-square)](#skills)

Six AI-powered design skills that analyze spacing, depth, typography, motion, color, and responsive design in any web codebase — then propose (or apply) systematic improvements.

**No runtime. No dependencies. Just design knowledge your AI agent can use.**

[Install](#install) &#8226; [Usage](#usage) &#8226; [Skills](#skills) &#8226; [Configuration](#configuration) &#8226; [Contributing](#contributing)

</div>

---

## Why 10x?

Most UI issues aren't bugs — they're inconsistencies. A `14px` that should be `16px`. A shadow that doesn't match the rest. A heading that's the same weight as body text. These compound into UIs that feel "off" without anyone knowing why.

10x gives your AI coding agent a structured design vocabulary. Instead of vague instructions like "make it look better", you run `/spacing` and get a concrete report: which values are off-scale, what to change, and why.

```
You                          Your AI Agent                    Your Code
 │                                │                              │
 │  /spacing --mode apply         │                              │
 │ ─────────────────────────────> │                              │
 │                                │  scan for spacing properties │
 │                                │ ───────────────────────────> │
 │                                │                              │
 │                                │  14px → 16px (nearest 4pt)   │
 │                                │  gap: 10px → 12px            │
 │                                │  padding: 18px → 16px        │
 │                                │ <─────────────────────────── │
 │                                │                              │
 │  10x Spacing Report            │  apply edits                 │
 │  3 issues found, 3 fixed       │ ───────────────────────────> │
 │ <───────────────────────────── │                              │
```

---

## Skills

Each skill targets one dimension of UI quality. Run them independently or in sequence.

| Skill | What it does | Key flags |
|:------|:-------------|:----------|
| **`spacing`** | Enforces 4pt/8pt scale. Fixes the "tight inside groups, loose between groups" rule. Normalizes to spacing tokens. | `--scope`, `--mode` |
| **`depth`** | Multi-stop shadows (ambient + key), surface layering, elevation tokens. Light/dark theme aware. | `--shadow-style`, `--mode` |
| **`typography`** | Ratio-based type scale, hierarchy enforcement, line-height/tracking, weight contrast, font consolidation. | `--scale-ratio`, `--mode` |
| **`motion`** | Tokenized durations and easing. Flags dangerous properties (`width`, `height`, `margin`). Always adds `prefers-reduced-motion`. | `--style`, `--mode` |
| **`color`** | Single-hue palette generation, brand-tinted neutrals, semantic roles (success/error/warning), WCAG AA contrast. | `--mode` |
| **`responsive`** | Mobile-first conversion, fluid layouts, responsive spacing/typography scaling, content stacking. | `--focus`, `--mode` |

### Modes

Every skill supports three modes:

| Mode | Behavior |
|:-----|:---------|
| `analyse` | Scan and report issues only |
| `plan` | Report + show proposed fixes with risk ratings **(default)** |
| `apply` | Report + fix. Shows each change before applying it |

---

## Install

```bash
git clone https://github.com/fariraimasocha/10x.git
cd 10x
./scripts/install.sh
```

The install script symlinks skills into:

| Agent | Location |
|:------|:---------|
| Claude Code | `~/.claude/skills/` |
| Codex | `$CODEX_HOME/skills` or `~/.codex/skills` |

To remove: `./scripts/uninstall.sh`

---

## Usage

### Claude Code

Open any project and run slash commands:

```bash
# Spacing
/spacing                              # plan mode (default)
/spacing --mode apply                 # auto-fix spacing issues
/spacing --scope src/components       # limit to specific files

# Depth
/depth                                # analyze shadows and surfaces
/depth --shadow-style soft-ui         # use soft-ui shadow style

# Typography
/typography                           # analyze type system
/typography --scale-ratio perfect-fourth  # use 1.333 ratio

# Motion
/motion                               # analyze animations
/motion --style expressive            # use expressive timing

# Color
/color                                # analyze color usage
/color --mode apply                   # auto-fix color issues

# Responsive
/responsive                           # analyze responsive design
/responsive --focus layout            # focus on layout issues
```

### Codex

Reference skills by name in your prompt:

```
Use $spacing in apply mode for src/components.
Use $depth with shadow-style soft-ui.
Use $typography with scale-ratio major-third.
Use $motion in plan mode.
Use $color to analyze the palette.
Use $responsive to check layout adaptability.
```

---

## Configuration

Drop a `10x.config.json` in your target project root to customize behavior:

```jsonc
{
  "spacing": {
    "baseUnit": "rem",        // rem | px
    "gridStep": 4,            // 4 (4pt scale) or 8 (8pt scale)
    "groupStepRem": 1.0       // step-up between groups
  },
  "depth": {
    "shadowStyle": "material-like",  // material-like | soft-ui | flat
    "elevationLevels": 5,
    "themeModes": ["light", "dark"]
  },
  "typography": {
    "baseSizePx": 16,
    "scaleRatio": "minor-third",     // minor-second | major-second | minor-third | major-third | perfect-fourth
    "maxFontFamilies": 2
  },
  "motion": {
    "style": "standard",            // subtle | standard | expressive
    "respectReducedMotion": true,
    "preferTransforms": true
  },
  "color": {
    "baseHue": "auto",              // auto-detect from existing code, or a number (0-360)
    "neutralTint": true,            // tint grays with brand hue
    "contrastMinimum": "AA"         // AA | AAA
  },
  "responsive": {
    "approach": "mobile-first",
    "breakpoints": { "sm": "640px", "md": "768px", "lg": "1024px", "xl": "1280px" },
    "spacingScale": true,
    "typographyScale": true
  },
  "exclude": ["node_modules", "dist", ".next", "build"]
}
```

No config? Sensible defaults are used and the framework/styling approach is auto-detected from `package.json`.

---

## Supported Stacks

| Framework | Styling |
|:----------|:--------|
| React / Next.js | Tailwind CSS |
| Vue | CSS Modules |
| Svelte | Styled Components |
| Plain HTML | Vanilla CSS / SCSS |

Skills auto-detect your stack and adapt their analysis. Tailwind projects get class-level suggestions (`p-4` instead of `padding: 1rem`). CSS projects get custom property tokens.

---

## How It Works

10x skills are **markdown files**, not code. Each skill contains:

1. **`SKILL.md`** — A structured procedure (Prepare, Analyse, Plan, Apply) that the AI agent follows step-by-step
2. **`reference/`** — Design knowledge: canonical scales, token formats, anti-patterns, and best practices

The AI agent reads your code, applies the design heuristics from the skill's reference materials, and produces a structured report with findings, a plan, risk ratings, and token definitions.

### The 4-Phase Workflow

Every skill follows the same pattern:

```
Phase 1: Prepare     Load config, detect framework, resolve file scope
                     ↓
Phase 2: Analyse     Scan files for relevant properties, record findings
                     ↓
Phase 3: Plan        Map findings to fixes, rate risk, propose tokens
                     ↓
Phase 4: Apply       Execute edits (only if mode=apply)
```

### Design Principles

These rules drive all analysis. They're ordered by priority — fix spacing before depth, depth before motion:

| Principle | Core rule |
|:----------|:----------|
| **Spacing** | Group elements tightly, step up between groups by consistent increments (~1rem). Use a 4pt or 8pt scale. |
| **Depth** | Layer with 3-4 shades of one color + multi-stop shadows (ambient + key). Consistent across light/dark themes. |
| **Typography** | Ratio-based scale from a single base size. Clear hierarchy through size, weight, and color. 1-2 font families max. |
| **Motion** | Tokenize durations/easing. Only animate `transform` and `opacity`. Always support `prefers-reduced-motion`. |
| **Color** | One base hue, full 50-900 scale. 80% neutrals, 15% brand, 5% semantic. WCAG AA minimum contrast. |
| **Responsive** | Mobile-first, fluid systems. Spacing and typography scale with viewport. Content stacks vertically on mobile. |

### Token System

All skills generate tokens in a consistent naming convention:

```css
/* Pattern: --10x-{category}-{name} */

--10x-space-4: 1rem;                     /* Spacing */
--10x-shadow-2: 0 2px 6px ...;           /* Depth */
--10x-type-size-xl: 1.44rem;             /* Typography */
--10x-duration-fast: 120ms;              /* Motion */
--10x-color-brand-600: hsl(220, 86%, 48%);  /* Color */
```

Tokens can be output as CSS custom properties (default) or DTCG JSON for Figma/Style Dictionary interop. Tailwind projects get `theme.extend` mappings.

---

## Project Structure

```
10x/
+-- skills/                   # Shared source of truth (all skill definitions)
|   +-- 10x-foundation/       #   Config loading, framework detection, tokens, principles
|   |   +-- SKILL.md
|   |   +-- reference/
|   |       +-- design-principles.md
|   |       +-- framework-detection.md
|   |       +-- token-format.md
|   +-- spacing/
|   |   +-- SKILL.md
|   |   +-- reference/
|   |       +-- spacing-scale.md
|   +-- depth/
|   |   +-- SKILL.md
|   |   +-- reference/
|   |       +-- elevation-tokens.md
|   |       +-- theme-surfaces.md
|   +-- typography/
|   |   +-- SKILL.md
|   |   +-- reference/
|   |       +-- type-scale.md
|   |       +-- type-hierarchy.md
|   +-- motion/
|   |   +-- SKILL.md
|   |   +-- reference/
|   |       +-- motion-tokens.md
|   |       +-- reduced-motion.md
|   +-- color/
|   |   +-- SKILL.md
|   |   +-- reference/
|   |       +-- color-scale.md
|   |       +-- color-system.md
|   +-- responsive/
|       +-- SKILL.md
|       +-- reference/
|           +-- breakpoint-system.md
|           +-- responsive-patterns.md
+-- .claude/                  # Claude Code integration
|   +-- skills/               #   Symlinks -> skills/ (auto-discovery)
|   +-- settings.local.json
+-- .codex/                   # Codex integration
|   +-- instructions.md       #   References skills/ for Codex agents
+-- scripts/
|   +-- install.sh
|   +-- uninstall.sh
+-- docs/
|   +-- design-tool.md        # Architecture deep-dive
+-- 10x.config.json           # Default configuration
+-- README.md
```

> **Key architecture decision**: Skill definitions live in `skills/` at the repo root — a framework-agnostic shared location. Both `.claude/skills/` (symlinks) and `.codex/instructions.md` reference this same source. The install script symlinks from `skills/` to the agent's global directory.

---

## Contributing

Want to add a new skill, improve an existing one, or fix a reference doc? Here's how.

### Understanding the Codebase

This is **not a traditional code project**. There is no TypeScript, no build step, no tests to run. The entire system is structured markdown that AI agents interpret at runtime.

| You're looking at... | What it is |
|:---------------------|:-----------|
| `skills/{name}/SKILL.md` | The skill's **procedure** — step-by-step instructions the AI follows |
| `skills/{name}/reference/*.md` | **Design knowledge** — scales, tokens, rules, anti-patterns |
| `skills/10x-foundation/` | **Shared infrastructure** — config loading, framework detection, output format, core principles |
| `10x.config.json` | **Default configuration** — sensible defaults for all skills |
| `scripts/install.sh` | **Installer** — symlinks skills to agent directories |

### Adding a New Skill

1. **Create the skill directory:**

```
skills/your-skill/
├── SKILL.md
└── reference/
    └── your-reference.md
```

2. **Write `SKILL.md`** with this frontmatter:

```yaml
---
name: your-skill
description: "One-line description of what it does"
user-invokable: true
args:
  - name: scope
    description: "Files or glob patterns to analyze"
    required: false
  - name: mode
    description: "analyse | plan | apply (default: plan)"
    required: false
---
```

3. **Follow the 4-phase structure** (Prepare, Analyse, Plan, Apply). Phase 1 must reference `10x-foundation` for config/framework detection.

4. **Write reference docs** in `reference/`. These contain the domain knowledge: canonical values, token naming, anti-patterns, best practices.

5. **Wire it up:**
   - Add a symlink in `.claude/skills/`: `ln -s ../../skills/your-skill .claude/skills/your-skill`
   - Add the skill name to `SKILL_NAMES` in `scripts/install.sh` and `scripts/uninstall.sh`
   - Add a `your-skill` section to `10x.config.json` with default values
   - Add the skill to `skills/10x-foundation/SKILL.md` (defaults + principles summary)
   - Add the skill to `skills/10x-foundation/reference/design-principles.md`
   - Add the skill's tokens to `skills/10x-foundation/reference/token-format.md`
   - Add the skill to `.codex/instructions.md`
   - Add a row to the skills table in this README

6. **Test it** by running `/your-skill` in Claude Code against a sample project.

### Improving an Existing Skill

- **SKILL.md** controls what the AI does. Edit the phases, analysis checks, or rules.
- **reference/*.md** controls what the AI knows. Edit the scales, token values, or anti-patterns.
- **Changes to `10x-foundation/`** affect all skills — be careful with the output format and config schema.

### Conventions

| Convention | Details |
|:-----------|:--------|
| Token naming | `--10x-{category}-{name}` (e.g., `--10x-space-4`, `--10x-type-size-xl`) |
| Skill args | Always include `scope` (optional) and `mode` (default: `plan`) |
| Risk ratings | `low` (cosmetic), `medium` (may shift layout), `high` (structural change) |
| Severity levels | `info` (suggestion), `warn` (likely issue), `error` (definite problem) |
| Conservative by default | Report rather than fix when confidence < 80% |

### Pull Request Guidelines

- **One skill per PR** for new skills. Cross-cutting changes (foundation, config) can be bundled.
- **Include a test scenario** — describe a sample project or code snippet and what your skill should find/fix.
- **Update all integration points** — README, config, install scripts, foundation, codex instructions. PRs that add a skill but skip wiring will be asked to complete it.
- **Don't break existing skills** — if you're changing the foundation or config schema, verify that all 6 skills still work.

---

## Credits

The design principles behind 10x were heavily inspired by videos from [**@whosajid**](https://www.youtube.com/@whosajid) on YouTube. His breakdowns of spacing, depth, motion, and color in UI design formed the foundation for how these skills analyze and fix real code. Go watch his channel if you want to understand the "why" behind every rule 10x enforces.

---

## License

MIT

</div>
