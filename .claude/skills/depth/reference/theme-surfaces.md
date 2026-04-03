# Theme Surface Reference

## Surface Layer Model

Surfaces create visual separation through background color differentiation. Each layer is a subtle tint shift from the base color.

### Layer Roles

| Layer | Role | Usage |
|-------|------|-------|
| Canvas | Page background | The base layer everything sits on |
| Surface | Default container | Cards, panels, content areas |
| Raised | Interactive / emphasized | Hover states, selected items, emphasized cards |
| Overlay | Floating UI | Modals, dropdowns, sheets |

### Light Mode Surfaces

Base: white or near-white (`#ffffff`, `#fafafa`).

```css
:root {
  --10x-surface-canvas: #ffffff;
  --10x-surface-default: #fafafa;
  --10x-surface-raised: #f5f5f5;
  --10x-surface-overlay: #ffffff;
}
```

Overlay returns to white because it relies on shadow (elevation) for separation rather than tint.

### Dark Mode Surfaces

Base: dark gray (`#121212` to `#1a1a1a`). In dark mode, higher elevation = lighter tint (surfaces "rise toward the light").

```css
[data-theme="dark"], .dark, @media (prefers-color-scheme: dark) {
  --10x-surface-canvas: #121212;
  --10x-surface-default: #1e1e1e;
  --10x-surface-raised: #2a2a2a;
  --10x-surface-overlay: #333333;
}
```

### Using `color-mix()` for dynamic tinting

For projects that support modern CSS:

```css
:root {
  --10x-color-base: #ffffff;
  --10x-surface-canvas: var(--10x-color-base);
  --10x-surface-default: color-mix(in oklch, var(--10x-color-base) 97%, gray);
  --10x-surface-raised: color-mix(in oklch, var(--10x-color-base) 94%, gray);
  --10x-surface-overlay: var(--10x-color-base);
}
```

## Dark Mode Shadow Adjustments

Shadows behave differently in dark mode. Standard black shadows disappear against dark backgrounds.

### Rules for dark mode shadows

1. **Reduce shadow opacity** by ~30-50% compared to light mode (they're less visible anyway)
2. **Add subtle borders** (`1px solid rgba(255,255,255,.06)`) to compensate for lost shadow visibility
3. **Increase surface tint differentiation** to do more separation work than shadow alone
4. **Never use pure black shadows** in dark mode — use slightly tinted shadows that match the color scheme

### Dark mode shadow tokens

```css
[data-theme="dark"], .dark {
  --10x-shadow-1: 0 1px 2px rgba(0,0,0,.30), 0 0 0 1px rgba(255,255,255,.05);
  --10x-shadow-2: 0 2px 6px rgba(0,0,0,.35), 0 0 0 1px rgba(255,255,255,.05);
  --10x-shadow-3: 0 6px 18px rgba(0,0,0,.40), 0 0 0 1px rgba(255,255,255,.06);
  --10x-shadow-4: 0 10px 30px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.06);
  --10x-shadow-5: 0 16px 48px rgba(0,0,0,.50), 0 0 0 1px rgba(255,255,255,.08);
}
```

Note: the `0 0 0 1px` shadow acts as an inset border without affecting layout.

## Contrast Validation

When applying surface tints, verify:

- Text on `surface-default` meets WCAG AA contrast (4.5:1 for normal text, 3:1 for large text)
- Text on `surface-raised` meets the same thresholds
- Interactive elements on `surface-overlay` remain distinguishable
- Border colors between surface layers provide at least 3:1 contrast with both adjacent surfaces
