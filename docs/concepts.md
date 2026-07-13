# Concepts

## Design before code

LLM Design Engine treats frontend direction as a first-class artifact. A brief is not a prompt to decorate; it is raw meaning that needs interpretation.

## Meaning foundry

The foundry metaphor describes the pipeline:

1. **Brief** — factual product context, users, jobs, tension, and constraints.
2. **Interpretation** — domain, user tension, emotional target, objects, materials, and patterns to avoid.
3. **Metaphor** — a central visual behavior that belongs to the product.
4. **Narrative** — what a user should understand and feel as they move through the page.
5. **Composition** — hierarchy, focal point, rhythm, spatial relationships, and responsive behavior.
6. **Specification** — typed scene graph, tokens, asset roles, motion, and forbidden patterns.
7. **Preview** — deterministic HTML, CSS, and SVG that makes the direction inspectable.
8. **Handoff** — compact Markdown instructions for an implementation agent.

## Direction versus theme

A direction is not a color mode or a collection of components. It changes metaphor, material language, composition, typography character, and interaction concept. A direction must be explainable in domain terms and must resist being copied into an unrelated product without loss.

## Local first

The mock reasoning provider, disabled image provider, renderer, brandkit generator, and linter make the workflow useful without an API key. Providers are adapters, not the product contract.
