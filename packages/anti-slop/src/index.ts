import type {
  DesignDocument,
  LintMetric,
  LintReport,
  LintWarning,
  SceneNode,
} from '@llm-design-engine/core';

interface LintRule {
  id: string;
  weight: number;
  message: string;
  matches: (design: DesignDocument, source: string) => boolean;
  evidence: (design: DesignDocument, source: string) => string;
}

const rules: LintRule[] = [
  {
    id: 'generic-hero',
    weight: 14,
    message: 'Hero composition has no relationship to the project metaphor.',
    matches: (design) => /split hero/i.test(design.composition.sections[0]?.layout ?? ''),
    evidence: (design) => design.composition.sections[0]?.layout ?? 'missing hero layout',
  },
  {
    id: 'rounded-pill',
    weight: 8,
    message: 'Rounded or pill elements are repeated without a material reason.',
    matches: (_design, source) => (source.match(/rounded-(?:xl|2xl|full)|pill/gi) ?? []).length > 3,
    evidence: (_design, source) =>
      `${(source.match(/rounded-(?:xl|2xl|full)|pill/gi) ?? []).length} rounded/pill mentions`,
  },
  {
    id: 'floating-cards',
    weight: 9,
    message: 'Floating cards dominate the composition.',
    matches: (_design, source) => (source.match(/card/gi) ?? []).length > 4,
    evidence: (_design, source) => `${(source.match(/card/gi) ?? []).length} card mentions`,
  },
  {
    id: 'unexplained-gradient',
    weight: 10,
    message: 'Accent gradient is not explained by the visual language.',
    matches: (design, source) =>
      /gradient/i.test(source) &&
      !design.visualLanguage.keywords.some((keyword) => /gradient|spectrum/i.test(keyword)),
    evidence: (_design, source) => (source.match(/gradient[^\s,]*/gi) ?? []).join(', '),
  },
  {
    id: 'glassmorphism',
    weight: 12,
    message: 'Glassmorphism appears as a default surface treatment.',
    matches: (design, source) =>
      /glassmorphism|backdrop-blur|frosted glass/i.test(
        `${source} ${design.forbiddenPatterns.join(' ')}`,
      ),
    evidence: (_design, source) =>
      source.match(/glassmorphism|backdrop-blur|frosted glass/gi)?.join(', ') ?? 'glassmorphism',
  },
  {
    id: 'feature-grid',
    weight: 8,
    message: 'Repetitive three-column feature grid detected.',
    matches: (design, source) =>
      /three-column|3-column|three column/i.test(
        `${source} ${design.composition.sections.map((section) => section.layout).join(' ')}`,
      ),
    evidence: (design) => design.composition.sections.map((section) => section.layout).join('; '),
  },
  {
    id: 'abstract-blob',
    weight: 8,
    message: 'Meaningless abstract blob detected.',
    matches: (design, source) =>
      /abstract blob|blob/i.test(`${source} ${design.forbiddenPatterns.join(' ')}`),
    evidence: (_design, source) => source.match(/abstract blob|blob/gi)?.join(', ') ?? 'blob',
  },
  {
    id: 'generic-mockup',
    weight: 10,
    message: 'Generic device or dashboard mockup is doing the narrative work.',
    matches: (design, source) =>
      /dashboard mockup|device mockup|phone mockup|laptop mockup/i.test(
        `${source} ${design.narrative}`,
      ),
    evidence: (_design, source) =>
      source.match(/(?:dashboard|device|phone|laptop) mockup/gi)?.join(', ') ?? 'mockup',
  },
  {
    id: 'stock-imagery',
    weight: 7,
    message: 'Random stock imagery is not tied to the approved direction.',
    matches: (design, source) =>
      /stock|unsplash|picsum/i.test(
        `${source} ${design.assets.map((asset) => asset.prompt).join(' ')}`,
      ),
    evidence: (design) => design.assets.map((asset) => asset.prompt).join('; '),
  },
  {
    id: 'centered-text',
    weight: 6,
    message: 'Text is centered without a compositional reason.',
    matches: (design) =>
      design.scene.nodes.filter((node) => node.kind === 'text').length > 1 &&
      design.scene.nodes.filter((node) => node.kind === 'text' && node.align === 'center').length >
        1,
    evidence: (design) =>
      `${design.scene.nodes.filter((node) => node.kind === 'text' && node.align === 'center').length} centered text nodes`,
  },
  {
    id: 'low-contrast',
    weight: 8,
    message: 'Foreground and background contrast is too low for a working interface.',
    matches: (design) =>
      design.colors.background.toLowerCase() === design.colors.foreground.toLowerCase(),
    evidence: (design) => `${design.colors.foreground} on ${design.colors.background}`,
  },
  {
    id: 'missing-domain-elements',
    weight: 10,
    message: 'No domain-specific visual elements were found.',
    matches: (design) =>
      design.agentInstructions.every(
        (instruction) =>
          /domain|specific|material|station|route|ledger|instrument/i.test(instruction) === false,
      ),
    evidence: (design) => design.agentInstructions.join('; ') || 'no agent instructions',
  },
];

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function sceneNodes(design: DesignDocument): SceneNode[] {
  return design.sceneGraph?.nodes ?? design.scene.nodes;
}

function repeatedGeometry(nodes: SceneNode[]): { repeated: number; total: number } {
  const counts = new Map<string, number>();
  for (const node of nodes) {
    const key = `${node.kind}:${node.width}x${node.height}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const repeated = [...counts.values()]
    .filter((count) => count > 1)
    .reduce((sum, count) => sum + count - 1, 0);
  return { repeated, total: nodes.length };
}

function structuralMetrics(design: DesignDocument): LintMetric[] {
  const nodes = sceneNodes(design);
  const geometry = repeatedGeometry(nodes);
  const graph = design.sceneGraph;
  const sections = design.composition.sections;
  const distinctLayouts = new Set(sections.map((section) => section.layout)).size;
  const domainObjects = design.meaning?.domainObjects ?? [];
  const regionRoles = graph?.regions.map((region) => region.role).filter(Boolean) ?? [];
  const semanticRelationships = graph?.relationships.length ?? 0;
  const expectedRelationships = Math.max(0, (graph?.regions.length ?? 0) - 1);
  const mobileIntent =
    (graph?.responsive.filter((rule) => rule.breakpoint === 'mobile').length ?? 0) +
    (design.responsive.mobile.length > 0 ? 1 : 0);
  const structuralDiversity =
    geometry.total < 3 ? 100 : clamp(100 - (geometry.repeated / geometry.total) * 100);
  const hierarchy = clamp(
    (graph?.readingPath.length ?? (sections.length > 1 ? 70 : 45)) +
      (design.compositionPlan?.focalHierarchy.length ? 20 : 0),
  );
  const domainSpecificity = clamp(
    (domainObjects.length > 0 ? 55 : 0) +
      Math.min(35, regionRoles.length * 12) +
      (design.visualLanguage.materials.length > 0 ? 10 : 0),
  );
  const relationshipCoverage =
    expectedRelationships === 0
      ? 100
      : clamp((semanticRelationships / expectedRelationships) * 100);
  const responsiveIntent = mobileIntent > 0 ? clamp(60 + (graph?.responsive.length ?? 0) * 8) : 20;
  const materialIntent = clamp(
    (design.visualLanguage.materials.length > 1
      ? 60
      : design.visualLanguage.materials.length > 0
        ? 35
        : 0) + (design.meaning?.domainMaterials.length ? 40 : 0),
  );
  const compositionDiversity =
    sections.length < 2 ? 100 : clamp((distinctLayouts / sections.length) * 100);
  return [
    {
      id: 'structural-diversity',
      label: 'Structural diversity',
      score: structuralDiversity,
      evidence: [
        `${geometry.repeated} repeated geometry signatures across ${geometry.total} scene nodes`,
      ],
    },
    {
      id: 'composition-hierarchy',
      label: 'Composition hierarchy',
      score: hierarchy,
      evidence: [graph?.readingPath.join(' → ') || `${sections.length} declared sections`],
    },
    {
      id: 'domain-specificity',
      label: 'Domain specificity',
      score: domainSpecificity,
      evidence: [...domainObjects, ...regionRoles].slice(0, 6),
    },
    {
      id: 'semantic-relationships',
      label: 'Semantic relationships',
      score: relationshipCoverage,
      evidence: [`${semanticRelationships}/${expectedRelationships || 0} scene relationships`],
    },
    {
      id: 'responsive-intent',
      label: 'Responsive intent',
      score: responsiveIntent,
      evidence: [`${mobileIntent} mobile transformation signals`],
    },
    {
      id: 'material-intent',
      label: 'Material intent',
      score: materialIntent,
      evidence: design.visualLanguage.materials.slice(0, 6),
    },
    {
      id: 'compositional-variation',
      label: 'Compositional variation',
      score: compositionDiversity,
      evidence: [...new Set(sections.map((section) => section.layout))],
    },
  ];
}

function structuralWarnings(metrics: LintMetric[]): LintWarning[] {
  const byId = new Map(metrics.map((metric) => [metric.id, metric]));
  const warnings: LintWarning[] = [];
  const add = (
    id: string,
    rule: string,
    message: string,
    severity: LintWarning['severity'] = 'warning',
  ) => {
    const metric = byId.get(id);
    if (!metric || metric.score >= 60) return;
    warnings.push({ rule, severity, message, evidence: metric.evidence.join('; ') });
  };
  add(
    'structural-diversity',
    'repeated-container-geometry',
    'Repeated container geometry is doing the work of a reusable template.',
    'warning',
  );
  add(
    'composition-hierarchy',
    'missing-focal-hierarchy',
    'The scene graph does not expose a readable focal hierarchy.',
    'error',
  );
  add(
    'domain-specificity',
    'low-domain-specificity',
    'The design has too little domain-specific evidence to resist generic substitution.',
    'error',
  );
  add(
    'semantic-relationships',
    'missing-scene-relationships',
    'Scene regions are not connected by explicit semantic relationships.',
    'warning',
  );
  add(
    'responsive-intent',
    'missing-responsive-intent',
    'Responsive behavior is described without a scene-graph transformation.',
    'warning',
  );
  add(
    'material-intent',
    'unexplained-materials',
    'Material language is too thin to explain the visual treatment.',
    'warning',
  );
  add(
    'compositional-variation',
    'repetitive-section-layout',
    'Sections repeat one layout family without a compositional reason.',
    'warning',
  );
  return warnings;
}

export function lintDesign(
  design: DesignDocument,
  source = '',
  clock = () => new Date(),
): LintReport {
  const warnings: LintWarning[] = [];
  let score = 0;
  for (const rule of rules) {
    if (!rule.matches(design, source)) continue;
    score += rule.weight;
    warnings.push({
      rule: rule.id,
      severity: rule.weight >= 10 ? 'error' : 'warning',
      message: rule.message,
      evidence: rule.evidence(design, source),
    });
  }
  const metrics = structuralMetrics(design);
  for (const warning of structuralWarnings(metrics)) {
    score += warning.severity === 'error' ? 8 : 5;
    warnings.push(warning);
  }
  return {
    score: Math.min(100, score),
    warnings,
    metrics,
    checkedAt: clock().toISOString(),
    ruleset: 'lde-anti-slop-2-structural',
  };
}

export function formatLintReport(report: LintReport): string {
  const lines = [`AI Slop Score: ${report.score}/100`, 'Structural metrics:'];
  for (const metric of report.metrics ?? [])
    lines.push(
      `- ${metric.label}: ${metric.score}/100 (${metric.evidence.join('; ') || 'no evidence'})`,
    );
  lines.push('Warnings:');
  if (report.warnings.length === 0)
    lines.push('- None. The direction carries domain-specific evidence.');
  for (const warning of report.warnings)
    lines.push(`- ${warning.message}${warning.evidence ? ` (${warning.evidence})` : ''}`);
  return lines.join('\n');
}
