import type { Brandkit, CreativeDirection, AssetRequirement } from '@llm-design-engine/core';
import { nowIso, slugify } from '@llm-design-engine/shared';

export function generateBrandkit(projectId: string, direction: CreativeDirection, clock = () => new Date()): Brandkit {
  const accent = direction.name === 'Field Ledger' ? '#2f7770' : '#d06b4b';
  const project = slugify(projectId);
  const generatedAt = nowIso(clock);
  const imagePrompts: AssetRequirement[] = [
    {
      id: `${project}-hero-art`, role: 'hero artwork', prompt: `Tactile editorial material study for ${direction.metaphor}; ${direction.materialLanguage.join(', ')}; one clear focal object; photographed like a working artifact`, negativeConstraints: ['stock photo', 'generic SaaS UI', 'purple gradient', 'robot', 'floating glass'], aspectRatio: '16:10', intendedPlacement: 'landing hero', generatedFile: 'assets/hero-art.svg', provider: 'mock', model: 'deterministic-svg', generatedAt,
    },
    {
      id: `${project}-blueprint-art`, role: 'meaning to blueprint illustration', prompt: `A sequence of annotated marks compressing ${direction.visualNarrative} into an executable blueprint; paper, plotter ink, registration brackets`, negativeConstraints: ['abstract blob', 'neon circuit board', 'unrelated stock imagery'], aspectRatio: '4:3', intendedPlacement: 'process section', generatedFile: 'assets/blueprint-art.svg', provider: 'mock', model: 'deterministic-svg', generatedAt,
    },
    {
      id: `${project}-material-study`, role: 'material study', prompt: `Close crop of ${direction.materialLanguage.join(', ')} arranged as domain evidence for ${direction.name}; high contrast, honest texture`, negativeConstraints: ['3D render', 'generic device mockup', 'glow'], aspectRatio: '3:2', intendedPlacement: 'direction detail', generatedFile: 'assets/material-study.svg', provider: 'mock', model: 'deterministic-svg', generatedAt,
    },
    {
      id: `${project}-social-preview`, role: 'social preview', prompt: `Editorial title plate for ${projectId} using the ${direction.metaphor} visual language; readable mark, paper and ink, no UI screenshot`, negativeConstraints: ['stock image', 'generic AI imagery', 'purple cloud'], aspectRatio: '1.91:1', intendedPlacement: 'Open Graph image', generatedFile: 'assets/social-preview.svg', provider: 'mock', model: 'deterministic-svg', generatedAt,
    },
  ];
  return {
    projectId,
    narrative: `${projectId} speaks through ${direction.metaphor}. The identity turns ${direction.materialLanguage.join(', ')} into a readable system of marks and handoffs.`,
    personality: ['observant', 'precise', 'warm under pressure', 'resourceful'],
    toneOfVoice: ['concrete over clever', 'calm when the room accelerates', 'specific about next actions', 'never inflated'],
    namingRationale: `${projectId} keeps the domain signal visible and pairs it with a name that sounds useful in a real handoff.`,
    logoDirection: 'A press mark: two registration brackets clamp a single cut line, suggesting meaning becoming executable form.',
    wordmarkDirection: 'Compact uppercase wordmark with a deliberate gap between the domain name and its instrument suffix.',
    symbolDirection: 'Offset brackets and a cut line; no sparkle, wand, robot, brain, or infinity symbol.',
    colors: [
      { name: 'paper', hex: '#f3efe7', role: 'quiet base and generous negative space' },
      { name: 'kiln', hex: '#171716', role: 'ink, headings, structural anchor' },
      { name: 'carbon', hex: '#2b2b27', role: 'long-form text and working surfaces' },
      { name: 'accent', hex: accent, role: 'one signal, action, or route marker' },
      { name: 'mineral', hex: '#2f7770', role: 'secondary registration and supportive context' },
      { name: 'muted', hex: '#d9d0c2', role: 'rules, paper folds, disabled context' },
    ],
    typography: [
      { role: 'display', family: 'Arial Narrow / Trebuchet MS', usage: 'short high-contrast headlines and route names' },
      { role: 'body', family: 'Trebuchet MS / system sans-serif', usage: 'explanations, labels, and instructions' },
      { role: 'mono', family: 'ui-monospace', usage: 'metadata, measurements, command output, annotations' },
    ],
    spacingPrinciples: ['Use wide margins as a creative pause.', 'Align annotations to a visible route or fold.', 'Keep one working surface dominant per section.', 'Use 8px as a unit but break the grid when meaning requires it.'],
    shapeLanguage: ['registration brackets', 'short rules', 'paper tabs', 'square corners with rare functional rounding', 'offset underlines'],
    iconographyDirection: 'Thin-line operational marks drawn from domain tools, never decorative emoji or stock icon sets.',
    illustrationDirection: 'Editorial diagrams, plotter lines, material crops, and annotated artifacts with one focal action.',
    photographyDirection: 'Honest close textures and domain objects, directional light, no staged startup desks or generic devices.',
    motionPrinciples: ['marks draw in like a plotter', 'annotations follow their anchor', 'transitions feel measured rather than bouncy', 'reduced motion leaves a clear final state'],
    faviconConcept: 'The compact press mark: two brackets around one cut line in kiln ink and coral.',
    socialPreviewConcept: 'A paper title plate with a single route line crossing the mark and project name.',
    imagePrompts,
    usageRules: ['Keep one accent color dominant.', 'Pair every visual decision with a domain reason.', 'Use the mark as a registration device, not a decoration.', 'Let text and material share the same compositional route.'],
    misuseRules: ['Do not add purple gradients or neon glows.', 'Do not turn every section into a rounded card.', 'Do not center every heading by default.', 'Do not use stock photos, generic dashboard mockups, or abstract blobs.', 'Do not recreate the mark as a sparkle, wand, robot, brain, or infinity loop.'],
    generatedAt,
  };
}

export function brandkitTokenCss(brand: Brandkit): string {
  const colorTokens = brand.colors.map((color) => `--brand-${slugify(color.name)}:${color.hex};`).join('');
  const typographyTokens = brand.typography.map((font) => `--brand-font-${slugify(font.role)}:${font.family};`).join('');
  return `:root{${colorTokens}${typographyTokens}--brand-radius:6px;--brand-rule:1px solid var(--brand-muted);--brand-space:8px}`;
}

export function generatePressMarkSvg(brand: Brandkit): string {
  const accent = brand.colors.find((color) => color.name === 'accent')?.hex ?? '#d06b4b';
  const ink = brand.colors.find((color) => color.name === 'kiln')?.hex ?? '#171716';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img" aria-label="Press mark"><rect width="160" height="160" fill="none"/><path d="M28 48V28h28M132 48V28h-28M28 112v20h28M132 112v20h-28" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="square"/><path d="M44 80h72" stroke="${accent}" stroke-width="8" stroke-linecap="square"/><circle cx="80" cy="80" r="6" fill="${ink}"/></svg>`;
}

export function brandkitAssetManifest(brand: Brandkit): string {
  return JSON.stringify({ projectId: brand.projectId, generatedAt: brand.generatedAt, assets: brand.imagePrompts }, null, 2);
}
