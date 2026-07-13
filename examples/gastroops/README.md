# GastroOps / LLM Design Engine case study

GastroOps is an operational system for restaurants covering tasks, food safety, inventory, documentation, staff operations, and synchronization status.

The source tension is concrete: **keep control during the pressure of service without hiding the next handoff**.

## Directions

1. **Professional Kitchen Control Room** — blackened steel, printed kitchen tickets, station markings, warm pass lighting, scratched stainless worktops, and a low command rail. The pass is the focal surface.
2. **Field Ledger** — folded working pages, graphite rubbings, linen tabs, and an editorial diagonal reading path. Operations become observations that can be marked and handed forward.
3. **Signal Map** — vellum overlays, plotter ink, brushed aluminum, and one route line connecting kitchen objects into a next action.
4. **Material Archive** — a catalog rail of specimens, stamps, and indexed shelves for teams that need a durable record of decisions.

The approved direction is Professional Kitchen Control Room. Direction changes are material and compositional, not dark/light mode variants.

## Artifacts

- `.design/BRIEF.md` — product brief and tension
- `.design/DIRECTIONS.md` — structured interpretation and four directions
- `.design/pages/landing.design.md` — approved design document and scene graph
- `.design/BRAND.md` / `.design/brandkit.json` — brand narrative, tokens, usage rules, and prompts
- `.design/assets/` — deterministic SVG mark, token CSS, and local placeholder assets
- `.design/previews/landing.html` / `landing.svg` — no-key deterministic preview
- `.design/EXPORT.md` — compact instructions for a coding agent
- `.design/assets/manifest.json` — provenance for every image placeholder

The example works with the mock/disabled providers and does not require API credentials. Replace the asset provider through `ImageProvider` when generating final imagery.
