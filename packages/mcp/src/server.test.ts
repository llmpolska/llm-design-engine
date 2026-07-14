import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { describe, expect, it } from 'vitest';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import {
  PROMPT_DEFINITIONS,
  TOOL_DEFINITIONS,
  buildPrompt,
  deriveWorkflowState,
  handleTool,
} from './server.js';

const packageRoot = fileURLToPath(new URL('..', import.meta.url));
const serverEntry = join(packageRoot, 'dist', 'server.js');
function textOf(result: unknown): string {
  if (!result || typeof result !== 'object' || !('content' in result) || !Array.isArray(result.content)) {
    return '';
  }
  return result.content
    .flatMap((item) =>
      item && typeof item === 'object' && 'text' in item && typeof item.text === 'string'
        ? [item.text]
        : [],
    )
    .join('');
}

function structuredOf(result: unknown): Record<string, unknown> | undefined {
  if (!result || typeof result !== 'object' || !('structuredContent' in result)) return undefined;
  const value = result.structuredContent;
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const record: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value)) record[key] = entry;
  return record;
}
describe('STDIO MCP server', () => {
  it('exposes the complete typed tool and prompt surface with structured argument errors', async () => {
    expect(TOOL_DEFINITIONS.map((tool) => tool.name)).toEqual([
      'lde_init',
      'lde_brief',
      'lde_directions',
      'lde_select',
      'lde_generate',
      'lde_preview',
      'lde_refine',
      'lde_approve',
      'lde_brandkit',
      'lde_lint',
      'lde_export',
      'lde_status',
      'lde_read_artifact',
    ]);
    expect(PROMPT_DEFINITIONS.map((prompt) => prompt.name)).toEqual([
      'design_workflow',
      'design_brief',
      'refine_design',
    ]);
    for (const tool of TOOL_DEFINITIONS) {
      expect(tool.inputSchema.additionalProperties).toBe(false);
      expect(tool.outputSchema?.type).toBe('object');
      expect(tool.annotations?.readOnlyHint === true || tool.annotations?.readOnlyHint === false).toBe(
        true,
      );
    }

    const result = await handleTool(
      'lde_brief',
      { name: '', summary: 'x', domain: 'y' },
      { cwd: tmpdir() },
    );
    expect(result.isError).toBe(true);
    expect(result.structuredContent).toBeUndefined();
    expect(textOf(result)).toContain('INVALID_ARGUMENTS');
    expect(textOf(result)).toContain('"code": "INVALID_ARGUMENTS"');
  });

  it('rejects path traversal and binds prompt defaults to server cwd', async () => {
    const projectDir = await mkdtemp(join(tmpdir(), 'lde-mcp-secure-'));
    try {
      await handleTool('lde_init', { projectDir }, { cwd: projectDir });
      const traversal = await handleTool(
        'lde_read_artifact',
        { projectDir, path: '../package.json' },
        { cwd: projectDir },
      );
      expect(traversal.isError).toBe(true);
      expect(textOf(traversal)).toContain('Artifact path must remain inside .design');
      expect(traversal.structuredContent).toBeUndefined();

      const prompt = buildPrompt(
        'design_brief',
        {
          name: 'Harbor Ledger',
          summary: 'Port operations visibility',
          domain: 'maritime logistics',
        },
        { cwd: projectDir },
      );
      const text =
        prompt.messages[0]?.content.type === 'text' ? prompt.messages[0].content.text : '';
      expect(text).toContain(`projectDir: ${projectDir}`);
    } finally {
      await rm(projectDir, { recursive: true, force: true });
    }
  });

  it('derives workflow stages and builds prompts without side effects', () => {
    expect(
      deriveWorkflowState([
        { path: '.design/manifest.json', exists: true, bytes: 12 },
        { path: '.design/BRIEF.md', exists: false, bytes: 0 },
      ]).stage,
    ).toBe('initialized');

    const prompt = buildPrompt('design_workflow', {
      projectDir: '/tmp/demo',
      name: 'Harbor Ledger',
      summary: 'Port operations visibility',
      domain: 'maritime logistics',
      tension: 'Keep the next berth decision legible',
    });
    expect(prompt.messages[0]?.content.type).toBe('text');
    if (prompt.messages[0]?.content.type === 'text') {
      expect(prompt.messages[0].content.text).toContain('lde_export');
      expect(prompt.messages[0].content.text).toContain('Harbor Ledger');
    }
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
      env: {
        ...process.env,
        LDE_PROJECT_DIR: projectDir,
      },
    });
    try {
      await client.connect(transport);
      const listed = await client.listTools();
      expect(listed.tools.map((tool) => tool.name)).toEqual(
        TOOL_DEFINITIONS.map((tool) => tool.name),
      );

      const prompts = await client.listPrompts();
      expect(prompts.prompts.map((prompt) => prompt.name)).toEqual(
        PROMPT_DEFINITIONS.map((prompt) => prompt.name),
      );

      const call = async (name: string, args: Record<string, unknown> = {}) =>
        client.callTool({ name, arguments: args });

      await call('lde_init', { projectDir });
      await call('lde_brief', {
        projectDir,
        name: 'MCP Field Notes',
        summary: 'A field operations system for research teams',
        domain: 'field research',
        tension: 'Keep evidence coherent while conditions change',
      });
      await call('lde_directions', { projectDir });
      await call('lde_select', { projectDir, direction: '1' });
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
      expect(structuredOf(status)?.stage).toBe('exported');

      const artifact = await call('lde_read_artifact', { projectDir, path: 'EXPORT.md' });
      expect(textOf(artifact)).toContain('Approved design document');
      expect(structuredOf(artifact)?.path).toBe('.design/EXPORT.md');

      const resources = await client.listResources();
      expect(resources.resources.some((resource) => resource.uri === 'lde://artifact/EXPORT.md')).toBe(
        true,
      );
      const exportResource = await client.readResource({ uri: 'lde://artifact/EXPORT.md' });
      expect(exportResource.contents[0] && 'text' in exportResource.contents[0]
        ? exportResource.contents[0].text
        : '').toContain('Agent implementation instructions');

      const workflowPrompt = await client.getPrompt({
        name: 'design_workflow',
        arguments: {
          projectDir,
          name: 'MCP Field Notes',
          summary: 'A field operations system for research teams',
          domain: 'field research',
        },
      });
      expect(workflowPrompt.messages.length).toBeGreaterThan(0);

      expect(await readFile(join(projectDir, '.design', 'EXPORT.md'), 'utf8')).toContain(
        'Agent implementation instructions',
      );
    } finally {
      await client.close();
      await rm(projectDir, { recursive: true, force: true });
    }
  }, 60_000);
});
