---
name: polish
description: "Orchestrates all 10x UI skills (typography, color, spacing, depth, motion, responsive) into one polish pass. Runs focused analysis, proposes an aligned plan, then applies changes. Use when the user wants to improve everything at once."
user-invokable: true
args:
  - name: scope
    description: "Files or glob patterns to polish (optional, auto-detects if omitted)"
    required: false
  - name: mode
    description: "analyse | plan | apply (default: plan)"
    required: false
  - name: only
    description: "Comma-separated subset of skills to run: typography,color,spacing,depth,motion,responsive (default: all)"
    required: false
  - name: skip
    description: "Comma-separated skills to exclude from the run"
    required: false
---

# /polish — 10x Full UI Upgrade

You are running the **10x polish engine**. Polish is not one skill — it is the coordinated execution of all the UI quality skills against the same scope, in the right order, with a single report at the end.

## Philosophy (the engine)

Polish is **focus + alignment + action**. Three phases, always in this order:

1. **Ask** — Be specific about what to improve. Focus determines results. Scan every in-scope file and surface the dominant issues; do not spread attention across noise.
2. **Believe** — Commit to one aligned plan. Every sub-skill's proposal must reinforce the same system (tokens, scale, hierarchy). No contradictory recommendations.
3. **Receive** — Apply the changes. Thinking alone does not ship polish; execution does. Emit a single unified diff plan and apply it under the user's chosen mode.

The sub-skills are neutral instruments. They respond to whatever dominant signal the code emits — good or bad. Polish is what happens when all six signals are aligned.

## Phase 1: Prepare

1. Use the **10x-foundation** skill for config loading, framework detection, and scope resolution. Do this **once** and share the result with every sub-skill — do not re-detect per skill.
2. Resolve `mode` from args (default: `plan`).
3. Resolve the skill list:
   - Default: `typography, color, spacing, depth, motion, responsive`
   - If `only` is provided: run only those.
   - If `skip` is provided: remove those from the default list.
4. Validate that each requested skill exists under `skills/`. Abort with a clear message if one is missing.

## Phase 2: Ask (Analyse)

Run each sub-skill's **analyse** phase against the shared scope. Execute in this order — later skills depend on the tokens emitted by earlier ones:

1. **typography** — establishes type scale, hierarchy, weight, line-height, alignment. Most UI quality comes from here, so it runs first.
2. **color** — establishes neutrals, accent, semantic roles, contrast.
3. **spacing** — establishes the spacing scale and grouping rules.
4. **depth** — layers elevation using the color palette from step 2.
5. **motion** — timing and easing tokens, `prefers-reduced-motion` enforcement.
6. **responsive** — breakpoints, fluid typography, mobile-first stacking. Runs last because it consumes the scales from typography + spacing.

For each skill, collect:
- Findings (with severity, file, location, issue)
- Proposed tokens
- Proposed edits (with risk rating)

Do **not** show six separate reports. Merge them.

## Phase 3: Believe (Plan)

Produce a **single unified plan**. Resolve conflicts:

- If two skills propose different tokens for the same concept, prefer the one from the earlier skill in the order above (typography > color > spacing > depth > motion > responsive).
- If two skills want to edit the same line, consolidate the edits into one change. Never emit overlapping patches.
- Deduplicate findings that surface the same underlying issue from multiple angles (e.g., a hardcoded `#000` flagged by both color and depth).

Present **one** report using the 10x-foundation format, with a per-skill subsection inside **Findings** and a single consolidated **Plan** table. Include a top-line summary:

```
## 10x Polish Report

**Project**: ...
**Framework**: ... | **Styling**: ...
**Scope**: N files
**Mode**: analyse | plan | apply
**Skills run**: typography, color, spacing, depth, motion, responsive

### Summary
- Typography: N findings, N edits proposed
- Color: ...
- Spacing: ...
- Depth: ...
- Motion: ...
- Responsive: ...
- **Total**: N findings, N edits, estimated risk: low|medium|high
```

Then the per-skill **Findings** sections, then one merged **Plan** table, then **Tokens Generated** (all tokens from all skills in one block, grouped by domain).

**Stop here if mode is `analyse` or `plan`.**

## Phase 4: Receive (Apply)

Only if mode = `apply`:

1. Apply edits **file by file**, not skill by skill. All changes to a single file land in one pass so the user sees one coherent diff per file.
2. Emit tokens **once**, in the configured `tokens.outputPath`, grouped by domain (`--10x-type-*`, `--10x-color-*`, `--10x-space-*`, `--10x-elev-*`, `--10x-motion-*`, `--10x-bp-*`).
3. After each file, state what changed in one line.
4. At the end, emit a final summary: files touched, tokens created, issues resolved, issues deferred.

## Rules

- Never run a sub-skill's **apply** phase in `plan` or `analyse` mode — polish respects the mode flag globally.
- Never re-load config or re-detect framework per sub-skill — do it once in Phase 1.
- If any sub-skill reports > 20 issues in a single file, narrow the scope and tell the user before continuing.
- Preserve `!important`, `inherit`, `unset`, and third-party component styles across every sub-skill.
- If two sub-skills disagree on a value, the earlier skill in the order wins; note the override in the report.
- Action is required: in `apply` mode, do not stop at proposing — finish the edits. In `plan` mode, do not apply — wait for the user's go-ahead.

## Relationship to individual skills

`/polish` is the orchestrator. The individual skills (`/typography`, `/color`, `/spacing`, `/depth`, `/motion`, `/responsive`) remain usable standalone when the user only wants one dimension addressed. Running `/polish` with `only=typography` is equivalent to running `/typography` directly, but still goes through the polish report format.
