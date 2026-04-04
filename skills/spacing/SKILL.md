---
name: spacing
description: "Analyze and fix spacing inconsistencies in UI code. Enforces tight grouping within components and consistent step-ups between groups. Proposes spacing token normalization."
user-invokable: true
args:
  - name: scope
    description: "Files or glob patterns to analyze (optional, auto-detects if omitted)"
    required: false
  - name: mode
    description: "analyze | plan | apply (default: plan)"
    required: false
---

# /spacing — 10x Spacing Analysis

You are running the 10x spacing analyzer. Your job is to find spacing inconsistencies and propose a systematic spacing scale.

## Phase 1: Prepare

1. Use the **10x-foundation** skill for config loading, framework detection, and scope resolution.
2. Read `reference/spacing-scale.md` for the canonical spacing scales and grouping rules.
3. Determine the `mode` from args (default: `plan`).
4. Identify all CSS, SCSS, style files and component files (JSX/TSX/Vue/Svelte) in scope.

## Phase 2: Analyze

Scan every in-scope file for spacing properties. Collect:

### Properties to scan
- `padding`, `padding-top`, `padding-right`, `padding-bottom`, `padding-left`
- `margin`, `margin-top`, `margin-right`, `margin-bottom`, `margin-left`
- `gap`, `row-gap`, `column-gap`
- Tailwind: `p-{n}`, `px-{n}`, `py-{n}`, `pt-{n}`, `m-{n}`, `mx-{n}`, `gap-{n}`, `space-x-{n}`, `space-y-{n}`
- Style objects: `padding`, `paddingTop`, `margin`, `marginLeft`, `gap`

### What to record for each value
- File path and line number
- Property name
- Raw value (e.g., `14px`, `1.25rem`, `p-3.5`)
- Normalized value in px (convert rem using 16px base unless config says otherwise)

### Analysis checks

1. **Scale adherence**: Does the value land on the configured spacing scale (4pt or 8pt)? If not, flag it.
2. **Near-misses**: Values within 2px of a scale step (e.g., 14px when scale has 12px and 16px) are likely bugs. Flag as `warn`.
3. **Arbitrary one-offs**: Values that don't fit any pattern (e.g., 37px). Flag as `warn`.
4. **Grouping violations**: Within a component, look for mixed tight/loose spacing that breaks the "tight inside, loose between" rule. This requires reading the component structure.
5. **Inconsistent gaps**: Same visual pattern (e.g., card grid) using different gap values across the codebase.
6. **Missing tokens**: Hardcoded px/rem values where a spacing token (CSS variable or Tailwind class) should be used.

## Phase 3: Plan

Based on findings, propose specific changes:

1. **Infer the best-fit scale** from existing values. If most values cluster around multiples of 4, recommend the 4pt scale. If around 8, recommend 8pt.
2. **Map each off-scale value** to its nearest scale step. Show old → new.
3. **Propose spacing tokens** as CSS custom properties (see `10x-foundation/reference/token-format.md`).
4. **For Tailwind projects**: Map to standard Tailwind spacing classes where possible. Flag arbitrary values (`p-[14px]`) for normalization.
5. **Rate each edit**: `low` risk (value rounds to nearest scale), `medium` risk (value shifts by more than 4px), `high` risk (structural change affecting layout).

Present the plan using the report format from `10x-foundation`.

**Stop here if mode is `analyze` or `plan`.** Show the report and wait for user input.

## Phase 4: Apply (only if mode = apply)

Apply the proposed edits:

1. Work file by file, showing each change before making it.
2. Replace hardcoded values with token references where tokens are being introduced.
3. For CSS files: replace values with `var(--10x-space-{n})`.
4. For Tailwind: replace arbitrary values with standard classes.
5. For style objects: replace hardcoded numbers with token references.
6. After all edits, summarize what was changed.

## Rules

- Never change `0` values — zero spacing is intentional.
- Never change negative values (negative margins) without explicit user approval.
- Preserve `auto` values.
- Do not modify spacing inside third-party component libraries.
- When unsure, report rather than fix. Conservative is better than breaking layouts.
- If a file has more than 20 spacing issues, summarize the top issues and suggest the user narrow the scope.
