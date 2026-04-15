---
name: 10x-foundation
description: Shared design foundation for 10x UI upgrade skills. Config loading, framework detection, output format, and core design principles.
user-invokable: false
---

# 10x Foundation

You are operating as part of the **10x UI upgrade engine**. This foundation provides shared context for the `/spacing`, `/depth`, `/motion`, `/typography`, `/color`, and `/responsive` skills.

## Step 1: Load Configuration

Check for `10x.config.json` at the project root. If it exists, read it and use its values. If not, use these defaults:

```json
{
  "spacing": { "baseUnit": "rem", "gridStep": 4, "groupStepRem": 1.0 },
  "depth": { "shadowStyle": "material-like", "elevationLevels": 5, "themeModes": ["light", "dark"] },
  "motion": { "style": "standard", "respectReducedMotion": true, "preferTransforms": true },
  "typography": { "baseSizePx": 16, "scaleRatio": "minor-third", "maxFontFamilies": 2 },
  "color": { "baseHue": "auto", "neutralTint": true, "semanticColors": true, "contrastMinimum": "AA", "avoidPureBlackWhite": true },
  "responsive": { "approach": "mobile-first", "breakpoints": { "sm": "640px", "md": "768px", "lg": "1024px", "xl": "1280px", "2xl": "1536px" }, "spacingScale": true, "typographyScale": true },
  "tokens": { "outputPath": "./tokens", "format": "css-variables" },
  "exclude": ["node_modules", "dist", ".next", "build", "vendor", "*.min.css"]
}
```

## Step 2: Detect Framework and Styling

Read `package.json` and scan the project structure. See `reference/framework-detection.md` for heuristics.

Record what you detect:
- **Framework**: react | nextjs | vue | svelte | unknown
- **Styling**: tailwind | css-modules | css-in-js | vanilla-css | unknown

## Step 3: Determine Scope

If the user provided a `scope` argument, use it. Otherwise:
1. Respect `exclude` patterns from config
2. Focus on `src/`, `app/`, `components/`, `pages/`, `styles/` directories
3. Skip generated files, vendor code, and `node_modules`

## Step 4: Output Format

All 10x skills produce a structured report. Use this format:

```
## 10x {Command} Report

**Project**: {project name from package.json or directory name}
**Framework**: {detected framework} | **Styling**: {detected styling}
**Scope**: {files analyzed count} files in {directories}
**Mode**: {analyse | plan | apply}

### Findings

| # | Severity | File | Location | Issue | Suggestion |
|---|----------|------|----------|-------|------------|
| 1 | warn     | ... | line N  | ...   | ...        |

### Plan

{If mode is plan or apply, show specific edits}

| # | File | Change | Risk |
|---|------|--------|------|
| 1 | ...  | ...    | low  |

### Metrics

- **Values scanned**: N
- **Issues found**: N (N warn, N info)
- **Proposed edits**: N
- **Estimated risk**: low | medium | high

### Tokens Generated

{If applicable, show proposed token definitions}
```

## Agent Execution Rules

These rules keep Claude Code and Codex behavior aligned:

1. Use only these modes: `analyse`, `plan`, and `apply`. If the user says `analyze`, treat it as `analyse` and report the normalized mode.
2. Default to `plan` unless the user explicitly asks for `analyse` or `apply`.
3. Never change files in `analyse` or `plan` mode.
4. In `apply` mode, inspect the relevant files first, then make scoped edits file by file.
5. Findings must include file paths and line numbers whenever the issue comes from code.
6. Proposed edits must be concrete: state the old value/pattern, the new value/pattern, and the risk level.
7. If confidence is below 80%, report the issue and defer the edit instead of guessing.
8. Preserve existing design system tokens. Extend or map to them before introducing `--10x-*` tokens.
9. Do not modify generated files, vendor code, minified files, or third-party component internals.
10. If the requested scope would produce more than 20 issues in one file, summarize the dominant patterns and ask the user to narrow the scope before applying.

## Confidence Metric

Confidence is a practical edit-readiness heuristic, not a statistical score:

- **High confidence (80%+)**: The issue comes from a direct property/class match, local context is clear, project token or styling conventions are obvious, and the proposed edit is low risk.
- **Medium confidence (50-79%)**: The pattern is clear, but intent, component role, or exact token mapping is partly inferred. Include the edit in `plan` mode with risk and rationale; do not apply automatically unless the user explicitly confirms the tradeoff.
- **Low confidence (<50%)**: Component semantics are ambiguous, design tokens conflict, the change affects semantic color or responsive visibility, the edit requires structural layout changes, or necessary context is missing. Report and defer with the confirmation needed.

Apply mode should only make high-confidence edits. Medium- and low-confidence findings stay in the report as deferred or confirmation-needed items.

## Design Principles (summary)

These rules drive all 10x analysis:

1. **Spacing**: Group elements tightly, then step up spacing between groups by a consistent increment (~1rem). Systematize spacing into a repeatable scale.
2. **Depth**: Layer UI using 3-4 shades of the same color. Combine soft (ambient) and dark (key) shadows for realism. Maintain consistency across light and dark themes.
3. **Motion**: Use CSS `animation`/`transition` with tokenized durations and easing. Always respect `prefers-reduced-motion`. Only animate `transform` and `opacity` for performance.
4. **Color**: Start from one base hue and generate a full 50-900 scale. Use neutrals for 80%+ of the UI. Reserve saturated color for interactive elements and meaning. Enforce WCAG AA contrast. Avoid pure black/white.

See `reference/design-principles.md` for the full breakdown.
