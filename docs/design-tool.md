# 10x Design Tool Notes

## Current Product

10x is currently a shared skill pack for Claude Code and Codex. The repo contains no runtime package, CLI analyzer, TypeScript core, AST codemods, or build step. Agents load the Markdown skills, inspect the target project, and produce reports or edits according to the shared `analyse | plan | apply` contract.

The current source of truth is:

- `skills/10x-foundation/SKILL.md` for config loading, framework detection, report format, and agent execution rules.
- `skills/{domain}/SKILL.md` for domain-specific analysis and edit rules.
- `skills/{domain}/reference/` for design scales, token formats, and deeper guidance.
- `agents/openai.yaml` inside public skills for Codex-facing display metadata and default prompts.
- `scripts/install.sh` and `scripts/uninstall.sh` for symlinking skills into agent directories.

## Reliability Model

The skill pack is designed around reviewable agent behavior rather than invisible automation.

Every public skill should:

- Default to `plan`.
- Accept only `analyse`, `plan`, and `apply` as modes, normalizing user wording like `analyze` to `analyse`.
- Never edit files in `analyse` or `plan`.
- Include file paths and line numbers for code-backed findings.
- Propose concrete old-to-new changes with risk levels before applying.
- Defer low-confidence changes instead of guessing.
- Respect existing project tokens before introducing `--10x-*` tokens.

This keeps Claude Code and Codex aligned even though their invocation models differ.

## Skill Responsibilities

| Skill | Responsibility |
| --- | --- |
| `spacing` | Spacing scale, grouping rhythm, gaps, padding, margin, token normalization. |
| `typography` | Type scale, hierarchy, line-height, tracking, font family, weight, text contrast. |
| `color` | Palette consistency, brand/neutral/semantic scales, contrast, color token mapping. |
| `depth` | Elevation roles, shadow recipes, surface layers, z-index scale, theme-aware depth. |
| `motion` | Duration/easing tokens, transition safety, reduced-motion support, performant properties. |
| `responsive` | Mobile-first layout, stacking, breakpoints, responsive spacing/type, visibility rules. |
| `polish` | One shared-scope pass across all six skills with one merged report. |

## Adoption Priorities

The next useful improvements are documentation and consistency, not a full analyzer rewrite.

1. Keep README examples aligned with actual script and skill behavior.
2. Keep every public skill discoverable through `agents/openai.yaml`.
3. Keep install scripts safe by supporting `--dry-run` and `--verify`.
4. Add small smoke-test fixtures later so agents can be tested against known inputs and expected report shapes.
5. Avoid expanding the skill bodies with long theory; put detailed reference material in `reference/`.

## Future Automation Path

A deterministic implementation can still be built later, but it should be treated as a separate product layer.

A practical future architecture would be:

- `@10x/core` for command parsing, config resolution, report schema, and mode enforcement.
- `@10x/analyse-*` packages for deterministic scanning by domain.
- `@10x/codemods-css` and `@10x/codemods-tsx` for safe structured edits.
- `@10x/tokens` for CSS custom properties and DTCG export.
- `@10x/cli` for local reports, diffs, and apply mode.
- Optional MCP or editor integrations after the core behavior is stable.

Until that exists, docs should not imply that TypeScript packages or codemods are already part of this repo.

## Acceptance Checks

Before publishing changes to the skill pack:

- All public skills use `analyse | plan | apply`.
- Each public skill has `agents/openai.yaml`.
- `README.md` skill count and examples match the folders under `skills/`.
- Install and uninstall scripts support `--dry-run`.
- `install.sh --verify` reports missing or incorrect symlinks.
- No documentation describes unimplemented runtime packages as current behavior.
