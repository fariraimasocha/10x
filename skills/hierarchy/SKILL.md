---
name: hierarchy
description: "Analyze and fix visual hierarchy issues in UI code. Checks screen priority, CTA dominance, scan path, grouping, affordance clarity, and competing focal points without duplicating typography scale work."
user-invokable: true
args:
  - name: scope
    description: "Files or glob patterns to analyze (optional, auto-detects if omitted)"
    required: false
  - name: mode
    description: "analyse | plan | apply (default: plan)"
    required: false
---

# /hierarchy - 10x Visual Hierarchy Analysis

You are running the 10x visual hierarchy analyzer. Your job is to find places where a screen does not clearly tell users what matters first, second, and third.

This skill audits composition-level priority. Do not duplicate `/typography`: type scale, line-height, font weight, tracking, and font-family normalization stay with the typography skill. Use those signals only when they affect screen priority.

## Phase 1: Prepare

1. Use the **10x-foundation** skill for config loading, framework detection, and scope resolution.
2. Read `reference/visual-priority.md` for priority roles, CTA dominance, focal-point limits, and affordance rules.
3. Read `reference/scan-path.md` for reading order, grouping, progressive disclosure, and layout flow checks.
4. Determine the `mode` from args (default: `plan`).
5. Identify all component files and style files in scope.
6. Follow the **Agent Execution Rules** in `10x-foundation`, especially the `analyse`/`plan`/`apply` boundary.

## Phase 2: Analyse

Scan in-scope UI files for hierarchy signals:

### Properties and patterns to scan

- Semantic structure: `h1`-`h6`, landmarks, section wrappers, cards, dialogs, drawers, empty states
- Actions: buttons, links styled as buttons, submit controls, icon buttons, destructive actions
- Emphasis classes: large type, bold weights, accent text/backgrounds, borders, shadows, overlays
- Layout order: flex/grid order, responsive stacking, sticky/fixed elements, hero/sidebar/content split
- Grouping: repeated cards, form groups, toolbars, navigation, metadata clusters, nested containers
- States: hover/focus/active/disabled/loading/error/success presentations
- Tailwind priority cues: `text-*`, `font-*`, `bg-*`, `border-*`, `shadow-*`, `opacity-*`, `order-*`, `z-*`

### What to record

- File path and line number
- UI area or component role
- Primary intended user task, inferred from local copy and actions
- Competing focal points or priority signals
- Why the hierarchy is unclear
- Suggested composition-level fix

### Analysis checks

1. **Primary action clarity**: Each view or major section should have one clear primary action. Flag competing filled/accent buttons.
2. **Focal-point overload**: More than two high-emphasis elements in one viewport or section creates competition. Flag as `warn`.
3. **Reading path**: Content should scan from context -> value -> action. Flag layouts where metadata, decoration, or secondary controls interrupt the path.
4. **Grouping**: Related items should be visually closer to each other than to unrelated items. Flag weak grouping or accidental grouping.
5. **Progressive disclosure**: Secondary detail should not overpower primary content. Flag dense sections where helper text, badges, or metadata compete with the main decision.
6. **Affordance clarity**: Interactive elements should look interactive and inactive elements should not. Flag ambiguous cards, ghost buttons, icon-only controls without labels, and non-clickable elements styled like controls.
7. **State hierarchy**: Error, loading, disabled, empty, and success states should preserve the user's next best action. Flag states that hide or demote recovery actions.
8. **Responsive priority**: Mobile stacking should preserve the same priority order as desktop. Flag responsive `order-*`, hidden content, or two-column layouts that invert priority.
9. **Decoration dominance**: Decorative surfaces, shadows, gradients, imagery, or motion should not become the strongest signal unless they are the content.
10. **Token opportunities**: If hierarchy depends on repeated emphasis patterns, suggest role tokens such as `--10x-hierarchy-primary`, `--10x-hierarchy-secondary`, or `--10x-hierarchy-muted`.

## Phase 3: Plan

Based on findings, propose specific changes:

1. Identify the intended priority stack for each affected view or section: primary, secondary, tertiary.
2. Propose composition edits before style tweaks: reorder, group, split, hide, demote, or promote elements.
3. Use typography, color, spacing, depth, and motion only as supporting levers.
4. For Tailwind projects, suggest concrete class changes where the fix is low risk.
5. Rate each edit:
   - `low`: emphasis or grouping class adjustment that does not change DOM order
   - `medium`: CTA priority, responsive order, or section grouping change
   - `high`: structural reorder, changed information architecture, or hidden/deferred content
6. Propose hierarchy tokens only when a pattern repeats across multiple components.

Present the plan using the report format from `10x-foundation`.

**Stop here if mode is `analyse` or `plan`.** Show the report and wait for user input.

## Phase 4: Apply (only if mode = apply)

Apply high-confidence edits only:

1. Work file by file, showing each change before making it.
2. Prefer preserving DOM semantics. Change class names and grouping before restructuring markup.
3. Keep primary actions reachable and keyboard-focusable.
4. Do not remove content. Demote, relocate, collapse, or defer it only when the local intent is clear.
5. If introducing hierarchy tokens, emit them using the configured token format and output location.
6. After all edits, summarize what changed and what remains deferred.

## Rules

- Do not make copy strategy decisions unless the existing UI intent is obvious.
- Do not introduce a new visual style; strengthen the product already present.
- Do not hide important accessibility labels, error text, or recovery actions.
- Do not change business logic or navigation targets.
- Do not modify third-party component internals.
- When a hierarchy issue requires product intent, report it and defer the edit.
- If confidence is below 80%, report rather than fix.
