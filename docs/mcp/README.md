# MCP server

LLM Design Engine’s primary agent interface is a local STDIO MCP server.

It exposes the full design-before-code workflow as tools, mirrors `.design` artifacts as resources, and ships prompts that encode the preferred sequence.

## Start

```bash
pnpm run setup
pnpm mcp
```

`pnpm mcp` builds the server if needed, keeps protocol traffic on stdout, and writes build noise to stderr.

Optional:

```bash
LDE_PROJECT_DIR=/absolute/path/to/target-app pnpm mcp
```

When `LDE_PROJECT_DIR` is set, resource listing/reading and default tool cwd use that project. Tools still accept an explicit `projectDir` argument. Resource URIs always mirror the **server working directory** `.design` tree, not an arbitrary tool `projectDir`. For multi-project work, prefer one MCP server process per target app, or use `lde_read_artifact` with `projectDir`.

Copy one of:

- [claude-code.json](./claude-code.json)
- [codex.json](./codex.json)
- [opencode.json](./opencode.json)
- [oh-my-pi.json](./oh-my-pi.json)

Replace `/absolute/path/to/llm-design-engine` with the cloned repository path.

## Tools

| Tool | Role |
| --- | --- |
| `lde_init` | Create `.design/` |
| `lde_brief` | Write product brief |
| `lde_directions` | Compile four creative directions |
| `lde_select` | Select a direction by id, name, or 1-based index |
| `lde_generate` | Compile design specification / scene graph |
| `lde_preview` | Deterministic HTML/SVG preview |
| `lde_refine` | Semantic refinement without identity swap |
| `lde_approve` | Lock the design status |
| `lde_brandkit` | Brand system + local placeholders |
| `lde_lint` | Deterministic anti-slop report |
| `lde_export` | Agent handoff package |
| `lde_status` | Stage, artifacts, next steps |
| `lde_read_artifact` | Read one `.design` file |

Every mutating tool returns structured JSON:

```json
{
  "ok": true,
  "command": "lde generate",
  "projectDir": "/path/to/app",
  "output": ["..."],
  "nextSteps": ["..."],
  "artifacts": [{ "path": ".design/EXPORT.md", "exists": true, "bytes": 1234 }]
}
```

Errors are structured too:

```json
{
  "ok": false,
  "code": "INVALID_ARGUMENTS",
  "issues": [{ "path": "name", "message": "String must contain at least 1 character(s)" }]
}
```

## Resources

- Template: `lde://artifact/{path}`
- Examples: `lde://artifact/EXPORT.md`, `lde://artifact/pages/landing.design.md`
- Listing reflects the server working directory’s `.design` tree

## Prompts

- `design_workflow` — full design-before-code sequence
- `design_brief` — brief-only bootstrap
- `refine_design` — semantic refinement loop

## Recommended agent sequence

1. `lde_init`
2. `lde_brief`
3. `lde_directions`
4. optional `lde_select`
5. `lde_generate`
6. `lde_preview`
7. optional `lde_refine`
8. `lde_approve`
9. `lde_brandkit`
10. `lde_lint`
11. `lde_export`
12. read `EXPORT.md` before writing frontend code

## Verification

```bash
pnpm test:mcp
pnpm --filter @llm-design-engine/mcp test
```

The e2e smoke covers initialize, tools/list, prompts/list, a full write path, resources/list, and resources/read.
