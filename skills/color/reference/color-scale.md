# Color Scale Reference

A color scale is a set of shades generated from a single base hue. Using a scale creates visual consistency and eliminates arbitrary color picking.

## Core Principle

You don't pick colors — you generate a scale. Start with ONE base hue and derive everything from it.

## Scale Steps

Every brand or semantic color produces 10 steps:

| Step | Lightness | Saturation | Use |
|------|-----------|------------|-----|
| 50 | Very light (~97%) | Low (~30% of base) | Tinted backgrounds, subtle fills |
| 100 | Light (~94%) | Low (~40% of base) | Hover backgrounds, badges |
| 200 | Light (~90%) | Medium (~50% of base) | Active backgrounds, light borders |
| 300 | Medium-light (~82%) | Medium (~60% of base) | Borders, dividers |
| 400 | Medium (~70%) | High (~80% of base) | Placeholder text, disabled states |
| 500 | Base (~55%) | Full (100%) | Primary brand shade, icons |
| 600 | Medium-dark (~48%) | Full (~95%) | Primary buttons, links, interactive |
| 700 | Dark (~40%) | High (~90%) | Hover/active states for buttons |
| 800 | Very dark (~30%) | Medium (~80%) | Text on light backgrounds |
| 900 | Darkest (~20%) | Medium (~70%) | Headings, high-emphasis text |

## Generating a Scale from a Base Color

### Method: HSL Lightness + Saturation Curve

Given a base color in HSL (e.g., `hsl(220, 90%, 55%)` for blue):

```
Step 50:  hsl(H, S*0.30, 97%)
Step 100: hsl(H, S*0.40, 94%)
Step 200: hsl(H, S*0.50, 90%)
Step 300: hsl(H, S*0.60, 82%)
Step 400: hsl(H, S*0.80, 70%)
Step 500: hsl(H, S*1.00, 55%)   ← base
Step 600: hsl(H, S*0.95, 48%)
Step 700: hsl(H, S*0.90, 40%)
Step 800: hsl(H, S*0.80, 30%)
Step 900: hsl(H, S*0.70, 20%)
```

Adjust saturation and lightness slightly per-hue for perceptual uniformity. Warm colors (red, orange) may need less saturation at light steps to avoid looking washed out. Cool colors (blue, purple) can maintain higher saturation.

### Method: OKLCH (preferred for perceptual uniformity)

OKLCH produces more perceptually uniform scales:

```
Step 50:  oklch(0.97, 0.01, H)
Step 100: oklch(0.94, 0.03, H)
Step 200: oklch(0.90, 0.05, H)
Step 300: oklch(0.82, 0.08, H)
Step 400: oklch(0.70, 0.12, H)
Step 500: oklch(0.55, 0.18, H)   ← base chroma
Step 600: oklch(0.48, 0.17, H)
Step 700: oklch(0.40, 0.15, H)
Step 800: oklch(0.30, 0.12, H)
Step 900: oklch(0.20, 0.08, H)
```

## Neutral Scale (Brand-Tinted Grays)

Neutrals should NOT be pure grays. Tint them slightly with the brand hue for visual coherence.

### Generation

Given a brand hue H:

```
neutral-50:  hsl(H, 5%, 98%)    /* Page background (light) */
neutral-100: hsl(H, 5%, 96%)    /* Card backgrounds */
neutral-200: hsl(H, 5%, 90%)    /* Borders, dividers */
neutral-300: hsl(H, 5%, 82%)    /* Disabled borders */
neutral-400: hsl(H, 3%, 64%)    /* Placeholder text */
neutral-500: hsl(H, 3%, 46%)    /* Secondary icons */
neutral-600: hsl(H, 4%, 34%)    /* Secondary text */
neutral-700: hsl(H, 5%, 25%)    /* Primary text (dark) */
neutral-800: hsl(H, 6%, 15%)    /* Headings */
neutral-900: hsl(H, 8%, 9%)     /* High-emphasis text */
neutral-950: hsl(H, 10%, 5%)    /* Page background (dark mode) */
```

The key: saturation stays very low (3-10%) but the hue matches the brand. This makes grays feel intentional rather than generic.

## Common Base Hues

| Name | Hue (HSL) | Character |
|------|-----------|-----------|
| Blue | 220 | Professional, trustworthy, universal |
| Indigo | 240 | Modern, creative, tech-forward |
| Purple | 270 | Premium, creative, distinctive |
| Teal | 175 | Fresh, calm, health/wellness |
| Green | 145 | Growth, success, nature |
| Red | 0 | Energy, urgency, passion |
| Orange | 25 | Warm, friendly, approachable |

## Scale Anti-Patterns

- **Multiple base hues**: Using blue buttons, green headers, purple links. Pick ONE brand hue.
- **Missing steps**: Only having a dark and light variant with no middle shades. Build the full 50-900 scale.
- **Pure grays**: Using `#808080`, `#666`, `#999` without any brand tinting. Tint your neutrals.
- **Identical light steps**: 50 and 100 being visually the same — they should have distinct purposes.
- **Over-saturated backgrounds**: Using brand-500 or brand-600 for large surfaces. Backgrounds should use 50-100 steps.
- **Magic hex values**: Random hex codes like `#3d7bf4` that don't belong to any scale.
- **Copy-pasted palettes**: Using a palette from another brand without adapting to your base hue.

## Dark Mode Scale Behavior

In dark mode, the scale usage inverts:

| Light mode purpose | Light mode step | Dark mode step |
|--------------------|-----------------|----------------|
| Page background | neutral-50 | neutral-950 |
| Card background | neutral-100 / white | neutral-900 |
| Borders | neutral-200 | neutral-700 |
| Secondary text | neutral-600 | neutral-400 |
| Primary text | neutral-900 | neutral-100 |
| Primary button bg | brand-600 | brand-500 |
| Primary button hover | brand-700 | brand-400 |

Brand colors shift 1-3 steps lighter in dark mode to maintain perceived vibrancy against dark backgrounds.
