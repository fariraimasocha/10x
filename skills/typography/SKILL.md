---
name: typography
description: "Analyze and fix typography issues in UI code. Enforces consistent type scale, hierarchy, spacing, contrast, alignment, and font usage. Proposes typography token normalization."
user-invokable: true
args:
  - name: scope
    description: "Files or glob patterns to analyze (optional, auto-detects if omitted)"
    required: false
  - name: mode
    description: "analyse | plan | apply (default: plan)"
    required: false
  - name: scale-ratio
    description: "Type scale ratio: minor-second (1.067) | major-second (1.125) | minor-third (1.2) | major-third (1.25) | perfect-fourth (1.333) (default: minor-third)"
    required: false
---

# /typography — 10x Typography Analysis

You are running the 10x typography analyzer. Your job is to find typography inconsistencies and propose a systematic type system covering scale, hierarchy, spacing, contrast, alignment, and font usage.

## Phase 1: Prepare

1. Use the **10x-foundation** skill for config loading, framework detection, and scope resolution.
2. Read `reference/type-scale.md` for canonical type scales, ratios, and step values.
3. Read `reference/type-hierarchy.md` for hierarchy rules, contrast guidelines, spacing rules, alignment, and font pairing.
4. Determine the `mode` from args (default: `plan`).
5. Determine the `scale-ratio` from args or config (default: `minor-third` / 1.2).
6. Identify all CSS, SCSS, style files and component files (JSX/TSX/Vue/Svelte) in scope.

## Phase 2: Analyse

Scan every in-scope file for typography properties. Collect:

### Properties to scan

**Font size:**
- `font-size`, `fontSize`
- Tailwind: `text-{xs|sm|base|lg|xl|2xl|...}`, `text-[{value}]`

**Font weight:**
- `font-weight`, `fontWeight`
- Tailwind: `font-{thin|light|normal|medium|semibold|bold|extrabold|black}`

**Line height:**
- `line-height`, `lineHeight`
- Tailwind: `leading-{none|tight|snug|normal|relaxed|loose|{n}}`

**Letter spacing:**
- `letter-spacing`, `letterSpacing`
- Tailwind: `tracking-{tighter|tight|normal|wide|wider|widest}`

**Font family:**
- `font-family`, `fontFamily`
- Tailwind: `font-{sans|serif|mono|{custom}}`

**Text alignment:**
- `text-align`, `textAlign`
- Tailwind: `text-{left|center|right|justify}`

**Text color (for contrast analysis):**
- `color` (when applied to text elements)
- Tailwind: `text-{color}-{shade}`

**Text decoration and transform:**
- `text-transform`, `text-decoration`, `font-style`

### What to record for each value
- File path and line number
- Property name
- Raw value (e.g., `14px`, `0.875rem`, `text-sm`)
- Normalized value in px (convert rem using 16px base unless config says otherwise)
- Context: heading, body, caption, label, or unknown (infer from element/class/component name)

### Analysis checks

1. **Scale adherence**: Does the font-size land on the configured type scale? If not, flag it.
2. **Near-misses**: Font sizes within 1px of a scale step (e.g., `15px` when scale has `14px` and `16px`). Flag as `warn`.
3. **Random sizes**: Font sizes that don't fit any ratio pattern (e.g., `17px`, `22px`). Flag as `warn`.
4. **Hierarchy violations**: Multiple headings at the same size, or body text larger than subheadings. Flag as `warn`.
5. **Line height issues**: Body text with line-height below 1.4 or above 1.8. Headings with line-height above 1.3. Flag as `info`.
6. **Letter spacing issues**: Large text with no negative letter-spacing. Small text with tight tracking. Flag as `info`.
7. **Font proliferation**: More than 2 font families in use. Flag as `warn`.
8. **Weight contrast**: Heading and body using the same weight (no weight hierarchy). Flag as `info`.
9. **Alignment inconsistency**: Mixed center and left alignment within the same section/component where one direction would suffice. Flag as `info`.
10. **Color contrast**: Text color too close to background (low contrast). Flag as `warn` if ratio appears below 4.5:1 for normal text (< 18px or < 14px bold) or below 3:1 for large text (>= 18px or >= 14px bold), per WCAG AA.
11. **Missing tokens**: Hardcoded px/rem/em font-size values where a typography token should be used.

## Phase 3: Plan

Based on findings, propose specific changes:

1. **Infer the best-fit type scale** from existing values. Calculate which ratio (1.067, 1.125, 1.2, 1.25, 1.333) most existing values cluster around. Recommend that scale.
2. **Generate the full scale** using the chosen ratio and base size (default 16px). Produce steps: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl.
3. **Map each off-scale font-size** to its nearest scale step. Show old -> new.
4. **Propose line-height pairings** for each scale step (tighter for large text, looser for small text).
5. **Propose letter-spacing adjustments**: negative tracking for headings (>= xl), neutral or slightly positive for body.
6. **Propose weight assignments**: map heading levels to specific weights, body to regular/medium.
7. **Propose font family consolidation**: if more than 2 families, suggest reducing to 1-2 with clear roles (sans for UI, serif/mono for accents).
8. **Propose typography tokens** as CSS custom properties (see `10x-foundation/reference/token-format.md`).
9. **For Tailwind projects**: Map to standard Tailwind text classes where possible. Flag arbitrary values for normalization.
10. **Rate each edit**: `low` risk (size rounds to nearest scale step), `medium` risk (size shifts by more than 2px or weight changes), `high` risk (font family change or structural hierarchy change).

Present the plan using the report format from `10x-foundation`.

**Stop here if mode is `analyse` or `plan`.** Show the report and wait for user input.

## Phase 4: Apply (only if mode = apply)

Apply the proposed edits:

1. Work file by file, showing each change before making it.
2. Replace hardcoded values with token references where tokens are being introduced.
3. For CSS files: replace values with `var(--10x-type-{property}-{step})`.
4. For Tailwind: replace arbitrary values with standard text/font/leading/tracking classes.
5. For style objects: replace hardcoded numbers with token references.
6. If introducing a type scale, generate the token definition block (CSS custom properties or Tailwind config extend).
7. After all edits, summarize what was changed.

## Rules

- Never change font-size `inherit` or `unset` values.
- Never remove `!important` declarations — flag them for manual review instead.
- Preserve responsive font-size overrides (media queries, clamp(), Tailwind responsive prefixes).
- Do not modify typography inside third-party component libraries.
- Do not change font-family without explicit user approval in apply mode — only recommend in plan mode.
- When unsure, report rather than fix. Conservative is better than breaking layouts.
- If a file has more than 20 typography issues, summarize the top issues and suggest the user narrow the scope.
