import { spawn } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const projectDir = await mkdtemp(join(tmpdir(), 'lde-mcp-smoke-'));
const child = spawn(process.execPath, ['scripts/run-mcp.mjs'], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    LDE_PROJECT_DIR: projectDir,
  },
  stdio: ['pipe', 'pipe', 'inherit'],
});
const lines = createInterface({ input: child.stdout });
const pending = new Map();
let nextId = 1;

const reader = (async () => {
  for await (const line of lines) {
    if (!line.trim()) continue;
    let message;
    try {
      message = JSON.parse(line);
    } catch {
      continue;
    }
    if (!message || typeof message !== 'object' || !('id' in message)) continue;
    const resolver = pending.get(message.id);
    if (!resolver) continue;
    pending.delete(message.id);
    if (message.error) resolver.reject(new Error(message.error.message ?? 'MCP error'));
    else resolver.resolve(message.result);
  }
})();

function request(method, params) {
  const id = nextId++;
  const { promise, resolve, reject } = Promise.withResolvers();
  pending.set(id, { resolve, reject });
  child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id, method, params })}\n`);
  return promise;
}

function notify(method, params) {
  child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', method, params })}\n`);
}

function textOf(result) {
  if (!result || typeof result !== 'object' || !Array.isArray(result.content)) return '';
  return result.content
    .flatMap((item) =>
      item && typeof item === 'object' && typeof item.text === 'string' ? [item.text] : [],
    )
    .join('');
}

try {
  const init = await request('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'lde-mcp-smoke', version: '0.1.0' },
  });
  if (!init?.capabilities?.tools) throw new Error('initialize must advertise tools');
  if (!init?.capabilities?.resources) throw new Error('initialize must advertise resources');
  if (!init?.capabilities?.prompts) throw new Error('initialize must advertise prompts');

  notify('notifications/initialized', {});

  const listed = await request('tools/list', {});
  if (listed.tools.length !== 13) throw new Error(`Expected 13 tools, got ${listed.tools.length}`);

  const prompts = await request('prompts/list', {});
  if (prompts.prompts.length !== 3) {
    throw new Error(`Expected 3 prompts, got ${prompts.prompts.length}`);
  }

  const call = (name, args) => request('tools/call', { name, arguments: args });
  await call('lde_init', { projectDir });
  await call('lde_brief', {
    projectDir,
    name: 'MCP smoke',
    summary: 'A deterministic smoke project',
    domain: 'integration testing',
    tension: 'Prove the agent path without credentials',
  });
  await call('lde_directions', { projectDir });
  await call('lde_select', { projectDir, direction: '1' });
  await call('lde_generate', { projectDir });
  await call('lde_preview', { projectDir });
  await call('lde_approve', { projectDir });
  await call('lde_brandkit', { projectDir });
  await call('lde_lint', { projectDir });
  await call('lde_export', { projectDir });

  const status = await call('lde_status', { projectDir });
  if (!textOf(status).includes('"stage": "exported"')) {
    throw new Error(`Expected exported stage, got: ${textOf(status)}`);
  }

  const resources = await request('resources/list', {});
  if (!resources.resources.some((resource) => resource.uri === 'lde://artifact/EXPORT.md')) {
    throw new Error('resources/list must include EXPORT.md');
  }

  const exportResource = await request('resources/read', { uri: 'lde://artifact/EXPORT.md' });
  const exportText = exportResource.contents?.[0]?.text ?? '';
  if (!exportText.includes('Agent implementation instructions')) {
    throw new Error('resources/read EXPORT.md missing export body');
  }

  const onDisk = await readFile(join(projectDir, '.design', 'EXPORT.md'), 'utf8');
  if (!onDisk.includes('Agent implementation instructions')) {
    throw new Error('EXPORT.md was not written to disk');
  }

  console.log(`MCP smoke passed: ${projectDir}`);
} finally {
  child.kill();
  await reader.catch(() => undefined);
  await rm(projectDir, { recursive: true, force: true });
}
