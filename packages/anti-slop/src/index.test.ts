import { describe, expect, it } from 'vitest';
import type { DesignDocument } from '@llm-design-engine/core';
import { lintDesign, formatLintReport } from './index.js';

const base = {
  id: 'sample',
  route: '/',
  concept: 'field-ledger',
  status: 'draft' as const,
  directionId: 'direction',
  narrative: 'Domain-specific field ledger.',
  composition: {
    sections: [
      {
        id: 'hero',
        title: 'Hero',
        height: '70svh',
        layout: 'asymmetric ledger',
        focalPoint: 'domain specimen',
        alignment: 'left',
        rules: ['show station ticket'],
      },
    ],
  },
  visualLanguage: { materials: ['paper'], keywords: ['annotated'] },
  typography: { display: 'Grotesk', body: 'Sans', mono: 'Mono' },
  colors: { background: '#f3efe7', foreground: '#171716', accent: '#d06b4b', muted: '#d9d0c2' },
  responsive: { mobile: ['stack'] },
  scene: { width: 1440, height: 980, nodes: [] },
  motion: { principles: ['draw'] },
  assets: [],
  forbiddenPatterns: ['glass'],
  agentInstructions: ['show domain-specific station ticket'],
  generatedAt: '2026-01-01T00:00:00.000Z',
} satisfies DesignDocument;

describe('anti-slop', () => {
  it('scores generic patterns higher and explains the evidence', () => {
    const report = lintDesign(
      {
        ...base,
        composition: {
          sections: [
            {
              ...base.composition.sections[0]!,
              layout: 'split hero with gradient dashboard mockup',
            },
          ],
        },
        visualLanguage: { materials: ['glassmorphism'], keywords: ['gradient'] },
        forbiddenPatterns: [],
      },
      'rounded-xl pill card card card',
    );
    expect(report.score).toBeGreaterThan(0);
    expect(report.warnings.some((warning) => warning.rule === 'generic-hero')).toBe(true);
    expect(formatLintReport(report)).toContain('AI Slop Score:');
    expect(report.metrics?.some((metric) => metric.id === 'structural-diversity')).toBe(true);
  });

  it('keeps a domain-specific design at a low score', () => {
    const report = lintDesign(base);
    expect(report.score).toBeLessThan(25);
  });
});
