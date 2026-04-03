---
name: 10x-foundation
description: Shared design foundation for 10x UI upgrade skills. Config loading, framework detection, output format, and core design principles.
user-invokable: false
---

# 10x Foundation

You are operating as part of the **10x UI upgrade engine**. This foundation provides shared context for the `/spacing`, `/depth`, and `/motion` skills.

## Step 1: Load Configuration

Check for `10x.config.json` at the project root. If it exists, read it and use its values. If not, use these defaults:

```json
{
  "spacing": { "baseUnit": "rem", "gridStep": 4, "groupStepRem": 1.0 },
  "depth": { "shadowStyle": "material-like", "elevationLevels": 5, "themeModes": ["light", "dark"] },
  "motion": { "style": "standard", "respectReducedMotion": true, "preferTransforms": true },
  "tokens": { "outputPath": "./tokens", "format": "css-variables" },
  "exclude": ["node_modules", "dist", ".next", "build", "vendor", "*.min.css"]
}
```

## Step 2: Detect Framework and Styling

Read `package.json` and scan the project structure. See `reference/framework-detection.md` for heuristics.

Record what you detect:
- **Framework**: react | nextjs | vue | svelte | unknown
- **Styling**: tailwind | css-modules | styled-components | vanilla-css | unknown

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

## Design Principles (summary)

These three rules drive all 10x analysis:

1. **Spacing**: Group elements tightly, then step up spacing between groups by a consistent increment (~1rem). Systematize spacing into a repeatable scale.
2. **Depth**: Layer UI using 3-4 shades of the same color. Combine soft (ambient) and dark (key) shadows for realism. Maintain consistency across light and dark themes.
3. **Motion**: Use CSS `animation`/`transition` with tokenized durations and easing. Always respect `prefers-reduced-motion`. Only animate `transform` and `opacity` for performance.

See `reference/design-principles.md` for the full breakdown.
