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

  --10x-surface-canvas: var(--10x-color-neutral-50);
  --10x-surface-default: color-mix(in oklch, var(--10x-color-neutral-50), white 3%);
  --10x-surface-raised: color-mix(in oklch, var(--10x-color-neutral-50), white 6%);
  --10x-surface-overlay: color-mix(in oklch, var(--10x-color-neutral-50), white 9%);
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

### Color Tokens

```css
:root {
  /* Brand Scale (example: blue, hue 220) */
  --10x-color-brand-50: hsl(220, 27%, 97%);
  --10x-color-brand-100: hsl(220, 36%, 94%);
  --10x-color-brand-200: hsl(220, 45%, 90%);
  --10x-color-brand-300: hsl(220, 54%, 82%);
  --10x-color-brand-400: hsl(220, 72%, 70%);
  --10x-color-brand-500: hsl(220, 90%, 55%);
  --10x-color-brand-600: hsl(220, 86%, 48%);
  --10x-color-brand-700: hsl(220, 81%, 40%);
  --10x-color-brand-800: hsl(220, 72%, 30%);
  --10x-color-brand-900: hsl(220, 63%, 20%);

  /* Neutral Scale (brand-tinted grays) */
  --10x-color-neutral-50: hsl(220, 5%, 98%);
  --10x-color-neutral-100: hsl(220, 5%, 96%);
  --10x-color-neutral-200: hsl(220, 5%, 90%);
  --10x-color-neutral-300: hsl(220, 5%, 82%);
  --10x-color-neutral-400: hsl(220, 3%, 64%);
  --10x-color-neutral-500: hsl(220, 3%, 46%);
  --10x-color-neutral-600: hsl(220, 4%, 34%);
  --10x-color-neutral-700: hsl(220, 5%, 25%);
  --10x-color-neutral-800: hsl(220, 6%, 15%);
  --10x-color-neutral-900: hsl(220, 8%, 9%);
  --10x-color-neutral-950: hsl(220, 10%, 5%);

  /* Semantic: Success */
  --10x-color-success-50: hsl(145, 30%, 97%);
  --10x-color-success-200: hsl(145, 50%, 90%);
  --10x-color-success-600: hsl(145, 70%, 35%);
  --10x-color-success-700: hsl(145, 70%, 28%);

  /* Semantic: Error */
  --10x-color-error-50: hsl(0, 30%, 97%);
  --10x-color-error-200: hsl(0, 50%, 90%);
  --10x-color-error-600: hsl(0, 72%, 48%);
  --10x-color-error-700: hsl(0, 72%, 40%);

  /* Semantic: Warning */
  --10x-color-warning-50: hsl(38, 30%, 97%);
  --10x-color-warning-200: hsl(38, 50%, 90%);
  --10x-color-warning-600: hsl(38, 80%, 45%);
  --10x-color-warning-700: hsl(38, 80%, 38%);

  /* Semantic: Info */
  --10x-color-info-50: hsl(220, 30%, 97%);
  --10x-color-info-200: hsl(220, 50%, 90%);
  --10x-color-info-600: hsl(220, 72%, 48%);
  --10x-color-info-700: hsl(220, 72%, 40%);

  /* Functional Roles */
  --10x-color-bg-page: var(--10x-color-neutral-50);
  --10x-color-bg-surface: white;
  --10x-color-bg-raised: var(--10x-color-neutral-100);
  --10x-color-bg-subtle: var(--10x-color-brand-50);
  --10x-color-border: var(--10x-color-neutral-200);
  --10x-color-border-subtle: var(--10x-color-neutral-100);
  --10x-color-text-primary: var(--10x-color-neutral-900);
  --10x-color-text-secondary: var(--10x-color-neutral-600);
  --10x-color-text-tertiary: var(--10x-color-neutral-400);
  --10x-color-text-disabled: var(--10x-color-neutral-300);
}
```

### Typography Tokens

```css
:root {
  /* Type Scale (minor-third 1.2x, base 16px) */
  --10x-type-size-xs: 0.694rem;    /* ~11px */
  --10x-type-size-sm: 0.833rem;    /* ~13px */
  --10x-type-size-base: 1rem;      /* 16px */
  --10x-type-size-lg: 1.2rem;      /* ~19px */
  --10x-type-size-xl: 1.44rem;     /* ~23px */
  --10x-type-size-2xl: 1.728rem;   /* ~28px */
  --10x-type-size-3xl: 2.074rem;   /* ~33px */
  --10x-type-size-4xl: 2.488rem;   /* ~40px */
  --10x-type-size-5xl: 2.986rem;   /* ~48px */

  /* Line Height */
  --10x-type-leading-tight: 1.1;
  --10x-type-leading-snug: 1.25;
  --10x-type-leading-normal: 1.5;
  --10x-type-leading-relaxed: 1.625;

  /* Letter Spacing */
  --10x-type-tracking-tight: -0.02em;
  --10x-type-tracking-normal: 0;
  --10x-type-tracking-wide: 0.02em;
  --10x-type-tracking-caps: 0.06em;

  /* Font Weight */
  --10x-type-weight-body: 400;
  --10x-type-weight-label: 500;
  --10x-type-weight-subheading: 600;
  --10x-type-weight-heading: 700;
  --10x-type-weight-display: 800;

  /* Font Family */
  --10x-type-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --10x-type-font-mono: ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace;

  /* Text Color */
  --10x-type-color-primary: #111;
  --10x-type-color-secondary: #555;
  --10x-type-color-tertiary: #999;
  --10x-type-color-disabled: #ccc;
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
  },
  "color": {
    "brand": {
      "50": { "$value": "hsl(220, 27%, 97%)", "$type": "color" },
      "500": { "$value": "hsl(220, 90%, 55%)", "$type": "color" },
      "600": { "$value": "hsl(220, 86%, 48%)", "$type": "color" },
      "700": { "$value": "hsl(220, 81%, 40%)", "$type": "color" },
      "900": { "$value": "hsl(220, 63%, 20%)", "$type": "color" }
    },
    "neutral": {
      "50": { "$value": "hsl(220, 5%, 98%)", "$type": "color" },
      "200": { "$value": "hsl(220, 5%, 90%)", "$type": "color" },
      "600": { "$value": "hsl(220, 4%, 34%)", "$type": "color" },
      "900": { "$value": "hsl(220, 8%, 9%)", "$type": "color" }
    },
    "success": { "600": { "$value": "hsl(145, 70%, 35%)", "$type": "color" } },
    "error": { "600": { "$value": "hsl(0, 72%, 48%)", "$type": "color" } },
    "warning": { "600": { "$value": "hsl(38, 80%, 45%)", "$type": "color" } }
  },
  "typography": {
    "size": {
      "xs": { "$value": "0.694rem", "$type": "dimension" },
      "sm": { "$value": "0.833rem", "$type": "dimension" },
      "base": { "$value": "1rem", "$type": "dimension" },
      "lg": { "$value": "1.2rem", "$type": "dimension" },
      "xl": { "$value": "1.44rem", "$type": "dimension" },
      "2xl": { "$value": "1.728rem", "$type": "dimension" },
      "3xl": { "$value": "2.074rem", "$type": "dimension" },
      "4xl": { "$value": "2.488rem", "$type": "dimension" },
      "5xl": { "$value": "2.986rem", "$type": "dimension" }
    },
    "leading": {
      "tight": { "$value": "1.1", "$type": "number" },
      "snug": { "$value": "1.25", "$type": "number" },
      "normal": { "$value": "1.5", "$type": "number" },
      "relaxed": { "$value": "1.625", "$type": "number" }
    },
    "weight": {
      "body": { "$value": "400", "$type": "fontWeight" },
      "label": { "$value": "500", "$type": "fontWeight" },
      "subheading": { "$value": "600", "$type": "fontWeight" },
      "heading": { "$value": "700", "$type": "fontWeight" },
      "display": { "$value": "800", "$type": "fontWeight" }
    }
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
      fontSize: {
        '10x-xs': '0.694rem',
        '10x-sm': '0.833rem',
        '10x-base': '1rem',
        '10x-lg': '1.2rem',
        '10x-xl': '1.44rem',
        '10x-2xl': '1.728rem',
        '10x-3xl': '2.074rem',
        '10x-4xl': '2.488rem',
        '10x-5xl': '2.986rem',
      },
      lineHeight: {
        '10x-tight': '1.1',
        '10x-snug': '1.25',
        '10x-normal': '1.5',
        '10x-relaxed': '1.625',
      },
      fontWeight: {
        '10x-body': '400',
        '10x-label': '500',
        '10x-subheading': '600',
        '10x-heading': '700',
        '10x-display': '800',
      },
      letterSpacing: {
        '10x-tight': '-0.02em',
        '10x-normal': '0',
        '10x-wide': '0.02em',
        '10x-caps': '0.06em',
      },
      colors: {
        brand: {
          50: 'hsl(220, 27%, 97%)',
          100: 'hsl(220, 36%, 94%)',
          200: 'hsl(220, 45%, 90%)',
          300: 'hsl(220, 54%, 82%)',
          400: 'hsl(220, 72%, 70%)',
          500: 'hsl(220, 90%, 55%)',
          600: 'hsl(220, 86%, 48%)',
          700: 'hsl(220, 81%, 40%)',
          800: 'hsl(220, 72%, 30%)',
          900: 'hsl(220, 63%, 20%)',
        },
        neutral: {
          50: 'hsl(220, 5%, 98%)',
          100: 'hsl(220, 5%, 96%)',
          200: 'hsl(220, 5%, 90%)',
          300: 'hsl(220, 5%, 82%)',
          400: 'hsl(220, 3%, 64%)',
          500: 'hsl(220, 3%, 46%)',
          600: 'hsl(220, 4%, 34%)',
          700: 'hsl(220, 5%, 25%)',
          800: 'hsl(220, 6%, 15%)',
          900: 'hsl(220, 8%, 9%)',
          950: 'hsl(220, 10%, 5%)',
        },
        success: {
          50: 'hsl(145, 30%, 97%)',
          600: 'hsl(145, 70%, 35%)',
          700: 'hsl(145, 70%, 28%)',
        },
        error: {
          50: 'hsl(0, 30%, 97%)',
          600: 'hsl(0, 72%, 48%)',
          700: 'hsl(0, 72%, 40%)',
        },
        warning: {
          50: 'hsl(38, 30%, 97%)',
          600: 'hsl(38, 80%, 45%)',
          700: 'hsl(38, 80%, 38%)',
        },
      },
    },
  },
}
```
