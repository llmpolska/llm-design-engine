# Anti-slop linting

The linter is a deterministic second read. It does not judge taste by popularity; it checks whether the specification explains its visual decisions and carries domain evidence.

## Score

`AI Slop Score` is a 0–100 risk score where lower is better. Each triggered rule adds a weighted penalty, capped at 100. Warnings include the rule ID, a concrete message, and evidence from the document/source text.

## Rules

- `generic-hero` — split hero without a metaphor-backed reason.
- `rounded-pill` — repeated rounded-xl, rounded-2xl, rounded-full, or pill language.
- `floating-cards` — card repetition that becomes the hierarchy.
- `unexplained-gradient` — decorative gradient absent from the visual language.
- `glassmorphism` — frosted or backdrop-blur surfaces as a default.
- `feature-grid` — repetitive three-column feature layout.
- `abstract-blob` — meaningless blob language.
- `generic-mockup` — device or dashboard mockup doing narrative work.
- `stock-imagery` — stock/Unsplash/Picsum imagery without a direction-derived role.
- `centered-text` — repeated centered text with no composition reason.
- `low-contrast` — foreground/background collision.
- `missing-domain-elements` — no visible evidence from the product domain.

The linter is intentionally explainable and can be supplemented by an optional LLM critic later. It never silently rewrites a design.
