---
name: depth
description: "Add visual depth through color layering, elevation shadows, and surface hierarchy. Analyzes and proposes multi-stop shadows, role-based elevation, and light/dark theme consistency."
user-invokable: true
args:
  - name: scope
    description: "Files or glob patterns to analyze (optional, auto-detects if omitted)"
    required: false
  - name: mode
    description: "analyse | plan | apply (default: plan)"
    required: false
  - name: shadow-style
    description: "material-like | soft-ui | flat (default: material-like)"
    required: false
---

# /depth — 10x Depth Analysis

You are running the 10x depth analyzer. Your job is to identify flat or inconsistent visual layering and propose a systematic elevation and surface system.

## Phase 1: Prepare

1. Use the **10x-foundation** skill for config loading, framework detection, and scope resolution.
2. Read `reference/elevation-tokens.md` for the elevation scale and shadow recipes.
3. Read `reference/theme-surfaces.md` for light/dark mode surface rules.
4. Determine `mode` (default: `plan`) and `shadow-style` (default: `material-like`) from args or config.

## Phase 2: Analyse

Scan every in-scope file for depth-related properties. Collect:

### Properties to scan
- `box-shadow` (CSS, style objects)
- `background-color`, `background` (surface tinting)
- `border`, `border-color` (separation indicators)
- `z-index` (layering order)
- Tailwind: `shadow-{size}`, `bg-{color}`, `border`, `z-{n}`

### What to record
- File path and line number
- Property and raw value
- Component context (what kind of element: card, modal, dropdown, header, button?)

### Analysis checks

1. **Missing elevation**: Components that should have depth (cards, modals, dropdowns, sticky headers, floating buttons) but have `box-shadow: none` or no shadow at all.
2. **Single-stop shadows**: Shadow values with only one layer. These look flat. Recommend multi-stop (ambient + key).
3. **Inconsistent shadows**: Same component type (e.g., cards) using different shadow values across the codebase.
4. **Flat surfaces**: No background color differentiation between nested layers (content sits directly on page background with no surface tinting).
5. **z-index chaos**: Arbitrary z-index values (999, 9999, 100000) without a system. Map to a layered scale.
6. **Theme gaps**: Shadows defined for light mode but missing or identical in dark mode. Dark mode needs adjusted shadows (less opacity, more border/tint).
7. **Over-elevation**: Elements with unnecessarily heavy shadows that don't match their role (a text label with `shadow-2xl`).

## Phase 3: Plan

Based on findings, propose specific changes:

1. **Assign elevation roles** to components found in the codebase:
   - Level 0: flat content, backgrounds
   - Level 1: cards, list items, subtle separation
   - Level 2: raised cards, hover states, app bars
   - Level 3: dropdowns, popovers, sticky headers
   - Level 4: modals, dialogs, drawers
   - Level 5: toasts, notifications, top-layer overlays

2. **Propose elevation tokens** — shadow values for each level based on the selected `shadow-style`. See `reference/elevation-tokens.md`.

3. **Propose surface tokens** — background tints for canvas/surface/raised/overlay layers. See `reference/theme-surfaces.md`.

4. **Map existing shadows** to the nearest elevation level. Show old → new.

5. **Propose z-index scale** if z-index chaos is detected: `--10x-z-base: 0`, `--10x-z-dropdown: 100`, `--10x-z-sticky: 200`, `--10x-z-modal: 300`, `--10x-z-toast: 400`.

6. **Rate each edit**: `low` (adding missing shadow), `medium` (changing existing shadow), `high` (restructuring surfaces or z-index).

Present the plan using the report format from `10x-foundation`.

**Stop here if mode is `analyse` or `plan`.**

## Phase 4: Apply (only if mode = apply)

Apply the proposed edits:

1. Introduce elevation CSS custom properties (or Tailwind theme extension).
2. Replace individual `box-shadow` values with token references.
3. Add surface background tokens where flat surfaces were detected.
4. Normalize z-index values to the proposed scale.
5. If dark mode styles exist, add theme-aware shadow variants.
6. Summarize all changes.

## Rules

- Never remove shadows without replacing them — that makes things worse.
- Do not add elevation to text elements, inline elements, or elements clearly meant to be flat.
- Preserve intentional `box-shadow: none` (e.g., on reset styles, focus-visible overrides).
- When both a border and shadow exist, check if both are needed — sometimes one replaces the other.
- Respect existing design system tokens. If the project already has `--shadow-sm`, `--shadow-md`, map to those rather than introducing competing tokens.
- For dark mode: if no dark mode styles exist, note this in the report but do not generate dark mode styles unless asked.
