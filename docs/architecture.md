# Architecture

LLM Design Engine is a TypeScript monorepo with one stable artifact contract and replaceable adapters.

```text
Project files (.design)
        │
        ▼
MCP STDIO server / CLI ─── local API adapter
        │
        ▼
creative-director → design-format → core AST
        │                    │
        ├── brandkit         ├── renderer → HTML/CSS/SVG
        ├── image-provider   └── anti-slop → report
        └── repo-scanner (deferred verifier seam)
```

## Boundaries

- `core` owns data contracts and has no network or filesystem side effects.
- `design-format` validates and serializes Markdown artifacts.
- `creative-director` owns interpretation and generation adapters.
- `renderer` is deterministic for a given `DesignDocument`.
- `brandkit` derives identity assets from a direction.
- `image-provider` is optional and provenance-first.
- `anti-slop` is deterministic and does not rewrite files.
- `cli` orchestrates filesystem artifacts and local servers.
- `mcp` exposes the same CLI workflow over STDIO tools, plus resources and prompts.
- `apps/website` and `apps/studio` remain in the monorepo as internal/review surfaces and are not part of the public agent path.

## Why JSON-safe AST

JSON-safe nodes make provider output testable, previews repeatable, and exports portable. Markdown remains the review surface; JSON is the compiler boundary.

## MCP surface

- Tools write or inspect `.design` artifacts and return structured JSON plus text content.
- Resources mirror the current project `.design` tree under `lde://artifact/*`.
- Prompts encode the preferred design-before-code sequence for coding agents.

## Future extension points

`RepoScanner` exposes a typed deferred result for a future visual implementation verifier. `ImageProvider` supports refine requests for a future asset review loop. Neither is presented as implemented autonomous image-to-code or fidelity verification.
