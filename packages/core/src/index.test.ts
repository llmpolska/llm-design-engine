import { describe, expect, it } from 'vitest';
import { createProjectBrief, type DesignDocument } from './index.js';

describe('core contracts', () => {
  it('creates a stable brief with a slug and timestamps', () => {
    const brief = createProjectBrief(
      {
        name: 'GastroOps',
        summary: 'Operations for restaurant teams',
        domain: 'restaurant operations',
      },
      new Date('2026-01-02T03:04:05.000Z'),
    );

    expect(brief).toMatchObject({
      id: 'gastroops',
      slug: 'gastroops',
      name: 'GastroOps',
      domain: 'restaurant operations',
      createdAt: '2026-01-02T03:04:05.000Z',
      updatedAt: '2026-01-02T03:04:05.000Z',
    });
  });

  it('keeps a design document JSON-safe', () => {
    const design: DesignDocument = {
      id: 'sample-landing',
      route: '/',
      concept: 'field-notes',
      status: 'draft',
      directionId: 'direction-1',
      narrative: 'A field note becoming a working instrument.',
      composition: { sections: [] },
      visualLanguage: { materials: ['paper'], keywords: ['precise'] },
      typography: { display: 'Condensed grotesk', body: 'Humanist sans', mono: 'Mono' },
      colors: { background: '#f3efe7', foreground: '#171716', accent: '#d06b4b', muted: '#d9d0c2' },
      responsive: { mobile: ['stack sections'] },
      scene: { width: 1440, height: 980, nodes: [] },
      motion: { principles: ['quiet reveal'] },
      assets: [],
      forbiddenPatterns: ['purple gradients'],
      agentInstructions: ['Use semantic HTML'],
      generatedAt: '2026-01-02T03:04:05.000Z',
    };

    expect(JSON.parse(JSON.stringify(design))).toEqual(design);
  });
});
