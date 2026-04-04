# Color System: Hierarchy, Semantics, Contrast & Usage

Color in UI is not about picking nice colors. It's about building a system that controls attention, hierarchy, and meaning.

## 1. Color = Hierarchy (Not Decoration)

Color tells users what to click, what matters, and what to ignore.

### Saturation Controls Attention

| Saturation level | Purpose | Examples |
|-----------------|---------|----------|
| High (brand-500 to brand-700) | Primary actions, key interactive elements | CTA buttons, active links, selected tabs |
| Medium (brand-300 to brand-400) | Supporting elements, secondary actions | Secondary buttons, active borders, badges |
| Low (brand-50 to brand-200) | Backgrounds, containers, subtle emphasis | Alert backgrounds, selected row highlights, tag fills |
| None (neutrals) | Everything else | Body text, borders, backgrounds, labels |

### The 80/20 Rule

- **80% of your UI should be neutral** (whites, grays, blacks). This is the foundation.
- **20% (or less) should use brand color**. The less you use it, the more it stands out.
- Brand color = used sparingly, intentionally, for things that need attention.

### Hierarchy Anti-Patterns

- Everything is colorful (nothing stands out because everything competes)
- CTA button is the same shade as background accents (no distinction)
- Using color for decoration rather than meaning
- Multiple competing brand colors fighting for attention

## 2. Neutral-First Design

Most of your UI should NOT be colorful.

### Why Neutrals Dominate

- Makes the UI clean and professional
- Makes actions and interactive elements stand out
- Reduces visual noise and cognitive load
- Easier to maintain and scale

### Neutral Roles

| Role | Token | Light mode | Dark mode |
|------|-------|------------|-----------|
| Page background | `--10x-color-bg-page` | neutral-50 | neutral-950 |
| Surface (cards, panels) | `--10x-color-bg-surface` | neutral-50 (avoid pure #ffffff) | neutral-900 |
| Raised surface (hover, active) | `--10x-color-bg-raised` | neutral-100 | neutral-800 |
| Subtle surface (selected rows, highlights) | `--10x-color-bg-subtle` | brand-50 | brand-950 |
| Primary border | `--10x-color-border` | neutral-200 | neutral-700 |
| Secondary border | `--10x-color-border-subtle` | neutral-100 | neutral-800 |
| Primary text | `--10x-color-text-primary` | neutral-900 | neutral-100 |
| Secondary text | `--10x-color-text-secondary` | neutral-600 | neutral-400 |
| Tertiary text | `--10x-color-text-tertiary` | neutral-400 | neutral-500 |
| Disabled text | `--10x-color-text-disabled` | neutral-300 | neutral-600 |
| Placeholder text | `--10x-color-text-placeholder` | neutral-400 | neutral-500 |

## 3. Semantic Colors (Meaning Layer)

Fixed colors for universal meaning. These never change across brands.

| Semantic role | Base hue | Token prefix | Use |
|--------------|----------|--------------|-----|
| Success | Green (145) | `--10x-color-success-{step}` | Confirmations, completed states, positive indicators |
| Error / Destructive | Red (0) | `--10x-color-error-{step}` | Validation errors, failed states, destructive actions |
| Warning | Amber (38) | `--10x-color-warning-{step}` | Caution states, approaching limits, requires attention |
| Info | Blue (220) | `--10x-color-info-{step}` | Informational messages, tips, help text |

Each semantic color needs its own mini-scale for flexibility:

| Use | Step |
|-----|------|
| Tinted background (alert, badge fill) | 50 |
| Border | 200 |
| Icon / text accent | 600 |
| High emphasis (button, bold indicator) | 700 |

### Semantic Anti-Patterns

- Using brand color for errors (confusing: is it an action or an error?)
- Using the same red for errors and destructive buttons without differentiation
- No dedicated warning color (using red for warnings dilutes the error signal)
- Semantic colors with no background variant (alerts with colored text on white look disjointed)

## 4. Contrast Rules

If users can't see it, it's broken.

### WCAG AA Requirements

| Element | Minimum ratio | Token guidance |
|---------|---------------|----------------|
| Normal text (< 18px / < 14px bold) | 4.5:1 | Use neutral-700+ on light bg, neutral-300- on dark bg |
| Large text (>= 18px / >= 14px bold) | 3:1 | Use neutral-600+ on light bg, neutral-400- on dark bg |
| UI components (icons, borders, inputs) | 3:1 | Use neutral-500+ for interactive borders |
| Decorative elements | None | No requirement for purely decorative elements |

### Contrast-Driven Hierarchy

- **Highest contrast** = most important (headings, CTA buttons)
- **Medium contrast** = supporting (body text, secondary buttons)
- **Low contrast** = de-emphasized (helper text, timestamps, metadata)
- **Lowest contrast** = disabled or decorative

### Contrast Anti-Patterns

- Light gray text on white background (below 4.5:1)
- Colored text on colored background without checking ratio
- Disabled elements with no visible difference from enabled
- Relying on color alone to indicate state (colorblind users cannot perceive)

## 5. Avoid Pure Colors

Common mistake: using extremes.

| Avoid | Use instead | Why |
|-------|-------------|-----|
| Pure black `#000000` | Softened black `neutral-900` (~`#111` to `#1a1a1a`) | Pure black is harsh, creates excessive contrast |
| Pure white `#ffffff` | Slightly warm white `neutral-50` (~`#fafafa`) | Pure white can feel sterile and glare on screens |
| Fully saturated `#ff0000` | Controlled saturation `red-600` | Fully saturated colors vibrate on screen and feel aggressive |

### Why Softened Colors Win

- Feels more polished and intentional
- Reduces eye strain
- Better color mixing when layered with other elements
- Consistent with how physical surfaces reflect light (nothing is pure black or white)

## 6. Color is Relative (Context Matters)

The same color looks different depending on surroundings.

### Rules

- Always test colors inside actual UI components, not in isolation on a white canvas.
- A color that looks right on white may look wrong on a dark sidebar.
- Adjacent saturated colors create vibration — separate them with neutrals.
- Transparent overlays shift perceived color of elements beneath.

### Testing Checklist

- [ ] Does the primary button stand out from the background?
- [ ] Can you read body text comfortably?
- [ ] Does secondary text look distinct from primary text?
- [ ] Do borders create subtle separation without competing with text?
- [ ] Do semantic colors (error, success) read correctly against their backgrounds?
- [ ] In dark mode, do brand colors still feel vibrant?

## 7. Interactive State Colors

Colors must communicate state changes consistently.

| State | Color treatment |
|-------|----------------|
| Default | Brand-600 (primary) or neutral styling |
| Hover | One step darker: brand-700 |
| Active / Pressed | Two steps darker: brand-800 |
| Focus | Brand-600 ring/outline (2px, offset) |
| Disabled | Neutral-300 bg, neutral-400 text (reduced contrast signals non-interactive) |
| Selected | Brand-50 bg with brand-600 accent (tinted background) |
| Error state | Error-600 border, error-50 bg |

### State Anti-Patterns

- Hover state identical to default (no feedback)
- Active state lighter than hover (feels backwards)
- Focus state invisible or removed entirely (`outline: none` without replacement)
- Disabled state with full color opacity (looks clickable)

## 8. Usage Budget

Not a hard rule, but a mental model:

| Color role | Approximate surface area |
|------------|-------------------------|
| Neutrals (bg, text, borders) | 80-85% |
| Brand primary | 10-15% |
| Semantic (success, error, warning) | 3-5% |
| Accent / secondary brand | 1-3% |

This ensures that when brand color appears, it means something. When semantic colors appear, they demand attention.
