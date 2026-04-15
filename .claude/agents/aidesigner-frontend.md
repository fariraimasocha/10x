---
name: "aidesigner-frontend"
description: "Use this skill when the user wants to create or redesign a frontend, landing page, dashboard, marketing page, or other UI with AIDesigner. Prefer the connected aidesigner MCP server for generate/refine, then use the local AIDesigner CLI for artifact capture, preview rendering, and repo-native adoption guidance."
---

<!-- AUTO-GENERATED from packages/aidesigner-agent-skills/templates/skill-body.md — do not edit directly.
     Run `npx -y @aidesigner/agent-skills upgrade` to regenerate. -->

# AIDesigner Frontend

Use AIDesigner to establish a strong visual direction, then port that direction into the repo's real frontend stack instead of shipping raw HTML.

## Mission

1. Inspect the repo first.
2. Generate or refine an AIDesigner HTML artifact.
3. Capture that artifact into a local run.
4. Render a preview and adoption brief.
5. For clone work, run a local visual QA loop before calling it done.
6. Port the design into the repo's actual primitives, routes, tokens, and components.

## Scope Defaults

- Spend AIDesigner credits only when the user explicitly asked to use AIDesigner or clearly opted into that workflow.
- Prefer the connected `aidesigner` MCP server for `whoami`, `get_credit_status`, `generate_design`, and `refine_design`.
- Treat returned HTML as a design artifact first and implementation input second.
- Prefer one coherent direction over multiple weak variants.

## Auth And Execution Surface

- In Claude Code or Codex, prefer the connected `aidesigner` MCP server. That uses OAuth-backed account credits instead of API keys.
- For local helper usage outside a host-managed MCP connection, `AIDESIGNER_MCP_ACCESS_TOKEN` is the preferred bearer token.
- `AIDESIGNER_API_KEY` remains an explicit fallback for CI or manual usage.
- `AIDESIGNER_MCP_URL` and `AIDESIGNER_BASE_URL` are optional.
- For local file operations, always use the canonical AIDesigner CLI. Do not hand-roll `curl` calls.

```bash
npx -y @aidesigner/agent-skills <verb> ...
```

Supported verbs:

- `init`
- `doctor`
- `capture`
- `preview`
- `adopt`

## Pre-Flight

1. Before generating anything, look for repo design context in this order:
   - `DESIGN.md`, `.aidesigner/DESIGN.md`, or `docs/design.md` if present
   - theme files, token files, Tailwind config, CSS variables, font setup, and shared UI primitives
   - the target route or page plus nearby components to understand real layout and interaction patterns
2. If no design brief file exists, inspect the repo directly and infer the existing design system from code before spending credits.
3. Write a compact internal design brief that covers:
   - platform and target surface
   - product goal and primary user action
   - existing visual language to preserve or intentionally move away from
   - important repo patterns, constraints, and content types
   - typography, tokens, surfaces, spacing, and motion only when the repo already defines them or the user explicitly wants the current aesthetic preserved
   - any explicit must-haves or do-not-break constraints from the repo or user
4. Decide whether the request is:
   - prompt-only generation
   - `clone` for a faithful recreation of a specific URL
   - `enhance` for a redesign that preserves a specific URL's content or intent
   - `inspire` for a new direction based on a specific URL's visual style
5. If the request is `clone`, verify screenshot-capable browser tooling before spending credits.
   - Check whether Puppeteer or equivalent local browser automation is already available.
   - If it is missing, install `puppeteer` in the repo using the repo package manager before generation so visual QA can happen after the run.
   - Do not start clone generation when you already know screenshot QA cannot run.

## Workflow

### 1. Build The Visual Prompt

- Split the work into two layers:
  - visual reference prompt for AIDesigner
  - implementation spec you keep local for the real build
- Convert the user's ask plus that design brief into a broad visual reference prompt.
- Give AIDesigner room to invent structure, composition, visual rhythm, and stylistic details.
- Focus the prompt on product type, audience, UX priorities, desired feel, and non-negotiable constraints.
- Do not prescribe exact section order, card counts, copy, button labels, or detailed per-element placement unless the user explicitly asked for those specifics.
- Do not forward full content inventories, exhaustive section lists, parameter tables, example responses, CLI command matrices, or other documentation detail dumps into the AIDesigner prompt.
- If the user provided a highly detailed product or content spec, compress it into a smaller set of visual requirements for AIDesigner, then keep the detailed spec for local implementation after the design artifact comes back.
- The AIDesigner prompt should usually stay short and art-directed rather than reading like a PRD or sitemap.
- If the repo already has an established design system or the user wants the same aesthetic, bias the prompt toward consistency with that system and it is fine to mention concrete colors, fonts, or tokens from the repo.
- If the repo is new or the user wants a visual reset, keep the prompt relatively general on visual styling. Describe the desired vibe and product feel, but do not lock the design into exact colors, gradients, or overly specific palette instructions unless the user explicitly asked for them.

### 2. Generate Or Refine

- If you are connected to the `aidesigner` MCP server, call its `generate_design` or `refine_design` tool with a compact repo summary as `repo_context`.
- If you are using the helper directly, it performs the repo scan for you.
- Keep MCP calls prompt-driven unless the user explicitly asked for a reference-URL workflow.
- Only use `clone` when the user explicitly wants a near-1:1 recreation, copy, match, or faithful clone of a specific URL.
- Only use `enhance` when the user explicitly wants to improve, redesign, modernize, or upgrade a specific URL while preserving its content or intent.
- Only use `inspire` when the user explicitly wants a new design inspired by a specific URL or its visual style.
- Before a `clone` generation or refinement, confirm screenshot tooling is available. If Puppeteer or equivalent browser automation is missing, install it first in the repo rather than discovering that blocker after spending credits.
- If the user only mentions a URL as background context, do not pass `mode` or `url`.
- If the user wants `clone`, `enhance`, or `inspire` but no reference URL is available yet, stop and ask for the URL before spending credits.
- If continuing a previous reference-mode run, prefer `refine_design` and keep the existing `mode` and `url` as long as the user still wants that same reference workflow.
- If the user explicitly wants to stop matching the reference and branch into a fresh direction, drop `mode` and `url` and continue prompt-only. If needed, refine from the latest HTML artifact instead of reusing a prior run id so the new iteration does not inherit the old reference.
- If repeated AIDesigner work is likely and no design brief file exists, you may suggest creating a human-reviewable `DESIGN.md` or `.aidesigner/DESIGN.md` after the first pass. Do not silently invent one during setup.

If MCP succeeds, immediately persist the returned HTML into a local run:

```bash
npx -y @aidesigner/agent-skills capture --html-file .aidesigner/mcp-latest.html \
  --prompt "<final prompt>" \
  --transport mcp \
  --remote-run-id "<run-id>"
```

If MCP is unavailable or the server says auth is expired:

- If `AIDESIGNER_API_KEY` is already configured, use `npx -y @aidesigner/agent-skills generate` or `npx -y @aidesigner/agent-skills refine` as the explicit fallback path.
- Otherwise stop and explain exactly how to connect AIDesigner:
  1. Run `npx -y @aidesigner/agent-skills init` in this repo, or `npx -y @aidesigner/agent-skills init --scope user` for all repos
  2. Open the host client
  3. Open its MCP panel or login flow
  4. Connect the `aidesigner` server and finish browser sign-in
  5. Retry the request
- Mention the fallback alternative: set `AIDESIGNER_API_KEY` and retry.

### 3. Preview And Adopt

- After every successful run, ensure the user gets visuals.
- Use the preview created by `capture` or run:

```bash
npx -y @aidesigner/agent-skills preview --id <run-id>
```

- Run adoption analysis before porting:

```bash
npx -y @aidesigner/agent-skills adopt --id <run-id>
```

### 3A. Clone QA Loop

- If the request used `clone`, do not stop at the first generation.
- Clone QA must be visual, not just text-based. DOM inspection or structural reasoning can help, but they do NOT replace screenshot comparison.
- Capture screenshots of the generated result with browser automation. Prefer the preview created by `npx -y @aidesigner/agent-skills preview`, host-provided browser tools, or local automation such as Playwright or Puppeteer.
- If the clone has been ported into the repo, capture screenshots of the integrated page itself, not only the raw HTML artifact, whenever possible.
- Compare the generated screenshots against the reference URL and any available reference screenshots.
- Check for hard fidelity issues:
  - section order and section count
  - major layout geometry and container widths
  - spacing rhythm and alignment
  - typography scale, weight, and line-height
  - image role, crop, and placement
  - backgrounds, gradients, borders, shadows, and overlays
  - repeated block counts such as logos, cards, testimonials, FAQs, and footer columns
- If no screenshot-capable browser tooling is available, stop and surface that blocker. Ask to install or enable a browser automation tool such as Playwright or Puppeteer before claiming clone QA is complete.
- If meaningful mismatches remain, fix them locally yourself in the HTML artifact or repo code. Do not spend another AIDesigner credit for small or medium visual corrections the agent can make directly.
- After local edits, render a fresh preview and compare again. Repeat until the remaining differences are minor or a real blocker remains.
- Use `refine_design` only when the clone is fundamentally off and a local correction pass would be slower or less reliable than another model iteration.
- When the clone has already been ported into the repo, prefer QA on the integrated implementation instead of only the raw artifact whenever local browser tooling is available.

### 4. Port Into The Repo

- Use the AIDesigner output as a strong design reference or inspiration board when building the real page or component locally.
- Do not paste raw standalone HTML into framework code when the repo has real frontend primitives.
- The design artifact defines two distinct layers - port them differently:
  - **Design system layer (match precisely):** Extract and faithfully reproduce every visual decision from the artifact - color palette, gradients, shadows, border radii, border styles, spacing values, font sizes, font weights, letter-spacing, line-height, background effects, opacity values, hover and transition states, and layout structure. Convert these into the repo's native token system rather than approximating with "close enough" utility classes. When the artifact defines specific values, those are the spec.
  - **Content layer (adapt freely):** Copy, section count, placeholder data, button labels, testimonial quotes, and other content should be filled in from the user's actual product context and request. The artifact's content is illustrative, not prescriptive.
- Clone exception: when the reference or artifact includes explicit media assets that are necessary for fidelity - product screenshots, brand logos, hero images, photography, illustrations, icon sprites, or videos - preserve them. Do not replace real asset URLs with homemade mocks, inline SVG approximations, placeholder art, or reconstructed fake UI unless the originals are unavailable or the user explicitly asked for substitution.
- For clone ports, run an asset audit before sign-off:
  - compare key image or media references from the artifact/reference against the repo implementation
  - make sure major screenshots, logos, hero visuals, and repeated brand assets still exist after the port
  - if the artifact used real external assets, do not declare the clone complete when the integrated implementation has silently dropped them
- When porting the design system layer, work methodically:
  1. First extract theme tokens from the artifact config or styles and define them in the repo's token system.
  2. Then port each component's visual structure, preserving exact class values for spacing, sizing, and effects.
  3. Do not substitute approximate values such as `pt-48` for `pt-32`, `min-h-screen` for `min-h-[90vh]`, or `text-6xl` for `text-[64px]`.
- Reuse the repo's existing routes, components, and token system where possible.
- Preserve accessibility basics and responsiveness while porting the design.

### 5. Parallelize Large Ports With Subagents

- If the artifact is large enough that one agent would be juggling multiple distinct sections, component families, or screens at once, split the implementation into focused subagent tasks.
- Keep the foundation work in the main agent:
  - token extraction
  - shared primitives
  - route shell and page composition
  - final integration decisions
- Use subagents for leaf-level porting work that can be done independently, such as:
  - hero section
  - feature section
  - pricing grid
  - testimonial rail
  - FAQ block
  - footer
  - dashboard panel group
  - repeated card family
- Split by coherent section or component family, not by arbitrary DOM slices.
- Give each subagent a tight scope:
  - the exact section or component family to port
  - the target files it may touch
  - the relevant artifact fragment, screenshot, or HTML slice
  - the non-negotiable tokens, spacing values, and visual constraints it must preserve
- Do not let multiple subagents edit the same component or file family unless the main agent is intentionally coordinating a merge.
- After subagents finish, the main agent must normalize shared primitives, remove duplicate token definitions, and make the final composition feel consistent.
- Use subagents to reduce cognitive load, not to avoid design judgment. The main agent remains responsible for fidelity and final integration quality.

## Required Outputs

After a successful run, provide or record all of the following:

- the final visual prompt or a concise prompt summary
- the remote run id if MCP returned one
- the local run id under `.aidesigner/runs/<run-id>/`
- the preview image path
- the adoption brief path, or explicit confirmation that adoption analysis was run
- the intended route, component, or surface targets for repo integration
- any unresolved blockers or risks if the design could not be fully adopted

## References

- For the API contract and helper behavior: [references/api.md](references/api.md)
- For the frontend adoption quality bar: [references/frontend-rubric.md](references/frontend-rubric.md)

## Operating Rules

- If neither MCP nor `AIDESIGNER_API_KEY` is available, stop and explain how to run `npx -y @aidesigner/agent-skills init` and reconnect through the host's MCP flow.
- Do not present raw HTML as the final integrated implementation for framework repos.
- Apply the original detailed requirements during implementation, not by forcing them all into the AIDesigner prompt.
- If repo context and user intent conflict, preserve the repo's design system unless the user explicitly wants a new visual direction.
