# Type Scale Reference

A type scale is a set of font sizes generated from a base size and a consistent ratio. Using a scale creates visual rhythm and eliminates arbitrary sizing.

## Scale Ratios

| Name | Ratio | Character | Best for |
|------|-------|-----------|----------|
| Minor Second | 1.067 | Very tight, subtle | Dense data UIs, dashboards |
| Major Second | 1.125 | Tight, professional | Admin panels, tools |
| Minor Third | 1.200 | Balanced, versatile | General-purpose apps (default) |
| Major Third | 1.250 | Clear separation | Marketing, content-heavy sites |
| Perfect Fourth | 1.333 | Bold, dramatic | Landing pages, editorial |

## Default Scale (Minor Third — 1.2x, base 16px)

| Step | Token | Size | rem | Use |
|------|-------|------|-----|-----|
| xs | `--10x-type-size-xs` | 11px | 0.694rem | Fine print, captions, badges |
| sm | `--10x-type-size-sm` | 13px | 0.833rem | Labels, helper text, metadata |
| base | `--10x-type-size-base` | 16px | 1rem | Body text, paragraphs, inputs |
| lg | `--10x-type-size-lg` | 19px | 1.2rem | Large body, card titles |
| xl | `--10x-type-size-xl` | 23px | 1.44rem | H4, section subheadings |
| 2xl | `--10x-type-size-2xl` | 28px | 1.728rem | H3, section headings |
| 3xl | `--10x-type-size-3xl` | 33px | 2.074rem | H2, page subheadings |
| 4xl | `--10x-type-size-4xl` | 40px | 2.488rem | H1, page headings |
| 5xl | `--10x-type-size-5xl` | 48px | 2.986rem | Display, hero headings |

## Generating a Custom Scale

Formula: `size = base × ratio^step`

Where step goes from -2 (xs) to +6 (5xl), with step 0 = base (16px).

```
xs   = 16 / ratio² 
sm   = 16 / ratio  
base = 16           
lg   = 16 × ratio  
xl   = 16 × ratio² 
2xl  = 16 × ratio³ 
3xl  = 16 × ratio⁴ 
4xl  = 16 × ratio⁵ 
5xl  = 16 × ratio⁶ 
```

Round all values to the nearest whole pixel for cleanliness.

## Scale Anti-Patterns

- **Almost the same size**: Two sizes within 1-2px of each other (e.g., 14px and 15px) — merge to one.
- **Missing steps**: Jumping from 16px to 32px with nothing between — fill the gaps.
- **Too many sizes**: More than 9 font sizes in a project is almost always too many. Consolidate.
- **Magic numbers**: Arbitrary sizes like 17px, 22px, 37px that don't fit any ratio.
- **px/rem mixing**: Mixing units inconsistently. Pick one (prefer rem) and stick with it.

## Responsive Scaling

For responsive typography, use `clamp()` to fluidly scale between breakpoints:

```css
/* Scale headings fluidly between mobile and desktop */
--10x-type-size-4xl: clamp(1.728rem, 1.5rem + 1.5vw, 2.488rem);
--10x-type-size-5xl: clamp(2.074rem, 1.75rem + 2vw, 2.986rem);
```

Body text (base, sm, xs) should generally stay fixed — only scale headings (xl and above).
