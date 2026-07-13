import { z } from 'zod';
import type { DesignDocument, SceneNode } from '@llm-design-engine/core';

const sceneBase = z.object({
  id: z.string().min(1),
  kind: z.string(),
  x: z.number(),
  y: z.number(),
  width: z.number().nonnegative(),
  height: z.number().nonnegative(),
  role: z.string().optional(),
  label: z.string().optional(),
});

const sceneNodeSchema = z.discriminatedUnion('kind', [
  sceneBase.extend({
    kind: z.literal('frame'),
    fill: z.string(),
    stroke: z.string().optional(),
    radius: z.number().optional(),
    children: z.array(z.string()),
  }),
  sceneBase.extend({
    kind: z.literal('text'),
    text: z.string(),
    fontRole: z.enum(['display', 'body', 'mono']),
    size: z.number(),
    weight: z.number(),
    color: z.string(),
    align: z.enum(['start', 'center', 'end']).optional(),
  }),
  sceneBase.extend({
    kind: z.literal('shape'),
    shape: z.enum(['circle', 'rect', 'arc', 'path']),
    fill: z.string(),
    stroke: z.string().optional(),
    strokeWidth: z.number().optional(),
    radius: z.number().optional(),
    d: z.string().optional(),
  }),
  sceneBase.extend({
    kind: z.literal('line'),
    x2: z.number(),
    y2: z.number(),
    stroke: z.string(),
    strokeWidth: z.number(),
    dash: z.string().optional(),
  }),
  sceneBase.extend({
    kind: z.literal('image'),
    assetId: z.string(),
    fit: z.enum(['cover', 'contain']),
    alt: z.string(),
  }),
  sceneBase.extend({
    kind: z.literal('metric'),
    value: z.string(),
    caption: z.string(),
    trend: z.string().optional(),
  }),
  sceneBase.extend({ kind: z.literal('annotation'), text: z.string(), anchor: z.string() }),
]);

const assetRequirementSchema = z.object({
  id: z.string().min(1),
  role: z.string().min(1),
  prompt: z.string().min(1),
  negativeConstraints: z.array(z.string()),
  aspectRatio: z.string().min(1),
  intendedPlacement: z.string().min(1),
  generatedFile: z.string().optional(),
  provider: z.string().optional(),
  model: z.string().optional(),
  generatedAt: z.string().optional(),
});

export const designSectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  height: z.string().min(1),
  layout: z.string().min(1),
  focalPoint: z.string().min(1),
  alignment: z.string().min(1),
  rules: z.array(z.string()),
});

export const designDocumentSchema = z.object({
  id: z.string().min(1),
  route: z.string().min(1),
  concept: z.string().min(1),
  status: z.enum(['draft', 'approved', 'archived']),
  directionId: z.string().min(1),
  narrative: z.string().min(1),
  composition: z.object({ sections: z.array(designSectionSchema) }),
  visualLanguage: z.object({ materials: z.array(z.string()), keywords: z.array(z.string()) }),
  typography: z.object({ display: z.string(), body: z.string(), mono: z.string() }),
  colors: z.object({
    background: z.string(),
    foreground: z.string(),
    accent: z.string(),
    muted: z.string(),
    secondary: z.string().optional(),
  }),
  responsive: z.object({
    mobile: z.array(z.string()),
    tablet: z.array(z.string()).optional(),
    desktop: z.array(z.string()).optional(),
  }),
  scene: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
    nodes: z.array(sceneNodeSchema),
  }),
  motion: z.object({
    principles: z.array(z.string()),
    reducedMotion: z.array(z.string()).optional(),
  }),
  assets: z.array(assetRequirementSchema),
  forbiddenPatterns: z.array(z.string()),
  agentInstructions: z.array(z.string()),
  generatedAt: z.string().datetime(),
  meaning: z.unknown().optional(),
  hypothesis: z.unknown().optional(),
  compositionPlan: z.unknown().optional(),
  sceneGraph: z.unknown().optional(),
  semanticPatches: z.array(z.unknown()).optional(),
  providerMetadata: z
    .object({
      provider: z.string().min(1),
      model: z.string().optional(),
      requestId: z.string().optional(),
      generatedAt: z.string().datetime(),
    })
    .optional(),
});

export type ParsedDesignMarkdown = {
  data: DesignDocument;
  markdown: string;
  frontmatter: Record<string, string>;
};

function parseFrontmatter(source: string): { values: Record<string, string>; body: string } {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error('Design document must start with YAML frontmatter');
  const frontmatterSource = match[1];
  const body = match[2];
  if (frontmatterSource === undefined || body === undefined) {
    throw new Error('Design document frontmatter is incomplete');
  }
  const values: Record<string, string> = {};
  for (const line of frontmatterSource.split('\n')) {
    const separator = line.indexOf(':');
    if (separator < 1) continue;
    const key = line.slice(0, separator).trim();
    values[key] = line
      .slice(separator + 1)
      .replace(/^['"]|['"]$/g, '')
      .trim();
  }
  return { values, body };
}

function sectionMarkdown(data: DesignDocument): string {
  const sections = data.composition.sections
    .map((section) =>
      [
        `## ${section.title}`,
        `- id: ${section.id}`,
        `- height: ${section.height}`,
        `- layout: ${section.layout}`,
        `- focal-point: ${section.focalPoint}`,
        `- alignment: ${section.alignment}`,
        ...section.rules.map((rule) => `- ${rule}`),
      ].join('\n'),
    )
    .join('\n\n');
  return sections || '## Hero\n- composition follows the approved direction';
}

export function serializeDesignMarkdown(input: DesignDocument): string {
  const data = designDocumentSchema.parse(input) as DesignDocument;
  const frontmatter = [
    '---',
    `id: ${data.id}`,
    `route: ${data.route}`,
    `concept: ${data.concept}`,
    `status: ${data.status}`,
    '---',
  ].join('\n');
  const body = [
    '# Narrative',
    data.narrative,
    '',
    '# Composition',
    sectionMarkdown(data),
    '',
    '# Visual language',
    ...data.visualLanguage.materials.map((material) => `- ${material}`),
    ...data.visualLanguage.keywords.map((keyword) => `- keyword: ${keyword}`),
    '',
    '# Avoid',
    ...data.forbiddenPatterns.map((pattern) => `- ${pattern}`),
    '',
    '<!-- lde-data',
    JSON.stringify(data, null, 2),
    '-->',
  ].join('\n');
  return `${frontmatter}\n${body}\n`;
}

export function parseDesignMarkdown(source: string): ParsedDesignMarkdown {
  const { values, body } = parseFrontmatter(source);
  const payload = body.match(/<!-- lde-data\n([\s\S]*?)\n-->/)?.[1];
  if (!payload) throw new Error('Design document is missing the lde-data payload');
  const parsed = designDocumentSchema.parse(JSON.parse(payload)) as DesignDocument;
  if (values.id && values.id !== parsed.id)
    throw new Error('Frontmatter id does not match payload');
  if (values.status && values.status !== parsed.status)
    throw new Error('Frontmatter status does not match payload');
  return { data: parsed, markdown: source, frontmatter: values };
}

export function isSceneNode(value: unknown): value is SceneNode {
  return sceneNodeSchema.safeParse(value).success;
}
