# Breakpoint System Reference

## Standard Breakpoint Scale

The 10x responsive system uses Tailwind's standard breakpoint scale as the canonical reference:

| Name | Min-width | Target | Tailwind prefix |
|------|-----------|--------|-----------------|
| base | 0px | Mobile phones (portrait) | (none) |
| sm | 640px | Mobile phones (landscape), small tablets | `sm:` |
| md | 768px | Tablets (portrait) | `md:` |
| lg | 1024px | Tablets (landscape), small desktops | `lg:` |
| xl | 1280px | Desktops | `xl:` |
| 2xl | 1536px | Large desktops | `2xl:` |

## Mobile-First Rule

**Always design from mobile up.** Base styles (no prefix / no media query) represent the smallest screen.

### Why mobile-first works

1. Forces you to prioritize content — what matters most on a constrained screen
2. Progressive enhancement — add complexity as space allows
3. Simpler CSS — fewer overrides needed as you scale up
4. Better performance — mobile devices parse fewer rules

### How to apply

```
base → sm → md → lg → xl → 2xl
stack → expand → multi-column → full layout
```

In Tailwind:
```html
<!-- CORRECT: mobile-first -->
<div class="flex flex-col md:flex-row">

<!-- WRONG: desktop-first override -->
<div class="flex flex-row max-md:flex-col">
```

In CSS:
```css
/* CORRECT: mobile-first */
.layout { flex-direction: column; }
@media (min-width: 768px) { .layout { flex-direction: row; } }

/* WRONG: desktop-first */
.layout { flex-direction: row; }
@media (max-width: 767px) { .layout { flex-direction: column; } }
```

## Breakpoint Usage Guidelines

### Which breakpoints to use

Not every component needs all breakpoints. Use the minimum number needed:

| Layout change | Typical breakpoints |
|--------------|-------------------|
| Stack → row | 1 breakpoint (md) |
| 1 → 2 → 3 columns | 2 breakpoints (sm + lg) |
| Full responsive grid | 2-3 breakpoints (sm + md + lg) |
| Typography scaling | 1-2 breakpoints (md + lg) |
| Spacing scaling | 2 breakpoints (md + lg) |
| Nav collapse | 1 breakpoint (md or lg) |
| Sidebar show/hide | 1 breakpoint (lg) |

### Content-driven breakpoints

Standard breakpoints cover most cases, but if content breaks at a specific width, use that width:

```css
/* Content-driven: text wraps awkwardly at 820px */
@media (min-width: 820px) {
  .article-header { flex-direction: row; }
}
```

In Tailwind, use arbitrary breakpoints sparingly:
```html
<div class="flex-col min-[820px]:flex-row">
```

Prefer standard breakpoints unless content clearly dictates otherwise.

## Common Breakpoint Patterns

### Two-column layout

```
base:  [  Full width  ]
md:    [ Left ][ Right ]
```

```html
<div class="flex flex-col md:flex-row gap-4 md:gap-6">
  <div class="w-full md:w-1/2">Left</div>
  <div class="w-full md:w-1/2">Right</div>
</div>
```

### Sidebar layout

```
base:  [   Content    ]    (sidebar hidden)
lg:    [ Sidebar ][ Content ]
```

```html
<div class="flex flex-col lg:flex-row">
  <aside class="hidden lg:block lg:w-64 lg:shrink-0">Sidebar</aside>
  <main class="flex-1 min-w-0">Content</main>
</div>
```

### Card grid

```
base:  [ Card ]     (1 column)
sm:    [ Card ][ Card ]     (2 columns)
lg:    [ Card ][ Card ][ Card ]     (3 columns)
xl:    [ Card ][ Card ][ Card ][ Card ]     (4 columns)
```

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
```

### Navigation

```
base:  [ Logo ] [☰]     (hamburger)
md:    [ Logo ] [ Link  Link  Link ] [ CTA ]
```

### Hero section

```
base:  [ Heading (3xl) ]
       [ Subtitle      ]
       [ CTA button    ]

lg:    [    Heading (6xl)    ]
       [    Subtitle (xl)    ]
       [    CTA button       ]
```

## Anti-patterns to detect

### 1. Arbitrary breakpoints
```css
/* Bad: random values */
@media (min-width: 743px) { ... }
@media (min-width: 1100px) { ... }
```
**Fix**: Normalize to nearest standard breakpoint unless content-driven.

### 2. Too many breakpoints
```html
<!-- Bad: 5 breakpoints for one element -->
<div class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
```
**Fix**: Reduce to 2-3 meaningful steps.

### 3. Desktop-first overrides
```html
<!-- Bad: overriding desktop default for mobile -->
<div class="grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2">
```
**Fix**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

### 4. Responsive class without base
```html
<!-- Bad: no mobile base, only desktop override -->
<div class="md:flex-row">
```
**Fix**: `flex flex-col md:flex-row`

### 5. Missing responsive consideration entirely
```html
<!-- Bad: no responsive classes on layout elements -->
<div class="flex flex-row w-1/3">
```
**Fix**: `flex flex-col md:flex-row w-full md:w-1/3`
