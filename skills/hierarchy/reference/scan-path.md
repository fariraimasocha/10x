# Scan Path Reference

Users scan before they read. A good interface creates a predictable path from context to value to action.

## Common Scan Paths

- **Marketing / landing section**: eyebrow -> headline -> value copy -> primary CTA -> proof/detail.
- **Dashboard**: page title -> primary metric/status -> exception -> action -> supporting charts.
- **Form**: title -> required context -> fields in logical groups -> validation -> submit.
- **Card grid**: category/title -> key differentiator -> status/detail -> action.
- **Dialog**: title -> consequence -> choice -> secondary escape.

## Reading Order Rules

- Put the most important context before the action.
- Keep actions near the content they affect.
- Preserve priority when layouts stack on mobile.
- Avoid making users scan through chrome, badges, or metadata before value.
- Do not split a single decision across distant columns.

## Grouping Rules

- Related controls should share a container, rhythm, or alignment.
- Increase spacing between unrelated groups.
- Keep labels close to the values or controls they describe.
- Avoid nested card-in-card structures unless the inner card is a true repeated item or modal surface.
- Use section boundaries sparingly; too many dividers flatten priority.

## Progressive Disclosure

Show the minimum needed for the next decision:

- Lead with the key value, not the implementation detail.
- Demote advanced, diagnostic, or secondary data.
- Collapse or defer content only when the primary path remains clear.
- Use details and helper copy after the user has enough context to care.

## Responsive Priority

Responsive layouts should keep the same mental order:

- Desktop sidebars should not jump ahead of primary content on mobile unless navigation is the task.
- Media should not push the value/action below the fold unless the media is the product.
- Responsive `order-*` classes need extra review.
- Hidden desktop/mobile variants should expose equivalent primary actions and labels.
