# Visual Priority Reference

Visual hierarchy answers one question: what should the user notice next?

## Priority Roles

| Role | Purpose | Typical signals |
| --- | --- | --- |
| Primary | The main decision or action for the current view. | Largest useful type, strongest contrast, most prominent action. |
| Secondary | Supporting context, alternatives, or next-best actions. | Medium contrast, outlined or quieter controls, grouped near primary content. |
| Tertiary | Metadata, helper text, labels, chrome, decoration. | Muted contrast, smaller type, lower elevation, more distance from action. |

## Rules

- One primary action per view or major section.
- No more than two high-emphasis focal points in the same initial viewport.
- The strongest visual signal should match the user's likely task.
- Secondary actions should look available but not equal to the primary action.
- Metadata should support scanning, not start the scan.
- Decorative elements must not be more prominent than decisions or content.

## CTA Dominance

Primary CTAs should usually win through one or two signals:

- filled surface
- stronger contrast
- position near the decision point
- clear label
- sufficient size and touch target

Avoid stacking every signal at once. A huge, saturated, shadowed, animated primary button can overpower the page.

## Competing Focal Points

Flag competition when these appear together without a clear winner:

- two filled buttons in the same group
- multiple accent backgrounds in one section
- heading, badge, image, and CTA all using maximum emphasis
- multiple cards styled as featured
- sticky chrome that visually competes with page content
- decorative imagery stronger than the content it supports

## Affordance Clarity

Interactive elements should look interactive:

- Buttons need visible boundaries, filled surfaces, or conventional text-link treatment.
- Cards should only look clickable when they are clickable.
- Icon-only controls need accessible names and visible focus states.
- Disabled controls should be visibly unavailable but still understandable.

Non-interactive elements should not borrow button styling unless they are status badges or labels with clearly different treatment.

## State Priority

States should preserve the user's next best action:

- Loading: show what is happening and prevent layout jumps.
- Empty: explain the absence and offer the next useful action.
- Error: make recovery more prominent than blame or diagnostics.
- Success: confirm outcome without burying the next step.
- Disabled: keep the reason discoverable when possible.
