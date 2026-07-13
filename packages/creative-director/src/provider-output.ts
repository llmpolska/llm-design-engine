import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import type {
  CreativeDirection,
  CreativeHypothesis,
  DesignDocument,
  ProductMeaning,
} from '@llm-design-engine/core';

const text = z.string().min(1);
const stringList = z.array(text);

export const meaningEvidenceSchema = z
  .object({
    source: z.enum(['domain', 'summary', 'tension', 'users', 'jobs', 'constraints', 'references']),
    input: text,
    conclusion: text,
    consequence: text,
  })
  .strict();

export const productMeaningSchema = z
  .object({
    briefId: text,
    productDomain: text,
    userTension: text,
    emotionalTarget: text,
    domainObjects: stringList,
    domainMaterials: stringList,
    centralMetaphor: text,
    visualNarrative: text,
    visualKeywords: stringList,
    patternsToAvoid: stringList,
    businessObjective: text,
    operationalVerbs: stringList,
    userJourney: stringList,
    temporalBehavior: stringList,
    informationHierarchy: stringList,
    entityRelationships: stringList,
    evidence: z.array(meaningEvidenceSchema),
  })
  .strict();

export const creativeHypothesisSchema = z
  .object({
    id: text,
    statement: text,
    visualMetaphor: text,
    emotionalBehavior: text,
    spatialStrategy: text,
    focalStrategy: text,
    materialBehavior: text,
    typographyBehavior: text,
    interactionBehavior: text,
    visualDirectionPrompt: text,
    evidence: z.array(meaningEvidenceSchema),
    forbiddenPatterns: stringList,
  })
  .strict();

export const compositionPlanSchema = z
  .object({
    opening: z.enum(['document', 'route', 'interface', 'immersive', 'typographic', 'operational']),
    readingPath: stringList,
    focalHierarchy: stringList,
    informationDensity: z.enum(['sparse', 'balanced', 'dense']),
    sectionRelationships: stringList,
    overlapRules: stringList,
    compositionalRhythm: stringList,
    typographyBehavior: stringList,
    materialBehavior: stringList,
    interactionBehavior: stringList,
    responsiveTransformations: stringList,
    sections: z.array(
      z
        .object({
          id: text,
          title: text,
          height: text,
          layout: text,
          focalPoint: text,
          alignment: text,
          rules: stringList,
        })
        .strict(),
    ),
    reasoning: z.array(meaningEvidenceSchema),
  })
  .strict();

const sceneBase = {
  id: text,
  x: z.number(),
  y: z.number(),
  width: z.number().nonnegative(),
  height: z.number().nonnegative(),
  role: z.string().optional(),
  label: z.string().optional(),
};

export const sceneNodeSchema = z.discriminatedUnion('kind', [
  z
    .object({
      ...sceneBase,
      kind: z.literal('frame'),
      fill: text,
      stroke: z.string().optional(),
      radius: z.number().optional(),
      children: stringList,
    })
    .strict(),
  z
    .object({
      ...sceneBase,
      kind: z.literal('text'),
      text,
      fontRole: z.enum(['display', 'body', 'mono']),
      size: z.number().positive(),
      weight: z.number().positive(),
      color: text,
      align: z.enum(['start', 'center', 'end']).optional(),
    })
    .strict(),
  z
    .object({
      ...sceneBase,
      kind: z.literal('shape'),
      shape: z.enum(['circle', 'rect', 'arc', 'path']),
      fill: text,
      stroke: z.string().optional(),
      strokeWidth: z.number().optional(),
      radius: z.number().optional(),
      d: z.string().optional(),
    })
    .strict(),
  z
    .object({
      ...sceneBase,
      kind: z.literal('line'),
      x2: z.number(),
      y2: z.number(),
      stroke: text,
      strokeWidth: z.number().positive(),
      dash: z.string().optional(),
    })
    .strict(),
  z
    .object({
      ...sceneBase,
      kind: z.literal('image'),
      assetId: text,
      fit: z.enum(['cover', 'contain']),
      alt: text,
    })
    .strict(),
  z
    .object({
      ...sceneBase,
      kind: z.literal('metric'),
      value: text,
      caption: text,
      trend: z.string().optional(),
    })
    .strict(),
  z.object({ ...sceneBase, kind: z.literal('annotation'), text, anchor: text }).strict(),
]);

export const sceneGraphSchema = z
  .object({
    width: z.number().positive(),
    height: z.number().positive(),
    opening: z.enum(['document', 'route', 'interface', 'immersive', 'typographic', 'operational']),
    readingPath: stringList,
    regions: z.array(
      z
        .object({
          id: text,
          role: text,
          layout: z.enum(['stack', 'grid', 'track', 'overlay', 'freeform']),
          x: z.number(),
          y: z.number(),
          width: z.number().nonnegative(),
          height: z.number().nonnegative(),
          layerIds: stringList,
          emphasis: z.number(),
          responsive: z.record(z.string()).optional(),
        })
        .strict(),
    ),
    layers: z.array(
      z
        .object({
          id: text,
          nodeId: text,
          regionId: text,
          zIndex: z.number(),
          semanticRole: text,
          anchor: z.string().optional(),
          relationships: stringList.optional(),
        })
        .strict(),
    ),
    relationships: z.array(
      z
        .object({
          from: text,
          to: text,
          kind: z.enum(['leads-to', 'anchors', 'supports', 'contrasts', 'contains']),
          rationale: text,
        })
        .strict(),
    ),
    responsive: z.array(
      z
        .object({
          breakpoint: z.enum(['mobile', 'tablet', 'desktop']),
          target: text,
          operation: z.enum(['reflow', 'stack', 'collapse', 'preserve', 'move', 'resize', 'hide']),
          before: text,
          after: text,
          rationale: text,
        })
        .strict(),
    ),
    motionRelationships: z.array(
      z
        .object({
          target: text,
          trigger: text,
          relationship: text,
          reducedMotion: text,
        })
        .strict(),
    ),
    nodes: z.array(sceneNodeSchema),
  })
  .strict();

export const creativeDirectionSchema = z
  .object({
    id: text,
    name: text,
    status: z.enum(['candidate', 'selected', 'approved']),
    metaphor: text,
    visualNarrative: text,
    composition: z
      .object({
        layout: text,
        focalPoint: text,
        rhythm: text,
        sections: stringList,
      })
      .strict(),
    typographyCharacter: text,
    materialLanguage: stringList,
    interactionConcept: text,
    domainElements: stringList,
    colorStrategy: text,
    rationale: text,
    forbiddenPatterns: stringList,
    hypothesisId: text.optional(),
    hypothesis: creativeHypothesisSchema.optional(),
    meaning: productMeaningSchema.optional(),
    compositionPlan: compositionPlanSchema.optional(),
    distinctivenessFingerprint: stringList.optional(),
  })
  .strict();

export const designDocumentSchema = z
  .object({
    id: text,
    route: text,
    concept: text,
    status: z.enum(['draft', 'approved', 'archived']),
    directionId: text,
    narrative: text,
    composition: z.object({ sections: compositionPlanSchema.shape.sections }).strict(),
    visualLanguage: z.object({ materials: stringList, keywords: stringList }).strict(),
    typography: z.object({ display: text, body: text, mono: text }).strict(),
    colors: z
      .object({
        background: text,
        foreground: text,
        accent: text,
        muted: text,
        secondary: text.optional(),
      })
      .strict(),
    responsive: z
      .object({ mobile: stringList, tablet: stringList.optional(), desktop: stringList.optional() })
      .strict(),
    scene: z
      .object({
        width: z.number().positive(),
        height: z.number().positive(),
        nodes: z.array(sceneNodeSchema),
      })
      .strict(),
    motion: z.object({ principles: stringList, reducedMotion: stringList.optional() }).strict(),
    assets: z.array(
      z
        .object({
          id: text,
          role: text,
          prompt: text,
          negativeConstraints: stringList,
          aspectRatio: text,
          intendedPlacement: text,
          generatedFile: text.optional(),
          provider: text.optional(),
          model: text.optional(),
          generatedAt: text.optional(),
        })
        .strict(),
    ),
    forbiddenPatterns: stringList,
    agentInstructions: stringList,
    generatedAt: text,
    meaning: productMeaningSchema.optional(),
    hypothesis: creativeHypothesisSchema.optional(),
    compositionPlan: compositionPlanSchema.optional(),
    sceneGraph: sceneGraphSchema.optional(),
    semanticPatches: z
      .array(
        z
          .object({
            operation: z.enum(['change', 'add', 'remove']),
            target: text,
            before: z.unknown(),
            after: z.unknown(),
            reason: text,
            sourceFeedback: text,
          })
          .strict(),
      )
      .optional(),
    providerMetadata: z
      .object({
        provider: text,
        model: text.optional(),
        requestId: text.optional(),
        generatedAt: text,
      })
      .strict()
      .optional(),
  })
  .strict();

export const directionResponseSchema = z
  .object({ directions: z.array(creativeDirectionSchema).min(3).max(5) })
  .strict();
export const meaningResponseSchema = z.object({ meaning: productMeaningSchema }).strict();
export const designResponseSchema = z.object({ design: designDocumentSchema }).strict();

export type ProviderStage = 'meaning' | 'directions' | 'design' | 'refinement';

export const providerSchemas = {
  meaning: meaningResponseSchema,
  directions: directionResponseSchema,
  design: designResponseSchema,
  refinement: designResponseSchema,
} as const;

export type ProviderPayload = {
  meaning: z.infer<typeof meaningResponseSchema>;
  directions: z.infer<typeof directionResponseSchema>;
  design: z.infer<typeof designResponseSchema>;
  refinement: z.infer<typeof designResponseSchema>;
};

export class ProviderOutputError extends Error {
  readonly stage: ProviderStage;
  readonly issues: z.ZodIssue[];
  readonly rawResponse: string;

  constructor(stage: ProviderStage, issues: z.ZodIssue[], rawResponse: string) {
    super(
      `Invalid ${stage} provider output: ${issues.map((issue) => `${issue.path.join('.') || '<root>'} ${issue.message}`).join('; ')}`,
    );
    this.name = 'ProviderOutputError';
    this.stage = stage;
    this.issues = issues;
    this.rawResponse = rawResponse;
  }
}

function parseJsonObject(raw: string): unknown {
  const trimmed = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '');
  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    const start = trimmed.indexOf('{');
    const end = trimmed.lastIndexOf('}');
    if (start >= 0 && end > start) return JSON.parse(trimmed.slice(start, end + 1)) as unknown;
    throw new Error('Provider response did not contain a JSON object');
  }
}

export function validateProviderOutput<S extends ProviderStage>(
  stage: S,
  raw: unknown,
): ProviderPayload[S] {
  const rawResponse = typeof raw === 'string' ? raw : JSON.stringify(raw);
  let parsed: unknown;
  try {
    parsed = typeof raw === 'string' ? parseJsonObject(raw) : raw;
  } catch (error) {
    throw new ProviderOutputError(
      stage,
      [
        {
          code: 'custom',
          path: [],
          message: error instanceof Error ? error.message : 'Malformed JSON',
        },
      ],
      rawResponse,
    );
  }
  const result = providerSchemas[stage].safeParse(parsed);
  if (!result.success) throw new ProviderOutputError(stage, result.error.issues, rawResponse);
  return result.data as ProviderPayload[S];
}

export function jsonSchemaForStage(stage: ProviderStage): Record<string, unknown> {
  return zodToJsonSchema(providerSchemas[stage], {
    name: `Lde${stage.charAt(0).toUpperCase()}${stage.slice(1)}Response`,
  }) as Record<string, unknown>;
}

export function asProductMeaning(payload: ProviderPayload['meaning']): ProductMeaning {
  return payload.meaning as ProductMeaning;
}

export function asCreativeDirections(payload: ProviderPayload['directions']): CreativeDirection[] {
  return payload.directions as CreativeDirection[];
}

export function asDesignDocument(
  payload: ProviderPayload['design'] | ProviderPayload['refinement'],
): DesignDocument {
  return payload.design as DesignDocument;
}

export type { CreativeDirection, CreativeHypothesis, DesignDocument, ProductMeaning };
