import type {
  CompositionPlan,
  CreativeDirection,
  CreativeHypothesis,
  DesignDocument,
  DesignSceneGraph,
  DesignSection,
  MeaningEvidence,
  ProjectBrief,
  ProductMeaning,
  SceneNode,
  SemanticPatch,
} from '@llm-design-engine/core';
import {
  asCreativeDirections,
  asDesignDocument,
  asProductMeaning,
  jsonSchemaForStage,
  validateProviderOutput,
} from './provider-output.js';

export interface ReasoningProvider {
  analyzeBrief(input: ProjectBrief): Promise<ProductMeaning>;
  generateDirections(interpretation: ProductMeaning): Promise<CreativeDirection[]>;
  generateDesign(direction: CreativeDirection): Promise<DesignDocument>;
  refineDesign(design: DesignDocument, feedback: string): Promise<DesignDocument>;
}

export interface OpenAIReasoningConfig {
  endpoint: string;
  model: string;
  apiKey?: string;
  timeoutMs?: number;
  retries?: number;
  fetch?: typeof fetch;
}

type Stage = 'meaning' | 'directions' | 'design' | 'refinement';

const STOP_WORDS = new Set([
  'about',
  'after',
  'busy',
  'covering',
  'during',
  'from',
  'into',
  'keep',
  'more',
  'that',
  'their',
  'this',
  'under',
  'with',
  'work',
  'system',
  'teams',
  'users',
]);

function words(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9ąćęłńóśźż-]+/gi, ' ')
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 3 && !STOP_WORDS.has(word));
}

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

function title(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function hash(value: string): number {
  return [...value].reduce(
    (result, character) => (result * 31 + character.charCodeAt(0)) >>> 0,
    17,
  );
}

function colorFor(value: string, offset: number): string {
  return `hsl(${(hash(value) + offset) % 360} 28% ${offset % 2 === 0 ? 12 : 92}%)`;
}

function evidence(
  source: MeaningEvidence['source'],
  input: string,
  conclusion: string,
  consequence: string,
): MeaningEvidence {
  return { source, input, conclusion, consequence };
}

function deriveTokens(brief: ProjectBrief): {
  domain: string[];
  objects: string[];
  verbs: string[];
} {
  const domain = unique(words(`${brief.name} ${brief.domain} ${brief.summary}`));
  const objects = unique(
    words(`${brief.summary} ${brief.jobs?.join(' ') ?? ''} ${brief.users.join(' ')}`),
  );
  const verbs = unique(words(`${brief.jobs?.join(' ') ?? ''} ${brief.tension}`));
  const fallback = domain[0] ?? 'product';
  return {
    domain: domain.length > 0 ? domain : [fallback],
    objects: objects.length > 0 ? objects : [fallback, 'signal'],
    verbs: verbs.length > 0 ? verbs : ['coordinate', 'observe'],
  };
}

function deriveMeaning(input: ProjectBrief): ProductMeaning {
  const { domain, objects, verbs } = deriveTokens(input);
  const primary = domain[0] ?? 'product';
  const secondary = objects[0] ?? domain[1] ?? 'signal';
  const tension =
    input.tension.trim() || `Make ${input.summary || input.name} legible when conditions change`;
  const journey = unique(['orient', ...verbs.slice(0, 3), 'confirm', 'recover']);
  const evidenceRows = [
    evidence(
      'domain',
      input.domain,
      `The product operates in ${input.domain || primary}.`,
      `The interface must expose ${primary} as an active context.`,
    ),
    evidence(
      'summary',
      input.summary,
      `The work centers on ${objects.slice(0, 3).join(', ') || secondary}.`,
      'The visual system must privilege those objects over generic interface chrome.',
    ),
    evidence(
      'tension',
      tension,
      `The user tension is ${tension}.`,
      'The first read must make the critical decision legible before secondary detail.',
    ),
    evidence(
      'jobs',
      input.jobs.join(', ') || 'unspecified jobs',
      `Users repeatedly ${verbs.slice(0, 3).join(', ') || 'coordinate work'}.`,
      'Composition should read as a sequence of actions, not a feature inventory.',
    ),
  ];
  return {
    briefId: input.id,
    productDomain: input.domain || primary,
    userTension: tension,
    emotionalTarget: `calm agency while ${verbs[0] ?? 'work'} accelerates`,
    domainObjects: unique([secondary, ...objects.slice(1, 5), ...domain.slice(1, 3)]),
    domainMaterials: unique([
      `${primary} marks`,
      `${secondary} surfaces`,
      `${verbs[0] ?? 'action'} traces`,
    ]),
    centralMetaphor: `${primary} as a readable field where ${secondary} moves through a sequence`,
    visualNarrative: `${title(primary)} enters as context, concentrates around ${secondary}, then resolves through an explicit next action.`,
    visualKeywords: unique([primary, secondary, ...verbs.slice(0, 3), 'sequence', 'signal']),
    patternsToAvoid: unique([
      'unrelated decorative gradients',
      'generic dashboard mockups',
      'feature-card grids',
      'floating glass panels',
      'abstract blobs',
    ]),
    businessObjective: input.summary || `Make ${input.name} easier to operate`,
    operationalVerbs: verbs.length > 0 ? verbs : ['coordinate', 'observe'],
    userJourney: journey,
    temporalBehavior: [
      'orient before action',
      'surface change as a trace',
      'close the loop with confirmation',
    ],
    informationHierarchy: unique([
      secondary,
      ...objects.slice(0, 2),
      'next action',
      'recovery state',
    ]),
    entityRelationships: unique(
      objects
        .slice(0, 4)
        .map(
          (object, index) =>
            `${object} relates to ${objects[(index + 1) % Math.max(objects.length, 1)] ?? secondary}`,
        ),
    ),
    evidence: evidenceRows,
  };
}

function section(
  id: string,
  titleText: string,
  layout: string,
  focalPoint: string,
  rules: string[],
): DesignSection {
  return {
    id,
    title: titleText,
    height: 'min(82svh, 760px)',
    layout,
    focalPoint,
    alignment: 'start',
    rules,
  };
}

function createCompositionPlan(meaning: ProductMeaning, index: number): CompositionPlan {
  const primary = meaning.visualKeywords[0] ?? 'context';
  const secondary = meaning.domainObjects[0] ?? 'signal';
  const action =
    meaning.operationalVerbs[index % Math.max(meaning.operationalVerbs.length, 1)] ?? 'act';
  const layouts: Array<CompositionPlan['opening']> = [
    'route',
    'document',
    'interface',
    'operational',
  ];
  const layout = layouts[index % layouts.length] ?? 'route';
  const sections = [
    section(
      `${meaning.briefId}-entry-${index}`,
      `${title(primary)} entry`,
      index % 2 === 0 ? 'horizontal reading path' : 'vertical field',
      primary,
      [`Start with ${meaning.userTension}`, `Anchor the first read to ${primary}`],
    ),
    section(
      `${meaning.briefId}-action-${index}`,
      `${title(action)} lane`,
      index % 3 === 0 ? 'anchored action surface' : 'sequential action track',
      action,
      [`Make ${action} the dominant transition`, 'Keep adjacent context visible'],
    ),
    section(
      `${meaning.briefId}-context-${index}`,
      `${title(secondary)} context`,
      index % 2 === 0 ? 'evidence shelf' : 'layered record',
      secondary,
      [`Show relationships around ${secondary}`, 'Use detail as evidence, not decoration'],
    ),
  ];
  return {
    opening: layout,
    readingPath: [
      `${primary} context`,
      `${action} decision`,
      `${secondary} evidence`,
      'confirmation',
    ],
    focalHierarchy: [primary, action, secondary, 'recovery'],
    informationDensity: index % 3 === 0 ? 'sparse' : index % 3 === 1 ? 'balanced' : 'dense',
    sectionRelationships: [
      `${sections[0]?.id ?? 'entry'} leads to ${sections[1]?.id ?? 'action'}`,
      `${sections[1]?.id ?? 'action'} supports ${sections[2]?.id ?? 'context'}`,
    ],
    overlapRules:
      index % 2 === 0
        ? [
            'action surface crosses the section boundary',
            'evidence stays optically attached to its source',
          ]
        : [
            'reading path remains continuous across sections',
            'secondary detail recedes without disappearing',
          ],
    compositionalRhythm: [
      `wide pause before ${action}`,
      `short interval around ${secondary}`,
      `clear closure after confirmation`,
    ],
    typographyBehavior: [
      `use a compressed display voice for ${primary}`,
      'keep operational labels terse',
      `let ${secondary} carry the longest measure`,
    ],
    materialBehavior: [
      `surface ${primary} as a visible trace`,
      `differentiate ${secondary} by texture or rule`,
      'avoid decorative material without a domain role',
    ],
    interactionBehavior: [
      `${action} changes the reading path`,
      'hover/focus reveals evidence in place',
      'reduced motion preserves the same hierarchy',
    ],
    responsiveTransformations: [
      'desktop keeps the reading path lateral',
      'tablet reduces overlap before reducing type',
      'mobile stacks by action order and preserves source labels',
    ],
    sections,
    reasoning: meaning.evidence,
  };
}

function createHypothesis(meaning: ProductMeaning, index: number): CreativeHypothesis {
  const primary = meaning.visualKeywords[index % meaning.visualKeywords.length] ?? 'context';
  const secondary =
    meaning.domainObjects[(index + 1) % Math.max(meaning.domainObjects.length, 1)] ?? 'signal';
  const action =
    meaning.operationalVerbs[(index + 2) % Math.max(meaning.operationalVerbs.length, 1)] ?? 'act';
  const metaphors = [
    `${primary} as a route through ${secondary}`,
    `${secondary} as a ledger of ${primary}`,
    `${action} as a field of changing ${primary}`,
    `${primary} and ${secondary} as an exchange of signals`,
  ];
  const spatialStrategies = [
    'a lateral route with one dominant turn',
    'a layered record with indexed evidence',
    'a broad field with a measured focal island',
    'a reciprocal path between two anchored zones',
  ];
  const materialStrategies = [
    `marked ${primary} surfaces`,
    `indexed ${secondary} sheets`,
    `calibrated ${primary} traces`,
    `joined ${primary}/${secondary} work surfaces`,
  ];
  return {
    id: `${meaning.briefId}-hypothesis-${index + 1}`,
    statement: `${title(primary)} becomes the visual behavior for ${meaning.userTension}; ${secondary} proves each transition.`,
    visualMetaphor: metaphors[index % metaphors.length] ?? metaphors[0]!,
    emotionalBehavior: `The interface moves from ${meaning.emotionalTarget} to a clear ${action}.`,
    spatialStrategy: spatialStrategies[index % spatialStrategies.length] ?? spatialStrategies[0]!,
    focalStrategy: `Keep ${primary} dominant; use ${secondary} as evidence rather than ornament.`,
    materialBehavior:
      materialStrategies[index % materialStrategies.length] ?? materialStrategies[0]!,
    typographyBehavior: `Use typographic contrast to mark ${action} and let ${primary} set the reading pace.`,
    interactionBehavior: `${action} changes emphasis in place while preserving the original route.`,
    visualDirectionPrompt: `Sparse art-direction plate for ${meaning.productDomain}: ${metaphors[index % metaphors.length]}. Show ${materialStrategies[index % materialStrategies.length]}, ${spatialStrategies[index % spatialStrategies.length]}, one focal interface trace, and negative space. No finished website, no invented copy, no feature grid, no stock imagery, no named style references.`,
    evidence: meaning.evidence,
    forbiddenPatterns: meaning.patternsToAvoid,
  };
}

function createDirections(meaning: ProductMeaning): CreativeDirection[] {
  return [0, 1, 2, 3].map((index) => {
    const hypothesis = createHypothesis(meaning, index);
    const plan = createCompositionPlan(meaning, index);
    const primary = meaning.visualKeywords[index % meaning.visualKeywords.length] ?? 'context';
    const secondary =
      meaning.domainObjects[(index + 1) % Math.max(meaning.domainObjects.length, 1)] ?? 'signal';
    return {
      id: `${meaning.briefId}-direction-${index + 1}`,
      name: `${title(primary)} / ${title(secondary)} ${index + 1}`,
      status: 'candidate',
      metaphor: hypothesis.visualMetaphor,
      visualNarrative: `${meaning.visualNarrative} This direction gives ${primary} the first move and ${secondary} the proof.`,
      composition: {
        layout: plan.opening,
        focalPoint: hypothesis.focalStrategy,
        rhythm: plan.compositionalRhythm.join('; '),
        sections: plan.sections.map((item) => item.title),
      },
      typographyCharacter: hypothesis.typographyBehavior,
      materialLanguage: [hypothesis.materialBehavior, ...meaning.domainMaterials],
      interactionConcept: hypothesis.interactionBehavior,
      domainElements: unique([primary, secondary, ...meaning.domainObjects.slice(0, 3)]),
      colorStrategy: `${colorFor(meaning.briefId, index * 47)} field, ${colorFor(meaning.briefId, 13 + index * 47)} text, and one signal accent derived from ${primary}.`,
      rationale: hypothesis.statement,
      forbiddenPatterns: hypothesis.forbiddenPatterns,
      hypothesisId: hypothesis.id,
      hypothesis,
      compositionPlan: plan,
      meaning,
      distinctivenessFingerprint: [
        hypothesis.visualMetaphor,
        plan.opening,
        hypothesis.spatialStrategy,
        ...meaning.domainObjects.slice(0, 2),
      ],
    };
  });
}

function nodesFor(direction: CreativeDirection): SceneNode[] {
  const plan =
    direction.compositionPlan ??
    createCompositionPlan(
      direction.meaning ??
        deriveMeaning({
          id: direction.id,
          slug: direction.id,
          name: direction.name,
          summary: direction.rationale,
          domain: direction.name,
          users: [],
          jobs: [],
          tension: direction.visualNarrative,
          constraints: [],
          references: [],
          createdAt: '1970-01-01T00:00:00.000Z',
          updatedAt: '1970-01-01T00:00:00.000Z',
        }),
      0,
    );
  const background = colorFor(direction.id, 0);
  const foreground = colorFor(direction.id, 1);
  const nodes: SceneNode[] = [
    {
      id: `${direction.id}-field`,
      kind: 'frame',
      x: 0,
      y: 0,
      width: 1200,
      height: 760,
      fill: background,
      children: [],
    },
    {
      id: `${direction.id}-title`,
      kind: 'text',
      x: 72,
      y: 76,
      width: 630,
      height: 104,
      text: direction.name,
      fontRole: 'display',
      size: 56,
      weight: 600,
      color: foreground,
      role: 'hero-title',
    },
    {
      id: `${direction.id}-metaphor`,
      kind: 'text',
      x: 72,
      y: 210,
      width: 480,
      height: 72,
      text: direction.metaphor,
      fontRole: 'body',
      size: 22,
      weight: 400,
      color: foreground,
      role: 'metaphor',
    },
    {
      id: `${direction.id}-trace`,
      kind: 'line',
      x: 72,
      y: 342,
      width: 760,
      height: 0,
      x2: 932,
      y2: 342,
      stroke: foreground,
      strokeWidth: 3,
      role: 'reading-path',
    },
  ];
  plan.sections.forEach((item, index) => {
    const y = 390 + index * 106;
    nodes.push({
      id: item.id,
      kind: 'frame',
      x: 72 + (index % 2) * 38,
      y,
      width: 960 - (index % 2) * 76,
      height: 76,
      fill: index % 2 === 0 ? foreground : background,
      stroke: foreground,
      radius: index === 1 ? 0 : 3,
      children: [],
      role: item.layout,
    });
    nodes.push({
      id: `${item.id}-label`,
      kind: 'text',
      x: 96 + (index % 2) * 38,
      y: y + 22,
      width: 560,
      height: 30,
      text: `${item.title} · ${item.focalPoint}`,
      fontRole: 'mono',
      size: 15,
      weight: 500,
      color: index % 2 === 0 ? background : foreground,
      role: 'section-label',
    });
  });
  return nodes;
}

function sceneGraphFor(direction: CreativeDirection, nodes: SceneNode[]): DesignSceneGraph {
  const plan = direction.compositionPlan!;
  const regions = plan.sections.map((item, index) => ({
    id: item.id,
    role: item.focalPoint,
    layout: index % 2 === 0 ? ('track' as const) : ('overlay' as const),
    x: 72 + (index % 2) * 38,
    y: 390 + index * 106,
    width: 960 - (index % 2) * 76,
    height: 76,
    layerIds: [`${item.id}-layer`, `${item.id}-label`],
    emphasis: 1 - index * 0.16,
    responsive: { mobile: 'stack after previous region', tablet: 'preserve reading order' },
  }));
  const layers = regions.flatMap((region) =>
    region.layerIds.map((nodeId, index) => ({
      id: `${region.id}-${nodeId}-layer`,
      nodeId,
      regionId: region.id,
      zIndex: index,
      semanticRole: index === 0 ? 'surface' : 'label',
      anchor: region.id,
    })),
  );
  return {
    width: 1200,
    height: 760,
    opening: plan.opening,
    readingPath: plan.readingPath,
    regions,
    layers,
    relationships: regions.slice(1).map((region, index) => ({
      from: regions[index]?.id ?? region.id,
      to: region.id,
      kind: 'leads-to' as const,
      rationale: plan.sectionRelationships[index] ?? 'preserve reading sequence',
    })),
    responsive: [
      {
        breakpoint: 'desktop',
        target: 'reading-path',
        operation: 'preserve',
        before: 'lateral route',
        after: 'lateral route',
        rationale: 'retain the chosen opening',
      },
      {
        breakpoint: 'tablet',
        target: 'reading-path',
        operation: 'reflow',
        before: 'lateral route',
        after: 'compressed route',
        rationale: 'reduce overlap before reducing hierarchy',
      },
      {
        breakpoint: 'mobile',
        target: 'regions',
        operation: 'stack',
        before: 'overlapping regions',
        after: 'action-ordered stack',
        rationale: 'keep the operational sequence legible',
      },
    ],
    motionRelationships: [
      {
        target: 'reading-path',
        trigger: 'focus or scroll',
        relationship: 'reveal the next evidence region',
        reducedMotion: 'show all regions in the same order',
      },
    ],
    nodes,
  };
}

function createDesign(direction: CreativeDirection, clock: () => Date): DesignDocument {
  const plan =
    direction.compositionPlan ??
    createCompositionPlan(
      direction.meaning ??
        deriveMeaning({
          id: direction.id,
          slug: direction.id,
          name: direction.name,
          summary: direction.rationale,
          domain: direction.name,
          users: [],
          jobs: [],
          tension: direction.visualNarrative,
          constraints: [],
          references: [],
          createdAt: '1970-01-01T00:00:00.000Z',
          updatedAt: '1970-01-01T00:00:00.000Z',
        }),
      0,
    );
  const nodes = nodesFor({ ...direction, compositionPlan: plan });
  const sceneGraph = sceneGraphFor({ ...direction, compositionPlan: plan }, nodes);
  const generatedAt = clock().toISOString();
  const background = colorFor(direction.id, 0);
  const foreground = colorFor(direction.id, 1);
  return {
    id: `${direction.id}-design`,
    route: '/',
    concept: direction.metaphor,
    status: 'draft',
    directionId: direction.id,
    narrative: direction.visualNarrative,
    composition: { sections: plan.sections },
    visualLanguage: {
      materials: direction.materialLanguage,
      keywords: direction.distinctivenessFingerprint ?? direction.domainElements,
    },
    typography: {
      display: 'compressed editorial display',
      body: 'plain operational sans',
      mono: 'legible technical mono',
    },
    colors: {
      background,
      foreground,
      accent: colorFor(direction.id, 41),
      muted: colorFor(direction.id, 2),
      secondary: colorFor(direction.id, 83),
    },
    responsive: {
      mobile: plan.responsiveTransformations,
      tablet: plan.responsiveTransformations,
      desktop: plan.responsiveTransformations,
    },
    scene: { width: 1200, height: 760, nodes },
    motion: {
      principles: plan.interactionBehavior,
      reducedMotion: ['preserve order and emphasis without movement'],
    },
    assets: [],
    forbiddenPatterns: direction.forbiddenPatterns,
    agentInstructions: [
      `Keep the ${direction.metaphor} identity intact.`,
      `Build the ${plan.opening} opening before adding supporting details.`,
      `Use ${direction.domainElements.join(', ')} as domain-specific evidence.`,
      'Do not introduce generic SaaS cards, unrelated gradients, or invented imagery.',
    ],
    generatedAt,
    ...(direction.meaning ? { meaning: direction.meaning } : {}),
    ...(direction.hypothesis ? { hypothesis: direction.hypothesis } : {}),
    compositionPlan: plan,
    sceneGraph,
    semanticPatches: [],
    providerMetadata: { provider: 'mock', model: 'deterministic', generatedAt },
  };
}

function refineSemantic(
  design: DesignDocument,
  feedback: string,
  clock: () => Date,
): DesignDocument {
  const cleanFeedback = feedback.trim();
  if (!cleanFeedback) return design;
  const lower = cleanFeedback.toLowerCase();
  const patches: SemanticPatch[] = [];
  const plan: CompositionPlan = design.compositionPlan
    ? {
        ...design.compositionPlan,
        readingPath: [...design.compositionPlan.readingPath],
        focalHierarchy: [...design.compositionPlan.focalHierarchy],
        compositionalRhythm: [...design.compositionPlan.compositionalRhythm],
        interactionBehavior: [...design.compositionPlan.interactionBehavior],
        responsiveTransformations: [...design.compositionPlan.responsiveTransformations],
      }
    : {
        opening: 'route',
        readingPath: [],
        focalHierarchy: [],
        informationDensity: 'balanced',
        sectionRelationships: [],
        overlapRules: [],
        compositionalRhythm: [],
        typographyBehavior: [],
        materialBehavior: [],
        interactionBehavior: [],
        responsiveTransformations: [],
        sections: design.composition.sections,
        reasoning: [],
      };
  if (/(calm|quiet|less busy|reduce)/.test(lower)) {
    const before = plan.informationDensity;
    plan.informationDensity = 'sparse';
    plan.compositionalRhythm.push('longer pause before the primary action');
    patches.push({
      operation: 'change',
      target: 'compositionPlan.informationDensity',
      before,
      after: 'sparse',
      reason: 'Reduce visual pressure while preserving the metaphor.',
      sourceFeedback: cleanFeedback,
    });
  }
  if (/(tactile|material|texture)/.test(lower)) {
    const before = [...plan.materialBehavior];
    plan.materialBehavior.push('make the source material visible at the point of action');
    patches.push({
      operation: 'change',
      target: 'compositionPlan.materialBehavior',
      before,
      after: plan.materialBehavior,
      reason: 'Increase material evidence without changing the direction.',
      sourceFeedback: cleanFeedback,
    });
  }
  if (/(mobile|phone|small screen)/.test(lower)) {
    const before = [...plan.responsiveTransformations];
    plan.responsiveTransformations.push(
      'mobile preserves the primary action before secondary evidence',
    );
    patches.push({
      operation: 'change',
      target: 'compositionPlan.responsiveTransformations',
      before,
      after: plan.responsiveTransformations,
      reason: 'Clarify the responsive reading order.',
      sourceFeedback: cleanFeedback,
    });
  }
  if (/(headline|title|type|larger)/.test(lower)) {
    const before = design.scene.nodes.find((node) => node.role === 'hero-title');
    const after = before?.kind === 'text' ? { ...before, size: before.size + 8 } : before;
    const nodes = design.scene.nodes.map((node) =>
      node.role === 'hero-title' && node.kind === 'text' ? { ...node, size: node.size + 8 } : node,
    );
    patches.push({
      operation: 'change',
      target: 'scene.hero-title.size',
      before: before?.kind === 'text' ? before.size : undefined,
      after: after?.kind === 'text' ? after.size : undefined,
      reason: 'Adjust the first read without changing the metaphor.',
      sourceFeedback: cleanFeedback,
    });
    return {
      ...design,
      scene: { ...design.scene, nodes },
      compositionPlan: plan,
      semanticPatches: [...(design.semanticPatches ?? []), ...patches],
      agentInstructions: [...design.agentInstructions, `Refinement: ${cleanFeedback}`],
      generatedAt: clock().toISOString(),
    };
  }
  if (patches.length === 0) {
    patches.push({
      operation: 'change',
      target: 'agentInstructions',
      before: design.agentInstructions,
      after: [...design.agentInstructions, `Refinement intent: ${cleanFeedback}`],
      reason: 'Record feedback for implementation while preserving the structural identity.',
      sourceFeedback: cleanFeedback,
    });
  }
  return {
    ...design,
    compositionPlan: plan,
    semanticPatches: [...(design.semanticPatches ?? []), ...patches],
    agentInstructions: [...design.agentInstructions, `Refinement: ${cleanFeedback}`],
    generatedAt: clock().toISOString(),
  };
}

export class MockReasoningProvider implements ReasoningProvider {
  private readonly clock: () => Date;

  constructor(clock: () => Date = () => new Date()) {
    this.clock = clock;
  }

  async analyzeBrief(input: ProjectBrief): Promise<ProductMeaning> {
    return deriveMeaning(input);
  }

  async generateDirections(interpretation: ProductMeaning): Promise<CreativeDirection[]> {
    return createDirections(interpretation);
  }

  async generateDesign(direction: CreativeDirection): Promise<DesignDocument> {
    return createDesign(direction, this.clock);
  }

  async refineDesign(design: DesignDocument, feedback: string): Promise<DesignDocument> {
    return refineSemantic(design, feedback, this.clock);
  }
}

export class OpenAIReasoningProvider implements ReasoningProvider {
  private readonly config: Required<Pick<OpenAIReasoningConfig, 'endpoint' | 'model'>> &
    OpenAIReasoningConfig;

  constructor(config: OpenAIReasoningConfig) {
    this.config = { ...config, endpoint: config.endpoint.replace(/\/$/, ''), model: config.model };
  }

  private async requestRaw(stage: Stage, input: unknown, feedback?: string): Promise<unknown> {
    const fetchImpl = this.config.fetch ?? globalThis.fetch;
    if (!fetchImpl)
      throw new Error('No fetch implementation is available for the reasoning provider');
    const schema = jsonSchemaForStage(stage);
    const system = [
      'You are the LLM Design Engine creative compiler.',
      'Derive every visual decision from product meaning, domain objects, user tension, and operational behavior.',
      'Return only JSON matching the supplied schema.',
      'Never imitate named companies, living designers, existing websites, or premade themes.',
      'A visual-direction prompt is a sparse art-direction plate, not a finished landing-page mockup: no invented copy, navigation, feature grids, pricing, testimonials, or fake browser chrome.',
    ].join(' ');
    const user = JSON.stringify({ stage, input, feedback, responseSchema: schema });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.config.timeoutMs ?? 30_000);
    try {
      const response = await fetchImpl(`${this.config.endpoint}/chat/completions`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(this.config.apiKey ? { authorization: `Bearer ${this.config.apiKey}` } : {}),
        },
        body: JSON.stringify({
          model: this.config.model,
          temperature: 0.2,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: user },
          ],
          response_format: {
            type: 'json_schema',
            json_schema: { name: `lde_${stage}`, strict: true, schema },
          },
        }),
        signal: controller.signal,
      });
      if (!response.ok)
        throw new Error(`Reasoning provider returned ${response.status}: ${await response.text()}`);
      const payload = (await response.json()) as {
        choices?: Array<{ message?: { content?: string | null } }>;
      };
      const content = payload.choices?.[0]?.message?.content;
      if (!content) throw new Error('Reasoning provider returned no message content');
      return content;
    } finally {
      clearTimeout(timer);
    }
  }

  private async request<S extends Stage>(
    stage: S,
    input: unknown,
    feedback?: string,
  ): Promise<ReturnType<typeof validateProviderOutput<S>>> {
    const retries = Math.max(0, this.config.retries ?? 1);
    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt += 1) {
      try {
        const raw = await this.requestRaw(
          stage,
          input,
          attempt === 0
            ? feedback
            : `${feedback ?? ''}\nPrevious output failed schema validation. Return corrected JSON only.`,
        );
        return validateProviderOutput(stage, raw) as ReturnType<typeof validateProviderOutput<S>>;
      } catch (error) {
        lastError = error;
        if (attempt >= retries) throw error;
      }
    }
    throw lastError instanceof Error ? lastError : new Error('Reasoning provider request failed');
  }

  async analyzeBrief(input: ProjectBrief): Promise<ProductMeaning> {
    return asProductMeaning(await this.request('meaning', input));
  }

  async generateDirections(interpretation: ProductMeaning): Promise<CreativeDirection[]> {
    return asCreativeDirections(await this.request('directions', interpretation));
  }

  async generateDesign(direction: CreativeDirection): Promise<DesignDocument> {
    return asDesignDocument(await this.request('design', direction));
  }

  async refineDesign(design: DesignDocument, feedback: string): Promise<DesignDocument> {
    return asDesignDocument(await this.request('refinement', design, feedback));
  }
}

export {
  ProviderOutputError,
  jsonSchemaForStage,
  validateProviderOutput,
} from './provider-output.js';
export * from './provider-output.js';
