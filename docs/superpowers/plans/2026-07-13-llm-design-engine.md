# LLM Design Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Deliver a local-first TypeScript monorepo that turns product meaning into original design artifacts, deterministic previews, brandkits, lint reports, and coding-agent instructions.

**Architecture:** Establish shared JSON-safe contracts first, then implement provider-backed engines behind those contracts. The CLI owns `.design/` file orchestration; the Vue studio and public website consume stable package APIs and deterministic fixture data. Mock providers make every path work without credentials.

**Tech Stack:** Node 22+, pnpm workspaces, Turborepo, TypeScript strict, Vue 3, Vite, Tailwind utility CSS, Zod, Commander, Hono, Playwright, Vitest, ESLint, Prettier, Changesets.

---

### Task 1: Monorepo foundation and package contracts

**Files:** root `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`, `eslint.config.mjs`, `.prettierrc`, package manifests, package entrypoints, `.gitignore`.

- [ ] Create workspace scripts for `typecheck`, `lint`, `test`, `build`, and `dev`.
- [ ] Add strict TS project references and package export maps.
- [ ] Add only required runtime/dev dependencies.
- [ ] Run `pnpm install` and the empty workspace checks.
- [ ] Commit `chore: initialize TypeScript monorepo`.

### Task 2: Shared models and design format

**Files:** `packages/shared/src/*`, `packages/core/src/*`, `packages/design-format/src/*`, focused Vitest tests.

- [ ] Write failing schema/round-trip tests first.
- [ ] Implement ProjectBrief, ProductInterpretation, CreativeDirection, DesignDocument, Design AST, Brandkit, asset manifest, and linter contracts.
- [ ] Implement frontmatter parser/serializer with validation and useful errors.
- [ ] Verify parser and schema tests, then commit `feat(core): define project and creative direction models` and `feat(format): add agent-native design document format`.

### Task 3: Creative, renderer, brandkit, image, and lint engines

**Files:** package source/tests under `packages/creative-director`, `renderer`, `brandkit`, `image-provider`, `anti-slop`, `repo-scanner`.

- [ ] Add failing tests for provider selection, distinct mock directions, deterministic render output, brandkit required fields, image manifests, and lint scoring.
- [ ] Implement mock and OpenAI-compatible reasoning adapters.
- [ ] Implement deterministic direction families and design generation.
- [ ] Implement HTML/CSS/SVG renderer and optional Playwright screenshot helper.
- [ ] Implement brandkit tokens/mark SVGs and image prompt manifests.
- [ ] Implement deterministic anti-slop rules and explicit scanner extension point.
- [ ] Commit coherent engine stages in the requested conventional order.

### Task 4: CLI and local API

**Files:** `packages/cli/src/*`, CLI tests, API tests.

- [ ] Write temporary-directory command tests first.
- [ ] Implement `lde init`, `brief`, `directions`, `generate`, `preview`, `refine`, `approve`, `brandkit`, `lint`, and `export`.
- [ ] Implement Hono routes for project state and generation actions.
- [ ] Ensure missing credentials never block mock-mode workflows.
- [ ] Commit `feat(cli): add project initialization and brief commands` plus subsequent CLI commits.

### Task 5: Applications and examples

**Files:** `apps/studio`, `apps/website`, `examples/gastroops`, generated SVG/CSS assets, app tests.

- [ ] Build accessible Vue studio views for every required artifact.
- [ ] Build the foundry landing page with meaning → metaphor → composition → specification → frontend narrative and non-generic layouts.
- [ ] Add cohesive brand assets and intentional SVG placeholders plus `pnpm generate:website-assets`.
- [ ] Add complete GastroOps brief, three directions, approved design, brandkit, preview, prompts, and agent export.
- [ ] Add Playwright smoke coverage and commit app/example stages.

### Task 6: Documentation and open-source readiness

**Files:** README, docs, AGENTS.md, CONTRIBUTING.md, ROADMAP.md, LICENSE, governance templates, `.github/*`, changesets, commitlint config.

- [ ] Write discovery-optimized README and required docs with working local links.
- [ ] Add code of conduct, security policy, issue templates, PR template, dependabot, CI, release workflow, and changeset conventions.
- [ ] Remove placeholders and unfinished TODO comments.
- [ ] Commit docs, CI, and release-preparation stages.

### Task 7: Verification and release

- [ ] Run focused Vitest suites, `pnpm typecheck`, `pnpm lint`, package/app builds, and Playwright smoke tests.
- [ ] Run CLI initialization in a temporary directory and verify all expected artifacts.
- [ ] Check internal links, mobile overflow, accessible names, no-key mode, and deterministic preview output.
- [ ] Create chronological conventional commits without fake authors/dates.
- [ ] Attempt GitHub creation only if authenticated; otherwise print exact `gh` commands and leave local repository ready.
