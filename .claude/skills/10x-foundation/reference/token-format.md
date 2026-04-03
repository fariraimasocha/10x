# Token Format Reference

10x generates design tokens in two formats: CSS custom properties (default) and DTCG JSON.

## CSS Custom Properties

### Naming Convention

```
--10x-{category}-{name}
```

### Spacing Tokens

```css
:root {
  --10x-space-1: 0.25rem;   /* 4px */
  --10x-space-2: 0.5rem;    /* 8px */
  --10x-space-3: 0.75rem;   /* 12px */
  --10x-space-4: 1rem;      /* 16px */
  --10x-space-6: 1.5rem;    /* 24px */
  --10x-space-8: 2rem;      /* 32px */
  --10x-space-12: 3rem;     /* 48px */
  --10x-space-16: 4rem;     /* 64px */
}
```

### Elevation Tokens

```css
:root {
  --10x-shadow-0: none;
  --10x-shadow-1: 0 1px 2px rgba(0,0,0,.12), 0 1px 1px rgba(0,0,0,.08);
  --10x-shadow-2: 0 2px 6px rgba(0,0,0,.14), 0 2px 2px rgba(0,0,0,.10);
  --10x-shadow-3: 0 6px 18px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.10);
  --10x-shadow-4: 0 10px 30px rgba(0,0,0,.18), 0 6px 10px rgba(0,0,0,.10);
  --10x-shadow-5: 0 16px 48px rgba(0,0,0,.20), 0 10px 16px rgba(0,0,0,.12);

  --10x-surface-canvas: var(--10x-color-base);
  --10x-surface-default: color-mix(in oklch, var(--10x-color-base), white 3%);
  --10x-surface-raised: color-mix(in oklch, var(--10x-color-base), white 6%);
  --10x-surface-overlay: color-mix(in oklch, var(--10x-color-base), white 9%);
}
```

### Motion Tokens

```css
:root {
  --10x-duration-fast: 120ms;
  --10x-duration-mid: 180ms;
  --10x-duration-slow: 260ms;
  --10x-easing-standard: cubic-bezier(.2, 0, 0, 1);
}
```

## DTCG JSON Format

For interoperability with design tools (Figma Tokens, Style Dictionary, etc.), tokens can be exported in Design Tokens Community Group format:

```json
{
  "$name": "10x Tokens",
  "spacing": {
    "1": { "$value": "0.25rem", "$type": "dimension" },
    "2": { "$value": "0.5rem", "$type": "dimension" },
    "4": { "$value": "1rem", "$type": "dimension" }
  },
  "shadow": {
    "1": {
      "$value": [
        { "offsetX": "0", "offsetY": "1px", "blur": "2px", "spread": "0", "color": "rgba(0,0,0,.12)" },
        { "offsetX": "0", "offsetY": "1px", "blur": "1px", "spread": "0", "color": "rgba(0,0,0,.08)" }
      ],
      "$type": "shadow"
    }
  },
  "duration": {
    "fast": { "$value": "120ms", "$type": "duration" },
    "mid": { "$value": "180ms", "$type": "duration" },
    "slow": { "$value": "260ms", "$type": "duration" }
  }
}
```

## Tailwind Integration

When the project uses Tailwind, tokens map to `theme.extend` in `tailwind.config`:

```js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '10x-1': '0.25rem',
        '10x-2': '0.5rem',
        '10x-3': '0.75rem',
        '10x-4': '1rem',
        '10x-6': '1.5rem',
        '10x-8': '2rem',
      },
      boxShadow: {
        '10x-1': '0 1px 2px rgba(0,0,0,.12), 0 1px 1px rgba(0,0,0,.08)',
        '10x-2': '0 2px 6px rgba(0,0,0,.14), 0 2px 2px rgba(0,0,0,.10)',
      },
      transitionDuration: {
        '10x-fast': '120ms',
        '10x-mid': '180ms',
        '10x-slow': '260ms',
      },
      transitionTimingFunction: {
        '10x': 'cubic-bezier(.2, 0, 0, 1)',
      },
    },
  },
}
```
