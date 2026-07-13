# Public Onboarding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the public README the shortest truthful path to a working Studio, CLI, or MCP workflow, with a verified cross-platform `pnpm run setup` entry point.

**Architecture:** A root Node setup script owns environment validation, frozen dependency installation, workspace build, and next-step output. A Node built-in test imports its pure helpers and validates the README contract; the existing clean-checkout smoke invokes the setup command as the end-to-end proof. README content is layered: a 60-second start first, three audience paths second, operating-mode boundaries before reference material.

**Tech Stack:** Node.js 22+, pnpm 10, Node built-in test runner, TypeScript monorepo, Markdown.

---

## File structure

| File                               | Responsibility                                                                                       |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `scripts/setup.mjs`                | Cross-platform setup executable and exported pure validation/command helpers.                        |
| `tests/onboarding.test.mjs`        | Node built-in unit checks for Node/pnpm validation, setup command order, and public README contract. |
| `scripts/clean-checkout-smoke.mjs` | Calls `pnpm run setup` in the copied checkout instead of duplicating setup commands.                 |
| `package.json`                     | Exposes `pnpm run setup` and includes onboarding tests in root test verification.                    |
| `README.md`                        | Public-facing onboarding, paths, operating modes, evidence, and concise technical reference.         |

### Task 1: Add setup script behavior tests

**Files:**

- Create: `tests/onboarding.test.mjs`
- Test: `tests/onboarding.test.mjs`

- [ ] **Step 1: Write failing tests for pure setup helpers and README promises**

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { setupCommands, validateNodeVersion, validatePnpmVersion } from '../scripts/setup.mjs';

test('accepts supported runtime versions', () => {
  assert.equal(validateNodeVersion('v22.0.0'), 22);
  assert.equal(validatePnpmVersion('10.33.0'), 10);
});

test('rejects unsupported runtime versions', () => {
  assert.throws(() => validateNodeVersion('v21.9.0'), /Node.js 22 or newer/);
  assert.throws(() => validatePnpmVersion('9.15.0'), /pnpm 10/);
});

test('runs frozen install before workspace build', () => {
  assert.deepEqual(setupCommands(), [
    ['pnpm', ['install', '--frozen-lockfile']],
    ['pnpm', ['build']],
  ]);
});

test('README exposes truthful first paths', async () => {
  const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
  assert.match(readme, /pnpm run setup/);
  assert.match(readme, /pnpm install --frozen-lockfile/);
  assert.match(readme, /Studio GUI/);
  assert.match(readme, /CLI/);
  assert.match(readme, /MCP/);
  assert.match(readme, /deterministic local\/mock/i);
  assert.match(readme, /provider-backed/i);
  assert.doesNotMatch(readme, /\.\.\/\.\.\/packages\/cli/);
});
```

- [ ] **Step 2: Run the test and confirm expected failure**

Run:

```bash
node --test tests/onboarding.test.mjs
```

Expected: failure because `scripts/setup.mjs` does not exist and the existing README lacks the new onboarding contract.

- [ ] **Step 3: Commit the red test**

```bash
git add tests/onboarding.test.mjs
git commit -m "test(docs): define public onboarding contract"
```

### Task 2: Implement the cross-platform setup command

**Files:**

- Create: `scripts/setup.mjs`
- Modify: `package.json:11-31`
- Test: `tests/onboarding.test.mjs`

- [ ] **Step 1: Implement pure version and command helpers**

```js
export function validateNodeVersion(version) {
  const match = /^v?(\d+)/.exec(version);
  const major = Number(match?.[1]);
  if (!Number.isInteger(major) || major < 22) {
    throw new Error(`LLM Design Engine requires Node.js 22 or newer; found ${version}.`);
  }
  return major;
}

export function validatePnpmVersion(version) {
  const match = /^(\d+)/.exec(version);
  const major = Number(match?.[1]);
  if (!Number.isInteger(major) || major !== 10) {
    throw new Error(`LLM Design Engine requires pnpm 10; found ${version}.`);
  }
  return major;
}

export function setupCommands() {
  return [
    ['pnpm', ['install', '--frozen-lockfile']],
    ['pnpm', ['build']],
  ];
}
```

- [ ] **Step 2: Implement setup execution and concise next-step output**

Use `node:child_process` `execFile` with `promisify`. Validate `process.version`, run `pnpm --version`, call `validatePnpmVersion`, then run every `setupCommands()` entry sequentially in `process.cwd()`. Write each invocation as `$ pnpm …` before running it. After success, print exactly:

```text
Setup complete.

Studio:  pnpm --filter @llm-design-engine/studio dev
         http://127.0.0.1:4174
Website: pnpm --filter @llm-design-engine/website dev
         http://127.0.0.1:4173
CLI:     pnpm lde -- --help
Tests:   pnpm test
```

Only call `main()` when `import.meta.url === pathToFileURL(process.argv[1]).href`, so tests can import helpers without running setup.

- [ ] **Step 3: Expose the command and include onboarding tests in verification**

Add these root package scripts:

```json
"setup": "node scripts/setup.mjs",
"test:onboarding": "node --test tests/onboarding.test.mjs",
"test": "turbo run test && pnpm test:onboarding"
```

Keep `test:unit` unchanged because it is intentionally the direct Vitest command.

- [ ] **Step 4: Run focused tests**

Run:

```bash
node --test tests/onboarding.test.mjs
pnpm run setup
```

Expected: four onboarding tests pass; setup uses frozen install and completes the workspace build.

- [ ] **Step 5: Commit implementation**

```bash
git add scripts/setup.mjs package.json tests/onboarding.test.mjs
git commit -m "feat(dx): add verified cross-platform setup command"
```

### Task 3: Make the clean-checkout smoke consume setup

**Files:**

- Modify: `scripts/clean-checkout-smoke.mjs:29-41`
- Test: `scripts/clean-checkout-smoke.mjs`

- [ ] **Step 1: Replace duplicated install/build commands with the public setup contract**

Change the temporary-checkout command list to:

```js
const commands = [
  ['pnpm', ['setup']],
  ['pnpm', ['typecheck']],
  ['pnpm', ['test']],
  ['pnpm', ['lde', '--help']],
];
```

This makes the clean checkout execute the exact setup command recommended by README, while retaining typecheck, test, and CLI-help coverage.

- [ ] **Step 2: Run the clean-checkout smoke**

Run:

```bash
pnpm smoke:clean
```

Expected: a copied temporary checkout completes `pnpm run setup`, typecheck, tests, and `lde --help`, then prints `Clean checkout smoke passed`.

- [ ] **Step 3: Commit the integration wiring**

```bash
git add scripts/clean-checkout-smoke.mjs
git commit -m "test(dx): smoke test documented setup path"
```

### Task 4: Rewrite README as a public onboarding document

**Files:**

- Modify: `README.md:1-222`
- Test: `tests/onboarding.test.mjs`

- [ ] **Step 1: Replace the opening through Studio section with concise onboarding**

Use this order and preserve the existing repository banner:

````markdown
# LLM Design Engine

**Design before code.**

LLM Design Engine turns product meaning into original, agent-executable UI direction.

## Start in 60 seconds

```bash
git clone https://github.com/llmpolska/llm-design-engine.git
cd llm-design-engine
pnpm run setup
pnpm --filter @llm-design-engine/studio dev
```
````

Open `http://127.0.0.1:4174`, select **Brief editor**, complete the four brief fields, then select **Save and shape directions**.

## Choose your path

| You want to…                          | Use        | Result                                                           |
| ------------------------------------- | ---------- | ---------------------------------------------------------------- |
| review a direction visually           | Studio GUI | brief → directions → specification → preview → lint → export     |
| create `.design/` inside a repository | CLI        | portable Markdown and JSON design artifacts                      |
| let a coding agent call the compiler  | MCP        | local STDIO tools for Claude Code, Codex, OpenCode, and Oh My Pi |

````

- [ ] **Step 2: Add truthful mode boundaries and path-specific commands**

Add a `## What works today` table with these exact distinctions:

| Mode | Credentials | Result |
| --- | --- | --- |
| deterministic local/mock | none | reproducible directions, SVG assets, preview, lint, brandkit, and export |
| provider-backed | configured endpoint/model/API key | reasoning and optional image-generation adapters |
| Studio GastroOps fixture | none | reproducible local review journey; not a claim that fixture mode calls an external LLM |

For CLI, keep commands rooted in the cloned repository:

```bash
pnpm lde -- init
pnpm lde -- brief --name "GastroOps" --summary "Operations for restaurant teams" --domain "restaurant operations" --tension "Keep control during service pressure."
pnpm lde -- directions
pnpm lde -- generate
pnpm lde -- approve
pnpm lde -- lint
pnpm lde -- export
````

For MCP, link directly to `docs/mcp/claude-code.json`, `docs/mcp/codex.json`, `docs/mcp/opencode.json`, and `docs/mcp/oh-my-pi.json`.

- [ ] **Step 3: Compress evidence and reference material**

Keep only `studio-directions.png` and `studio-preview-desktop.png` inline. Link the complete capture table/directory in a compact `## Reproducible evidence` section. Retain the existing GastroOps before/after, design format sample, architecture table, provider details, anti-slop rules, website imagery, integrations, philosophy, roadmap, contribution, and license sections, but remove the temporary private-hardening notice because the public README must not contain a release-process disclaimer.

- [ ] **Step 4: Run README contract test and link verification**

Run:

```bash
node --test tests/onboarding.test.mjs
```

Then run the existing Markdown relative-link validation command used in release verification. Expected: onboarding test passes and no relative links are broken.

- [ ] **Step 5: Commit public documentation**

```bash
git add README.md tests/onboarding.test.mjs
git commit -m "docs: streamline public project onboarding"
```

### Task 5: Run release-quality verification

**Files:**

- Verify only

- [ ] **Step 1: Format and static checks**

Run:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
```

Expected: all commands exit 0.

- [ ] **Step 2: Behavioral and browser checks**

Run:

```bash
pnpm test
pnpm test:e2e
pnpm test:mcp
pnpm check:benchmark
pnpm screenshots
```

Expected: all unit, browser, MCP, diversity, and screenshot capture checks pass.

- [ ] **Step 3: Verify the documented path from a clean checkout**

Run:

```bash
pnpm smoke:clean
```

Expected: the temporary checkout invokes `pnpm run setup`, then passes typecheck, tests, build, and CLI help.

- [ ] **Step 4: Push the verified commits**

Run:

```bash
git push origin hardening/v0.1:main
git push origin hardening/v0.1
```

Expected: `main` and `hardening/v0.1` reference the verified onboarding revision.
