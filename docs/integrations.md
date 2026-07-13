# Integrations

`lde export` writes a compact Markdown package that can be handed to Codex, Claude Code, OpenCode, Oh My Pi, or another coding agent.

## Codex / Claude Code / OpenCode

Paste `.design/EXPORT.md` at the start of an implementation task. Keep the approved design document, brandkit, and lint report in the same workspace. Ask the agent to cite the relevant section before changing a component.

## Oh My Pi

Use the export as a local artifact reference and keep `AGENTS.md` in the repository root. The package boundaries and provider seams are explicit so a subagent can work on one stage without inventing a parallel schema.

## Local API

The CLI package exposes a Hono app for a local adapter:

```ts
import { createApiApp } from '@llm-design-engine/cli';
import { serve } from '@hono/node-server';

serve(createApiApp(process.cwd()), { port: 4318 });
```

Routes include `/api/manifest`, `/api/design`, and `/api/brandkit`. The Vue studio can replace its fixture state with these routes without changing its view contracts.

## MCP

An MCP server is not required by the MVP. A future integration can expose the same JSON-safe design AST and artifact manifest as read-only resources, preserving the local-file source of truth.
