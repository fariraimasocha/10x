# AIDesigner Frontend Rubric

Use this rubric when turning an AIDesigner artifact into repo-native code.

## 1. Commit To A Clear Visual Direction

- Pick one strong aesthetic and carry it consistently.
- Avoid generic "AI-generated" layouts that feel interchangeable.
- Make typography, spacing, color, and imagery feel intentionally related.

## 2. Respect The Repo Before Inventing

- Reuse existing routes, shell patterns, and navigation conventions.
- Reuse component-library primitives before creating new base components.
- Preserve tokens from CSS variables, theme files, and utility conventions.

## 3. Port, Do Not Paste

- Treat generated HTML as a mockup artifact.
- Treat the AIDesigner prompt as a visual-direction tool, not the final content spec.
- Break the layout into logical sections and components.
- Map classes, spacing, and color choices into the repo's actual styling system.
- Remove dead CSS, duplicated wrappers, and one-off resets that fight the host app.

## 4. Keep The Implementation Production-Minded

- Maintain responsiveness across mobile and desktop.
- Preserve accessibility basics: headings, landmarks, labels, contrast, focus states.
- Keep animations purposeful and light.
- Avoid image-heavy hero sections that hide weak layout thinking.

## 5. Push Quality Upward

- If the repo already has a design system, make the new work feel like its strongest expression.
- If the repo is visually weak, still integrate cleanly but move the design forward with confidence.
- Prefer one polished direction over a bag of trends.

## 6. Adoption Heuristics

### Clone Fidelity

- For clone work, the acceptance bar is visual fidelity, not just thematic similarity.
- Compare screenshots of the generated preview or integrated implementation against the reference and look for concrete mismatches before declaring success.
- Text-only checks, DOM inspection, or structural summaries are insufficient on their own.
- Use browser automation when needed to capture screenshots. If the environment cannot take screenshots yet, surface that blocker and request installation or enablement of a tool such as Playwright or Puppeteer.
- Preserve section order, section count, repeated block count, image roles, and the overall page rhythm unless the user explicitly asked for a deviation.
- Preserve fidelity-critical media assets when they are part of the reference. Product screenshots, logos, photography, illustrations, and other explicit reference media are not interchangeable placeholder content.
- Run an asset-presence audit before sign-off. If the artifact/reference contains key media assets and the integrated implementation replaced them with mocks or dropped them entirely, the clone is not done.
- Fix visual gaps locally when they are specific and actionable. Do not default to another generation pass for spacing, typography, color, crop, or alignment issues the agent can correct directly.

### Content-Heavy Surfaces

- For docs, pricing, dashboards, and other content-dense pages, use AIDesigner to establish the visual system, rhythm, and component language.
- Keep the exact information architecture, copy fidelity, data tables, and reference details in the local implementation layer.
- Do not force every real content requirement into the generation prompt up front.

### Next.js / React

- Convert repeated sections into components.
- Prefer server and client boundaries that match existing app patterns.
- Keep business logic out of presentation-only layout components.

### Tailwind Projects

- Reuse established spacing, radius, shadow, and color tokens.
- Avoid enormous arbitrary values when existing scales can express the same design.

### Radix Or shadcn-Style Stacks

- Compose with existing primitives for dialogs, tabs, popovers, buttons, and form controls.
- Keep custom styling layered on top of those primitives instead of replacing them.

### Dashboard Surfaces

- Protect information density and navigation clarity.
- Do not sacrifice usability for spectacle.

### Marketing Surfaces

- Lead with hierarchy, clarity, and conversion.
- Make CTA contrast obvious.
- Ensure hero, proof, feature explanation, and CTA flow read naturally.
