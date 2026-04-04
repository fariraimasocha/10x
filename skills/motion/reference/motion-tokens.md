# Motion Token Reference

## Duration Presets

Three style presets control the overall motion personality:

### Subtle (minimal, professional)
| Token | Value | Use case |
|-------|-------|----------|
| `--10x-duration-fast` | 90ms | Hover, focus, toggle |
| `--10x-duration-mid` | 140ms | Expand, collapse, reveal |
| `--10x-duration-slow` | 200ms | Page transitions, large reveals |

### Standard (balanced, default)
| Token | Value | Use case |
|-------|-------|----------|
| `--10x-duration-fast` | 120ms | Hover, focus, toggle |
| `--10x-duration-mid` | 180ms | Expand, collapse, reveal |
| `--10x-duration-slow` | 260ms | Page transitions, large reveals |

### Expressive (playful, consumer-facing)
| Token | Value | Use case |
|-------|-------|----------|
| `--10x-duration-fast` | 150ms | Hover, focus, toggle |
| `--10x-duration-mid` | 250ms | Expand, collapse, reveal |
| `--10x-duration-slow` | 400ms | Page transitions, large reveals |

## Easing

One standard easing curve for most interactions:

```css
--10x-easing-standard: cubic-bezier(.2, 0, 0, 1);
```

This is a "fast out, slow in" curve — elements accelerate quickly and decelerate gently. It feels natural for most UI transitions.

For enter/exit patterns:
```css
--10x-easing-enter: cubic-bezier(0, 0, 0.2, 1);   /* decelerate into rest */
--10x-easing-exit: cubic-bezier(0.4, 0, 1, 1);     /* accelerate out */
```

## Safe vs Dangerous Properties

### Safe (compositor-only, no layout/paint cost)
- `transform` (translate, scale, rotate, skew)
- `opacity`
- `filter` (blur, brightness — paint cost but no layout)
- `clip-path` (paint only)

### Dangerous (trigger layout recalculation)
- `width`, `height`, `min-width`, `max-width`
- `margin`, `padding`
- `top`, `right`, `bottom`, `left`
- `border-width`
- `font-size`, `line-height`
- `flex-basis`, `flex-grow`

### Replacements

| Dangerous property | Safe alternative |
|-------------------|------------------|
| `width` / `height` | `transform: scale()` |
| `top` / `left` | `transform: translate()` |
| `margin-top` (for slide) | `transform: translateY()` |
| `height: 0 → auto` | `transform: scaleY()` with `transform-origin: top` or use `grid-template-rows: 0fr → 1fr` |

## CSS Token Output

```css
:root {
  /* Durations (standard preset) */
  --10x-duration-fast: 120ms;
  --10x-duration-mid: 180ms;
  --10x-duration-slow: 260ms;

  /* Easing */
  --10x-easing-standard: cubic-bezier(.2, 0, 0, 1);
  --10x-easing-enter: cubic-bezier(0, 0, 0.2, 1);
  --10x-easing-exit: cubic-bezier(0.4, 0, 1, 1);
}
```

## Tailwind Mapping

```js
transitionDuration: {
  '10x-fast': '120ms',
  '10x-mid': '180ms',
  '10x-slow': '260ms',
},
transitionTimingFunction: {
  '10x': 'cubic-bezier(.2, 0, 0, 1)',
  '10x-enter': 'cubic-bezier(0, 0, 0.2, 1)',
  '10x-exit': 'cubic-bezier(0.4, 0, 1, 1)',
}
```

## Common Transition Recipes

### Button hover/focus
```css
.btn {
  transition:
    background-color var(--10x-duration-fast) var(--10x-easing-standard),
    transform var(--10x-duration-fast) var(--10x-easing-standard),
    box-shadow var(--10x-duration-fast) var(--10x-easing-standard);
}
.btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--10x-shadow-2);
}
.btn:active {
  transform: translateY(0);
}
```

### Card hover elevation
```css
.card {
  transition: box-shadow var(--10x-duration-mid) var(--10x-easing-standard);
  box-shadow: var(--10x-shadow-1);
}
.card:hover {
  box-shadow: var(--10x-shadow-2);
}
```

### Fade-in on mount
```css
@keyframes 10x-fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in {
  animation: 10x-fade-in var(--10x-duration-mid) var(--10x-easing-enter);
}
```

### Expand/collapse
```css
.collapsible {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--10x-duration-mid) var(--10x-easing-standard);
}
.collapsible[open] {
  grid-template-rows: 1fr;
}
.collapsible > * {
  overflow: hidden;
}
```
