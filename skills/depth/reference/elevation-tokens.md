# Elevation Token Reference

## Elevation Scale

Each level combines two shadow stops for realism: an **ambient** shadow (wide, subtle — simulates diffuse environmental light) and a **key** shadow (tighter, darker — simulates directional light from above).

### Surface Delta

As elements rise in elevation, they should also become slightly lighter to simulate increased ambient light. The "surface delta" in the tables below represents a percentage increase in lightness applied to the element's background color relative to the base surface.

**How to compute**: Given a base surface in HSL (e.g., `hsl(210, 20%, 95%)`), a +3% delta produces `hsl(210, 20%, 98%)`. Use HSL lightness adjustments, CSS `color-mix()`, or preprocessor functions to compute deltas consistently.

**Relationship to shadows**: Surface delta is applied *alongside* shadows, not instead of them. Both work together — the shadow provides depth perception while the tint shift reinforces the visual layer separation.

### Material-Like Style

Best for: professional apps, dashboards, SaaS products.

| Level | Role | CSS `box-shadow` | Surface delta |
|-------|------|-------------------|---------------|
| 0 | Flat / canvas | `none` | 0% |
| 1 | Cards, list items | `0 1px 2px rgba(0,0,0,.12), 0 1px 1px rgba(0,0,0,.08)` | +1% lighter |
| 2 | Raised cards, hover | `0 2px 6px rgba(0,0,0,.14), 0 2px 2px rgba(0,0,0,.10)` | +2% lighter |
| 3 | Dropdowns, popovers | `0 6px 18px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.10)` | +3% lighter |
| 4 | Modals, dialogs | `0 10px 30px rgba(0,0,0,.18), 0 6px 10px rgba(0,0,0,.10)` | +4% lighter |
| 5 | Toasts, top overlays | `0 16px 48px rgba(0,0,0,.20), 0 10px 16px rgba(0,0,0,.12)` | +5% lighter |

### Soft UI Style

Best for: consumer apps, creative tools, lighter aesthetic.

| Level | Role | CSS `box-shadow` | Surface delta |
|-------|------|-------------------|---------------|
| 0 | Flat | `none` | 0% |
| 1 | Cards | `0 1px 3px rgba(0,0,0,.08)` | +1% lighter |
| 2 | Raised | `0 4px 10px rgba(0,0,0,.10)` | +2% lighter |
| 3 | Dropdowns | `0 8px 20px rgba(0,0,0,.12)` | +3% lighter |
| 4 | Modals | `0 12px 30px rgba(0,0,0,.14)` | +4% lighter |
| 5 | Overlays | `0 18px 48px rgba(0,0,0,.16)` | +5% lighter |

### CSS Token Output

```css
:root {
  /* Material-like elevation */
  --10x-shadow-0: none;
  --10x-shadow-1: 0 1px 2px rgba(0,0,0,.12), 0 1px 1px rgba(0,0,0,.08);
  --10x-shadow-2: 0 2px 6px rgba(0,0,0,.14), 0 2px 2px rgba(0,0,0,.10);
  --10x-shadow-3: 0 6px 18px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.10);
  --10x-shadow-4: 0 10px 30px rgba(0,0,0,.18), 0 6px 10px rgba(0,0,0,.10);
  --10x-shadow-5: 0 16px 48px rgba(0,0,0,.20), 0 10px 16px rgba(0,0,0,.12);
}
```

### Tailwind Mapping

```js
boxShadow: {
  '10x-0': 'none',
  '10x-1': '0 1px 2px rgba(0,0,0,.12), 0 1px 1px rgba(0,0,0,.08)',
  '10x-2': '0 2px 6px rgba(0,0,0,.14), 0 2px 2px rgba(0,0,0,.10)',
  '10x-3': '0 6px 18px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.10)',
  '10x-4': '0 10px 30px rgba(0,0,0,.18), 0 6px 10px rgba(0,0,0,.10)',
  '10x-5': '0 16px 48px rgba(0,0,0,.20), 0 10px 16px rgba(0,0,0,.12)',
}
```

## Elevation Role Assignment

When analyzing a component, assign its elevation by what it does:

| Component pattern | Typical level | Notes |
|-------------------|---------------|-------|
| Page background, canvas | 0 | Never elevate |
| Card, tile, list row | 1 | Subtle separation from canvas |
| Card on hover, selected item | 2 | Interactive feedback |
| Dropdown menu, popover, tooltip | 3 | Floats above content |
| Modal, dialog, drawer, sheet | 4 | Blocks interaction with content below |
| Toast, snackbar, notification | 5 | Highest priority, always on top |
| Sticky header, app bar | 2-3 | Depends on scroll context |
| FAB / floating action button | 3 | Floats above content |
