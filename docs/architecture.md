# Architecture

LLM Design Engine is a TypeScript monorepo with one stable artifact contract and replaceable adapters.

```text
Project files (.design)
        │
        ▼
CLI / Hono local API ─── Vue Studio
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
- `cli` is the only package that orchestrates filesystem artifacts and local servers.
- `apps/website` uses curated local fixture content for its public story.
- `apps/studio` uses local fixture state with an API seam.

## Why JSON-safe AST

JSON-safe nodes make provider output testable, previews repeatable, and exports portable. Markdown remains the review surface; JSON is the compiler boundary.

## Future extension points

`RepoScanner` exposes a typed deferred result for a future visual implementation verifier. `ImageProvider` supports refine requests for a future asset review loop. Neither is presented as implemented autonomous image-to-code or fidelity verification.
