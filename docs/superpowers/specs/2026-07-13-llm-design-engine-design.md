# LLM Design Engine Product Design

## Decision

LLM Design Engine is a local-first design compiler for coding agents. Its core metaphor is a **meaning foundry**: a project brief is treated as a material sample, the creative director identifies its domain tension, presses that meaning into an original visual metaphor, composes a visual narrative, and emits a structured blueprint plus executable implementation notes.

The system will never select from named themes, templates, component libraries, or visual presets. Mock and deterministic providers use domain-specific rules to produce distinct directions; an OpenAI-compatible adapter can replace the reasoning layer without changing artifact contracts.

## User flow

1. `lde init` creates a local `.design/` workspace.
2. `lde brief` writes a validated product brief.
3. `lde directions` analyzes the brief and writes 3–5 materially different directions.
4. `lde refine` applies feedback while preserving the selected direction's identity.
5. `lde approve` locks a direction.
6. `lde generate` writes the design document, agent instructions, and deterministic preview input.
7. `lde brandkit` writes a complete brand system and asset prompts.
8. `lde preview` renders the approved design as deterministic HTML/SVG/CSS.
9. `lde lint` reports an AI-slop score and actionable warnings.
10. `lde export` creates a compact package for a coding agent.

All state is plain files under `.design/`; no database or AI key is required for the default path.

## Architecture

- `packages/shared` contains IDs, filesystem helpers, and JSON-safe utilities.
- `packages/design-format` owns Zod schemas, Markdown frontmatter parsing, and serialization.
- `packages/core` owns project, interpretation, direction, design AST, and artifact orchestration types.
- `packages/creative-director` exposes `ReasoningProvider`, a deterministic mock provider, and an OpenAI-compatible HTTP adapter.
- `packages/renderer` converts the typed design AST into stable HTML/CSS/SVG and a static preview bundle; Playwright is an optional screenshot runner.
- `packages/brandkit` creates the structured brand system, token CSS, and prompt manifests.
- `packages/image-provider` exposes optional OpenAI-compatible image generation plus disabled/mock modes.
- `packages/anti-slop` provides deterministic lint rules and a score where lower is better.
- `packages/repo-scanner` is an extension point for future autonomous implementation verification; MVP returns a safe, explicit report.
- `packages/cli` is the `lde` executable and local Hono API entry point.
- `apps/studio` is a Vue 3/Vite local review surface using the same artifacts and API.
- `apps/website` is a public Astro-free Vue/Vite site whose sections explain the transformation rather than presenting a feature-card grid.

## Design AST

The design AST is JSON-safe and intentionally small: document metadata, narrative, visual language, color roles, typography roles, responsive rules, a scene graph of sections and nodes, motion principles, asset requirements, and forbidden patterns. Nodes include `frame`, `text`, `shape`, `line`, `image`, `metric`, and `annotation`, with explicit coordinates/ratios and semantic roles. The AST is the stable boundary between reasoning providers, the deterministic renderer, the linter, and coding-agent exports.

## Artifact format

`.design/BRIEF.md`, `.design/DIRECTIONS.md`, `.design/BRAND.md`, `.design/pages/landing.design.md`, `.design/brandkit.json`, `.design/manifest.json`, `.design/assets/`, and `.design/previews/` are the canonical outputs. Markdown uses YAML frontmatter plus human-readable sections. Parsers reject malformed frontmatter and validate the structured body metadata; unknown body prose remains readable and is preserved in exports.

## Creative direction constraints

Every direction records product domain, user tension, emotional target, domain objects, materials, central metaphor, visual narrative, composition, typography character, interaction concept, and forbidden patterns. Direction generation intentionally rotates between non-overlapping families (instrument panel, field ledger, signal map, material archive, etc.) based on domain vocabulary. “Dark mode versus light mode” is never used as a direction distinction.

## Brandkit

Every project receives narrative, personality, tone, naming rationale, logo/wordmark/symbol directions, color roles, typography, spacing, shape, iconography, illustration, photography, motion, favicon/social concepts, prompts, and misuse rules. The deterministic path writes SVG mark concepts and CSS tokens. AI imagery is optional and each asset records role, prompt, negative constraints, aspect ratio, placement, provider, model, and timestamp.

## Website and studio visual direction

The product brand uses a **press mark**: two offset registration brackets enclosing a small cut line, communicating transformation, structure, and executable precision without a sparkle, wand, robot, brain, or infinity motif. The palette is warm paper (`#f3efe7`), kiln black (`#171716`), carbon ink (`#2b2b27`), and oxidized coral (`#d06b4b`) with a mineral teal secondary used sparingly. Display type is a condensed grotesk stack (`"Arial Narrow"`, `"Trebuchet MS"`, sans-serif fallback) and body type is a humanist system stack; code uses a mono stack. The site uses a floating utility nav, editorial split hero, process rail, annotated blueprint sheets, and comparison strips. It avoids gradients, stock imagery, excessive rounded cards, and six-card feature grids.

The studio uses the same tokens and supports desktop/mobile layouts with keyboard-visible controls, labelled forms, reduced-motion CSS, and route-like views implemented as a compact local app.

## Error handling and no-key mode

Provider failures are surfaced as typed errors and fall back only when explicitly configured for mock mode. CLI commands explain missing credentials without blocking local preview, lint, brandkit, or export. Writes are atomic at the file level where practical and never delete an approved direction during refinement.

## Testing

Vitest covers schemas, parser/serializer round trips, deterministic direction diversity, renderer stability, brandkit completeness, image manifest validation, linter scoring, and CLI workflows in temporary directories. Playwright covers website and studio boot, major navigation, mobile viewport overflow, and a no-key preview smoke test.

## Explicitly deferred

Autonomous image-to-code and full visual implementation verification are extension points only. Repo scanning exposes a typed result contract but does not attempt to judge arbitrary implementation fidelity in the MVP.
