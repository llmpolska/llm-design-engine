import { describe, expect, it } from 'vitest';
import { DisabledImageProvider, MockImageProvider, visualDirectionPrompt } from './index.js';

describe('image providers', () => {
  it('returns a deterministic local asset without credentials', async () => {
    const provider = new MockImageProvider(() => new Date('2026-01-01T00:00:00.000Z'));
    const asset = await provider.generate({
      id: 'hero',
      role: 'hero artwork',
      prompt: 'paper press mark',
      negativeConstraints: ['stock'],
      aspectRatio: '16:10',
      intendedPlacement: 'hero',
    });
    expect(asset.file).toContain('hero.svg');
    expect(asset.provider).toBe('mock');
    expect(asset.generatedAt).toBe('2026-01-01T00:00:00.000Z');
  });

  it('explains disabled mode while keeping the workflow usable', async () => {
    const asset = await new DisabledImageProvider().generate({
      id: 'hero',
      role: 'hero',
      prompt: 'prompt',
      negativeConstraints: [],
      aspectRatio: '1:1',
      intendedPlacement: 'icon',
    });
    expect(asset.file).toContain('placeholder');
    expect(asset.provider).toBe('disabled');
  });

  it('keeps direction art sparse and separate from page preview artifacts', async () => {
    const request = {
      id: 'direction-1',
      directionId: 'direction-1',
      visualMetaphor: 'signals crossing a route',
      composition: 'one dominant lateral path',
      typographyBehavior: 'compressed labels with one wide title',
      materialLanguage: ['marked paper', 'oxidized metal'],
      colorStrategy: 'warm field with one signal accent',
      domainElements: ['signals', 'route'],
    };
    const asset = await new MockImageProvider(
      () => new Date('2026-01-01T00:00:00.000Z'),
    ).generateDirection(request);
    expect(asset.role).toBe('visual-direction');
    expect(asset.prompt).toContain('not a final page layout');
    expect(asset.prompt).toContain('Do not invent product copy');
    expect(asset.negativeConstraints).toContain('finished website mockup');
    expect(visualDirectionPrompt(request)).not.toContain('landing page sections');
  });
});
