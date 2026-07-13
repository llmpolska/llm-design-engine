import { MockReasoningProvider } from '@llm-design-engine/creative-director';
import {
  createProjectBrief,
  type CreativeDirection,
  type DesignDocument,
  type ProductMeaning,
} from '@llm-design-engine/core';
export type StudioView =
  | 'overview'
  | 'brief'
  | 'directions'
  | 'comparison'
  | 'specification'
  | 'preview'
  | 'brandkit'
  | 'assets'
  | 'lint'
  | 'export';

export interface ViewDefinition {
  id: StudioView;
  label: string;
  eyebrow: string;
}

export const requiredViews: ViewDefinition[] = [
  { id: 'overview', label: 'Project overview', eyebrow: '01' },
  { id: 'brief', label: 'Brief editor', eyebrow: '02' },
  { id: 'directions', label: 'Creative directions', eyebrow: '03' },
  { id: 'comparison', label: 'Direction comparison', eyebrow: '04' },
  { id: 'specification', label: 'Design specification', eyebrow: '05' },
  { id: 'preview', label: 'Deterministic preview', eyebrow: '06' },
  { id: 'brandkit', label: 'Brandkit', eyebrow: '07' },
  { id: 'assets', label: 'Generated assets', eyebrow: '08' },
  { id: 'lint', label: 'Anti-slop report', eyebrow: '09' },
  { id: 'export', label: 'Export', eyebrow: '10' },
];

export type StudioPhase =
  | 'brief'
  | 'meaning'
  | 'directions'
  | 'refinement'
  | 'specification'
  | 'preview'
  | 'brandkit'
  | 'lint'
  | 'export';
export type StudioOperationStatus = 'idle' | 'running' | 'ready' | 'error';

export interface StudioOperation {
  id: string;
  label: string;
  status: StudioOperationStatus;
  detail: string;
  updatedAt: string;
}

export interface StudioRefinement {
  id: string;
  feedback: string;
  status: 'applied' | 'no-op' | 'error';
  patchCount: number;
  createdAt: string;
}

export interface StudioDirection {
  id: string;
  name: string;
  status: 'candidate' | 'selected' | 'approved';
  metaphor: string;
  visualNarrative: string;
  composition: string;
  type: string;
  material: string;
  color: string;
  rationale: string;
  forbidden: string[];
  source?: CreativeDirection;
}

export interface StudioState {
  activeView: StudioView;
  phase: StudioPhase;
  provider: { mode: 'fixture' | 'adapter'; requiresApiKey: boolean; label: string };
  operations: StudioOperation[];
  interpretation: ProductMeaning | null;
  design: DesignDocument | null;
  refinementHistory: StudioRefinement[];
  project: {
    name: string;
    brief: {
      name: string;
      summary: string;
      domain: string;
      users: string;
      jobs: string;
      tension: string;
      constraints: string;
      references: string;
    };
    directions: StudioDirection[];
    selectedDirectionId: string;
    refineNote: string;
    approved: boolean;
    brandkit: {
      narrative: string;
      colors: { name: string; hex: string; role: string }[];
      typography: { role: string; family: string; usage: string }[];
      logoDirection: string;
      shapeLanguage: string[];
      usageRules: string[];
    };
    assets: { id: string; role: string; file: string; prompt: string; status: string }[];
    lint: {
      score: number;
      rule: string;
      severity: 'info' | 'warning' | 'error';
      message: string;
    }[];
    exportMarkdown: string;
  };
}

export function createStudioState(): StudioState {
  const directions: StudioDirection[] = [
    {
      id: 'direction-field-notes',
      name: 'Field notes',
      status: 'selected',
      metaphor: 'A prep book that becomes a calm control surface.',
      visualNarrative: 'Operational signals are written, underlined, and made legible in the rush.',
      composition: 'Wide paper canvas with one anchored rail and generous annotation margins.',
      type: 'Condensed grotesk headlines with compact mono labels.',
      material: 'Warm paper, graphite rules, stamped coral markers.',
      color: 'Coral marks on kiln black; mineral teal for verified states.',
      rationale: 'Makes complex service work feel authored and dependable, not automated.',
      forbidden: ['Purple gradients', 'anonymous metric tiles', 'decorative glass'],
    },
    {
      id: 'direction-service-window',
      name: 'Service window',
      status: 'candidate',
      metaphor: 'The pass: a focused window between prep and service.',
      visualNarrative: 'Every handoff is visible, timed, and ready to move.',
      composition: 'Tall split view with a strong vertical divider and live queue markers.',
      type: 'Editorial sans with numerals that read like ticket times.',
      material: 'Enamel white, brushed steel, carbon ink.',
      color: 'Mineral teal anchors actions; coral flags a live exception.',
      rationale: 'A more energetic direction for teams who thrive on clear handoffs.',
      forbidden: ['Soft focus imagery', 'rounded app chrome', 'excessive gradients'],
    },
    {
      id: 'direction-counter-card',
      name: 'Counter card',
      status: 'candidate',
      metaphor: 'A small card carried from station to station.',
      visualNarrative: 'Each task is concise, tactile, and easy to trust at arm’s length.',
      composition: 'Modular cards on a ruled counter, with one card always in focus.',
      type: 'Humanist sans paired with a practical mono index.',
      material: 'Butcher paper, ink stamps, mineral teal tape.',
      color: 'Quiet neutrals with a single coral intervention.',
      rationale: 'Invites fast adoption while leaving room for individual team language.',
      forbidden: ['Card nests', 'floating gradients', 'stock dashboard icons'],
    },
  ];

  const markdown = `# Signal Kitchen\n\nA field-notes system for restaurant operations teams.\n\n## Direction\nField notes\n\n## Rules\n- Warm paper canvas and kiln black type\n- Coral marks signal attention\n- Mineral teal confirms a verified handoff\n- No purple gradients, glass cards, or anonymous metric tiles`;

  return {
    activeView: 'overview',
    phase: 'brief',
    operations: [
      {
        id: 'brief',
        label: 'Brief captured',
        status: 'ready',
        detail: 'Fixture brief loaded locally.',
        updatedAt: '2026-07-13T00:00:00.000Z',
      },
      {
        id: 'meaning',
        label: 'Product meaning',
        status: 'idle',
        detail: 'Run the local compiler from the brief editor.',
        updatedAt: '2026-07-13T00:00:00.000Z',
      },
      {
        id: 'directions',
        label: 'Creative directions',
        status: 'ready',
        detail: 'Fixture directions are visible; compile to replace them.',
        updatedAt: '2026-07-13T00:00:00.000Z',
      },
      {
        id: 'specification',
        label: 'Design specification',
        status: 'idle',
        detail: 'Requires a selected direction.',
        updatedAt: '2026-07-13T00:00:00.000Z',
      },
      {
        id: 'preview',
        label: 'Deterministic preview',
        status: 'idle',
        detail: 'Generated from the design scene graph.',
        updatedAt: '2026-07-13T00:00:00.000Z',
      },
      {
        id: 'export',
        label: 'Agent export',
        status: 'ready',
        detail: 'Fixture Markdown is available for inspection.',
        updatedAt: '2026-07-13T00:00:00.000Z',
      },
    ],
    interpretation: null,
    design: null,
    refinementHistory: [],
    provider: { mode: 'fixture', requiresApiKey: false, label: 'Local fixture · no API key' },
    project: {
      name: 'Signal Kitchen',
      brief: {
        name: 'Signal Kitchen',
        summary: 'A field-notes system for restaurant operations teams.',
        domain: 'restaurant operations',
        users: 'Shift leads, chefs, and front-of-house managers',
        jobs: 'Coordinate prep, service, and close without losing the thread',
        tension: 'The room moves quickly, but critical context is often trapped in memory.',
        constraints: 'Must work on a tablet at service speed; no noisy notification layer.',
        references: 'Prep books, stamped tickets, kitchen pass rails',
      },
      directions,
      selectedDirectionId: 'direction-field-notes',
      refineNote: '',
      approved: false,
      brandkit: {
        narrative:
          'A practical identity that treats operational knowledge as something worth making visible.',
        colors: [
          { name: 'Warm paper', hex: '#f2eee5', role: 'Canvas and quiet surfaces' },
          { name: 'Kiln black', hex: '#1f1e1a', role: 'Primary type and structure' },
          { name: 'Coral mark', hex: '#d76b4b', role: 'Attention and active edits' },
          { name: 'Mineral teal', hex: '#347d78', role: 'Verified and ready states' },
        ],
        typography: [
          { role: 'Display', family: 'Arial Narrow', usage: 'Short, declarative section titles' },
          { role: 'Body', family: 'Avenir Next', usage: 'Instructions and narrative copy' },
          { role: 'Mono', family: 'IBM Plex Mono', usage: 'Annotations, indices, metadata' },
        ],
        logoDirection:
          'Registration mark: an offset circle and crosshair that imply a checked station.',
        shapeLanguage: ['Ruled lines', 'registration ticks', 'small circular markers'],
        usageRules: [
          'Use coral once per focal action.',
          'Keep annotations mono and compact.',
          'Let paper remain visible around content.',
        ],
      },
      assets: [
        {
          id: 'asset-station-map',
          role: 'Station map',
          file: 'station-map.svg',
          prompt: 'Monochrome service station map with coral registration marks',
          status: 'fixture ready',
        },
        {
          id: 'asset-pantry-index',
          role: 'Pantry index',
          file: 'pantry-index.svg',
          prompt: 'Ruled pantry index card with mineral teal stamp',
          status: 'fixture ready',
        },
        {
          id: 'asset-social-preview',
          role: 'Social preview',
          file: 'social-preview.svg',
          prompt: 'Warm paper poster with Signal Kitchen registration mark',
          status: 'fixture ready',
        },
      ],
      lint: [
        {
          score: 92,
          rule: 'color-palette',
          severity: 'info',
          message: 'Palette uses named warm paper, kiln black, coral, and mineral teal tokens.',
        },
        {
          score: 92,
          rule: 'anti-dashboard',
          severity: 'warning',
          message:
            'Three repeated panels share the same visual weight; vary one composition before shipping.',
        },
        {
          score: 92,
          rule: 'accessibility',
          severity: 'info',
          message: 'Interactive controls expose labels and visible focus treatment.',
        },
        {
          score: 92,
          rule: 'motion',
          severity: 'info',
          message: 'Reduced-motion behavior is defined for transitions and preview reveal.',
        },
      ],
      exportMarkdown: markdown,
    },
  };
}

export function setActiveView(state: StudioState, activeView: StudioView): StudioState {
  return { ...state, activeView };
}
function updateOperation(
  state: StudioState,
  id: string,
  status: StudioOperationStatus,
  detail: string,
): StudioState {
  const updatedAt = new Date().toISOString();
  return {
    ...state,
    operations: state.operations.map((operation) =>
      operation.id === id ? { ...operation, status, detail, updatedAt } : operation,
    ),
  };
}

function toStudioDirection(
  direction: CreativeDirection,
  status: StudioDirection['status'],
): StudioDirection {
  return {
    id: direction.id,
    name: direction.name,
    status,
    metaphor: direction.metaphor,
    visualNarrative: direction.visualNarrative,
    composition: direction.composition.layout,
    type: direction.typographyCharacter,
    material: direction.materialLanguage.join('; '),
    color: direction.colorStrategy,
    rationale: direction.rationale,
    forbidden: direction.forbiddenPatterns,
    source: direction,
  };
}

function buildStudioExport(
  brief: StudioState['project']['brief'],
  direction: StudioDirection,
  design: DesignDocument,
): string {
  const sceneGraph = design.sceneGraph;
  const sceneSummary = sceneGraph
    ? [
        `- Opening: ${sceneGraph.opening}`,
        `- Reading path: ${sceneGraph.readingPath.join(' → ')}`,
        `- Responsive transformations: ${sceneGraph.responsive.map((rule) => `${rule.breakpoint} ${rule.operation}: ${rule.target}`).join('; ')}`,
      ]
    : design.composition.sections.map((section) => `- ${section.title}: ${section.layout}`);

  return [
    `# ${brief.name}`,
    '',
    brief.summary,
    '',
    '## Direction',
    direction.name,
    '',
    '## Narrative',
    design.narrative,
    '',
    '## Scene graph',
    ...sceneSummary,
    '',
    '## Agent instructions',
    ...design.agentInstructions.map((instruction) => `- ${instruction}`),
    '',
    '## Avoid',
    ...design.forbiddenPatterns.map((pattern) => `- ${pattern}`),
  ].join('\n');
}

export async function compileStudioProject(state: StudioState): Promise<StudioState> {
  let working = updateOperation(
    state,
    'meaning',
    'running',
    'Deriving domain, tension, objects, materials, and journey.',
  );
  try {
    const input = createProjectBrief({
      name: working.project.brief.name,
      summary: working.project.brief.summary,
      domain: working.project.brief.domain,
      users: working.project.brief.users
        .split(/[,\\n]/)
        .map((value) => value.trim())
        .filter(Boolean),
      jobs: working.project.brief.jobs
        .split(/[,\\n]/)
        .map((value) => value.trim())
        .filter(Boolean),
      tension: working.project.brief.tension,
      constraints: working.project.brief.constraints
        .split(/[,\\n]/)
        .map((value) => value.trim())
        .filter(Boolean),
      references: working.project.brief.references
        .split(/[,\\n]/)
        .map((value) => value.trim())
        .filter(Boolean),
    });
    const provider = new MockReasoningProvider(() => new Date('2026-07-13T00:00:00.000Z'));
    const interpretation = await provider.analyzeBrief(input);
    const directions = await provider.generateDirections(interpretation);
    const selected = directions[0];
    if (!selected) throw new Error('Compiler returned no creative directions');
    const design = await provider.generateDesign(selected);
    const nextDirections = directions.map((direction, index) =>
      toStudioDirection(direction, index === 0 ? 'selected' : 'candidate'),
    );
    const selectedDirection = toStudioDirection(selected, 'selected');
    working = {
      ...working,
      phase: 'directions',
      provider: {
        mode: 'fixture',
        requiresApiKey: false,
        label: 'Local compiler · deterministic mock',
      },
      interpretation,
      design,
      project: {
        ...working.project,
        name: input.name,
        directions: nextDirections,
        selectedDirectionId: selected.id,
        approved: false,
        exportMarkdown: buildStudioExport(working.project.brief, selectedDirection, design),
      },
    };
    working = updateOperation(
      working,
      'meaning',
      'ready',
      `${interpretation.evidence.length} evidence links recorded.`,
    );
    working = updateOperation(
      working,
      'directions',
      'ready',
      `${nextDirections.length} source-derived directions generated.`,
    );
    working = updateOperation(
      working,
      'specification',
      'ready',
      'Scene graph generated from the selected direction.',
    );
    working = updateOperation(
      working,
      'preview',
      'ready',
      'Deterministic preview can be rendered from the scene graph.',
    );
    return working;
  } catch (error) {
    return updateOperation(
      working,
      'meaning',
      'error',
      error instanceof Error ? error.message : 'Compiler failed',
    );
  }
}

export async function selectStudioDirection(
  state: StudioState,
  directionId: string,
): Promise<StudioState> {
  const selected = state.project.directions.find((direction) => direction.id === directionId);
  if (!selected) {
    return updateOperation(state, 'specification', 'error', 'Selected direction was not found.');
  }
  if (!selected.source) {
    const directions = state.project.directions.map((direction) => ({
      ...direction,
      status: direction.id === directionId ? ('selected' as const) : ('candidate' as const),
    }));
    return {
      ...state,
      project: { ...state.project, directions, selectedDirectionId: directionId, approved: false },
    };
  }
  let working = updateOperation(
    state,
    'specification',
    'running',
    'Generating a scene graph from the selected direction.',
  );
  try {
    const design = await new MockReasoningProvider(
      () => new Date('2026-07-13T00:00:00.000Z'),
    ).generateDesign(selected.source);
    const directions = working.project.directions.map((direction) => ({
      ...direction,
      status: direction.id === directionId ? ('selected' as const) : ('candidate' as const),
    }));
    working = {
      ...working,
      phase: 'specification',
      design,
      project: {
        ...working.project,
        directions,
        selectedDirectionId: directionId,
        approved: false,
        exportMarkdown: buildStudioExport(working.project.brief, selected, design),
      },
    };
    return updateOperation(
      working,
      'specification',
      'ready',
      'Scene graph generated from the selected direction.',
    );
  } catch (error) {
    return updateOperation(
      working,
      'specification',
      'error',
      error instanceof Error ? error.message : 'Specification generation failed',
    );
  }
}

export async function refineStudioProject(
  state: StudioState,
  feedback: string,
): Promise<StudioState> {
  const clean = feedback.trim();
  const timestamp = new Date('2026-07-13T00:00:00.000Z').toISOString();
  if (!clean) {
    return {
      ...state,
      refinementHistory: [
        ...state.refinementHistory,
        {
          id: `refinement-${state.refinementHistory.length + 1}`,
          feedback: '',
          status: 'no-op',
          patchCount: 0,
          createdAt: timestamp,
        },
      ],
    };
  }
  const selected = state.project.directions.find(
    (direction) => direction.id === state.project.selectedDirectionId,
  );
  const source = selected?.source;
  if (!source || !state.design) {
    return {
      ...state,
      refinementHistory: [
        ...state.refinementHistory,
        {
          id: `refinement-${state.refinementHistory.length + 1}`,
          feedback: clean,
          status: 'error',
          patchCount: 0,
          createdAt: timestamp,
        },
      ],
    };
  }
  const refined = await new MockReasoningProvider(
    () => new Date('2026-07-13T00:00:00.000Z'),
  ).refineDesign(state.design, clean);
  const nextSelected = {
    ...toStudioDirection(source, 'selected'),
    visualNarrative: `${selected.visualNarrative} Refined: ${clean}`,
    rationale: `${selected.rationale} ${clean}`,
  };
  return {
    ...state,
    phase: 'refinement',
    design: refined,
    project: {
      ...state.project,
      directions: state.project.directions.map((direction) =>
        direction.id === nextSelected.id ? nextSelected : direction,
      ),
      refineNote: '',
      exportMarkdown: buildStudioExport(state.project.brief, nextSelected, refined),
    },
    refinementHistory: [
      ...state.refinementHistory,
      {
        id: `refinement-${state.refinementHistory.length + 1}`,
        feedback: clean,
        status: 'applied',
        patchCount: refined.semanticPatches?.length ?? 0,
        createdAt: timestamp,
      },
    ],
    operations: state.operations.map((operation) =>
      operation.id === 'specification'
        ? {
            ...operation,
            status: 'ready',
            detail: `${refined.semanticPatches?.length ?? 0} semantic patches applied`,
            updatedAt: timestamp,
          }
        : operation,
    ),
  };
}

export function approveDirection(state: StudioState, directionId: string): StudioState {
  const directions = state.project.directions.map((direction) => {
    const status: StudioDirection['status'] =
      direction.id === directionId
        ? 'approved'
        : direction.status === 'approved'
          ? 'candidate'
          : direction.status;
    return { ...direction, status };
  });
  return {
    ...state,
    project: { ...state.project, directions, selectedDirectionId: directionId, approved: true },
  };
}
