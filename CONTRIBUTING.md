# Contributing

Thanks for helping make generated frontend direction more original and more executable.

## Setup

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm build
```

Node.js 22+ and pnpm 10+ are required.

## Making a change

1. Open an issue or discussion when the change affects the artifact contract.
2. Write a focused failing test before production code.
3. Keep package boundaries explicit and dependencies minimal.
4. Add a changeset for user-visible package behavior.
5. Run the affected package tests, typecheck, build, direct ESLint, and relevant browser smoke checks.
6. Use a conventional commit such as `feat(renderer): add stable SVG scene output`.

## Design contributions

A design contribution must name the product/domain interpretation, central metaphor, composition, material language, responsive behavior, and refusal list. Do not submit a premade theme or a generic six-card feature grid. Review [`docs/creative-pipeline.md`](docs/creative-pipeline.md) and [`docs/anti-slop.md`](docs/anti-slop.md).

## Pull requests

Use the pull request template. Describe the observable behavior, tests run, no-key behavior, and any deferred work. Keep one coherent stage per commit; do not fake dates or authors.

## Code of conduct

Participation is governed by [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).
