---
name: color
description: "Analyze and fix color usage in UI code. Enforces systematic palette generation, neutral-first design, semantic color roles, contrast accessibility, and hierarchy through saturation control."
user-invokable: true
args:
  - name: scope
    description: "Files or glob patterns to analyze (optional, auto-detects if omitted)"
    required: false
  - name: mode
    description: "analyse | plan | apply (default: plan)"
    required: false
  - name: base-hue
    description: "Primary brand hue to build the palette from: blue | purple | green | red | orange | teal | indigo | custom hex (default: auto-detect from codebase)"
    required: false
---

# /color — 10x Color System Analysis

You are running the 10x color analyzer. Your job is to find inconsistent, unsystematic, or inaccessible color usage and propose a systematic color system built from a single base hue with proper scales, neutrals, semantic roles, and contrast.

## Phase 1: Prepare

1. Use the **10x-foundation** skill for config loading, framework detection, and scope resolution.
2. Read `reference/color-scale.md` for palette generation rules, scale steps, and neutral construction.
3. Read `reference/color-system.md` for hierarchy, semantic roles, contrast rules, and usage guidelines.
4. Determine `mode` from args (default: `plan`).
5. Determine `base-hue` from args or config. If not provided, auto-detect the dominant brand color from the codebase.
6. Identify all CSS, SCSS, style files and component files (JSX/TSX/Vue/Svelte) in scope.
7. Follow the **Agent Execution Rules** in `10x-foundation`, especially the `analyse`/`plan`/`apply` boundary.

## Phase 2: Analyse

Scan every in-scope file for color properties. Collect:

### Properties to scan

**Background colors:**
- `background-color`, `background`, `backgroundColor`
- Tailwind: `bg-{color}-{shade}`, `bg-[{value}]`

**Text colors:**
- `color` (on text elements)
- Tailwind: `text-{color}-{shade}`, `text-[{value}]`

**Border colors:**
- `border-color`, `borderColor`, `outline-color`
- Tailwind: `border-{color}-{shade}`, `ring-{color}-{shade}`

**Fill and stroke (SVG/icons):**
- `fill`, `stroke`
- Tailwind: `fill-{color}`, `stroke-{color}`

**Shadow colors:**
- Colors embedded in `box-shadow` values
- Tailwind: `shadow-{color}-{shade}`

**Gradient colors:**
- Colors in `linear-gradient`, `radial-gradient`
- Tailwind: `from-{color}`, `via-{color}`, `to-{color}`

**Accent and decorative:**
- `accent-color`, `caret-color`, `text-decoration-color`

### What to record for each value

- File path and line number
- Property name
- Raw value (hex, rgb, rgba, hsl, hsla, oklch, named color, Tailwind class)
- Normalized hex value
- Perceived role: brand, neutral, semantic (success/error/warning/info), accent, or unknown
- Context: background, text, border, interactive, decorative

### Analysis checks

1. **Palette fragmentation**: Count unique color values. More than 15-20 unique non-neutral colors signals fragmentation. Flag as `warn`.
2. **No base scale**: Brand color used at a single shade without a 50-900 scale. Flag as `warn`.
3. **Pure color usage**: `#000000`, `#ffffff`, or fully saturated primaries (`#ff0000`, `#00ff00`, `#0000ff`). Flag as `info`.
4. **Inconsistent brand colors**: Same intent (primary button, link, accent) using different hex values across files. Flag as `warn`.
5. **Missing neutral system**: Body text, backgrounds, borders using arbitrary grays instead of a systematic neutral scale. Flag as `warn`.
6. **Contrast violations**: Text/background color pairs that appear below WCAG AA thresholds (4.5:1 normal text, 3:1 large text, 3:1 UI components). Flag as `warn`.
7. **Missing semantic colors**: No dedicated success (green), error (red), warning (yellow/amber) colors, or these are inconsistently defined. Flag as `info`.
8. **Over-saturation**: Brand color used for large surfaces (backgrounds, panels). High-saturation colors should be reserved for small interactive elements. Flag as `info`.
9. **Color as sole differentiator**: Color used as the only way to convey meaning (e.g., red text for errors with no icon or label). Accessibility concern. Flag as `warn`.
10. **Hardcoded values**: Inline hex/rgb values where a color token or CSS variable should be used. Flag as `info`.
11. **Theme gaps**: Colors defined for light mode but missing or identical in dark mode. Flag as `warn`.
12. **Near-duplicate colors**: Two colors within deltaE < 5 used for different purposes (e.g., `#3b82f6` and `#3a80f4`). Flag as `info`.

## Phase 3: Plan

Based on findings, propose specific changes:

1. **Identify or confirm the base hue.** Analyze which hue appears most frequently in brand-colored elements (buttons, links, accents). If `base-hue` was provided, use that. Present the base color.

2. **Generate a full 50-900 palette scale** from the base hue. Produce 10 steps by adjusting lightness and saturation (see `reference/color-scale.md`):
   - 50 (lightest, backgrounds)
   - 100-200 (light, hover states, badges)
   - 300-400 (medium, borders, secondary elements)
   - 500 (base, primary brand shade)
   - 600-700 (strong, buttons, interactive)
   - 800-900 (darkest, text on light, high emphasis)

3. **Generate a neutral scale** (gray with subtle brand tint). Produce 50-900 steps for grays that carry a hint of the base hue for visual coherence.

4. **Map existing colors** to their nearest scale step. Show old hex -> new token.

5. **Propose semantic color assignments:**
   - Success: green-based (provide scale)
   - Error/Destructive: red-based (provide scale)
   - Warning: amber/yellow-based (provide scale)
   - Info: blue-based (provide scale). Use brand color for info only if the brand hue falls within blue/teal range (hue 175-240); otherwise use a dedicated blue scale.

6. **Propose usage rules:**
   - Backgrounds: neutral-50 to neutral-100 (light), neutral-900 to neutral-950 (dark)
   - Body text: neutral-900 (light mode), neutral-100 (dark mode)
   - Secondary text: neutral-600 (light), neutral-400 (dark)
   - Primary buttons: brand-600 (text: white)
   - Hover states: one step darker (brand-700)
   - Borders: neutral-200 (light), neutral-700 (dark)

7. **Propose color tokens** as CSS custom properties (see `10x-foundation/reference/token-format.md`).

8. **For Tailwind projects**: Map to standard Tailwind color classes or `theme.extend.colors`. Flag arbitrary color values for normalization.

9. **Rate each edit**: `low` risk (swapping near-identical shade), `medium` risk (changing visible color by more than 1 step), `high` risk (replacing a color with a different hue or restructuring semantic colors).

Present the plan using the report format from `10x-foundation`.

**Stop here if mode is `analyse` or `plan`.** Show the report and wait for user input.

## Phase 4: Apply (only if mode = apply)

Apply the proposed edits:

1. Work file by file, showing each change before making it.
2. Introduce color tokens as CSS custom properties (or Tailwind theme extension).
3. Replace hardcoded hex/rgb values with token references.
4. For CSS files: replace values with `var(--10x-color-{role}-{step})`.
5. For Tailwind: replace arbitrary color values with configured theme colors.
6. For style objects: replace hardcoded color strings with token references.
7. If introducing a color system, generate the token definition block (CSS custom properties or Tailwind config extend).
8. After all edits, summarize what was changed.

## Rules

- Never remove `transparent`, `inherit`, `currentColor`, or `unset` values.
- Never change colors inside third-party component libraries or vendor files.
- Preserve `!important` declarations — flag them for manual review instead.
- Do not change semantic colors (success/error/warning) to brand colors — they must remain universally recognizable.
- Preserve opacity values. If a color uses rgba/hsla with opacity, maintain the alpha channel.
- Preserve existing CSS variable references — do not replace `var(--existing-token)` with a hardcoded value.
- Do not change colors inside media queries for `prefers-color-scheme` without verifying both theme variants.
- When a color is used in a gradient, change all stops consistently — do not mix old and new tokens.
- When unsure, report rather than fix. Conservative is better than breaking visual identity.
- If a file has more than 25 color issues, summarize the top issues and suggest the user narrow the scope.
- Respect existing design system tokens. If the project already has `--color-primary`, `--color-secondary`, map to those rather than introducing competing tokens.
- When introducing a new color system, use `--10x-color-{role}-{step}` format. When extending an existing system, follow its naming convention (e.g., `--color-primary-500`, `--color-primary-600`).
- If the existing system is incomplete (e.g., has `--color-primary` but no scale steps), propose extending it with step suffixes rather than introducing competing `--10x-` tokens.
