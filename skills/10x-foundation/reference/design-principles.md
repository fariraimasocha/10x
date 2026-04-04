# 10x Design Principles

These principles are derived from reference videos on spacing, depth, motion, and color. They form the decision-making foundation for all 10x analysis.

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

## Typography Principles

**Core rule**: Use a consistent type scale generated from a ratio, enforce clear hierarchy through size + weight + color, and keep to 1-2 font families with defined roles.

- Typography is layout + spacing + hierarchy + consistency — fonts are maybe 10% of it
- Use a mathematical scale ratio (1.067 to 1.333) to generate all font sizes from a single base (16px)
- Eliminate arbitrary font sizes — every size must land on the scale
- Create clear hierarchy: 1 primary heading, 1-2 secondary levels, everything else recedes
- Pair each scale step with appropriate line-height: tight (1.1) for headings, normal (1.5) for body
- Apply negative letter-spacing to large text (headings), slight positive to small text (captions)
- Use weight to reinforce hierarchy: bold headings, regular body, medium labels
- Limit to 1-2 font families with clear roles (sans for UI, optional serif/mono for accents)
- Left-align body text by default. Center-align sparingly, only for short single-line text
- Use semantic text colors: primary (high-contrast), secondary (muted), tertiary (subtle), disabled

## Color Principles

**Core rule**: Color is not about picking nice colors — it's about building a system that controls attention, hierarchy, and meaning. Start with ONE base hue, generate a scale, use neutrals for 80%+ of the UI, and reserve saturation for interactive elements and semantic meaning.

- Start with one primary brand hue — everything else derives from it
- Generate a full 50-900 scale from the base hue by adjusting lightness and saturation
- Most of the UI should be neutral (whites, grays, blacks) — brand color is used sparingly
- Tint neutrals slightly with the brand hue for visual coherence (never use pure generic grays)
- Color controls hierarchy: high saturation = important (buttons), low saturation = background, neutral = secondary
- Contrast is everything: text must pass WCAG AA (4.5:1 normal, 3:1 large text, 3:1 UI components)
- Avoid pure colors: no `#000`, `#fff`, or fully saturated primaries — soften everything slightly
- Use semantic colors for universal meaning: red = error, green = success, yellow = warning — never override these with brand colors
- Color is relative: the same color looks different depending on background and surrounding colors — always test in context
- In dark mode, brand colors shift 1-2 steps lighter to maintain perceived vibrancy
- Interactive states use color progression: default (brand-600), hover (brand-700), active (brand-800), disabled (neutral-300)
- Usage budget: ~80% neutrals, ~15% brand, ~5% semantic — when everything is colorful, nothing stands out

## Responsive Principles

**Core rule**: Build fluid systems that adapt naturally across screen sizes. Design should flow, not snap. Mobile-first always — start with constraints, add complexity as space allows.

- Always design mobile-first: base styles = smallest screen, enhance with `min-width` breakpoints
- Layouts should use flex/grid, never floats or absolute positioning for structural layout
- Avoid fixed widths (px) on containers — use `w-full` + `max-w-{size}` or percentages
- Stack vertically on mobile, expand horizontally as screen grows (`flex-col` → `md:flex-row`)
- Breakpoints are adjustments, not redesigns — same design, different arrangement
- Spacing must scale: tighter on mobile, more breathing room on desktop
- Typography must scale: large headings need responsive sizing (`text-3xl md:text-5xl lg:text-6xl`)
- Content priority changes by screen: show only what matters on mobile, add context on desktop
- Each component should be independently responsive (navbar collapses, cards stack, grids reflow)
- Use content-driven breakpoints: when the layout breaks, that's the right breakpoint
- Constrain text line length for readability (`max-w-prose` or ~65ch)

## Accessibility (cross-cutting)

- Always include `@media (prefers-reduced-motion: reduce)` support
- Inside the reduced-motion query, set animation-duration and transition-duration to 0.01s (ensures transition events still fire)
- Motion triggered by user interaction must be disableable unless it is essential to the function
- Depth changes must not reduce text contrast below WCAG AA thresholds (4.5:1 for normal text, 3:1 for large text)
- Spacing changes must maintain minimum touch target sizes (44x44px for interactive elements)

## Cross-Cutting Rules

- Spacing comes first — fix spacing before adding depth, typography, or motion, because poor spacing undermines everything
- Typography reinforces spacing — consistent type scale creates natural visual rhythm alongside the spacing scale
- Depth reinforces grouping — elevated surfaces should have appropriate spacing (more padding on raised surfaces)
- Motion reinforces depth — elevation changes on hover/focus should include a brief transition
- Color reinforces hierarchy — saturated brand color draws attention to CTAs, while neutrals let everything else recede
- Responsive ties everything together — spacing, typography, color, and layout must all scale with screen size
- Consistency across themes — tokens should produce coherent results in both light and dark mode
- Be conservative — prefer reporting issues over auto-fixing when confidence is below 80%
