# Framework and Styling Detection

## Detection Heuristics

### Framework

Check `package.json` dependencies and devDependencies:

| Signal | Framework |
|--------|-----------|
| `next` in dependencies | nextjs |
| `react` in deps (without `next`) | react |
| `vue` in dependencies | vue |
| `svelte` in dependencies | svelte |
| `@angular/core` in dependencies | angular |
| None of the above | unknown |

### Styling

| Signal | Styling |
|--------|---------|
| `tailwindcss` in deps or devDeps AND `tailwind.config.{js,ts,mjs}` exists | tailwind |
| Files matching `*.module.css` or `*.module.scss` exist | css-modules |
| `styled-components` or `@emotion/styled` in deps | css-in-js |
| Only `.css` files (no `.scss`/`.sass`/`.less`, no `*.module.css`, no CSS-in-JS) | vanilla-css |
| None detected | unknown |

> **Note:** If a project has both `.css` and `.scss` files without modules or CSS-in-JS, classify as `vanilla-css`. If preprocessor files dominate, classify as `unknown` and note the preprocessor usage.

## Framework-Specific Guidance

### React / Next.js
- Check `className` attributes in JSX/TSX for inline Tailwind or CSS module references
- Style objects use camelCase properties (`paddingTop`, not `padding-top`)
- Look for CSS-in-JS patterns: `styled()`, `css()`, template literals
- Next.js: check `app/` (App Router) vs `pages/` (Pages Router) for scope detection

### Vue
- `<style scoped>` blocks contain component-scoped CSS
- Check for Tailwind classes in `<template>` bindings
- `:style` bindings use object syntax

### Svelte
- `<style>` blocks are component-scoped by default
- Check for Tailwind classes in markup
- Svelte uses standard CSS property names in style blocks

### Tailwind-Specific
- Spacing classes: `p-{n}`, `m-{n}`, `gap-{n}`, `space-x-{n}`, `space-y-{n}`
- Shadow classes: `shadow`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`
- Transition classes: `transition`, `duration-{n}`, `ease-{type}`
- When rewriting Tailwind classes, preserve responsive prefixes (`sm:`, `md:`, `lg:`) and state variants (`hover:`, `focus:`, `group-hover:`)
- Be conservative: Tailwind class rewriting is fragile. Prefer reporting over auto-applying.

### CSS Modules
- Import pattern: `import styles from './Component.module.css'`
- Usage: `className={styles.container}` or `className={styles['my-class']}`
- Edit the `.module.css` file directly, not the className references

### Vanilla CSS
- Direct class references: `className="container"`
- Edit `.css` files, potentially adding CSS custom properties for tokens
