import { describe, expect, it } from 'vitest';
import type { DesignDocument } from '@llm-design-engine/core';
import { designDocumentSchema, parseDesignMarkdown, serializeDesignMarkdown } from './index.js';

const minimal = {
  id: 'gastroops-landing',
  route: '/',
  concept: 'kitchen-control-room',
  status: 'approved' as const,
  directionId: 'direction-kitchen',
  narrative: 'Control under pressure.',
  composition: { sections: [] },
  visualLanguage: { materials: ['steel'], keywords: ['precise'] },
  typography: { display: 'Condensed grotesk', body: 'Humanist sans', mono: 'Mono' },
  colors: { background: '#f3efe7', foreground: '#171716', accent: '#d06b4b', muted: '#d9d0c2' },
  responsive: { mobile: ['stack'] },
  scene: { width: 1440, height: 980, nodes: [] },
  motion: { principles: ['reveal'] },
  assets: [],
  forbiddenPatterns: ['glassmorphism'],
  agentInstructions: ['Use semantic HTML'],
  generatedAt: '2026-01-02T03:04:05.000Z',
};

describe('design format', () => {
  it('parses YAML frontmatter and structured body', () => {
    const markdown = serializeDesignMarkdown(minimal);
    const parsed = parseDesignMarkdown(markdown);
    expect(parsed.data).toEqual(minimal);
    expect(parsed.markdown).toContain('# Narrative');
  });

  it('rejects malformed required metadata', () => {
    const result = designDocumentSchema.safeParse({ ...minimal, id: '' });
    expect(result.success).toBe(false);
  });

  it('round-trips typed compilation evidence and scene graph metadata', () => {
    const rich = {
      ...minimal,
      meaning: {
        centralMetaphor: 'signals in sequence',
        evidence: [
          { source: 'domain', conclusion: 'domain-first', consequence: 'show domain objects' },
        ],
      },
      hypothesis: { id: 'hypothesis-1', visualMetaphor: 'a route through signals' },
      compositionPlan: { opening: 'route', readingPath: ['context', 'action'] },
      sceneGraph: { opening: 'route', regions: [{ id: 'entry', role: 'context' }] },
      semanticPatches: [{ operation: 'change', target: 'scene.hero', reason: 'calmer first read' }],
      providerMetadata: {
        provider: 'mock',
        model: 'deterministic',
        generatedAt: minimal.generatedAt,
      },
    } as unknown as DesignDocument;
    const parsed = parseDesignMarkdown(serializeDesignMarkdown(rich));
    expect(parsed.data.meaning).toEqual(rich.meaning);
    expect(parsed.data.sceneGraph).toEqual(rich.sceneGraph);
    expect(parsed.data.semanticPatches).toEqual(rich.semanticPatches);
  });
});
