import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

function workflowStepIndex(workflow, command) {
  return workflow.split('\n').findIndex((line) => line.trim() === `- run: ${command}`);
}

test('CI builds the MCP STDIO server before its package tests run', async () => {
  const workflow = await readFile(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8');
  const buildStep = workflowStepIndex(workflow, 'pnpm build');
  const testStep = workflowStepIndex(workflow, 'pnpm test');

  assert.ok(buildStep >= 0, 'CI must build before package tests');
  assert.ok(testStep > buildStep, 'CI must run the package tests after the build');
});

test('CI package-test matcher excludes named test commands', () => {
  const workflow = '      - run: pnpm build\n      - run: pnpm test:e2e';

  assert.equal(workflowStepIndex(workflow, 'pnpm test'), -1);
});
