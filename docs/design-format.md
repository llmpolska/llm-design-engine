# Design format

The design format is Markdown with YAML frontmatter and a JSON-safe `lde-data` payload. Humans can read and review the narrative; tooling can validate and render the exact same document.

## Canonical files

```text
.design/BRIEF.md
.design/DIRECTIONS.md
.design/BRAND.md
.design/pages/landing.design.md
.design/brandkit.json
.design/assets/
.design/previews/
.design/manifest.json
```

## Frontmatter

`id`, `route`, `concept`, and `status` are required. Status is `draft`, `approved`, or `archived`. The parser rejects missing frontmatter, missing payloads, malformed JSON, and mismatched IDs/status values.

## Design AST

`DesignDocument.scene` contains a fixed-size scene with JSON-safe nodes:

- `frame` — semantic surface with fill/stroke and child IDs.
- `text` — display/body/mono role, size, weight, color, and alignment.
- `shape` — circle, rectangle, arc, or path.
- `line` — route, divider, or measurement mark.
- `image` — asset ID, fit, and alt text.
- `metric` — a number with a caption and optional trend.
- `annotation` — prose anchored to another node.

Sections add human composition rules: height, layout, focal point, alignment, and rule list. `responsive.mobile` is mandatory; tablet and desktop rules are optional. `motion.reducedMotion` describes the final state when animation is disabled.

## Example

```markdown
---
id: gastroops-landing
route: /
concept: professional-kitchen-control-room
status: approved
---

# Narrative

The pass surface keeps the next handoff visible during service.

# Composition

## Hero

- height: 76svh
- layout: low command rail with station columns
- focal-point: the pass surface
- heading-alignment: bottom-left

# Visual language

- blackened steel
- printed kitchen tickets

# Avoid

- purple gradients
- generic dashboard mockups
```

Use `@llm-design-engine/design-format` for `designDocumentSchema`, `parseDesignMarkdown`, and `serializeDesignMarkdown`. Avoid hand-editing the JSON payload without re-running `lde lint`.
