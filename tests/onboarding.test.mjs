import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

test('README exposes a truthful public onboarding path', async () => {
  const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');

  assert.match(readme, /## Start in 60 seconds/);
  assert.match(readme, /Node\.js 22\+ and pnpm 10\.x/);
  assert.match(readme, /pnpm run setup/);
  assert.match(readme, /pnpm install --frozen-lockfile/);
  assert.match(readme, /pnpm mcp/);
  assert.match(readme, /CLI/);
  assert.match(readme, /MCP/);
  assert.match(readme, /deterministic local\/mock/i);
  assert.match(readme, /provider-backed/i);
  assert.match(readme, /docs\/mcp\/README\.md/);
  assert.doesNotMatch(readme, /\.\.\/\.\.\/packages\/cli/);
  assert.doesNotMatch(readme, /\npnpm setup\n/);
  assert.doesNotMatch(readme, /## Studio GUI/);
});

test('setup script validates runtimes and orders frozen installation before build', async () => {
  const scriptUrl = new URL('../scripts/setup.mjs', import.meta.url);
  const exists = await access(scriptUrl).then(
    () => true,
    () => false,
  );

  assert.equal(exists, true, 'scripts/setup.mjs must exist');
  if (!exists) return;

  const { exitCodeFor, setupCommands, validateNodeVersion, validatePnpmVersion } = await import(
    scriptUrl.href
  );

  assert.equal(validateNodeVersion('v22.0.0'), 22);
  assert.equal(validatePnpmVersion('10.33.0'), 10);
  assert.throws(() => validateNodeVersion('v21.9.0'), /Node.js 22 or newer/);
  assert.throws(() => validatePnpmVersion('9.15.0'), /pnpm 10/);
  assert.deepEqual(setupCommands(), [
    ['pnpm', ['install', '--frozen-lockfile']],
    ['pnpm', ['build']],
  ]);
  assert.equal(typeof exitCodeFor, 'function');
  assert.equal(exitCodeFor({ exitCode: 42 }), 42);
  assert.equal(exitCodeFor(new Error('no exit code')), 1);

  const script = await readFile(scriptUrl, 'utf8');
  assert.match(script, /pnpm mcp/);
  assert.match(script, /docs\/mcp\/README\.md/);
});

test('MCP docs and configs exist for supported agents', async () => {
  const files = [
    '../docs/mcp/README.md',
    '../docs/mcp/claude-code.json',
    '../docs/mcp/codex.json',
    '../docs/mcp/opencode.json',
    '../docs/mcp/oh-my-pi.json',
  ];
  for (const file of files) {
    await access(new URL(file, import.meta.url));
  }
  const guide = await readFile(new URL('../docs/mcp/README.md', import.meta.url), 'utf8');
  assert.match(guide, /lde_select/);
  assert.match(guide, /lde:\/\/artifact\//);
  assert.match(guide, /design_workflow/);
});
