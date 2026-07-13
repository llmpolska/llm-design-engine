# Public Onboarding Design

## Goal

Make the GitHub README the shortest truthful path from a first visit to a working LLM Design Engine workflow. It must serve three equal audiences: someone evaluating the Studio GUI, a developer compiling `.design/` artifacts through the CLI, and an agent user configuring MCP.

## Decision

Use a layered README rather than a linear manual:

1. State the product and its anti-template philosophy in the opening screen.
2. Provide one verified, cross-platform `pnpm run setup` command as the first installation action; `pnpm setup` is a reserved pnpm command that mutates shell configuration.
3. Offer three clearly separated entry points: Studio GUI, CLI, and MCP.
4. State operating-mode boundaries before detailed instructions: deterministic local/mock mode works without credentials; provider-backed reasoning and image generation require explicit configuration; the included Studio GastroOps journey is a reproducible fixture.
5. Use two inline Studio screenshots as evidence, with the complete gallery linked rather than embedded.
6. Keep design format, architecture, providers, anti-slop rules, roadmap, and contribution guidance as concise reference sections lower in the page.

## README Structure

```text
Hero and concise product statement
  → Start in 60 seconds
  → Choose your path: Studio / CLI / MCP
  → What works today: local vs. provider-backed mode
  → Studio walkthrough and reproducible evidence
  → CLI workflow and `.design/` output
  → GastroOps case study
  → Format, architecture, providers, anti-slop, imagery
  → Roadmap, contribution, license
```

The quick start must not use an invalid relative path to the CLI. It must use the repository-root `pnpm lde -- …` wrapper when run from this source checkout. It must use `pnpm install --frozen-lockfile` so the documented install matches CI and the clean-checkout smoke test.

## Setup Script

Add a Node-based, cross-platform `scripts/setup.mjs` and a root `pnpm run setup` command.

### Contract

- Verify Node.js major version is at least 22 before invoking pnpm.
- Invoke the pnpm version pinned by the repository through `pnpm install --frozen-lockfile`.
- Invoke `pnpm build` after installation.
- Print the exact next commands and local URLs for Studio, Website, CLI help, and tests.
- Do not install global packages, alter shell configuration, make network calls beyond pnpm installation, write outside the checkout, or use `curl | bash`.
- Return the child process exit status when installation or build fails.

## Tests

- Unit-test setup command construction and Node version validation without installing dependencies or building the workspace.
- Add an onboarding documentation test that checks the public README contains:
  - `pnpm run setup`,
  - frozen-lockfile installation,
  - all three entry paths,
  - a clear local/mock versus provider-backed explanation,
  - no outdated `../../packages/cli` path.
- Keep the existing clean-checkout smoke test as the integration proof: it must execute frozen installation, typecheck, tests, build, and CLI help in a temporary checkout.

## Non-goals

- Publishing the CLI to npm in this change.
- Adding `pnpm dlx` instructions before a package is published.
- Creating a separate documentation website.
- Adding a curl-based installer.
- Claiming live external-provider generation in fixture-only Studio mode.

## Acceptance Criteria

1. A newcomer can copy the first setup sequence and start the Studio without resolving relative paths manually.
2. A developer can identify the correct CLI path and see the `.design/` result.
3. An agent user can locate MCP configurations without reading implementation source.
4. The README visibly separates product evidence from conceptual artwork and provider-backed behavior from deterministic local behavior.
5. Tests and clean-checkout verification cover the documented setup path.
