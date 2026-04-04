# Reduced Motion Reference

## The Standard Block

Every project analyzed by 10x must include this `prefers-reduced-motion` media query. If it's missing, `/motion` flags it as an `error`.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Why 0.001ms instead of 0?

Setting duration to `0` can break JavaScript that listens for `animationend` or `transitionend` events. Using `0.001ms` fires the event immediately while still being effectively instant.

## Placement

The reduced-motion block should go in:
- The project's global stylesheet (`globals.css`, `app.css`, `index.css`)
- Or in a dedicated `reduced-motion.css` imported at the root

It should be loaded **after** all other styles so the `!important` overrides take effect.

## WCAG Context

**WCAG 2.3.3 — Animation from Interactions** (AAA): Motion triggered by user interaction can be disabled unless the animation is essential to the functionality or the information being conveyed.

**Essential motion examples** (do NOT disable):
- Progress indicators that show loading state
- Scroll position (the page must still scroll)
- Video/media playback controls
- Drag and drop visual feedback during the drag

**Non-essential motion** (MUST be disableable):
- Hover effects (scale, translate, shadow transitions)
- Page transition animations
- Parallax scrolling
- Auto-playing decorative animations
- Entrance animations (fade-in, slide-in)
- Skeleton loading shimmer

## In-App Toggle Pattern

For projects that want an explicit UI toggle (beyond OS-level preference):

```css
:root {
  --10x-motion-ok: 1; /* default: motion enabled */
}

/* Respect OS preference */
@media (prefers-reduced-motion: reduce) {
  :root {
    --10x-motion-ok: 0;
  }
}

/* Allow override via data attribute */
[data-reduce-motion="true"] {
  --10x-motion-ok: 0;
}
[data-reduce-motion="false"] {
  --10x-motion-ok: 1;
}
```

Usage in transitions (requires `@property` registration or calc tricks):

```css
.animated {
  transition-duration: calc(var(--10x-motion-ok) * var(--10x-duration-mid));
}
```

## Tailwind Consideration

Tailwind v3.1+ supports `motion-reduce:` and `motion-safe:` variants:

```html
<div class="motion-safe:animate-fade-in motion-reduce:animate-none">
```

When analyzing Tailwind projects, check that motion utilities are paired with `motion-reduce:` variants.

## Checklist for `/motion` Analysis

When checking reduced-motion support, verify:

- [ ] A global `prefers-reduced-motion` media query exists
- [ ] All `@keyframes` animations are covered by the global block OR have individual reduced-motion handling
- [ ] JavaScript-driven animations check `matchMedia('(prefers-reduced-motion: reduce)')` before running
- [ ] Tailwind motion utilities use `motion-safe:` / `motion-reduce:` variants
- [ ] No essential functionality breaks when motion is disabled (forms still submit, navigation still works, modals still open)
