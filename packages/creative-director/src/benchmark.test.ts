import { describe, expect, it } from 'vitest';
import { MockReasoningProvider } from './index.js';
import type { ProjectBrief } from '@llm-design-engine/core';

const domains = [
  [
    'restaurant operations',
    'Coordinate kitchen tasks, safety, and inventory during service.',
    'Keep control when service accelerates',
  ],
  [
    'developer infrastructure',
    'Trace deploy health, ownership, and rollback evidence.',
    'Decide what is safe to change under pressure',
  ],
  [
    'boutique hotel operations',
    'Coordinate arrivals, rooms, and maintenance promises.',
    'Stay attentive while many promises move at once',
  ],
  [
    'educational research',
    'Organize sources, hypotheses, and review decisions.',
    'Preserve uncertainty without losing forward motion',
  ],
  [
    'industrial logistics',
    'Synchronize loads, routes, docks, and exceptions.',
    'Keep the route trustworthy when timing slips',
  ],
] as const;

function brief(domain: string, summary: string, tension: string): ProjectBrief {
  return {
    id: domain.replace(/\s+/g, '-'),
    slug: domain.replace(/\s+/g, '-'),
    name: domain,
    summary,
    domain,
    users: ['operators'],
    jobs: ['coordinate work'],
    tension,
    constraints: [],
    references: [],
    createdAt: '2026-07-13T00:00:00.000Z',
    updatedAt: '2026-07-13T00:00:00.000Z',
  };
}

describe('cross-domain structural diversity', () => {
  it('keeps metaphors, openings, material language, and reading paths source-derived', async () => {
    const provider = new MockReasoningProvider(() => new Date('2026-07-13T00:00:00.000Z'));
    const outputs = await Promise.all(
      domains.map(async ([domain, summary, tension]) => {
        const meaning = await provider.analyzeBrief(brief(domain, summary, tension));
        const directions = await provider.generateDirections(meaning);
        return { meaning, directions: directions.slice(0, 3) };
      }),
    );
    expect(outputs.every((output) => output.directions.length === 3)).toBe(true);
    expect(new Set(outputs.map((output) => output.meaning.centralMetaphor)).size).toBe(5);
    for (const output of outputs) {
      expect(
        output.directions.every(
          (direction) => direction.meaning?.productDomain === output.meaning.productDomain,
        ),
      ).toBe(true);
      expect(
        new Set(output.directions.map((direction) => direction.compositionPlan?.opening)).size,
      ).toBeGreaterThan(1);
      expect(
        new Set(
          output.directions.map((direction) => direction.compositionPlan?.readingPath.join('|')),
        ).size,
      ).toBeGreaterThan(1);
    }
  });
});
