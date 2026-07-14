#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  type CallToolResult,
  type Prompt,
  type Resource,
  type ResourceTemplate,
  type Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { runCommand } from '@llm-design-engine/cli';
import { access, readFile, readdir, stat } from 'node:fs/promises';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { z } from 'zod';

const projectDirSchema = z.object({ projectDir: z.string().min(1).optional() }).strict();
const briefSchema = projectDirSchema
  .extend({
    name: z.string().min(1),
    summary: z.string().min(1),
    domain: z.string().min(1),
    tension: z.string().min(1).optional(),
  })
  .strict();
const selectSchema = projectDirSchema
  .extend({
    direction: z.string().min(1).describe('Direction id, exact name, or 1-based index.'),
  })
  .strict();
const refineSchema = projectDirSchema
  .extend({ feedback: z.string().min(1) })
  .strict();
const readArtifactSchema = projectDirSchema
  .extend({
    path: z
      .string()
      .min(1)
      .describe('Path relative to .design, for example EXPORT.md or pages/landing.design.md.'),
  })
  .strict();

const artifactItemShape = {
  type: 'object',
  properties: {
    path: { type: 'string' },
    exists: { type: 'boolean' },
    bytes: { type: 'number' },
  },
  required: ['path', 'exists', 'bytes'],
};

const successShape: NonNullable<Tool['outputSchema']> = {
  type: 'object',
  properties: {
    ok: { type: 'boolean', const: true },
    command: { type: 'string' },
    projectDir: { type: 'string' },
    output: { type: 'array', items: { type: 'string' } },
    nextSteps: { type: 'array', items: { type: 'string' } },
    artifacts: {
      type: 'array',
      items: artifactItemShape,
    },
  },
  required: ['ok', 'command', 'projectDir', 'output', 'nextSteps', 'artifacts'],
  additionalProperties: false,
};

const statusShape: NonNullable<Tool['outputSchema']> = {
  type: 'object',
  properties: {
    ok: { type: 'boolean', const: true },
    projectDir: { type: 'string' },
    stage: { type: 'string' },
    nextSteps: { type: 'array', items: { type: 'string' } },
    artifacts: {
      type: 'array',
      items: artifactItemShape,
    },
  },
  required: ['ok', 'projectDir', 'stage', 'nextSteps', 'artifacts'],
  additionalProperties: false,
};

const readShape: NonNullable<Tool['outputSchema']> = {
  type: 'object',
  properties: {
    ok: { type: 'boolean', const: true },
    path: { type: 'string' },
    content: { type: 'string' },
    bytes: { type: 'number' },
  },
  required: ['ok', 'path', 'content', 'bytes'],
  additionalProperties: false,
};

const objectSchema = (
  properties: Record<string, object>,
  required: string[] = [],
): Tool['inputSchema'] => ({
  type: 'object',
  properties,
  required,
  additionalProperties: false,
});

const projectDirProperty = {
  type: 'string',
  description:
    'Absolute path or path relative to the MCP server working directory. Defaults to the server cwd.',
};

const annotations = {
  write: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: false,
  },
  writeIdempotent: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  read: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
} as const;

export const ARTIFACT_PATHS = [
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
  'manifest.json',
  'config.json',
] as const;

export const TOOL_DEFINITIONS: Tool[] = [
  {
    name: 'lde_init',
    title: 'Initialize design workspace',
    description:
      'Create a .design workspace and manifest in the target project. Run this first for a new project.',
    inputSchema: objectSchema({ projectDir: projectDirProperty }),
    outputSchema: successShape,
    annotations: { title: 'Initialize design workspace', ...annotations.writeIdempotent },
  },
  {
    name: 'lde_brief',
    title: 'Write product brief',
    description:
      'Create or update BRIEF.md with product name, summary, domain, and optional operating tension.',
    inputSchema: objectSchema(
      {
        projectDir: projectDirProperty,
        name: { type: 'string', description: 'Product name.' },
        summary: { type: 'string', description: 'One concrete sentence about the product.' },
        domain: { type: 'string', description: 'Product domain, not a visual style.' },
        tension: {
          type: 'string',
          description: 'Operating tension the design must hold visible.',
        },
      },
      ['name', 'summary', 'domain'],
    ),
    outputSchema: successShape,
    annotations: { title: 'Write product brief', ...annotations.writeIdempotent },
  },
  {
    name: 'lde_directions',
    title: 'Generate creative directions',
    description:
      'Compile product meaning into four distinct creative directions. Requires BRIEF.md.',
    inputSchema: objectSchema({ projectDir: projectDirProperty }),
    outputSchema: successShape,
    annotations: { title: 'Generate creative directions', ...annotations.write },
  },
  {
    name: 'lde_select',
    title: 'Select creative direction',
    description:
      'Mark one creative direction as selected by id, exact name, or 1-based index before generation.',
    inputSchema: objectSchema(
      {
        projectDir: projectDirProperty,
        direction: {
          type: 'string',
          description: 'Direction id, exact name, or 1-based index from DIRECTIONS.md.',
        },
      },
      ['direction'],
    ),
    outputSchema: successShape,
    annotations: { title: 'Select creative direction', ...annotations.writeIdempotent },
  },
  {
    name: 'lde_generate',
    title: 'Generate design specification',
    description:
      'Generate the typed design specification and scene graph from the selected direction.',
    inputSchema: objectSchema({ projectDir: projectDirProperty }),
    outputSchema: successShape,
    annotations: { title: 'Generate design specification', ...annotations.write },
  },
  {
    name: 'lde_preview',
    title: 'Render deterministic preview',
    description: 'Render deterministic HTML/SVG previews without image generation.',
    inputSchema: objectSchema({ projectDir: projectDirProperty }),
    outputSchema: successShape,
    annotations: { title: 'Render deterministic preview', ...annotations.writeIdempotent },
  },
  {
    name: 'lde_refine',
    title: 'Refine current design',
    description:
      'Apply semantic feedback while preserving the selected direction identity. Requires an existing design document.',
    inputSchema: objectSchema(
      {
        projectDir: projectDirProperty,
        feedback: {
          type: 'string',
          description: 'Semantic refinement request, not a theme swap.',
        },
      },
      ['feedback'],
    ),
    outputSchema: successShape,
    annotations: { title: 'Refine current design', ...annotations.write },
  },
  {
    name: 'lde_approve',
    title: 'Approve design direction',
    description: 'Approve and lock the current design document status.',
    inputSchema: objectSchema({ projectDir: projectDirProperty }),
    outputSchema: successShape,
    annotations: { title: 'Approve design direction', ...annotations.writeIdempotent },
  },
  {
    name: 'lde_brandkit',
    title: 'Generate brandkit',
    description: 'Generate the structured brandkit, tokens, and local asset placeholders.',
    inputSchema: objectSchema({ projectDir: projectDirProperty }),
    outputSchema: successShape,
    annotations: { title: 'Generate brandkit', ...annotations.write },
  },
  {
    name: 'lde_lint',
    title: 'Lint design for generic patterns',
    description: 'Run deterministic anti-slop rules and structural metrics. Writes lint.json.',
    inputSchema: objectSchema({ projectDir: projectDirProperty }),
    outputSchema: successShape,
    annotations: { title: 'Lint design for generic patterns', ...annotations.writeIdempotent },
  },
  {
    name: 'lde_export',
    title: 'Export agent package',
    description:
      'Export EXPORT.md, a compact agent-executable Markdown package with implementation instructions.',
    inputSchema: objectSchema({ projectDir: projectDirProperty }),
    outputSchema: successShape,
    annotations: { title: 'Export agent package', ...annotations.writeIdempotent },
  },
  {
    name: 'lde_status',
    title: 'Inspect design status',
    description:
      'Inspect artifact presence, current workflow stage, and recommended next steps for the project.',
    inputSchema: objectSchema({ projectDir: projectDirProperty }),
    outputSchema: statusShape,
    annotations: { title: 'Inspect design status', ...annotations.read },
  },
  {
    name: 'lde_read_artifact',
    title: 'Read design artifact',
    description: 'Read one artifact from the .design workspace. Paths stay inside .design.',
    inputSchema: objectSchema(
      {
        projectDir: projectDirProperty,
        path: {
          type: 'string',
          description: 'Path relative to .design, for example EXPORT.md.',
        },
      },
      ['path'],
    ),
    outputSchema: readShape,
    annotations: { title: 'Read design artifact', ...annotations.read },
  },
];

export const PROMPT_DEFINITIONS: Prompt[] = [
  {
    name: 'design_workflow',
    title: 'Design before code',
    description:
      'Run the full LLM Design Engine workflow through MCP tools before writing frontend code.',
    arguments: [
      {
        name: 'projectDir',
        description: 'Target project directory. Defaults to the MCP server cwd.',
        required: false,
      },
      {
        name: 'name',
        description: 'Product name for the brief.',
        required: true,
      },
      {
        name: 'summary',
        description: 'One concrete product sentence.',
        required: true,
      },
      {
        name: 'domain',
        description: 'Product domain.',
        required: true,
      },
      {
        name: 'tension',
        description: 'Operating tension the design must hold.',
        required: false,
      },
    ],
  },
  {
    name: 'design_brief',
    title: 'Shape a product brief',
    description: 'Collect a concrete brief and write it with lde_brief.',
    arguments: [
      { name: 'name', description: 'Product name.', required: true },
      { name: 'summary', description: 'One concrete sentence.', required: true },
      { name: 'domain', description: 'Product domain.', required: true },
      { name: 'tension', description: 'Operating tension.', required: false },
      { name: 'projectDir', description: 'Target project directory.', required: false },
    ],
  },
  {
    name: 'refine_design',
    title: 'Refine without replacing identity',
    description: 'Apply semantic refinement feedback to the current design.',
    arguments: [
      { name: 'feedback', description: 'Semantic refinement request.', required: true },
      { name: 'projectDir', description: 'Target project directory.', required: false },
    ],
  },
];

const commandForTool: Record<string, string> = {
  lde_init: 'init',
  lde_directions: 'directions',
  lde_select: 'select',
  lde_generate: 'generate',
  lde_preview: 'preview',
  lde_approve: 'approve',
  lde_brandkit: 'brandkit',
  lde_lint: 'lint',
  lde_export: 'export',
};

export interface McpServerOptions {
  cwd?: string;
}

export interface ArtifactStatus {
  path: string;
  exists: boolean;
  bytes: number;
}

export interface StatusPayload {
  ok: true;
  projectDir: string;
  stage: string;
  nextSteps: string[];
  artifacts: ArtifactStatus[];
}

function projectDirectory(input: unknown, fallback: string): string {
  const value = typeof input === 'string' && input.trim().length > 0 ? input.trim() : fallback;
  return resolve(fallback, value);
}

function jsonResult(payload: object, isError = false): CallToolResult {
  const text = JSON.stringify(payload, null, 2);
  if (isError) {
    // Clients validate structuredContent against success outputSchema when present.
    // Keep machine-readable error JSON in text content only.
    return {
      content: [{ type: 'text', text }],
      isError: true,
    };
  }
  const structuredContent: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(payload)) structuredContent[key] = value;
  return {
    content: [{ type: 'text', text }],
    structuredContent,
  };
}

function errorText(error: unknown): Record<string, unknown> {
  if (error instanceof z.ZodError) {
    return {
      ok: false,
      code: 'INVALID_ARGUMENTS',
      issues: error.issues.map((issue) => ({
        path: issue.path.map(String).join('.') || '(root)',
        message: issue.message,
      })),
    };
  }
  if (error instanceof Error) {
    return { ok: false, code: 'LDE_TOOL_ERROR', message: error.message };
  }
  return { ok: false, code: 'LDE_TOOL_ERROR', message: String(error) };
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function listArtifactStatus(projectDir: string): Promise<ArtifactStatus[]> {
  const root = join(projectDir, '.design');
  return Promise.all(
    ARTIFACT_PATHS.map(async (path) => {
      try {
        const info = await stat(join(root, path));
        return { path: `.design/${path}`, exists: true, bytes: info.size };
      } catch {
        return { path: `.design/${path}`, exists: false, bytes: 0 };
      }
    }),
  );
}

function hasArtifact(artifacts: ArtifactStatus[], relativePath: string): boolean {
  return artifacts.some((item) => item.path === `.design/${relativePath}` && item.exists);
}

export function deriveWorkflowState(artifacts: ArtifactStatus[]): {
  stage: string;
  nextSteps: string[];
} {
  const hasInit = hasArtifact(artifacts, 'manifest.json') || hasArtifact(artifacts, 'config.json');
  const hasBrief = hasArtifact(artifacts, 'BRIEF.md');
  const hasDirections = hasArtifact(artifacts, 'DIRECTIONS.md');
  const hasDesign = hasArtifact(artifacts, 'pages/landing.design.md');
  const hasPreview = hasArtifact(artifacts, 'previews/landing.html');
  const hasBrand = hasArtifact(artifacts, 'brandkit.json');
  const hasLint = hasArtifact(artifacts, 'lint.json');
  const hasExport = hasArtifact(artifacts, 'EXPORT.md');

  if (!hasInit) {
    return {
      stage: 'empty',
      nextSteps: ['Call lde_init to create the .design workspace.'],
    };
  }
  if (!hasBrief) {
    return {
      stage: 'initialized',
      nextSteps: ['Call lde_brief with name, summary, and domain.'],
    };
  }
  if (!hasDirections) {
    return {
      stage: 'briefed',
      nextSteps: ['Call lde_directions to compile creative directions.'],
    };
  }
  if (!hasDesign) {
    return {
      stage: 'directions',
      nextSteps: [
        'Optionally call lde_select with a direction id, name, or 1-based index.',
        'Call lde_generate to compile the design specification.',
      ],
    };
  }
  if (!hasPreview) {
    return {
      stage: 'generated',
      nextSteps: [
        'Call lde_preview for deterministic HTML/SVG output.',
        'Call lde_refine if semantic adjustments are needed.',
        'Call lde_approve to lock the direction.',
      ],
    };
  }
  if (!hasBrand || !hasLint || !hasExport) {
    const nextSteps: string[] = [];
    if (!hasBrand) nextSteps.push('Call lde_brandkit.');
    if (!hasLint) nextSteps.push('Call lde_lint.');
    if (!hasExport) nextSteps.push('Call lde_export and read EXPORT.md before coding UI.');
    return { stage: 'previewed', nextSteps };
  }
  return {
    stage: 'exported',
    nextSteps: [
      'Read lde://artifact/EXPORT.md or call lde_read_artifact with path EXPORT.md.',
      'Implement the frontend from the export; do not invent a new visual system.',
    ],
  };
}

async function status(projectDir: string): Promise<CallToolResult> {
  const artifacts = await listArtifactStatus(projectDir);
  const workflow = deriveWorkflowState(artifacts);
  const payload: StatusPayload = {
    ok: true,
    projectDir,
    stage: workflow.stage,
    nextSteps: workflow.nextSteps,
    artifacts,
  };
  return jsonResult(payload);
}

function assertInsideDesign(projectDir: string, artifactPath: string): string {
  const cleaned = artifactPath.replace(/\\/g, '/').replace(/^\/+/, '');
  if (!cleaned || cleaned.includes('\0')) {
    throw new Error('Artifact path must remain inside .design');
  }
  const designRoot = resolve(projectDir, '.design');
  const candidate = resolve(designRoot, cleaned);
  const rel = relative(designRoot, candidate);
  if (
    rel.length === 0 ||
    rel === '..' ||
    rel.startsWith(`..${sep}`) ||
    rel.startsWith('../') ||
    isAbsolute(rel) ||
    rel.split(/[\\/]/).includes('..')
  ) {
    throw new Error('Artifact path must remain inside .design');
  }
  return candidate;
}

async function readArtifact(projectDir: string, artifactPath: string): Promise<CallToolResult> {
  const candidate = assertInsideDesign(projectDir, artifactPath);
  const content = await readFile(candidate, 'utf8');
  const rel = relative(resolve(projectDir, '.design'), candidate).split(sep).join('/');
  return jsonResult({
    ok: true,
    path: `.design/${rel}`,
    content,
    bytes: Buffer.byteLength(content, 'utf8'),
  });
}

async function invokeCli(
  projectDir: string,
  command: string,
  args: string[] = [],
): Promise<CallToolResult> {
  const output: string[] = [];
  await runCommand([command, ...args], { cwd: projectDir, output });
  const artifacts = await listArtifactStatus(projectDir);
  const workflow = deriveWorkflowState(artifacts);
  return jsonResult({
    ok: true,
    command: `lde ${command}`,
    projectDir,
    output,
    nextSteps: workflow.nextSteps,
    artifacts,
  });
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
      case 'lde_select': {
        const input = selectSchema.parse(rawArguments ?? {});
        return await invokeCli(projectDirectory(input.projectDir, fallback), 'select', [
          '--direction',
          input.direction,
        ]);
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
    return jsonResult(errorText(error), true);
  }
}

function mimeForArtifact(path: string): string {
  if (path.endsWith('.json')) return 'application/json';
  if (path.endsWith('.html')) return 'text/html';
  if (path.endsWith('.svg')) return 'image/svg+xml';
  if (path.endsWith('.css')) return 'text/css';
  return 'text/markdown';
}

function resourceUri(path: string): string {
  return `lde://artifact/${path.split(sep).join('/')}`;
}

async function collectDesignFiles(root: string, prefix = ''): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true }).catch(() => []);
  const files: string[] = [];
  for (const entry of entries) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolute = join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectDesignFiles(absolute, relativePath)));
      continue;
    }
    if (entry.isFile()) files.push(relativePath.split(sep).join('/'));
  }
  return files;
}

export async function listDesignResources(projectDir: string): Promise<Resource[]> {
  const designRoot = join(projectDir, '.design');
  if (!(await pathExists(designRoot))) return [];
  const files = await collectDesignFiles(designRoot);
  return Promise.all(
    files.map(async (path) => {
      const info = await stat(join(designRoot, path));
      return {
        uri: resourceUri(path),
        name: path,
        title: path,
        description: `Design artifact .design/${path}`,
        mimeType: mimeForArtifact(path),
        size: info.size,
      } satisfies Resource;
    }),
  );
}

export const RESOURCE_TEMPLATES: ResourceTemplate[] = [
  {
    uriTemplate: 'lde://artifact/{path}',
    name: 'design-artifact',
    title: 'Design artifact',
    description:
      'Read any file under the server working directory .design tree. Example: lde://artifact/EXPORT.md',
    mimeType: 'text/plain',
  },
];

async function readResourceUri(uri: string, projectDir: string) {
  const match = /^lde:\/\/artifact\/(.+)$/.exec(uri);
  if (!match?.[1]) throw new Error(`Unsupported resource URI: ${uri}`);
  const artifactPath = decodeURIComponent(match[1]);
  const candidate = assertInsideDesign(projectDir, artifactPath);
  const content = await readFile(candidate, 'utf8');
  const rel = relative(resolve(projectDir, '.design'), candidate).split(sep).join('/');
  return {
    contents: [
      {
        uri: resourceUri(rel),
        mimeType: mimeForArtifact(rel),
        text: content,
      },
    ],
  };
}

function promptArgument(
  args: Record<string, string> | undefined,
  name: string,
  fallback = '',
): string {
  const value = args?.[name];
  return typeof value === 'string' ? value : fallback;
}

export function buildPrompt(
  name: string,
  args: Record<string, string> | undefined,
  options: McpServerOptions = {},
) {
  const fallbackCwd = options.cwd ?? process.cwd();
  if (name === 'design_workflow') {
    const projectDir = promptArgument(args, 'projectDir', fallbackCwd);
    const productName = promptArgument(args, 'name', 'Untitled product');
    const summary = promptArgument(args, 'summary', 'Describe the product concretely.');
    const domain = promptArgument(args, 'domain', 'unclassified product');
    const tension = promptArgument(args, 'tension', '');
    return {
      description: 'Full design-before-code workflow for coding agents.',
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: [
              'You are using LLM Design Engine over MCP. Design before code.',
              `Target projectDir: ${projectDir}`,
              '',
              'Required sequence:',
              '1. lde_init',
              `2. lde_brief with name="${productName}", summary="${summary}", domain="${domain}"${tension ? `, tension="${tension}"` : ''}`,
              '3. lde_directions',
              '4. Optionally lde_select with the best direction id/name/index',
              '5. lde_generate',
              '6. lde_preview',
              '7. Optionally lde_refine with semantic feedback',
              '8. lde_approve',
              '9. lde_brandkit',
              '10. lde_lint',
              '11. lde_export',
              '12. lde_read_artifact path=EXPORT.md or read resource lde://artifact/EXPORT.md',
              '',
              'Rules:',
              '- Do not invent a visual system outside the approved direction.',
              '- Prefer domain materials and composition over generic SaaS chrome.',
              '- Keep provider credentials optional; mock mode is valid.',
              '- After export, implement UI from EXPORT.md and the design document only.',
              '- Resources list/read use the server working directory unless tools pass projectDir.',
            ].join('\n'),
          },
        },
      ],
    };
  }

  if (name === 'design_brief') {
    const productName = promptArgument(args, 'name');
    const summary = promptArgument(args, 'summary');
    const domain = promptArgument(args, 'domain');
    const tension = promptArgument(args, 'tension');
    const projectDir = promptArgument(args, 'projectDir', fallbackCwd);
    if (!productName || !summary || !domain) {
      throw new Error('design_brief requires name, summary, and domain arguments.');
    }
    return {
      description: 'Write a concrete product brief through MCP.',
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: [
              'Call lde_brief with these values, then lde_status.',
              `projectDir: ${projectDir}`,
              `name: ${productName}`,
              `summary: ${summary}`,
              `domain: ${domain}`,
              tension ? `tension: ${tension}` : 'tension: omit unless the user supplies one',
            ].join('\n'),
          },
        },
      ],
    };
  }

  if (name === 'refine_design') {
    const feedback = promptArgument(args, 'feedback');
    const projectDir = promptArgument(args, 'projectDir', fallbackCwd);
    if (!feedback) throw new Error('refine_design requires feedback.');
    return {
      description: 'Refine the current design without replacing its identity.',
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: [
              'Call lde_refine with semantic feedback only. Do not swap metaphors unless the user explicitly asks.',
              `projectDir: ${projectDir}`,
              `feedback: ${feedback}`,
              'Then call lde_preview and lde_lint.',
            ].join('\n'),
          },
        },
      ],
    };
  }

  throw new Error(`Unknown prompt: ${name}`);
}

export function createMcpServer(options: McpServerOptions = {}): Server {
  const cwd = options.cwd ?? process.cwd();
  const server = new Server(
    {
      name: 'llm-design-engine',
      version: '0.1.0',
      title: 'LLM Design Engine',
      description:
        'Design-before-code compiler for coding agents. Tools write portable .design artifacts; resources expose the current workspace.',
    },
    {
      capabilities: {
        tools: { listChanged: false },
        resources: { listChanged: false, subscribe: false },
        prompts: { listChanged: false },
      },
      instructions: [
        'LLM Design Engine turns a product brief into original, agent-executable UI direction.',
        'Preferred workflow: lde_init → lde_brief → lde_directions → optional lde_select → lde_generate → lde_preview → optional lde_refine → lde_approve → lde_brandkit → lde_lint → lde_export.',
        'Read EXPORT.md before writing frontend code. Do not invent a parallel design system.',
        'projectDir is optional on every tool and defaults to the MCP server working directory.',
        'Resources under lde://artifact/* mirror the server cwd .design tree.',
      ].join(' '),
    },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOL_DEFINITIONS }));
  server.setRequestHandler(CallToolRequestSchema, async (request) =>
    handleTool(request.params.name, request.params.arguments ?? {}, { cwd }),
  );
  server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: await listDesignResources(cwd),
  }));
  server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => ({
    resourceTemplates: RESOURCE_TEMPLATES,
  }));
  server.setRequestHandler(ReadResourceRequestSchema, async (request) =>
    readResourceUri(request.params.uri, cwd),
  );
  server.setRequestHandler(ListPromptsRequestSchema, async () => ({ prompts: PROMPT_DEFINITIONS }));
  server.setRequestHandler(GetPromptRequestSchema, async (request) =>
    buildPrompt(request.params.name, request.params.arguments, { cwd }),
  );

  return server;
}

export async function runStdioServer(options: McpServerOptions = {}): Promise<void> {
  const server = createMcpServer(options);
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

const entry = process.argv[1];
if (entry && import.meta.url === pathToFileURL(entry).href) {
  await runStdioServer({ cwd: process.env.LDE_PROJECT_DIR || process.cwd() });
}
