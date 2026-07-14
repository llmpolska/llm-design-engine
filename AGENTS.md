# AGENTS.md

These instructions apply to coding agents working in `llm-design-engine`.

## Product contract

LLM Design Engine is a creative director and design compiler for coding agents. The primary promise is **Design before code**. Do not turn it into a theme picker, template gallery, component-library wrapper, or generic AI SaaS landing page.

The pipeline is:

```text
brief → domain interpretation → metaphor → narrative → composition
→ design AST → deterministic preview → agent instructions
```

## Repository rules

- Use Node.js 22+ and pnpm 10+.
- Use strict TypeScript and ESM.
- Use workspace package boundaries; import contracts from `@llm-design-engine/core` and `@llm-design-engine/design-format` instead of duplicating types.
- Keep providers behind interfaces. Mock/disabled modes must work without credentials.
- Use Vue 3/Vite for apps. Tailwind is an implementation utility, not a source of design decisions.
- Do not add shadcn, DaisyUI, Bootstrap, Material UI, Ant Design, or premade landing templates.
- Do not imitate named companies, living designers, or existing websites.
- Avoid purple gradients, glassmorphism, floating card farms, generic device mockups, meaningless blobs, and centered-copy defaults unless the approved direction explains them.
- No placeholder lorem ipsum, fake API success, unfinished TODO/FIXME comments, or hidden feature claims.
- Use the LLM Design Engine brand tokens: warm paper, kiln black, oxidized coral, mineral teal, registration marks, mono annotations.

## Test-first workflow

Write a focused behavioral test first. Run it and confirm the expected failure. Implement the smallest change. Run the focused test, then the affected package typecheck/build. Do not rely on a snapshot of source text as the only assertion.

```bash
pnpm --filter @llm-design-engine/<package> test
pnpm --filter @llm-design-engine/<package> typecheck
pnpm --filter @llm-design-engine/<package> build
```

Before completion run `./node_modules/.bin/eslint .`, `pnpm typecheck`, `pnpm test`, and the app builds. The harness wrapper around `pnpm lint` can emit JSON help text; direct ESLint output is authoritative.

## Artifact format

`.design/BRIEF.md`, `.design/DIRECTIONS.md`, `.design/BRAND.md`, `.design/pages/*.design.md`, `.design/brandkit.json`, `.design/assets/`, `.design/previews/`, and `.design/manifest.json` are canonical. Markdown is human-readable; structured payloads are JSON-safe and validated by `@llm-design-engine/design-format`.

## UI quality

Choose a visual metaphor from the product domain before writing components. Every major composition needs a focal point, responsive rules, a typography role, material language, motion direction, and forbidden patterns. Any public site or studio surface must remain usable on a narrow mobile viewport, expose visible focus states, honor reduced motion, and avoid horizontal overflow. The public agent path is MCP + CLI + `.design` artifacts.

## Verification

Do not claim a feature works without running the relevant command or scenario. For preview work, verify deterministic output twice. For CLI work, initialize a temporary directory and inspect the expected `.design/` files. For apps, run a production build and a browser smoke test. Deferred features must be described as deferred: autonomous image-to-code and full visual implementation verification are not MVP behavior.
