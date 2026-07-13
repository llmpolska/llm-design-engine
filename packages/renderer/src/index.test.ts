import { describe, expect, it } from 'vitest';
import type { DesignDocument } from '@llm-design-engine/core';
import { renderDesignToHtml, renderDesignToSvg } from './index.js';

const design = {
  id: 'sample',
  route: '/',
  concept: 'field-ledger',
  status: 'approved' as const,
  directionId: 'direction',
  narrative: 'A field ledger.',
  composition: {
    sections: [
      {
        id: 'hero',
        title: 'Hero',
        height: '70svh',
        layout: 'ledger',
        focalPoint: 'page',
        alignment: 'left',
        rules: ['keep ink visible'],
      },
    ],
  },
  visualLanguage: { materials: ['paper'], keywords: ['annotated'] },
  typography: { display: 'Grotesk', body: 'Sans', mono: 'Mono' },
  colors: { background: '#f3efe7', foreground: '#171716', accent: '#d06b4b', muted: '#d9d0c2' },
  responsive: { mobile: ['stack'] },
  scene: {
    width: 1440,
    height: 980,
    nodes: [
      {
        id: 'title',
        kind: 'text' as const,
        x: 40,
        y: 50,
        width: 500,
        height: 100,
        text: 'Press the meaning',
        fontRole: 'display' as const,
        size: 64,
        weight: 700,
        color: '#171716',
      },
    ],
  },
  motion: { principles: ['draw'] },
  assets: [],
  forbiddenPatterns: ['glass'],
  agentInstructions: ['use semantic html'],
  generatedAt: '2026-01-01T00:00:00.000Z',
} satisfies DesignDocument;

describe('renderer', () => {
  it('renders stable HTML and SVG for the same design', () => {
    const first = renderDesignToHtml(design);
    const second = renderDesignToHtml(design);
    expect(first).toBe(second);
    expect(first).toContain('Press the meaning');
    expect(renderDesignToSvg(design)).toContain('<svg');
  });
});
