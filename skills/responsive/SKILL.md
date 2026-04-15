---
name: responsive
description: "Analyze and fix responsive design issues in UI code. Converts fixed layouts to fluid systems, enforces mobile-first breakpoints, responsive spacing, typography scaling, and proper content stacking."
user-invokable: true
args:
  - name: scope
    description: "Files or glob patterns to analyze (optional, auto-detects if omitted)"
    required: false
  - name: mode
    description: "analyse | plan | apply (default: plan)"
    required: false
  - name: focus
    description: "layout | breakpoints | stack | spacing | type | visibility | all (default: all)"
    required: false
---

# /responsive — 10x Responsive Design Analysis

You are running the 10x responsive design analyzer. Your job is to find responsive design issues and convert rigid, fixed layouts into fluid systems that adapt naturally across screen sizes.

## Phase 1: Prepare

1. Use the **10x-foundation** skill for config loading, framework detection, and scope resolution.
2. Read `reference/responsive-patterns.md` for canonical responsive patterns and transformation rules.
3. Read `reference/breakpoint-system.md` for the breakpoint scale and mobile-first rules.
4. Determine the `mode` from args (default: `plan`).
5. Determine the `focus` from args (default: `all`). If a specific focus is given, only run that sub-analysis.
6. Identify all CSS, SCSS, style files and component files (JSX/TSX/Vue/Svelte) in scope.
7. Follow the **Agent Execution Rules** in `10x-foundation`, especially the `analyse`/`plan`/`apply` boundary.

## Phase 2: Analyse

Scan every in-scope file for responsive design issues. Run the sub-analyses below based on the `focus` argument (or all of them if `focus` is `all`).

### 2a. Layout Analysis (focus: layout)

Detect fixed or rigid layouts that should be fluid:

- **Fixed widths**: `width: {N}px`, `w-[{N}px]`, `w-{fixed}` without responsive variants
- **Fixed heights** on containers: `height: {N}px` on wrappers/sections (not icons/avatars)
- **Missing flex/grid**: layouts using floats, absolute positioning, or fixed margins for alignment
- **Non-fluid containers**: elements with `max-width` but no `width: 100%` or equivalent
- **Hardcoded columns**: `grid-template-columns` with fixed column counts and no responsive variant

Flag each as: `warn` (fixed width on layout container), `info` (could benefit from fluid approach).

### 2b. Breakpoint Analysis (focus: breakpoints)

Check for breakpoint anti-patterns:

- **Desktop-first media queries**: `max-width` queries instead of mobile-first `min-width`
- **Non-standard breakpoints**: arbitrary values (e.g., `@media (min-width: 743px)`) that don't appear content-driven. Flag as `info` only — content-driven breakpoints are acceptable when standard steps don't align with the content (see Rules).
- **Missing breakpoints**: components with desktop styles but no mobile adaptation
- **Breakpoint overuse**: more than 4 breakpoints for a single component (over-engineering)
- **Tailwind**: classes without responsive prefixes on layout-affecting properties (`flex-row` without `flex-col` base)

Flag each as: `warn` (desktop-first or missing mobile), `info` (non-standard breakpoint).

### 2c. Stack Analysis (focus: stack)

Check for proper mobile stacking behavior:

- **Non-stacking flex rows**: `flex-row` or `flex` without `flex-col` at smaller breakpoints
- **Side-by-side on mobile**: two-column layouts that don't collapse to single column
- **Fixed grid columns on mobile**: grid layouts that maintain multi-column at small screens
- **Navbar**: horizontal navs without collapse/hamburger behavior at small screens
- **Cards in grids**: card grids that don't reflow to single-column on mobile

Flag each as: `warn` (content will overflow or be cramped on mobile).

### 2d. Responsive Spacing (focus: spacing)

Check for spacing that doesn't adapt:

- **Static padding/margin**: same padding on all breakpoints (e.g., `p-12` without `p-4 md:p-8 lg:p-12`)
- **Fixed gaps**: `gap-{N}` without responsive scaling
- **Container padding**: page-level containers without responsive horizontal padding
- **Section spacing**: large vertical spacing that doesn't reduce on mobile

Flag each as: `info` (spacing could scale), `warn` (large spacing will dominate small screens).

### 2e. Responsive Typography (focus: type)

Check for typography that doesn't scale:

- **Static font sizes**: large headings (>= 2xl) without responsive sizing
- **No clamp()**: heading sizes that should use `clamp()` or responsive Tailwind prefixes
- **Fixed line-height**: tight line-height on body text that doesn't loosen on mobile
- **Long line lengths**: no `max-width` or `max-w-prose` on text blocks (readability >75ch)

Flag each as: `info` (could benefit from scaling), `warn` (text will be too large/small on mobile).

### 2f. Visibility Analysis (focus: visibility)

Check for content priority across breakpoints:

- **No responsive hiding**: secondary UI elements (sidebars, metadata, decorative elements) shown at all sizes
- **Hidden primary content**: important content hidden on mobile via `hidden md:block` or similar
- **Missing mobile alternatives**: desktop navigation hidden on mobile with no mobile nav replacement
- **Redundant content**: same information shown twice (once for mobile layout, once for desktop) without proper hiding

Flag each as: `info` (could benefit from visibility control), `warn` (content priority issue).

### What to record for each issue
- File path and line number
- Issue category (layout | breakpoint | stack | spacing | type | visibility)
- Raw code (the problematic class string or CSS declaration)
- Severity (warn | info)

If mode is `analyse`, stop here. Show the findings report and do not propose or apply edits.

## Phase 3: Plan

Based on findings, propose specific responsive transformations:

### Layout fixes
1. Replace fixed widths with `w-full` + `max-w-{size}` or percentage-based widths.
2. Convert float/absolute layouts to flex or grid.
3. Add `width: 100%` to containers that only have `max-width`.

### Breakpoint fixes
4. Convert `max-width` media queries to `min-width` (mobile-first).
5. Normalize breakpoints to standard steps (sm: 640px, md: 768px, lg: 1024px, xl: 1280px).
6. For Tailwind: ensure layout classes have mobile-first base + responsive overrides.

### Stack fixes
7. Add `flex-col` base with `md:flex-row` or `lg:flex-row` for side-by-side layouts.
8. Convert fixed grid columns to responsive: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.
9. Ensure navbars have mobile collapse behavior.

### Responsive spacing fixes
10. Add responsive spacing progression: `p-4 md:p-6 lg:p-8` patterns.
11. Scale gaps with breakpoints: `gap-4 md:gap-6 lg:gap-8`.
12. Add responsive container padding: `px-4 md:px-6 lg:px-8`.

### Responsive typography fixes
13. Add responsive text sizing: `text-2xl md:text-3xl lg:text-4xl` for headings.
14. Propose `clamp()` for fluid typography where appropriate.
15. Add `max-w-prose` or `max-w-[65ch]` to text blocks for readability.

### Visibility fixes
16. Add `hidden md:block` for secondary desktop content.
17. Add `md:hidden` for mobile-only alternatives.
18. Ensure mobile navigation exists when desktop nav is hidden on small screens.

**Rate each edit**: `low` risk (adding responsive prefix to existing class), `medium` risk (restructuring flex/grid direction), `high` risk (hiding/showing content, changing layout structure).

Present the plan using the report format from `10x-foundation`.

If mode is `plan`, stop here. Show the report with proposed fixes and do not apply edits.

## Phase 4: Apply (only if mode = apply)

Apply the proposed edits:

1. Work file by file, showing each change before making it.
2. For Tailwind: add responsive prefixes (`sm:`, `md:`, `lg:`) to existing classes and add mobile-first base classes.
3. For CSS: convert to mobile-first media queries with `min-width` breakpoints.
4. For style objects: add responsive logic using framework-appropriate patterns (useMediaQuery, CSS-in-JS breakpoints).
5. Preserve any existing responsive behavior — only enhance, never remove responsive classes.
6. After all edits, summarize what was changed.

## Rules

- **Mobile-first always**: base styles = mobile, add complexity with `min-width` / responsive prefixes.
- **Never remove existing responsive classes** — only add or adjust.
- **Never hide primary content on mobile** without providing an alternative.
- **Preserve intentional fixed widths** on icons, avatars, logos, and other inherently fixed-size elements.
- **Do not modify image elements** — responsive image handling (srcset, next/image, picture element) is outside the scope of this skill. Preserve existing image markup as-is.
- **Do not modify third-party component libraries**.
- **Content-driven breakpoints**: if a layout breaks at a specific content width, that's the right breakpoint — don't force standard steps if the content dictates otherwise.
- When unsure, report rather than fix. Conservative is better than breaking layouts.
- If a file has more than 20 responsive issues, summarize the top issues and suggest the user narrow the scope.
