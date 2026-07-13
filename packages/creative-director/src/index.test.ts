import { describe, expect, it } from 'vitest';
import {
  MockReasoningProvider,
  ProviderOutputError,
  jsonSchemaForStage,
  validateProviderOutput,
} from './index.js';
import type { ProjectBrief } from '@llm-design-engine/core';
const brief: ProjectBrief = {
  id: 'gastroops',
  slug: 'gastroops',
  name: 'GastroOps',
  summary: 'Restaurant operations for busy teams',
  domain: 'restaurant operations',
  users: ['kitchen leads'],
  jobs: ['coordinate service'],
  tension: 'Keep control when service accelerates',
  constraints: [],
  references: [],
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

describe('MockReasoningProvider', () => {
  it('derives interpretation and materially different directions', async () => {
    const provider = new MockReasoningProvider();
    const interpretation = await provider.analyzeBrief(brief);
    const directions = await provider.generateDirections(interpretation);

    expect(interpretation.centralMetaphor).toBeTruthy();
    expect(directions.length).toBeGreaterThanOrEqual(3);
    expect(new Set(directions.map((direction) => direction.metaphor)).size).toBe(directions.length);
    expect(directions.every((direction) => direction.domainElements.length > 0)).toBe(true);
  });

  it('refines without replacing the direction identity', async () => {
    const provider = new MockReasoningProvider();
    const interpretation = await provider.analyzeBrief(brief);
    const direction = (await provider.generateDirections(interpretation))[0];
    if (!direction) throw new Error('direction missing');
    const design = await provider.generateDesign(direction);
    const refined = await provider.refineDesign(
      design,
      'Make the first read calmer and more tactile.',
    );

    expect(refined.concept).toBe(design.concept);
    expect(refined.directionId).toBe(design.directionId);
    expect(refined.agentInstructions.join(' ')).toContain('tactile');
  });

  it('compiles meaning into a scene graph instead of a fixed page template', async () => {
    const provider = new MockReasoningProvider(() => new Date('2026-01-02T00:00:00.000Z'));
    const meaning = await provider.analyzeBrief(brief);
    const directions = await provider.generateDirections(meaning);
    const designs = await Promise.all(
      directions.map((direction) => provider.generateDesign(direction)),
    );

    expect(meaning.evidence.length).toBeGreaterThanOrEqual(3);
    expect(
      directions.every(
        (direction) => direction.hypothesis && direction.compositionPlan && direction.meaning,
      ),
    ).toBe(true);
    expect(
      new Set(directions.map((direction) => direction.compositionPlan?.opening)).size,
    ).toBeGreaterThan(1);
    expect(
      designs.every(
        (design) => design.sceneGraph?.regions.length === design.composition.sections.length,
      ),
    ).toBe(true);
    expect(
      new Set(designs.map((design) => design.sceneGraph?.readingPath.join('|'))).size,
    ).toBeGreaterThan(1);
  });

  it('records semantic refinement patches and leaves blank feedback untouched', async () => {
    const provider = new MockReasoningProvider(() => new Date('2026-01-02T00:00:00.000Z'));
    const meaning = await provider.analyzeBrief(brief);
    const direction = (await provider.generateDirections(meaning))[0];
    if (!direction) throw new Error('direction missing');
    const design = await provider.generateDesign(direction);
    const same = await provider.refineDesign(design, '  ');
    const refined = await provider.refineDesign(
      design,
      'Make the first read calmer and more tactile.',
    );

    expect(same).toBe(design);
    expect(refined.semanticPatches?.length).toBeGreaterThanOrEqual(2);
    expect(refined.compositionPlan?.informationDensity).toBe('sparse');
    expect(refined.compositionPlan?.materialBehavior.join(' ')).toContain('source material');
    expect(refined.directionId).toBe(design.directionId);
  });
});

describe('provider output contracts', () => {
  it('rejects malformed structured output and exposes a JSON schema', () => {
    expect(() => validateProviderOutput('meaning', '{"meaning":{"briefId":"x"}}')).toThrow(
      ProviderOutputError,
    );
    const schema = jsonSchemaForStage('directions');
    expect(schema).toHaveProperty('definitions');
  });
});
