import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { describe, expect, it } from 'vitest';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { TOOL_DEFINITIONS, handleTool } from './server.js';

const packageRoot = resolve(new URL('..', import.meta.url).pathname);
const serverEntry = join(packageRoot, 'dist', 'server.js');
function textOf(result: unknown): string {
  if (
    !result ||
    typeof result !== 'object' ||
    !('content' in result) ||
    !Array.isArray(result.content)
  )
    return '';
  return result.content
    .flatMap((item) =>
      item && typeof item === 'object' && 'text' in item && typeof item.text === 'string'
        ? [item.text]
        : [],
    )
    .join('');
}

describe('STDIO MCP server', () => {
  it('exposes the complete typed tool surface and structured argument errors', async () => {
    expect(TOOL_DEFINITIONS).toHaveLength(12);
    const result = await handleTool(
      'lde_brief',
      { name: '', summary: 'x', domain: 'y' },
      { cwd: tmpdir() },
    );
    expect(result.isError).toBe(true);
    expect(textOf(result)).toContain('INVALID_ARGUMENTS');
  });

  it('runs one full workflow through a real child-process STDIO client', async () => {
    const projectDir = await mkdtemp(join(tmpdir(), 'lde-mcp-'));
    const client = new Client(
      { name: 'lde-mcp-test-client', version: '0.1.0' },
      { capabilities: {} },
    );
    const transport = new StdioClientTransport({
      command: process.execPath,
      args: [serverEntry],
      cwd: projectDir,
    });
    try {
      await client.connect(transport);
      const listed = await client.listTools();
      expect(listed.tools.map((tool) => tool.name)).toEqual(
        TOOL_DEFINITIONS.map((tool) => tool.name),
      );

      const call = async (name: string, args: Record<string, unknown> = {}) =>
        client.callTool({ name, arguments: args });
      const common = {
        projectDir,
        name: 'MCP Field Notes',
        summary: 'A field operations system for research teams',
        domain: 'field research',
        tension: 'Keep evidence coherent while conditions change',
      };
      await call('lde_init', { projectDir });
      await call('lde_brief', common);
      await call('lde_directions', { projectDir });
      await call('lde_generate', { projectDir });
      await call('lde_preview', { projectDir });
      await call('lde_refine', {
        projectDir,
        feedback: 'Make the first read calmer and more tactile.',
      });
      await call('lde_approve', { projectDir });
      await call('lde_brandkit', { projectDir });
      await call('lde_lint', { projectDir });
      await call('lde_export', { projectDir });
      const status = await call('lde_status', { projectDir });
      expect(textOf(status)).toContain('landing.design.md');
      const artifact = await call('lde_read_artifact', { projectDir, path: 'EXPORT.md' });
      expect(textOf(artifact)).toContain('Approved design document');
      expect(await readFile(join(projectDir, '.design', 'EXPORT.md'), 'utf8')).toContain(
        'Agent implementation instructions',
      );
    } finally {
      await client.close();
      await rm(projectDir, { recursive: true, force: true });
    }
  }, 30_000);
});
