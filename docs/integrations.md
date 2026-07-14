# Integrations

LLM Design Engine integrates with coding agents through two first-class surfaces:

1. **MCP** — live tools, resources, and prompts over STDIO
2. **EXPORT.md** — a portable Markdown package written by `lde export` / `lde_export`

## MCP

The STDIO MCP server is the preferred agent interface.

```bash
pnpm mcp
```

Configuration examples:

- [`docs/mcp/claude-code.json`](mcp/claude-code.json)
- [`docs/mcp/codex.json`](mcp/codex.json)
- [`docs/mcp/opencode.json`](mcp/opencode.json)
- [`docs/mcp/oh-my-pi.json`](mcp/oh-my-pi.json)

Capability surface:

- **Tools** for the full design workflow, including `lde_select`, `lde_status`, and `lde_read_artifact`
- **Resources** under `lde://artifact/*` for the current `.design` tree
- **Prompts** for `design_workflow`, `design_brief`, and `refine_design`

Full reference: [`docs/mcp/README.md`](mcp/README.md)

Set `LDE_PROJECT_DIR` when the target app is not the server cwd. Tools still accept an explicit `projectDir`.

## Codex / Claude Code / OpenCode / Oh My Pi

1. Configure the MCP server from the examples above.
2. Run the design workflow until `lde_export` succeeds.
3. Read `EXPORT.md` or the resource `lde://artifact/EXPORT.md`.
4. Keep the approved design document, brandkit, and lint report in the same workspace.
5. Ask the agent to cite the relevant section before changing a component.

If you cannot run MCP, paste `.design/EXPORT.md` at the start of an implementation task.

## Local API

The CLI package exposes a Hono app for local adapters and future review surfaces:

```ts
import { createApiApp } from '@llm-design-engine/cli';
import { serve } from '@hono/node-server';

serve(createApiApp(process.cwd()), { port: 4318 });
```

Routes include `/api/manifest`, `/api/design`, and `/api/brandkit`. This is an optional adapter seam, not the public agent path.
