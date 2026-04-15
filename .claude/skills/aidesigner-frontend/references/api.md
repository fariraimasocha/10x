# AIDesigner Frontend API Reference

This skill prefers the AIDesigner OAuth-backed remote MCP server for interactive Claude, Codex, Cursor, and Copilot usage and keeps the generate-design API as a fallback.

## Preferred MCP Surface

- MCP endpoint: `POST /api/v1/mcp`
- OAuth discovery:
  - `GET /.well-known/oauth-protected-resource`
  - `GET /.well-known/oauth-authorization-server`
- OAuth endpoints:
  - `GET /api/v1/mcp/oauth/authorize`
  - `POST /api/v1/mcp/oauth/token`
  - `POST /api/v1/mcp/oauth/register`
  - `POST /api/v1/mcp/oauth/revoke`
- MCP tools:
  - `generate_design`
  - `refine_design`
  - `get_credit_status`
  - `whoami`

When a host is connected to the `aidesigner` MCP server, the host manages OAuth login and token refresh. The agent should use the MCP tools directly.

## API-Key Fallback

- `POST /api/v1/generateDesign`
- Default base URL: `https://api.aidesigner.ai`
- Auth header: `Authorization: Bearer <AIDESIGNER_API_KEY>`

## Supported Request Fields

- `prompt: string`
- `messages: array`
- `streaming: boolean`
- `mode: inspire | clone | enhance`
- `url: string` when `mode` is present

The helper script uses `streaming: false` on the fallback API path so it can reliably capture a complete HTML artifact, write files, and render previews.

## Skill-Side Request Strategy

The agent or helper sends a compact repo summary plus the user request. Use this to make the output fit the destination codebase:

- framework and app shell
- route surface candidates
- token sources
- component-library clues
- design language hints

The goal is not to make AIDesigner emit final production code for the repo. The goal is to generate a strong visual artifact that the agent can then port into the repo responsibly.

## Verb Mapping

### `generate`

Creates a fresh local run and writes:

- `request.json`
- `repo-context.json`
- `design.html`
- `preview.png`
- `summary.json`

### `refine`

Loads a prior run, preserves parent context, and writes a new run with a `parentRunId`. On the MCP path, remote run ids are also persisted server-side so follow-up refinements can reference them directly.

### `preview`

Renders an HTML artifact to a PNG preview using local browser automation when available.

For clone workflows, this preview is part of the required visual QA loop. Agents should compare screenshots, not just inspect HTML or DOM structure.

### `adopt`

Reads the current run plus repo context and writes an adoption brief so the agent knows how to turn the artifact into repo-native code.

## Error Handling Expectations

Surface failures clearly:

- missing or invalid OAuth token
- missing or invalid API key fallback
- insufficient credits
- invalid reference URL
- upstream generation failure
- preview renderer unavailable

When preview rendering fails, keep the HTML artifact and explain the preview blocker. For clone workflows, the agent should request installation or enablement of browser automation such as Playwright or Puppeteer instead of silently skipping visual QA.
