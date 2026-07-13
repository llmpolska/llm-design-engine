import { slugify } from '@llm-design-engine/shared';

export type ArtifactStatus = 'draft' | 'approved' | 'archived';

export interface ProjectBrief {
  id: string;
  slug: string;
  name: string;
  summary: string;
  domain: string;
  users: string[];
  jobs: string[];
  tension: string;
  constraints: string[];
  references: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BriefInput {
  name: string;
  summary: string;
  domain: string;
  users?: string[];
  jobs?: string[];
  tension?: string;
  constraints?: string[];
  references?: string[];
}

export interface ProductInterpretation {
  briefId: string;
  productDomain: string;
  userTension: string;
  emotionalTarget: string;
  domainObjects: string[];
  domainMaterials: string[];
  centralMetaphor: string;
  visualNarrative: string;
  visualKeywords: string[];
  patternsToAvoid: string[];
}

export type MeaningSource =
  'domain' | 'summary' | 'tension' | 'users' | 'jobs' | 'constraints' | 'references';

export interface MeaningEvidence {
  source: MeaningSource;
  input: string;
  conclusion: string;
  consequence: string;
}

export interface ProductMeaning extends ProductInterpretation {
  businessObjective: string;
  operationalVerbs: string[];
  userJourney: string[];
  temporalBehavior: string[];
  informationHierarchy: string[];
  entityRelationships: string[];
  evidence: MeaningEvidence[];
}

export type SceneOpening =
  'document' | 'route' | 'interface' | 'immersive' | 'typographic' | 'operational';
export type SceneLayout = 'stack' | 'grid' | 'track' | 'overlay' | 'freeform';

export interface CreativeHypothesis {
  id: string;
  statement: string;
  visualMetaphor: string;
  emotionalBehavior: string;
  spatialStrategy: string;
  focalStrategy: string;
  materialBehavior: string;
  typographyBehavior: string;
  interactionBehavior: string;
  visualDirectionPrompt: string;
  evidence: MeaningEvidence[];
  forbiddenPatterns: string[];
}

export interface CompositionPlan {
  opening: SceneOpening;
  readingPath: string[];
  focalHierarchy: string[];
  informationDensity: 'sparse' | 'balanced' | 'dense';
  sectionRelationships: string[];
  overlapRules: string[];
  compositionalRhythm: string[];
  typographyBehavior: string[];
  materialBehavior: string[];
  interactionBehavior: string[];
  responsiveTransformations: string[];
  sections: DesignSection[];
  reasoning: MeaningEvidence[];
}

export type DirectionStatus = 'candidate' | 'selected' | 'approved';

export interface CreativeDirection {
  id: string;
  name: string;
  status: DirectionStatus;
  metaphor: string;
  visualNarrative: string;
  composition: {
    layout: string;
    focalPoint: string;
    rhythm: string;
    sections: string[];
  };
  typographyCharacter: string;
  materialLanguage: string[];
  interactionConcept: string;
  domainElements: string[];
  colorStrategy: string;
  rationale: string;
  forbiddenPatterns: string[];
  hypothesisId?: string;
  hypothesis?: CreativeHypothesis;
  compositionPlan?: CompositionPlan;
  meaning?: ProductMeaning;
  distinctivenessFingerprint?: string[];
}

export type SceneNode =
  SceneFrame | SceneText | SceneShape | SceneLine | SceneImage | SceneMetric | SceneAnnotation;

export interface SceneBase {
  id: string;
  kind: SceneNode['kind'];
  x: number;
  y: number;
  width: number;
  height: number;
  role?: string;
  label?: string;
}

export interface SceneFrame extends SceneBase {
  kind: 'frame';
  fill: string;

  stroke?: string;
  radius?: number;
  children: string[];
}

export interface SceneText extends SceneBase {
  kind: 'text';
  text: string;
  fontRole: 'display' | 'body' | 'mono';
  size: number;
  weight: number;
  color: string;
  align?: 'start' | 'center' | 'end';
}

export interface SceneShape extends SceneBase {
  kind: 'shape';
  shape: 'circle' | 'rect' | 'arc' | 'path';
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  radius?: number;
  d?: string;
}

export interface SceneLine extends SceneBase {
  kind: 'line';
  x2: number;
  y2: number;
  stroke: string;
  strokeWidth: number;
  dash?: string;
}

export interface SceneImage extends SceneBase {
  kind: 'image';
  assetId: string;
  fit: 'cover' | 'contain';
  alt: string;
}

export interface SceneMetric extends SceneBase {
  kind: 'metric';
  value: string;
  caption: string;
  trend?: string;
}

export interface SceneAnnotation extends SceneBase {
  kind: 'annotation';
  text: string;
  anchor: string;
}

export interface SceneRegion {
  id: string;
  role: string;
  layout: SceneLayout;
  x: number;
  y: number;
  width: number;
  height: number;
  layerIds: string[];
  emphasis: number;
  responsive?: Record<string, string>;
}

export interface SceneLayer {
  id: string;
  nodeId: string;
  regionId: string;
  zIndex: number;
  semanticRole: string;
  anchor?: string;
  relationships?: string[];
}

export type SceneRelationshipKind = 'leads-to' | 'anchors' | 'supports' | 'contrasts' | 'contains';

export interface SceneRelationship {
  from: string;
  to: string;
  kind: SceneRelationshipKind;
  rationale: string;
}

export interface ResponsiveTransformation {
  breakpoint: 'mobile' | 'tablet' | 'desktop';
  target: string;
  operation: 'reflow' | 'stack' | 'collapse' | 'preserve' | 'move' | 'resize' | 'hide';
  before: string;
  after: string;
  rationale: string;
}

export interface MotionRelationship {
  target: string;
  trigger: string;
  relationship: string;
  reducedMotion: string;
}

export interface DesignSceneGraph {
  width: number;
  height: number;
  opening: SceneOpening;
  readingPath: string[];
  regions: SceneRegion[];
  layers: SceneLayer[];
  relationships: SceneRelationship[];
  responsive: ResponsiveTransformation[];
  motionRelationships: MotionRelationship[];
  nodes: SceneNode[];
}

export type SemanticPatchOperation = 'change' | 'add' | 'remove';

export interface SemanticPatch {
  operation: SemanticPatchOperation;
  target: string;
  before: unknown;
  after: unknown;
  reason: string;
  sourceFeedback: string;
}

export interface DesignDocument {
  id: string;
  route: string;
  concept: string;
  status: ArtifactStatus;
  directionId: string;
  narrative: string;
  composition: { sections: DesignSection[] };
  visualLanguage: { materials: string[]; keywords: string[] };
  typography: { display: string; body: string; mono: string };
  colors: {
    background: string;
    foreground: string;
    accent: string;
    muted: string;
    secondary?: string;
  };
  responsive: { mobile: string[]; tablet?: string[]; desktop?: string[] };
  scene: { width: number; height: number; nodes: SceneNode[] };
  motion: { principles: string[]; reducedMotion?: string[] };
  assets: AssetRequirement[];
  forbiddenPatterns: string[];
  agentInstructions: string[];
  generatedAt: string;
  meaning?: ProductMeaning;
  hypothesis?: CreativeHypothesis;
  compositionPlan?: CompositionPlan;
  sceneGraph?: DesignSceneGraph;
  semanticPatches?: SemanticPatch[];
  providerMetadata?: {
    provider: string;
    model?: string;
    requestId?: string;
    generatedAt: string;
  };
}

export interface DesignSection {
  id: string;
  title: string;
  height: string;
  layout: string;
  focalPoint: string;
  alignment: string;
  rules: string[];
}

export interface AssetRequirement {
  id: string;
  role: string;
  prompt: string;
  negativeConstraints: string[];
  aspectRatio: string;
  intendedPlacement: string;
  generatedFile?: string;
  provider?: string;
  model?: string;
  generatedAt?: string;
}

export interface Brandkit {
  projectId: string;
  narrative: string;
  personality: string[];
  toneOfVoice: string[];
  namingRationale: string;
  logoDirection: string;
  wordmarkDirection: string;
  symbolDirection: string;
  colors: { name: string; hex: string; role: string }[];
  typography: { role: string; family: string; usage: string }[];
  spacingPrinciples: string[];
  shapeLanguage: string[];
  iconographyDirection: string;
  illustrationDirection: string;
  photographyDirection: string;
  motionPrinciples: string[];
  faviconConcept: string;
  socialPreviewConcept: string;
  imagePrompts: AssetRequirement[];
  usageRules: string[];
  misuseRules: string[];
  generatedAt: string;
}

export interface GeneratedAsset {
  id: string;
  role: string;
  file: string;
  prompt: string;
  negativeConstraints: string[];
  aspectRatio: string;
  intendedPlacement: string;
  provider: string;
  model: string;
  generatedAt: string;
  content?: string;
}

export interface LintWarning {
  rule: string;
  severity: 'info' | 'warning' | 'error';
  message: string;
  evidence?: string;
}

export interface LintMetric {
  id: string;
  label: string;
  score: number;
  evidence: string[];
}

export interface LintReport {
  score: number;
  warnings: LintWarning[];
  metrics?: LintMetric[];
  checkedAt: string;
  ruleset: string;
}

export interface ExportPackage {
  projectId: string;
  title: string;
  markdown: string;
  files: string[];
}

export function createProjectBrief(input: BriefInput, clock = new Date()): ProjectBrief {
  const slug = slugify(input.name);
  const timestamp = clock.toISOString();
  return {
    id: slug,
    slug,
    name: input.name.trim(),
    summary: input.summary.trim(),
    domain: input.domain.trim(),
    users: input.users ?? [],
    jobs: input.jobs ?? [],
    tension: input.tension ?? '',
    constraints: input.constraints ?? [],
    references: input.references ?? [],
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}
