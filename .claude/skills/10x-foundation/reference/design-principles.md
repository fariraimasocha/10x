# 10x Design Principles

These principles are derived from three reference videos on spacing, depth, and motion. They form the decision-making foundation for all 10x analysis.

## Spacing Principles

**Core rule**: Group elements tightly using the smallest acceptable internal spacing, then increase spacing between groups in consistent steps (step group-to-group spacing by ~1rem).

- Spacing should be systematized into a repeatable scale, not eyeballed per component
- Common scales use 4dp or 8dp increments (e.g., 4, 8, 12, 16, 24, 32, 48, 64)
- Within a component group (label+input, icon+text): use the tightest step on the scale
- Between component groups (form section to form section, card to card): step up by 1rem (16px) or more
- Near-miss values (14px vs 16px, 18px vs 20px) are almost always bugs — normalize to the nearest scale value
- Spacing tokens should be theme-agnostic (spacing does not change between light and dark mode)

## Depth Principles

**Core rule**: Create visual layers using 3-4 shades of the same color, combined with multi-stop shadows (ambient + key light) for realistic separation.

- Define surface layers by role: canvas (background), surface (cards), raised (interactive/hover), overlay (modals/dropdowns)
- Each layer gets a progressively lighter/darker tint of the base surface color
- Shadows should combine at least two stops: a soft ambient shadow (wide, subtle) and a sharper key shadow (tight, darker)
- Elevation is role-based: modals > dropdowns > sticky headers > cards > flat content
- Never rely on shadow alone for separation — pair with subtle background tint differences
- Light and dark themes need different shadow treatment:
  - Light mode: dark shadows work naturally
  - Dark mode: reduce shadow opacity, add subtle borders or glow, increase surface tint differentiation
- Highlight important elements (primary CTAs, active states) with lighter shades and slightly more elevation

## Motion Principles

**Core rule**: Use CSS `animation` shorthand as the practical entry point. Tokenize durations and easing curves for consistency.

- Prefer `transition` for state changes (hover, focus, expand/collapse)
- Use `@keyframes` + `animation` for repeating or complex sequences
- Tokenize into three durations: fast (~100-150ms for micro-interactions), medium (~200ms for reveals), slow (~300ms for page transitions)
- Use a single standard easing curve: `cubic-bezier(.2, 0, 0, 1)` (fast-out, slow-in) for most interactions
- Only animate `transform` and `opacity` — these are compositor-only and avoid layout/paint thrash
- Never animate `width`, `height`, `margin`, `padding`, `top`, `left` — these trigger layout recalculation
- Do not spray `will-change` everywhere — it is a last resort and harmful if overused
- When expanding/collapsing UI, use `transform: scaleY()` or `opacity` reveals, not margin/height animation

## Accessibility (cross-cutting)

- Always include `@media (prefers-reduced-motion: reduce)` support
- Inside the reduced-motion query, set animation-duration and transition-duration to near-zero (~0.001ms)
- Motion triggered by user interaction must be disableable unless it is essential to the function
- Depth changes must not reduce text contrast below WCAG AA thresholds (4.5:1 for normal text, 3:1 for large text)
- Spacing changes must maintain minimum touch target sizes (44x44px for interactive elements)

## Cross-Cutting Rules

- Spacing comes first — fix spacing before adding depth or motion, because poor spacing undermines both
- Depth reinforces grouping — elevated surfaces should have appropriate spacing (more padding on raised surfaces)
- Motion reinforces depth — elevation changes on hover/focus should include a brief transition
- Consistency across themes — tokens should produce coherent results in both light and dark mode
- Be conservative — prefer reporting issues over auto-fixing when confidence is below 80%
