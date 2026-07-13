#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type CallToolResult,
  type Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { runCommand } from '@llm-design-engine/cli';
import { readFile, stat } from 'node:fs/promises';
import { isAbsolute, join, relative, resolve } from 'node:path';
import { z } from 'zod';

const projectDirSchema = z.object({ projectDir: z.string().optional() }).strict();
const briefSchema = projectDirSchema
  .extend({
    name: z.string().min(1),
    summary: z.string().min(1),
    domain: z.string().min(1),
    tension: z.string().optional(),
  })
  .strict();
const refineSchema = projectDirSchema.extend({ feedback: z.string().min(1) }).strict();
const readArtifactSchema = projectDirSchema.extend({ path: z.string().min(1) }).strict();

const objectSchema = (properties: Record<string, object>): Tool['inputSchema'] => ({
  type: 'object',
  properties,
  additionalProperties: false,
});
const projectDirProperty = {
  type: 'string',
  description: 'Absolute or workspace-relative project directory.',
};

export const TOOL_DEFINITIONS: Tool[] = [
  {
    name: 'lde_init',
    description: 'Create a .design workspace and manifest.',
    inputSchema: objectSchema({ projectDir: projectDirProperty }),
  },
  {
    name: 'lde_brief',
    description: 'Create or update the product brief.',
    inputSchema: objectSchema({
      projectDir: projectDirProperty,
      name: { type: 'string' },
      summary: { type: 'string' },
      domain: { type: 'string' },
      tension: { type: 'string' },
    }),
  },
  {
    name: 'lde_directions',
    description: 'Compile product meaning into four distinct creative directions.',
    inputSchema: objectSchema({ projectDir: projectDirProperty }),
  },
  {
    name: 'lde_generate',
    description: 'Generate the typed design specification and scene graph.',
    inputSchema: objectSchema({ projectDir: projectDirProperty }),
  },
  {
    name: 'lde_preview',
    description: 'Render a deterministic HTML/SVG preview without image generation.',
    inputSchema: objectSchema({ projectDir: projectDirProperty }),
  },
  {
    name: 'lde_refine',
    description: 'Apply semantic feedback patches while preserving direction identity.',
    inputSchema: objectSchema({ projectDir: projectDirProperty, feedback: { type: 'string' } }),
  },
  {
    name: 'lde_approve',
    description: 'Approve and lock the current design direction.',
    inputSchema: objectSchema({ projectDir: projectDirProperty }),
  },
  {
    name: 'lde_brandkit',
    description: 'Generate the structured brandkit and local asset placeholders.',
    inputSchema: objectSchema({ projectDir: projectDirProperty }),
  },
  {
    name: 'lde_lint',
    description: 'Run deterministic anti-slop rules and structural metrics.',
    inputSchema: objectSchema({ projectDir: projectDirProperty }),
  },
  {
    name: 'lde_export',
    description: 'Export a compact agent-executable Markdown package.',
    inputSchema: objectSchema({ projectDir: projectDirProperty }),
  },
  {
    name: 'lde_status',
    description: 'Inspect artifact status and file locations.',
    inputSchema: objectSchema({ projectDir: projectDirProperty }),
  },
  {
    name: 'lde_read_artifact',
    description: 'Read one artifact from the .design workspace.',
    inputSchema: objectSchema({ projectDir: projectDirProperty, path: { type: 'string' } }),
  },
];

const commandForTool: Record<string, string> = {
  lde_init: 'init',
  lde_directions: 'directions',
  lde_generate: 'generate',
  lde_preview: 'preview',
  lde_approve: 'approve',
  lde_brandkit: 'brandkit',
  lde_lint: 'lint',
  lde_export: 'export',
};

const artifactPaths = [
  'BRIEF.md',
  'DIRECTIONS.md',
  'BRAND.md',
  'brandkit.json',
  'design.json',
  'lint.json',
  'EXPORT.md',
  'pages/landing.design.md',
  'previews/landing.html',
  'previews/landing.svg',
  'assets/manifest.json',
];

export interface McpServerOptions {
  cwd?: string;
}

function projectDirectory(input: unknown, fallback: string): string {
  const value = typeof input === 'string' && input.length > 0 ? input : fallback;
  return resolve(fallback, value);
}

function textResult(text: string, isError = false): CallToolResult {
  return { content: [{ type: 'text', text }], ...(isError ? { isError: true } : {}) };
}

function errorText(error: unknown): string {
  if (error instanceof z.ZodError)
    return JSON.stringify({
      code: 'INVALID_ARGUMENTS',
      issues: error.issues.map((issue) => ({ path: issue.path, message: issue.message })),
    });
  if (error instanceof Error)
    return JSON.stringify({ code: 'LDE_TOOL_ERROR', message: error.message });
  return JSON.stringify({ code: 'LDE_TOOL_ERROR', message: String(error) });
}

async function invokeCli(
  projectDir: string,
  command: string,
  args: string[] = [],
): Promise<CallToolResult> {
  const output: string[] = [];
  await runCommand([command, ...args], { cwd: projectDir, output });
  return textResult(
    JSON.stringify({
      ok: true,
      command: `lde ${command}`,
      projectDir,
      output,
      artifacts: artifactPaths,
    }),
  );
}

async function status(projectDir: string): Promise<CallToolResult> {
  const root = join(projectDir, '.design');
  const entries = await Promise.all(
    artifactPaths.map(async (path) => {
      try {
        const info = await stat(join(root, path));
        return { path: `.design/${path}`, exists: true, bytes: info.size };
      } catch {
        return { path: `.design/${path}`, exists: false, bytes: 0 };
      }
    }),
  );
  return textResult(JSON.stringify({ ok: true, projectDir, artifacts: entries }));
}

async function readArtifact(projectDir: string, artifactPath: string): Promise<CallToolResult> {
  const designRoot = resolve(projectDir, '.design');
  const candidate = resolve(designRoot, artifactPath);
  const rel = relative(designRoot, candidate);
  if (rel.startsWith('..') || isAbsolute(rel))
    throw new Error('Artifact path must remain inside .design');
  const content = await readFile(candidate, 'utf8');
  return textResult(JSON.stringify({ ok: true, path: `.design/${rel}`, content }));
}

export async function handleTool(
  name: string,
  rawArguments: unknown,
  options: McpServerOptions = {},
): Promise<CallToolResult> {
  const fallback = options.cwd ?? process.cwd();
  try {
    switch (name) {
      case 'lde_init': {
        const input = projectDirSchema.parse(rawArguments ?? {});
        return await invokeCli(projectDirectory(input.projectDir, fallback), 'init');
      }
      case 'lde_brief': {
        const input = briefSchema.parse(rawArguments ?? {});
        const args = ['--name', input.name, '--summary', input.summary, '--domain', input.domain];
        if (input.tension) args.push('--tension', input.tension);
        return await invokeCli(projectDirectory(input.projectDir, fallback), 'brief', args);
      }
      case 'lde_refine': {
        const input = refineSchema.parse(rawArguments ?? {});
        return await invokeCli(projectDirectory(input.projectDir, fallback), 'refine', [
          '--feedback',
          input.feedback,
        ]);
      }
      case 'lde_read_artifact': {
        const input = readArtifactSchema.parse(rawArguments ?? {});
        return await readArtifact(projectDirectory(input.projectDir, fallback), input.path);
      }
      case 'lde_status': {
        const input = projectDirSchema.parse(rawArguments ?? {});
        return await status(projectDirectory(input.projectDir, fallback));
      }
      default: {
        const command = commandForTool[name];
        if (!command) throw new Error(`Unknown tool: ${name}`);
        const input = projectDirSchema.parse(rawArguments ?? {});
        return await invokeCli(projectDirectory(input.projectDir, fallback), command);
      }
    }
  } catch (error) {
    return textResult(errorText(error), true);
  }
}

export function createMcpServer(options: McpServerOptions = {}): Server {
  const server = new Server(
    { name: 'llm-design-engine', version: '0.1.0' },
    { capabilities: { tools: {} } },
  );
  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOL_DEFINITIONS }));
  server.setRequestHandler(CallToolRequestSchema, async (request) =>
    handleTool(request.params.name, request.params.arguments ?? {}, options),
  );
  return server;
}

export async function runStdioServer(options: McpServerOptions = {}): Promise<void> {
  const server = createMcpServer(options);
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

if (process.argv[1]?.endsWith('/server.js')) {
  await runStdioServer();
}
