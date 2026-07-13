import { describe, expect, it } from 'vitest';
import type { CreativeDirection } from '@llm-design-engine/core';
import { generateBrandkit, brandkitTokenCss, generatePressMarkSvg } from './index.js';

const direction: CreativeDirection = {
  id: 'gastroops-direction-1',
  name: 'Instrument Panel',
  status: 'approved',
  metaphor: 'a calibrated instrument panel',
  visualNarrative: 'Pressure becomes legible.',
  composition: {
    layout: 'asymmetric command surface',
    focalPoint: 'working surface',
    rhythm: 'short annotations',
    sections: ['signal'],
  },
  typographyCharacter: 'condensed technical',
  materialLanguage: ['steel'],
  interactionConcept: 'reveal context',
  domainElements: ['station', 'ticket'],
  colorStrategy: 'carbon with coral',
  rationale: 'domain-specific',
  forbiddenPatterns: ['glass'],
};

describe('brandkit', () => {
  it('generates every required brand section and local assets', () => {
    const brand = generateBrandkit(
      'gastroops',
      direction,
      () => new Date('2026-01-01T00:00:00.000Z'),
    );
    expect(brand.personality.length).toBeGreaterThan(2);
    expect(brand.colors.length).toBeGreaterThan(3);
    expect(brand.imagePrompts.length).toBeGreaterThan(2);
    expect(brand.misuseRules.length).toBeGreaterThan(2);
    expect(brandkitTokenCss(brand)).toContain('--brand-accent');
    expect(generatePressMarkSvg(brand)).toContain('<svg');
  });
});
