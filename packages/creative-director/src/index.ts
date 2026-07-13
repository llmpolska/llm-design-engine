import type {
  CreativeDirection,
  DesignDocument,
  ProductInterpretation,
  ProjectBrief,
} from '@llm-design-engine/core';
import { nowIso, slugify } from '@llm-design-engine/shared';

export interface ReasoningProvider {
  analyzeBrief(input: ProjectBrief): Promise<ProductInterpretation>;
  generateDirections(interpretation: ProductInterpretation): Promise<CreativeDirection[]>;
  generateDesign(direction: CreativeDirection): Promise<DesignDocument>;
  refineDesign(design: DesignDocument, feedback: string): Promise<DesignDocument>;
}

export interface OpenAIReasoningConfig {
  endpoint: string;
  model: string;
  apiKey?: string;
  fetcher?: typeof fetch;
}

const directionFamilies = [
  {
    name: 'Instrument Panel',
    metaphor: 'a calibrated instrument panel',
    visualNarrative: 'Pressure becomes legible through marks, thresholds, and a single working surface.',
    layout: 'asymmetric command surface with a low horizontal horizon',
    focalPoint: 'one live operational surface that carries the page',
    rhythm: 'short annotations followed by wide quiet intervals',
    typography: 'condensed technical display with humanist notes',
    materials: ['powder-coated metal', 'thermal paper', 'station tape'],
    interaction: 'controls reveal context like a shift lead checking a station',
    color: 'carbon field with one oxidized signal accent',
  },
  {
    name: 'Field Ledger',
    metaphor: 'a field ledger with folded working pages',
    visualNarrative: 'The product becomes a sequence of observations that can be marked, folded, and handed forward.',
    layout: 'editorial page stack with a diagonal reading path',
    focalPoint: 'a large annotated ledger page that holds the first decision',
    rhythm: 'dense notes at the edge, generous paper between decisions',
    typography: 'expressive grotesk headlines with ledger mono captions',
    materials: ['uncoated paper', 'graphite rubbings', 'linen tabs'],
    interaction: 'sections pin and fold as the reader moves through the story',
    color: 'warm paper field with mineral teal registration marks',
  },
  {
    name: 'Signal Map',
    metaphor: 'a signal map finding a clear route through noise',
    visualNarrative: 'A web of domain signals converges on the one route that deserves attention now.',
    layout: 'wide map with one bold route and off-axis callouts',
    focalPoint: 'a route line connecting domain objects into a next action',
    rhythm: 'thin lines, isolated labels, one dense convergence point',
    typography: 'wide grotesk for route names with compact mono metadata',
    materials: ['vellum overlays', 'plotter ink', 'brushed aluminum'],
    interaction: 'hovering a domain object brightens the route it influences',
    color: 'pale mineral base with ink-black route and coral signal',
  },
  {
    name: 'Material Archive',
    metaphor: 'a material archive cataloguing what matters',
    visualNarrative: 'The interface feels like a living collection where every object earns its label and place.',
    layout: 'museum rail with one oversized specimen and indexed shelves',
    focalPoint: 'a tangible domain specimen with a precise caption',
    rhythm: 'large specimen, small index, repeat with changing scale',
    typography: 'quiet display serif-like grotesk contrast with archival mono',
    materials: ['vellum', 'rubber stamps', 'raw wood', 'ink wash'],
    interaction: 'specimens slide into view and retain their catalog number',
    color: 'stone and ink with a restrained rust marker',
  },
  {
    name: 'Shift Board',
    metaphor: 'a shift board in motion',
    visualNarrative: 'People, constraints, and timing align as a physical board that makes handoffs visible.',
    layout: 'vertical sequence with offset station columns',
    focalPoint: 'the next handoff rather than a generic dashboard summary',
    rhythm: 'stacked station labels and strong vertical cadence',
    typography: 'bold utilitarian grotesk with stamped monospace detail',
    materials: ['magnetic board', 'chalk dust', 'painted steel'],
    interaction: 'dragging a marker changes the handoff story without losing context',
    color: 'chalk white and deep ink with a single safety orange marker',
  },
] as const;

function domainWords(brief: ProjectBrief): string[] {
  const source = [brief.domain, brief.summary, brief.tension, ...brief.jobs, ...brief.users].join(' ');
  const words = source.toLowerCase().match(/[a-z][a-z-]{3,}/g) ?? [];
  return [...new Set(words)].slice(0, 8);
}

function patternAvoidance(domain: string): string[] {
  return [
    'generic split hero without a domain narrative',
    'purple gradients or decorative glow',
    'glassmorphism and floating dashboard mockups',
    'repetitive three-column feature grids',
    `visual elements that could replace the ${domain} context unchanged`,
  ];
}

export class MockReasoningProvider implements ReasoningProvider {
  private readonly clock: () => Date;

  constructor(clock: () => Date = () => new Date()) {
    this.clock = clock;
  }

  async analyzeBrief(input: ProjectBrief): Promise<ProductInterpretation> {
    const objects = domainWords(input);
    const domain = input.domain || 'product design';
    const tension = input.tension || `Make ${input.summary || 'the work'} feel legible under pressure`;
    return {
      briefId: input.id,
      productDomain: domain,
      userTension: tension,
      emotionalTarget: 'grounded confidence with a sense of earned momentum',
      domainObjects: objects.length > 0 ? objects : ['work surface', 'signal', 'handoff'],
      domainMaterials: ['working paper', 'calibrated metal', 'registration ink'],
      centralMetaphor: `a foundry turning ${domain} pressure into a working instrument`,
      visualNarrative: `${tension}. The page moves from raw evidence to one executable next move.`,
      visualKeywords: ['material', 'annotated', 'precise', 'domain-specific', 'unmistakable'],
      patternsToAvoid: patternAvoidance(domain),
    };
  }

  async generateDirections(interpretation: ProductInterpretation): Promise<CreativeDirection[]> {
    const count = Math.min(5, Math.max(3, interpretation.domainObjects.length > 4 ? 4 : 3));
    return directionFamilies.slice(0, count).map((family, index) => ({
      id: `${slugify(interpretation.briefId)}-direction-${index + 1}`,
      name: family.name,
      status: index === 0 ? 'selected' : 'candidate',
      metaphor: family.metaphor,
      visualNarrative: `${family.visualNarrative} Domain cues: ${interpretation.domainObjects.slice(0, 3).join(', ')}.`,
      composition: {
        layout: family.layout,
        focalPoint: family.focalPoint,
        rhythm: family.rhythm,
        sections: ['signal', 'working surface', 'evidence', 'handoff'],
      },
      typographyCharacter: family.typography,
      materialLanguage: [...family.materials],
      interactionConcept: family.interaction,
      domainElements: interpretation.domainObjects.slice(0, 5),
      colorStrategy: family.color,
      rationale: `This direction gives ${interpretation.productDomain} a visual behavior that cannot be swapped into an unrelated product without losing its meaning.`,
      forbiddenPatterns: [...interpretation.patternsToAvoid, 'a generic device mockup as the primary focal point'],
    }));
  }

  async generateDesign(direction: CreativeDirection): Promise<DesignDocument> {
    const timestamp = nowIso(this.clock);
    const accent = direction.name === 'Field Ledger' ? '#2f7770' : '#d06b4b';
    const background = direction.name === 'Signal Map' ? '#e5ece8' : '#f3efe7';
    const sceneNodes = [
      { id: 'hero-frame', kind: 'frame' as const, x: 48, y: 72, width: 1344, height: 640, fill: '#171716', stroke: '#d9d0c2', radius: 8, children: ['hero-kicker', 'hero-title', 'hero-route'] },
      { id: 'hero-kicker', kind: 'text' as const, x: 96, y: 112, width: 420, height: 32, text: direction.name.toUpperCase(), fontRole: 'mono' as const, size: 14, weight: 600, color: accent, align: 'start' as const },
      { id: 'hero-title', kind: 'text' as const, x: 96, y: 184, width: 720, height: 170, text: direction.metaphor, fontRole: 'display' as const, size: 72, weight: 700, color: '#f3efe7', align: 'start' as const },
      { id: 'hero-route', kind: 'line' as const, x: 96, y: 570, width: 1140, height: 0, x2: 1224, y2: 570, stroke: accent, strokeWidth: 3, dash: '12 12' },
      { id: 'note', kind: 'annotation' as const, x: 940, y: 180, width: 330, height: 120, text: direction.visualNarrative, anchor: 'hero-title' },
    ];
    return {
      id: `${direction.id}-design`,
      route: '/',
      concept: slugify(direction.name),
      status: 'draft',
      directionId: direction.id,
      narrative: direction.visualNarrative,
      composition: {
        sections: [
          { id: 'hero', title: 'Hero', height: '76svh', layout: direction.composition.layout, focalPoint: direction.composition.focalPoint, alignment: 'bottom-left', rules: direction.composition.sections },
          { id: 'evidence', title: 'Evidence', height: 'auto', layout: 'annotated field notes with one dominant specimen', focalPoint: 'domain-specific evidence', alignment: 'left', rules: ['never repeat identical cards', 'keep the visual route visible'] },
          { id: 'handoff', title: 'Handoff', height: '68svh', layout: 'quiet instruction rail', focalPoint: 'the next executable move', alignment: 'right', rules: ['end with an instruction, not a decoration'] },
        ],
      },
      visualLanguage: { materials: direction.materialLanguage, keywords: [direction.metaphor, direction.interactionConcept, direction.colorStrategy] },
      typography: { display: direction.typographyCharacter, body: 'humanist sans for explanations', mono: 'compact mono for measurements and labels' },
      colors: { background, foreground: '#171716', accent, muted: '#d9d0c2', secondary: '#2f7770' },
      responsive: { mobile: ['stack the working surface', 'move annotations below their anchors', 'preserve route markers as a vertical spine'], tablet: ['reduce scene overlap', 'keep the focal surface at 100% width'] },
      scene: { width: 1440, height: 980, nodes: sceneNodes },
      motion: { principles: ['marks draw on like a plotter', 'annotations arrive after their anchor', 'handoff moves with measured weight'], reducedMotion: ['remove drawing motion and retain the final marks'] },
      assets: [{ id: 'hero-material', role: 'hero material study', prompt: `A tactile study of ${direction.materialLanguage.join(', ')} arranged around ${direction.metaphor}; no UI, no text`, negativeConstraints: ['stock photography', 'glowing gradients', 'generic technology imagery'], aspectRatio: '4:3', intendedPlacement: 'hero working surface' }],
      forbiddenPatterns: direction.forbiddenPatterns,
      agentInstructions: [`Build the page from the ${direction.metaphor} metaphor, not from a generic SaaS layout.`, `Use ${direction.composition.layout}.`, `Make ${direction.domainElements.slice(0, 3).join(', ')} visible as domain evidence.`, 'Keep rounded containers rare and functional.', 'Preserve the route from meaning to handoff in responsive layouts.'],
      generatedAt: timestamp,
    };
  }

  async refineDesign(design: DesignDocument, feedback: string): Promise<DesignDocument> {
    const trimmed = feedback.trim();
    if (!trimmed) return design;
    return {
      ...design,
      narrative: `${design.narrative} Refinement: ${trimmed}`,
      agentInstructions: [...design.agentInstructions, `Refinement to honor without changing the identity: ${trimmed}`],
      generatedAt: nowIso(this.clock),
    };
  }
}

export class OpenAIReasoningProvider implements ReasoningProvider {
  private readonly config: OpenAIReasoningConfig;

  constructor(config: OpenAIReasoningConfig) {
    this.config = config;
  }

  private async request<T>(task: string, input: unknown): Promise<T> {
    const fetcher = this.config.fetcher ?? fetch;
    const response = await fetcher(`${this.config.endpoint.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...(this.config.apiKey ? { authorization: `Bearer ${this.config.apiKey}` } : {}) },
      body: JSON.stringify({ model: this.config.model, temperature: 0.7, messages: [{ role: 'system', content: 'You are a creative director. Derive original domain-specific design directions. Never imitate named companies, living designers, or existing websites.' }, { role: 'user', content: JSON.stringify({ task, input }) }] }),
    });
    if (!response.ok) throw new Error(`Reasoning provider returned ${response.status}`);
    const payload = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const content = payload.choices?.[0]?.message?.content;
    if (!content) throw new Error('Reasoning provider returned no structured content');
    return JSON.parse(content) as T;
  }

  analyzeBrief(input: ProjectBrief): Promise<ProductInterpretation> {
    return this.request<ProductInterpretation>('analyzeBrief', input);
  }

  generateDirections(interpretation: ProductInterpretation): Promise<CreativeDirection[]> {
    return this.request<CreativeDirection[]>('generateDirections', interpretation);
  }

  generateDesign(direction: CreativeDirection): Promise<DesignDocument> {
    return this.request<DesignDocument>('generateDesign', direction);
  }

  refineDesign(design: DesignDocument, feedback: string): Promise<DesignDocument> {
    return this.request<DesignDocument>('refineDesign', { design, feedback });
  }
}
