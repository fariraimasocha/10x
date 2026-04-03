# Spacing Scale Reference

## Canonical Scales

### 4pt Scale (recommended for dense UIs, forms, data-heavy apps)

| Step | px  | rem    | Tailwind | CSS Token          |
|------|-----|--------|----------|--------------------|
| 1    | 4   | 0.25   | `1`      | `--10x-space-1`    |
| 2    | 8   | 0.5    | `2`      | `--10x-space-2`    |
| 3    | 12  | 0.75   | `3`      | `--10x-space-3`    |
| 4    | 16  | 1.0    | `4`      | `--10x-space-4`    |
| 5    | 20  | 1.25   | `5`      | `--10x-space-5`    |
| 6    | 24  | 1.5    | `6`      | `--10x-space-6`    |
| 8    | 32  | 2.0    | `8`      | `--10x-space-8`    |
| 10   | 40  | 2.5    | `10`     | `--10x-space-10`   |
| 12   | 48  | 3.0    | `12`     | `--10x-space-12`   |
| 16   | 64  | 4.0    | `16`     | `--10x-space-16`   |
| 20   | 80  | 5.0    | `20`     | `--10x-space-20`   |
| 24   | 96  | 6.0    | `24`     | `--10x-space-24`   |

### 8pt Scale (recommended for spacious UIs, marketing pages, dashboards)

| Step | px  | rem    | Tailwind | CSS Token          |
|------|-----|--------|----------|--------------------|
| 1    | 8   | 0.5    | `2`      | `--10x-space-2`    |
| 2    | 16  | 1.0    | `4`      | `--10x-space-4`    |
| 3    | 24  | 1.5    | `6`      | `--10x-space-6`    |
| 4    | 32  | 2.0    | `8`      | `--10x-space-8`    |
| 6    | 48  | 3.0    | `12`     | `--10x-space-12`   |
| 8    | 64  | 4.0    | `16`     | `--10x-space-16`   |
| 12   | 96  | 6.0    | `24`     | `--10x-space-24`   |

## Grouping Rules

### The Core Rule

> Group elements tightly using the smallest acceptable internal spacing, then increase spacing between groups in consistent steps (~1rem / 16px per step-up).

### Grouping hierarchy (inside → outside)

1. **Inline group** (icon + label, badge + count): `4-8px` (space-1 to space-2)
2. **Field group** (label + input + helper text): `4-8px` internally
3. **Section group** (related fields, card body): `12-16px` between items
4. **Block group** (section to section, card to card): `24-32px` between blocks
5. **Page sections** (hero to features, features to footer): `48-96px` between sections

### Common anti-patterns

| Pattern | Problem | Fix |
|---------|---------|-----|
| Same spacing everywhere | No visual hierarchy | Apply grouping levels |
| 14px, 18px, 22px | Off-scale values | Round to nearest 4pt step |
| `padding: 15px 20px` | Mixed non-scale values | Normalize to `16px 20px` or `16px 24px` |
| Gap varies per card in same grid | Inconsistency | Use single gap token |
| Large padding on inline elements | Over-spaced tight group | Reduce to space-1 or space-2 |

## Scale Detection Heuristic

When analyzing existing spacing:

1. Collect all unique spacing values (in px)
2. Count how many fall on 4pt multiples vs 8pt multiples
3. If >70% align with 4pt: recommend 4pt scale
4. If >70% align with 8pt: recommend 8pt scale
5. Otherwise: recommend 4pt (it's the safer default as a superset of 8pt)
