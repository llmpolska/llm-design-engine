import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { Command } from 'commander';
import type {
  BriefInput,
  Brandkit,
  CreativeDirection,
  DesignDocument,
  ProjectBrief,
} from '@llm-design-engine/core';
import { createProjectBrief } from '@llm-design-engine/core';
import { lintDesign, formatLintReport } from '@llm-design-engine/anti-slop';
import {
  generateBrandkit,
  generatePressMarkSvg,
  brandkitTokenCss,
} from '@llm-design-engine/brandkit';
import {
  MockReasoningProvider,
  OpenAIReasoningProvider,
  type ReasoningProvider,
} from '@llm-design-engine/creative-director';
import { parseDesignMarkdown, serializeDesignMarkdown } from '@llm-design-engine/design-format';
import { DisabledImageProvider } from '@llm-design-engine/image-provider';
import { renderDesignToHtml, renderDesignToSvg } from '@llm-design-engine/renderer';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

export interface CommandContext {
  cwd: string;
  output: string[];
}

interface Flags {
  name?: string;
  summary?: string;
  domain?: string;
  tension?: string;
  feedback?: string;
  serve?: boolean;
  port?: string;
}

const designRoot = (cwd: string): string => join(cwd, '.design');

async function ensureDesignWorkspace(cwd: string): Promise<void> {
  const root = designRoot(cwd);
  await Promise.all([
    mkdir(join(root, 'pages'), { recursive: true }),
    mkdir(join(root, 'assets'), { recursive: true }),
    mkdir(join(root, 'previews'), { recursive: true }),
  ]);
  await writeFile(
    join(root, 'config.json'),
    JSON.stringify({ version: 1, provider: 'mock', preview: { port: 4317 } }, null, 2),
  );
  await writeFile(
    join(root, 'manifest.json'),
    JSON.stringify(
      {
        version: 1,
        projectId: null,
        artifacts: [
          'BRIEF.md',
          'DIRECTIONS.md',
          'BRAND.md',
          'pages/landing.design.md',
          'brandkit.json',
          'previews/landing.html',
          'EXPORT.md',
        ],
      },
      null,
      2,
    ),
  );
}

async function readText(path: string): Promise<string> {
  try {
    return await readFile(path, 'utf8');
  } catch {
    throw new Error(`Missing artifact: ${path}. Run lde init first.`);
  }
}

function briefMarkdown(brief: ProjectBrief): string {
  return [
    '---',
    `id: ${brief.id}`,
    `name: ${brief.name}`,
    `domain: ${brief.domain}`,
    '---',
    '# Product brief',
    brief.summary,
    '',
    '## Users',
    ...brief.users.map((item) => `- ${item}`),
    '',
    '## Jobs',
    ...brief.jobs.map((item) => `- ${item}`),
    '',
    '## Tension',
    brief.tension || 'Not specified yet.',
    '',
    '## Constraints',
    ...(brief.constraints.length > 0
      ? brief.constraints.map((item) => `- ${item}`)
      : ['- None recorded.']),
    '',
    '<!-- lde-brief-data',
    JSON.stringify(brief, null, 2),
    '-->',
    '',
  ].join('\n');
}

function parseBrief(markdown: string): ProjectBrief {
  const payload = markdown.match(/<!-- lde-brief-data\n([\s\S]*?)\n-->/)?.[1];
  if (!payload) throw new Error('BRIEF.md is missing its structured payload');
  return JSON.parse(payload) as ProjectBrief;
}

function directionsMarkdown(
  brief: ProjectBrief,
  interpretation: unknown,
  directions: CreativeDirection[],
): string {
  const rows = directions
    .map((direction, index) =>
      [
        `## ${index + 1}. ${direction.name}`,
        `- id: ${direction.id}`,
        `- metaphor: ${direction.metaphor}`,
        `- narrative: ${direction.visualNarrative}`,
        `- composition: ${direction.composition.layout}`,
        `- typography: ${direction.typographyCharacter}`,
        `- materials: ${direction.materialLanguage.join(', ')}`,
        `- interaction: ${direction.interactionConcept}`,
        `- domain-elements: ${direction.domainElements.join(', ')}`,
        `- avoid: ${direction.forbiddenPatterns.join('; ')}`,
      ].join('\n'),
    )
    .join('\n\n');
  return [
    '---',
    `project: ${brief.id}`,
    `count: ${directions.length}`,
    '---',
    '# Creative directions',
    'Each direction is a different metaphor, material, composition, and interaction concept. Mode changes are not counted as direction changes.',
    rows,
    '',
    '<!-- lde-directions-data',
    JSON.stringify({ interpretation, directions }, null, 2),
    '-->',
    '',
  ].join('\n');
}

function parseDirections(markdown: string): {
  interpretation: unknown;
  directions: CreativeDirection[];
} {
  const payload = markdown.match(/<!-- lde-directions-data\n([\s\S]*?)\n-->/)?.[1];
  if (!payload) throw new Error('DIRECTIONS.md is missing its structured payload');
  return JSON.parse(payload) as { interpretation: unknown; directions: CreativeDirection[] };
}

function flagsFrom(argv: string[]): Flags {
  const flags: Flags = {};
  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    const next = argv[index + 1];
    if (current === '--serve') flags.serve = true;
    if (current === '--name' && next) flags.name = next;
    if (current === '--summary' && next) flags.summary = next;
    if (current === '--domain' && next) flags.domain = next;
    if (current === '--tension' && next) flags.tension = next;
    if (current === '--feedback' && next) flags.feedback = next;
    if (current === '--port' && next) flags.port = next;
  }
  return flags;
}

function createReasoningProvider(): ReasoningProvider {
  const endpoint = process.env.LDE_REASONING_ENDPOINT;
  const model = process.env.LDE_REASONING_MODEL;
  const apiKey = process.env.LDE_REASONING_API_KEY;
  if (endpoint && model && apiKey) return new OpenAIReasoningProvider({ endpoint, model, apiKey });
  return new MockReasoningProvider();
}

async function requireBrief(cwd: string): Promise<ProjectBrief> {
  return parseBrief(await readText(join(designRoot(cwd), 'BRIEF.md')));
}

async function requireDirections(
  cwd: string,
): Promise<{ interpretation: unknown; directions: CreativeDirection[] }> {
  return parseDirections(await readText(join(designRoot(cwd), 'DIRECTIONS.md')));
}

function selectedDirection(directions: CreativeDirection[]): CreativeDirection {
  const selected = directions.find(
    (direction) => direction.status === 'approved' || direction.status === 'selected',
  );
  if (selected) return selected;
  const first = directions[0];
  if (!first) throw new Error('No creative direction exists. Run lde directions first.');
  return first;
}

async function requireDesign(cwd: string): Promise<DesignDocument> {
  const markdown = await readText(join(designRoot(cwd), 'pages', 'landing.design.md'));
  return parseDesignMarkdown(markdown).data;
}

function brandMarkdown(brand: Brandkit): string {
  return [
    '---',
    `project: ${brand.projectId}`,
    `generated-at: ${brand.generatedAt}`,
    '---',
    '# Brand narrative',
    brand.narrative,
    '',
    '# Personality',
    ...brand.personality.map((item) => `- ${item}`),
    '',
    '# Tone of voice',
    ...brand.toneOfVoice.map((item) => `- ${item}`),
    '',
    '# Naming rationale',
    brand.namingRationale,
    '',
    '# Logo direction',
    brand.logoDirection,
    '',
    '# Wordmark direction',
    brand.wordmarkDirection,
    '',
    '# Symbol direction',
    brand.symbolDirection,
    '',
    '# Color system',
    ...brand.colors.map((color) => `- ${color.name}: ${color.hex} — ${color.role}`),
    '',
    '# Typography roles',
    ...brand.typography.map((font) => `- ${font.role}: ${font.family} — ${font.usage}`),
    '',
    '# Spacing and shape',
    ...brand.spacingPrinciples.map((item) => `- ${item}`),
    ...brand.shapeLanguage.map((item) => `- ${item}`),
    '',
    '# Iconography and illustration',
    brand.iconographyDirection,
    brand.illustrationDirection,
    '',
    '# Photography and motion',
    brand.photographyDirection,
    ...brand.motionPrinciples.map((item) => `- ${item}`),
    '',
    '# Favicon and social preview',
    brand.faviconConcept,
    brand.socialPreviewConcept,
    '',
    '# Usage and misuse',
    ...brand.usageRules.map((item) => `- Use: ${item}`),
    ...brand.misuseRules.map((item) => `- Avoid: ${item}`),
    '',
    '# Image-generation prompts',
    ...brand.imagePrompts.map(
      (asset) =>
        `- ${asset.role}: ${asset.prompt} (negative: ${asset.negativeConstraints.join(', ')})`,
    ),
    '',
  ].join('\n');
}

export async function runCommand(argv: string[], context: CommandContext): Promise<void> {
  const command = argv[0] ?? 'help';
  const flags = flagsFrom(argv.slice(1));
  const root = designRoot(context.cwd);
  if (command === 'init') {
    await ensureDesignWorkspace(context.cwd);
    context.output.push(`Initialized ${root}`);
    return;
  }
  if (command === 'brief') {
    await ensureDesignWorkspace(context.cwd);
    const existing = await readFile(join(root, 'BRIEF.md'), 'utf8').catch(() => '');
    const previous = existing ? parseBrief(existing) : undefined;
    const briefInput: BriefInput = {
      name: flags.name ?? previous?.name ?? 'Untitled project',
      summary:
        flags.summary ?? previous?.summary ?? 'Describe the product in one concrete sentence.',
      domain: flags.domain ?? previous?.domain ?? 'unclassified product',
      tension: flags.tension ?? previous?.tension ?? '',
    };
    if (previous) {
      briefInput.users = previous.users;
      briefInput.jobs = previous.jobs;
      briefInput.constraints = previous.constraints;
      briefInput.references = previous.references;
    }
    const brief = createProjectBrief(briefInput);
    await writeFile(join(root, 'BRIEF.md'), briefMarkdown(brief));
    await writeFile(
      join(root, 'manifest.json'),
      JSON.stringify({ version: 1, projectId: brief.id, artifacts: ['BRIEF.md'] }, null, 2),
    );
    context.output.push(`Brief saved for ${brief.name}`);
    return;
  }
  if (command === 'directions') {
    await ensureDesignWorkspace(context.cwd);
    const brief = await requireBrief(context.cwd);
    const provider = createReasoningProvider();
    const interpretation = await provider.analyzeBrief(brief);
    const directions = await provider.generateDirections(interpretation);
    await writeFile(
      join(root, 'DIRECTIONS.md'),
      directionsMarkdown(brief, interpretation, directions),
    );
    context.output.push(`Generated ${directions.length} creative directions`);
    return;
  }
  if (command === 'generate') {
    await ensureDesignWorkspace(context.cwd);
    const { directions } = await requireDirections(context.cwd);
    const direction = selectedDirection(directions);
    const design = await createReasoningProvider().generateDesign(direction);
    await writeFile(join(root, 'pages', 'landing.design.md'), serializeDesignMarkdown(design));
    await writeFile(join(root, 'design.json'), JSON.stringify(design, null, 2));
    context.output.push(`Generated design specification for ${direction.name}`);
    return;
  }
  if (command === 'refine') {
    const design = await requireDesign(context.cwd);
    const feedback =
      flags.feedback ??
      argv
        .slice(1)
        .filter((item) => !item.startsWith('--'))
        .join(' ')
        .trim();
    if (!feedback) throw new Error('Provide refinement feedback with --feedback or trailing text.');
    const refined = await createReasoningProvider().refineDesign(design, feedback);
    await writeFile(join(root, 'pages', 'landing.design.md'), serializeDesignMarkdown(refined));
    await writeFile(join(root, 'design.json'), JSON.stringify(refined, null, 2));
    context.output.push('Refined the current direction without replacing its identity');
    return;
  }
  if (command === 'approve') {
    const design = await requireDesign(context.cwd);
    const approved = { ...design, status: 'approved' as const };
    await writeFile(join(root, 'pages', 'landing.design.md'), serializeDesignMarkdown(approved));
    await writeFile(join(root, 'design.json'), JSON.stringify(approved, null, 2));
    context.output.push(`Approved ${approved.concept}`);
    return;
  }
  if (command === 'preview') {
    const design = await requireDesign(context.cwd);
    const html = renderDesignToHtml(design);
    await writeFile(join(root, 'previews', 'landing.html'), html);
    await writeFile(join(root, 'previews', 'landing.svg'), renderDesignToSvg(design));
    context.output.push(`Preview written to ${join(root, 'previews', 'landing.html')}`);
    if (flags.serve) {
      const port = Number(flags.port ?? 4317);
      serve({ fetch: createPreviewApp(html).fetch, port }, (info) =>
        context.output.push(`Preview server listening on http://localhost:${info.port}`),
      );
    }
    return;
  }
  if (command === 'brandkit') {
    const brief = await requireBrief(context.cwd);
    const { directions } = await requireDirections(context.cwd);
    const direction = selectedDirection(directions);
    const brand = generateBrandkit(brief.id, direction);
    const imageProvider = new DisabledImageProvider();
    const generated = await Promise.all(
      brand.imagePrompts.map((request) => imageProvider.generate(request)),
    );
    await writeFile(join(root, 'BRAND.md'), brandMarkdown(brand));
    await writeFile(join(root, 'brandkit.json'), JSON.stringify(brand, null, 2));
    await writeFile(join(root, 'assets', 'press-mark.svg'), generatePressMarkSvg(brand));
    await writeFile(join(root, 'assets', 'tokens.css'), brandkitTokenCss(brand));
    await writeFile(join(root, 'assets', 'manifest.json'), JSON.stringify(generated, null, 2));
    for (const asset of generated)
      await writeFile(join(root, asset.file.replace(/^assets\//, 'assets/')), asset.content ?? '');
    context.output.push(`Generated brandkit and ${generated.length} local image placeholders`);
    return;
  }
  if (command === 'lint') {
    const design = await requireDesign(context.cwd);
    const report = lintDesign(design, await readText(join(root, 'pages', 'landing.design.md')));
    await writeFile(join(root, 'lint.json'), JSON.stringify(report, null, 2));
    context.output.push(formatLintReport(report));
    return;
  }
  if (command === 'export') {
    const files = await Promise.all(
      ['BRIEF.md', 'DIRECTIONS.md', 'pages/landing.design.md', 'BRAND.md'].map(async (file) => ({
        file,
        content: await readText(join(root, file)),
      })),
    );
    const design = await requireDesign(context.cwd);
    const markdown = [
      '# LLM Design Engine export',
      `Project: ${design.id}`,
      '',
      '## Agent implementation instructions',
      ...design.agentInstructions.map((item) => `- ${item}`),
      '',
      '## Approved design document',
      files.find((item) => item.file === 'pages/landing.design.md')?.content ?? '',
      '',
      '## Source artifacts',
      ...files
        .filter((item) => item.file !== 'pages/landing.design.md')
        .map((item) => `### ${item.file}\n${item.content}`),
      '',
    ].join('\n');
    await writeFile(join(root, 'EXPORT.md'), markdown);
    context.output.push(`Exported agent package to ${join(root, 'EXPORT.md')}`);
    return;
  }
  context.output.push(
    'Commands: init, brief, directions, generate, preview, refine, approve, brandkit, lint, export',
  );
}

export function createPreviewApp(html: string): Hono {
  const app = new Hono();
  app.get('/', (context) => context.html(html));
  app.get('/health', (context) => context.json({ ok: true }));
  return app;
}

export function createApiApp(cwd: string): Hono {
  const app = new Hono();
  app.get('/api/manifest', async (context) =>
    context.json(JSON.parse(await readText(join(designRoot(cwd), 'manifest.json')))),
  );
  app.get('/api/design', async (context) => context.json(await requireDesign(cwd)));
  app.get('/api/brandkit', async (context) =>
    context.json(JSON.parse(await readText(join(designRoot(cwd), 'brandkit.json')))),
  );
  return app;
}

export function createProgram(context: CommandContext): Command {
  const program = new Command()
    .name('lde')
    .description('Creative director and design compiler for coding agents.')
    .version('0.1.0');
  const commands = [
    'init',
    'brief',
    'directions',
    'generate',
    'preview',
    'refine',
    'approve',
    'brandkit',
    'lint',
    'export',
  ];
  for (const name of commands) {
    const command = program.command(name);
    if (name === 'brief')
      command
        .option('--name <name>')
        .option('--summary <summary>')
        .option('--domain <domain>')
        .option('--tension <tension>');
    if (name === 'refine') command.option('--feedback <feedback>');
    if (name === 'preview') command.option('--serve').option('--port <port>');
    command.action(async (...args: unknown[]) => {
      const commandOptions = args.at(-1) as Record<string, unknown>;
      const flags: string[] = [];
      for (const [key, value] of Object.entries(commandOptions))
        if (typeof value === 'string') flags.push(`--${key}`, value);
        else if (value === true) flags.push(`--${key}`);
      await runCommand([name, ...flags], context);
      context.output.forEach((line) => console.log(line));
      context.output.length = 0;
    });
  }
  return program;
}

export const cliRoot = resolve(process.cwd());
