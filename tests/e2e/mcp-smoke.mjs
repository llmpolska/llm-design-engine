import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const projectDir = await mkdtemp(join(tmpdir(), 'lde-mcp-smoke-'));
const child = spawn(process.execPath, ['scripts/run-mcp.mjs'], {
  cwd: process.cwd(),
  stdio: ['pipe', 'pipe', 'inherit'],
});
const lines = createInterface({ input: child.stdout });
const pending = new Map();
let nextId = 1;

const reader = (async () => {
  for await (const line of lines) {
    if (!line.trim()) continue;
    const message = JSON.parse(line);
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

try {
  await request('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'lde-mcp-smoke', version: '0.1.0' },
  });
  notify('notifications/initialized', {});
  const listed = await request('tools/list', {});
  if (listed.tools.length !== 12) throw new Error(`Expected 12 tools, got ${listed.tools.length}`);
  const call = (name, args) => request('tools/call', { name, arguments: args });
  await call('lde_init', { projectDir });
  await call('lde_brief', {
    projectDir,
    name: 'MCP smoke',
    summary: 'A deterministic smoke project',
    domain: 'integration testing',
  });
  await call('lde_directions', { projectDir });
  await call('lde_generate', { projectDir });
  console.log(`MCP smoke passed: ${projectDir}`);
} finally {
  child.kill();
  await reader.catch(() => undefined);
  await rm(projectDir, { recursive: true, force: true });
}
