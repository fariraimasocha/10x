# Responsive Patterns Reference

## Core Principle

Responsive design is not "making things fit mobile." It's building a fluid system that adapts layout, spacing, and structure across screen sizes. Design should flow, not snap.

## Pattern 1: Fluid Layouts

### Anti-patterns (detect these)

```html
<!-- Fixed width container -->
<div class="w-[800px]">...</div>
<div style="width: 600px">...</div>

<!-- Float-based layout -->
<div style="float: left; width: 50%">...</div>

<!-- Absolute positioning for layout -->
<div class="absolute left-0 w-1/2">...</div>
<div class="absolute right-0 w-1/2">...</div>
```

### Correct patterns (transform to these)

```html
<!-- Fluid container -->
<div class="w-full max-w-4xl mx-auto">...</div>

<!-- Flex layout -->
<div class="flex flex-col md:flex-row gap-4">...</div>

<!-- Grid layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">...</div>
```

## Pattern 2: Mobile-First Stacking

### Rule
Start with vertical layout (stacked), add horizontal arrangement as screen grows.

### Anti-patterns

```html
<!-- Desktop-first: horizontal by default -->
<div class="flex flex-row">
  <div class="w-1/2">Left</div>
  <div class="w-1/2">Right</div>
</div>

<!-- No mobile consideration -->
<div class="grid grid-cols-3 gap-4">
  <div>Col 1</div>
  <div>Col 2</div>
  <div>Col 3</div>
</div>
```

### Correct patterns

```html
<!-- Mobile-first: stack, then expand -->
<div class="flex flex-col md:flex-row">
  <div class="w-full md:w-1/2">Left</div>
  <div class="w-full md:w-1/2">Right</div>
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Col 1</div>
  <div>Col 2</div>
  <div>Col 3</div>
</div>
```

## Pattern 3: Responsive Spacing

### Rule
Spacing scales with screen size: tighter on mobile, more breathing room on desktop.

### Anti-patterns

```html
<!-- Same large padding everywhere -->
<section class="p-16">...</section>

<!-- Fixed large gap -->
<div class="flex gap-12">...</div>

<!-- No container padding scaling -->
<main class="px-20">...</main>
```

### Correct patterns

```html
<!-- Progressive spacing -->
<section class="p-4 md:p-8 lg:p-12 xl:p-16">...</section>

<!-- Responsive gap -->
<div class="flex gap-4 md:gap-6 lg:gap-8">...</div>

<!-- Container with responsive padding -->
<main class="px-4 sm:px-6 lg:px-8">...</main>
```

### Spacing progression scale

| Screen | Padding (sections) | Gap (grids) | Container px |
|--------|-------------------|-------------|-------------|
| Mobile (base) | p-4 (16px) | gap-4 (16px) | px-4 (16px) |
| sm (640px) | p-6 (24px) | gap-4 (16px) | px-6 (24px) |
| md (768px) | p-8 (32px) | gap-6 (24px) | px-6 (24px) |
| lg (1024px) | p-10 (40px) | gap-6 (24px) | px-8 (32px) |
| xl (1280px) | p-12 (48px) | gap-8 (32px) | px-8 (32px) |

## Pattern 4: Responsive Typography

### Rule
Text adapts to screen: smaller and tighter on mobile, larger and more spaced on desktop.

### Anti-patterns

```html
<!-- Large heading with no responsive sizing -->
<h1 class="text-6xl">Title</h1>

<!-- Long text without max-width -->
<p class="text-base">Very long paragraph text that runs edge to edge...</p>
```

### Correct patterns

```html
<!-- Responsive heading -->
<h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl">Title</h1>

<!-- Fluid typography with clamp -->
<h1 style="font-size: clamp(1.875rem, 1.5rem + 1.5vw, 3.75rem)">Title</h1>

<!-- Constrained text width -->
<p class="text-base max-w-prose">Readable paragraph text...</p>
```

### Typography scaling reference

| Element | Mobile (base) | md | lg | xl |
|---------|--------------|----|----|-----|
| Display heading | text-3xl | text-4xl | text-5xl | text-6xl |
| Page heading | text-2xl | text-3xl | text-4xl | text-4xl |
| Section heading | text-xl | text-2xl | text-2xl | text-3xl |
| Subheading | text-lg | text-lg | text-xl | text-xl |
| Body | text-base | text-base | text-base | text-lg |
| Caption | text-sm | text-sm | text-sm | text-sm |

## Pattern 5: Content Visibility

### Rule
Show what matters first. On mobile, prioritize primary content. On desktop, show supplementary context.

### Anti-patterns

```html
<!-- Everything visible at all sizes -->
<aside class="w-64">Sidebar with metadata</aside>

<!-- Primary content hidden on mobile -->
<div class="hidden md:block">Important information</div>
```

### Correct patterns

```html
<!-- Secondary content hidden on mobile -->
<aside class="hidden lg:block w-64">Sidebar with metadata</aside>

<!-- Mobile-only alternative -->
<button class="lg:hidden">Show details</button>

<!-- Progressive disclosure -->
<details class="block lg:hidden">
  <summary>View sidebar</summary>
  <!-- Collapsed sidebar content -->
</details>
<aside class="hidden lg:block w-64">
  <!-- Full sidebar content -->
</aside>
```

## Pattern 6: Responsive Components

### Navbar

```html
<!-- Desktop: horizontal, Mobile: hamburger -->
<nav>
  <div class="hidden md:flex gap-4">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
  </div>
  <button class="md:hidden">Menu</button>
</nav>
```

### Card Grid

```html
<!-- 1 → 2 → 3 columns -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  <div class="p-4 sm:p-6">Card</div>
</div>
```

### Hero Section

```html
<section class="py-12 md:py-20 lg:py-28 px-4 md:px-6 lg:px-8">
  <h1 class="text-3xl md:text-5xl lg:text-6xl">Hero Title</h1>
  <p class="mt-4 md:mt-6 text-lg md:text-xl max-w-2xl">Subtitle</p>
</section>
```

### Form Layout

```html
<!-- Stack on mobile, inline on desktop -->
<div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
  <input class="w-full sm:w-auto sm:flex-1" />
  <button class="w-full sm:w-auto">Submit</button>
</div>
```

## CSS Media Query Patterns

### Mobile-first (correct)

```css
/* Base = mobile */
.container { padding: 1rem; }

/* Tablet and up */
@media (min-width: 768px) {
  .container { padding: 1.5rem; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container { padding: 2rem; }
}
```

### Desktop-first (anti-pattern — convert to mobile-first)

```css
/* Anti-pattern: starts with desktop */
.container { padding: 2rem; }

@media (max-width: 1024px) {
  .container { padding: 1.5rem; }
}

@media (max-width: 768px) {
  .container { padding: 1rem; }
}
```
