# LLM Design Engine v0.1 Hardening Design

## Goal

Turn the current scaffold into a demonstrable, private-repository MVP whose generated output proves that product meaning changes the composition rather than selecting a named theme or layout.

## Decisions

1. Preserve the existing monorepo and append focused conventional commits. No history rewrite, squash, public release, npm publish, Pages deployment, or visibility change.
2. Keep `packages/core` as the canonical contract owner. Add Zod schemas beside the exported TypeScript contracts so runtime validation, provider JSON Schema, parsing, MCP payloads, and benchmark checks share one source.
3. Extend `packages/creative-director` into a typed compiler rather than introducing a second orchestration package. The compiler stages are explicit:
   `ProjectBrief -> ProductMeaning -> CreativeHypothesis -> CompositionPlan -> DesignSceneGraph -> AgentExecutableDesign`.
4. The mock provider is deterministic but algorithmic. It derives primitives from domain terms, jobs, tension, users, constraints, and inferred operational verbs. Named historical examples move into `fixtures/` and are never imported by production generation.
5. The scene graph supports semantic sections plus free-positioned layers, stacks, tracks, grids, overlays, anchors, relationships, responsive transformations, and motion relationships. The renderer consumes this graph without assuming a hero/features/testimonials/CTA order.
6. The OpenAI-compatible provider requests structured output when configured, validates every response, extracts fenced JSON only as a bounded fallback, retries and repairs once, records raw response and metadata, and throws actionable errors. It never silently invokes mock generation.
7. Refinement is a semantic patch operation. Each feedback request produces a before/after patch list, applies patches to the actual composition/scene graph/design rules, preserves the approved identity unless explicitly changed, and is rendered in both CLI and Studio.
8. Anti-slop reporting separates lexical heuristics from AST structural checks. It reports lexical slop, structural slop, domain specificity, compositional diversity, and overall confidence; it does not claim screenshot-level visual analysis.
9. The MCP package uses STDIO transport and exposes the requested tools over the same local compiler/CLI service. Configuration examples are written only for tested local commands; unverified harness-specific UI is marked as such.
10. Screenshots are generated from running website/studio applications using seeded example data. The README and website show actual workflow evidence, while the existing SVG brand artwork remains labeled as conceptual branding.

## Error and persistence model

Every provider call has a timeout, retry count, operation name, request metadata, response metadata, and raw response capture. Invalid payload errors include Zod paths and the failed repair attempt. CLI artifacts persist `MEANING.md`, `DIRECTION.md`, `COMPOSITION.md`, `design.json`, `lint.json`, and semantic refinement history. MCP returns structured errors instead of fake success.

## Verification model

The baseline is reproduced in an isolated worktree before edits. CI runs install, typecheck, lint, tests, build, Playwright, and screenshot generation without relying on a previous worktree cache. Benchmark tests enforce pairwise differences in scene graph structure, section order, focal strategy, metaphor wording, materials, typography behavior, responsive transformation, and opening arrangement.

## Explicit non-goals

Autonomous image-to-code, screenshot-based implementation verification, npm publication, public deployment, and real external provider calls are not part of this iteration. Their seams remain documented and tested through disabled/mock behavior.

## Sparse visual-direction artifact

Any GPT Image 2/OpenAI image output is an art-direction plate, never a landing-page mockup. The prompt is compiled from the approved `CreativeHypothesis` and may request one dominant composition, one representative interface surface, large typographic forms, material samples, registration marks, and negative space. It must forbid complete page sections, feature grids, fake navigation, testimonials, pricing, dense dashboards, invented paragraphs, and browser frames. The structured `CompositionPlan`, `DesignSceneGraph`, and `.design.md` remain the implementation source of truth.

Each direction persists:

```text
CreativeHypothesis/
├── visual-direction.png
├── composition.json
├── direction.design.md
├── asset-language.md
└── generation.json
```

Studio labels this artifact `Visual direction — not final page layout`. Deterministic preview is generated only after approval from the scene graph. Refinement preserves the metaphor and visual identity while changing visual-direction constraints rather than adding invented website content.
