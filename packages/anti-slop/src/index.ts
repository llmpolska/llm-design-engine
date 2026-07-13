import type { DesignDocument, LintReport, LintWarning } from '@llm-design-engine/core';

interface LintRule {
  id: string;
  weight: number;
  message: string;
  matches: (design: DesignDocument, source: string) => boolean;
  evidence: (design: DesignDocument, source: string) => string;
}

const rules: LintRule[] = [
  { id: 'generic-hero', weight: 14, message: 'Hero composition has no relationship to the project metaphor.', matches: (design) => /split hero/i.test(design.composition.sections[0]?.layout ?? ''), evidence: (design) => design.composition.sections[0]?.layout ?? 'missing hero layout' },
  { id: 'rounded-pill', weight: 8, message: 'Rounded or pill elements are repeated without a material reason.', matches: (_design, source) => (source.match(/rounded-(?:xl|2xl|full)|pill/gi) ?? []).length > 3, evidence: (_design, source) => `${(source.match(/rounded-(?:xl|2xl|full)|pill/gi) ?? []).length} rounded/pill mentions` },
  { id: 'floating-cards', weight: 9, message: 'Floating cards dominate the composition.', matches: (_design, source) => (source.match(/card/gi) ?? []).length > 4, evidence: (_design, source) => `${(source.match(/card/gi) ?? []).length} card mentions` },
  { id: 'unexplained-gradient', weight: 10, message: 'Accent gradient is not explained by the visual language.', matches: (design, source) => /gradient/i.test(source) && !design.visualLanguage.keywords.some((keyword) => /gradient|spectrum/i.test(keyword)), evidence: (_design, source) => (source.match(/gradient[^\s,]*/gi) ?? []).join(', ') },
  { id: 'glassmorphism', weight: 12, message: 'Glassmorphism appears as a default surface treatment.', matches: (design, source) => /glassmorphism|backdrop-blur|frosted glass/i.test(`${source} ${design.forbiddenPatterns.join(' ')}`), evidence: (_design, source) => source.match(/glassmorphism|backdrop-blur|frosted glass/gi)?.join(', ') ?? 'glassmorphism' },
  { id: 'feature-grid', weight: 8, message: 'Repetitive three-column feature grid detected.', matches: (design, source) => /three-column|3-column|three column/i.test(`${source} ${design.composition.sections.map((section) => section.layout).join(' ')}`), evidence: (design) => design.composition.sections.map((section) => section.layout).join('; ') },
  { id: 'abstract-blob', weight: 8, message: 'Meaningless abstract blob detected.', matches: (design, source) => /abstract blob|blob/i.test(`${source} ${design.forbiddenPatterns.join(' ')}`), evidence: (_design, source) => source.match(/abstract blob|blob/gi)?.join(', ') ?? 'blob' },
  { id: 'generic-mockup', weight: 10, message: 'Generic device or dashboard mockup is doing the narrative work.', matches: (design, source) => /dashboard mockup|device mockup|phone mockup|laptop mockup/i.test(`${source} ${design.narrative}`), evidence: (_design, source) => source.match(/(?:dashboard|device|phone|laptop) mockup/gi)?.join(', ') ?? 'mockup' },
  { id: 'stock-imagery', weight: 7, message: 'Random stock imagery is not tied to the approved direction.', matches: (design, source) => /stock|unsplash|picsum/i.test(`${source} ${design.assets.map((asset) => asset.prompt).join(' ')}`), evidence: (design) => design.assets.map((asset) => asset.prompt).join('; ') },
  { id: 'centered-text', weight: 6, message: 'Text is centered without a compositional reason.', matches: (design) => design.scene.nodes.filter((node) => node.kind === 'text').length > 1 && design.scene.nodes.filter((node) => node.kind === 'text' && node.align === 'center').length > 1, evidence: (design) => `${design.scene.nodes.filter((node) => node.kind === 'text' && node.align === 'center').length} centered text nodes` },
  { id: 'low-contrast', weight: 8, message: 'Foreground and background contrast is too low for a working interface.', matches: (design) => design.colors.background.toLowerCase() === design.colors.foreground.toLowerCase(), evidence: (design) => `${design.colors.foreground} on ${design.colors.background}` },
  { id: 'missing-domain-elements', weight: 10, message: 'No domain-specific visual elements were found.', matches: (design) => design.agentInstructions.every((instruction) => /domain|specific|material|station|route|ledger|instrument/i.test(instruction) === false), evidence: (design) => design.agentInstructions.join('; ') || 'no agent instructions' },
];

export function lintDesign(design: DesignDocument, source = '', clock = () => new Date()): LintReport {
  const warnings: LintWarning[] = [];
  let score = 0;
  for (const rule of rules) {
    if (!rule.matches(design, source)) continue;
    score += rule.weight;
    warnings.push({ rule: rule.id, severity: rule.weight >= 10 ? 'error' : 'warning', message: rule.message, evidence: rule.evidence(design, source) });
  }
  return { score: Math.min(100, score), warnings, checkedAt: clock().toISOString(), ruleset: 'lde-anti-slop-1' };
}

export function formatLintReport(report: LintReport): string {
  const lines = [`AI Slop Score: ${report.score}/100`, 'Warnings:'];
  if (report.warnings.length === 0) lines.push('- None. The direction carries domain-specific evidence.');
  for (const warning of report.warnings) lines.push(`- ${warning.message}${warning.evidence ? ` (${warning.evidence})` : ''}`);
  return lines.join('\n');
}
