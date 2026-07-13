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
}

export interface StudioState {
  activeView: StudioView;
  provider: { mode: 'fixture' | 'adapter'; requiresApiKey: boolean; label: string };
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
    lint: { score: number; rule: string; severity: 'info' | 'warning' | 'error'; message: string }[];
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
        narrative: 'A practical identity that treats operational knowledge as something worth making visible.',
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
        logoDirection: 'Registration mark: an offset circle and crosshair that imply a checked station.',
        shapeLanguage: ['Ruled lines', 'registration ticks', 'small circular markers'],
        usageRules: ['Use coral once per focal action.', 'Keep annotations mono and compact.', 'Let paper remain visible around content.'],
      },
      assets: [
        { id: 'asset-station-map', role: 'Station map', file: 'station-map.svg', prompt: 'Monochrome service station map with coral registration marks', status: 'fixture ready' },
        { id: 'asset-pantry-index', role: 'Pantry index', file: 'pantry-index.svg', prompt: 'Ruled pantry index card with mineral teal stamp', status: 'fixture ready' },
        { id: 'asset-social-preview', role: 'Social preview', file: 'social-preview.svg', prompt: 'Warm paper poster with Signal Kitchen registration mark', status: 'fixture ready' },
      ],
      lint: [
        { score: 92, rule: 'color-palette', severity: 'info', message: 'Palette uses named warm paper, kiln black, coral, and mineral teal tokens.' },
        { score: 92, rule: 'anti-dashboard', severity: 'warning', message: 'Three repeated panels share the same visual weight; vary one composition before shipping.' },
        { score: 92, rule: 'accessibility', severity: 'info', message: 'Interactive controls expose labels and visible focus treatment.' },
        { score: 92, rule: 'motion', severity: 'info', message: 'Reduced-motion behavior is defined for transitions and preview reveal.' },
      ],
      exportMarkdown: markdown,
    },
  };
}

export function setActiveView(state: StudioState, activeView: StudioView): StudioState {
  return { ...state, activeView };
}

export function approveDirection(state: StudioState, directionId: string): StudioState {
  const directions = state.project.directions.map((direction) => {
    const status: StudioDirection['status'] = direction.id === directionId ? 'approved' : direction.status === 'approved' ? 'candidate' : direction.status;
    return { ...direction, status };
  });
  return {
    ...state,
    project: { ...state.project, directions, selectedDirectionId: directionId, approved: true },
  };
}
