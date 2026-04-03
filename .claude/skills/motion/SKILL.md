---
name: motion
description: "Add purposeful motion with tokenized durations and easing. Enforces reduced-motion support, performant property usage (transform/opacity only), and consistent animation patterns."
user-invokable: true
args:
  - name: scope
    description: "Files or glob patterns to analyze (optional, auto-detects if omitted)"
    required: false
  - name: mode
    description: "analyse | plan | apply (default: plan)"
    required: false
  - name: style
    description: "subtle | standard | expressive (default: standard)"
    required: false
---

# /motion — 10x Motion Analysis

You are running the 10x motion analyzer. Your job is to find motion issues (missing, unsafe, or inconsistent animations) and propose a systematic motion token system.

## Phase 1: Prepare

1. Use the **10x-foundation** skill for config loading, framework detection, and scope resolution.
2. Read `reference/motion-tokens.md` for duration/easing presets and safe property lists.
3. Read `reference/reduced-motion.md` for accessibility patterns.
4. Determine `mode` (default: `plan`) and `style` (default: `standard`) from args or config.

## Phase 2: Analyse

Scan every in-scope file for motion-related properties. Collect:

### Properties to scan
- `transition`, `transition-property`, `transition-duration`, `transition-timing-function`
- `animation`, `animation-name`, `animation-duration`, `animation-timing-function`
- `@keyframes` definitions
- `will-change`
- Tailwind: `transition`, `duration-{n}`, `ease-{type}`, `animate-{name}`
- Style objects: `transition`, `animation`, `willChange`

### What to record
- File path and line number
- Property and raw value
- What triggers the motion (hover, focus, mount, scroll?)
- Whether `prefers-reduced-motion` is handled anywhere in the file or project

### Analysis checks

1. **Missing reduced-motion support**: Does the project have a `@media (prefers-reduced-motion: reduce)` block? If not, flag as `error`.
2. **Dangerous animated properties**: Any transition or animation targeting `width`, `height`, `margin`, `padding`, `top`, `right`, `bottom`, `left`, `border-width`, or `font-size`. These trigger layout recalculation. Flag as `warn`.
3. **Inconsistent durations**: Multiple different duration values that should be tokenized (e.g., `200ms`, `0.2s`, `250ms`, `150ms` scattered across files).
4. **Missing motion on interactive elements**: Buttons, links, or clickable elements without any hover/focus transition. Flag as `info`.
5. **Excessive `will-change`**: More than 2-3 elements with `will-change` set permanently (not on hover/focus). Flag as `warn`.
6. **Bespoke easing curves**: Multiple different `cubic-bezier()` values that should use a standard curve.
7. **Long animations**: Durations over 500ms for UI interactions (not page transitions). Flag as `info`.
8. **Animation on mount without purpose**: Components that animate on every render without clear intent.

## Phase 3: Plan

Based on findings, propose specific changes:

1. **Propose motion tokens** — three durations and a standard easing curve based on the selected `style` preset. See `reference/motion-tokens.md`.

2. **Add reduced-motion block** — if missing, propose the standard `@media (prefers-reduced-motion: reduce)` block. See `reference/reduced-motion.md`.

3. **Fix dangerous properties** — for each animation targeting a layout property, propose a performant alternative:
   - `width`/`height` → `transform: scale()`
   - `top`/`left` → `transform: translate()`
   - `margin` → `transform: translate()` or `gap` animation (with caution)
   - `opacity` is safe — keep it

4. **Normalize durations** — map scattered duration values to the three token levels (fast, mid, slow).

5. **Add missing hover/focus transitions** — for interactive elements without motion, propose: `transition: background-color var(--10x-duration-fast) var(--10x-easing-standard), transform var(--10x-duration-fast) var(--10x-easing-standard)`.

6. **Rate each edit**: `low` (adding token reference), `medium` (changing animation property), `high` (rewriting keyframes or replacing layout animations).

Present the plan using the report format from `10x-foundation`.

**Stop here if mode is `analyse` or `plan`.**

## Phase 4: Apply (only if mode = apply)

Apply the proposed edits:

1. Introduce motion CSS custom properties (or Tailwind theme extension).
2. Add the `prefers-reduced-motion` media query block to the main stylesheet.
3. Replace hardcoded durations and easing values with token references.
4. Replace layout-triggering animations with performant alternatives.
5. Add hover/focus transitions to interactive elements that lack them.
6. Remove or flag excessive `will-change` declarations.
7. Summarize all changes.

## Rules

- Always add reduced-motion support. This is non-negotiable.
- Never add motion to elements that serve no interactive purpose (decorative text, static labels).
- Do not add entry animations to every component — only where they serve a purpose (route transitions, revealing content, drawing attention).
- Preserve existing `@keyframes` names and references — rename only if consolidating duplicates.
- If the project uses a motion library (Framer Motion, GSAP, Motion One), note this in the report and focus on CSS-level improvements. Do not fight the library.
- Keep total transition declarations under 3 properties per element. More than that suggests the element needs a different approach.
- Never animate `color` or `background-color` with durations over 200ms — it looks sluggish.
