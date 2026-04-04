# Type Hierarchy, Spacing, Contrast & Alignment Reference

Typography is layout + spacing + hierarchy + consistency. Fonts are maybe 10% of it.

## 1. Hierarchy

Typography creates visual priority. Users scan, they don't read — hierarchy tells them where to look.

### Rules

- **One clear primary heading** per view/section. Never two H1s competing.
- **1-2 secondary levels** (H2, H3) to structure content beneath.
- **Everything else fades**: body, labels, captions recede in size, weight, and color.
- **Size jump between levels** must be perceptible — at least 1 scale step (e.g., not 18px to 19px).

### Weight + Size Pairings

| Role | Size Step | Weight | Token |
|------|-----------|--------|-------|
| Display / Hero | 5xl | 700-800 (bold/extrabold) | `--10x-type-weight-display` |
| Page heading (H1) | 4xl | 700 (bold) | `--10x-type-weight-heading` |
| Section heading (H2) | 3xl | 600-700 (semibold/bold) | `--10x-type-weight-heading` |
| Subsection (H3) | 2xl | 600 (semibold) | `--10x-type-weight-subheading` |
| Card title (H4) | xl | 600 (semibold) | `--10x-type-weight-subheading` |
| Large body | lg | 400-500 (regular/medium) | `--10x-type-weight-body` |
| Body | base | 400 (regular) | `--10x-type-weight-body` |
| Label / Helper | sm | 500 (medium) | `--10x-type-weight-label` |
| Caption / Fine print | xs | 400 (regular) | `--10x-type-weight-caption` |

### Hierarchy Anti-Patterns

- All headings the same size or weight (no differentiation)
- Body text bolder than subheadings
- Using color alone for hierarchy (must pair with size or weight)
- Too many heading levels (more than 4 is usually noise)

## 2. Line Height

Line height controls readability. Too tight = cramped. Too loose = disconnected.

### Rules

| Text type | Line height | Why |
|-----------|-------------|-----|
| Body (base, sm) | 1.5 – 1.6 | Breathable, easy to scan multi-line paragraphs |
| Large body (lg) | 1.4 – 1.5 | Slightly tighter, still comfortable |
| Headings (xl+) | 1.1 – 1.25 | Tight — headings are short, need visual mass |
| Display (4xl+) | 1.0 – 1.15 | Very tight — big text has built-in whitespace |
| Captions (xs) | 1.4 – 1.5 | Small text needs room to breathe |

### Token Mapping

| Token | Value | Use |
|-------|-------|-----|
| `--10x-type-leading-tight` | 1.1 | Display and large headings |
| `--10x-type-leading-snug` | 1.25 | Subheadings, card titles |
| `--10x-type-leading-normal` | 1.5 | Body text, paragraphs |
| `--10x-type-leading-relaxed` | 1.625 | Small text, captions, helper text |

## 3. Letter Spacing (Tracking)

### Rules

- **Large text (xl and above)**: Use slight negative tracking (-0.01em to -0.02em). Large letters have too much natural space.
- **Body text (base)**: Leave at 0 or default. Don't touch it.
- **Small text (sm, xs)**: Slight positive tracking (+0.01em to +0.02em). Tiny letters need extra room.
- **ALL CAPS text**: Always add positive tracking (+0.05em to +0.1em). Capitals are dense without it.

### Token Mapping

| Token | Value | Use |
|-------|-------|-----|
| `--10x-type-tracking-tight` | -0.02em | Display, hero text |
| `--10x-type-tracking-normal` | 0 | Body text |
| `--10x-type-tracking-wide` | 0.02em | Small text, labels |
| `--10x-type-tracking-caps` | 0.06em | Uppercase text, badges |

## 4. Contrast

Typography works when contrast is obvious. Low contrast = confusing UI.

### Rules

- **Bold vs regular**: Headings should be visibly heavier than body text. A 200+ weight difference is perceptible.
- **Big vs small**: Adjacent text levels should differ by at least 1 scale step.
- **Dark vs light**: Primary text should be high-contrast against background. Secondary text can be lighter/muted.

### Color Roles for Text

| Role | Token | Typical light mode | Typical dark mode |
|------|-------|--------------------|-------------------|
| Primary | `--10x-type-color-primary` | gray-900 / #111 | gray-100 / #f5f5f5 |
| Secondary | `--10x-type-color-secondary` | gray-600 / #555 | gray-400 / #999 |
| Tertiary | `--10x-type-color-tertiary` | gray-400 / #999 | gray-500 / #777 |
| Disabled | `--10x-type-color-disabled` | gray-300 / #ccc | gray-600 / #555 |
| Accent | `--10x-type-color-accent` | brand color | brand color (lighter) |

### Contrast Anti-Patterns

- All text the same color (no hierarchy)
- Secondary text nearly invisible (contrast ratio below 4.5:1)
- Using light gray on white for body text (insufficient contrast)
- Relying on color alone to convey meaning (accessibility issue)

## 5. Font Family

### Rules

- **1-2 fonts maximum**. One for UI (sans-serif), one optional accent (serif or mono).
- **Define roles**, not collections: which font is for headings? Body? Code?
- **System font stack** is an excellent default — fast, native-feeling, zero load time.

### Recommended System Stack

```css
--10x-type-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--10x-type-font-mono: ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace;
```

### Font Anti-Patterns

- More than 2 font families loaded
- Decorative fonts used for body text
- Different fonts for the same role across pages
- Loading 4+ weights of a web font (performance hit)

## 6. Alignment

### Rules

- **Left-align body text** by default. This is the most readable alignment for LTR languages.
- **Center-align sparingly**: hero headings, CTAs, short single-line text only.
- **Never center long paragraphs** — it creates ragged edges that slow reading.
- **Right-align only for numbers** in tables or specific layout needs.
- **Consistent edges**: within a component or section, all text should share the same alignment.

### Alignment Anti-Patterns

- Random mix of center and left alignment in the same card/section
- Centered paragraphs longer than 2 lines
- Right-aligned labels or headings (confusing in LTR)
- justify alignment for body text on screens (creates uneven word spacing)
