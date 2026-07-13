import { describe, expect, it } from 'vitest';
import { MockImageProvider, DisabledImageProvider } from './index.js';

describe('image providers', () => {
  it('returns a deterministic local asset without credentials', async () => {
    const provider = new MockImageProvider(() => new Date('2026-01-01T00:00:00.000Z'));
    const asset = await provider.generate({ id: 'hero', role: 'hero artwork', prompt: 'paper press mark', negativeConstraints: ['stock'], aspectRatio: '16:10', intendedPlacement: 'hero' });
    expect(asset.file).toContain('hero.svg');
    expect(asset.provider).toBe('mock');
    expect(asset.generatedAt).toBe('2026-01-01T00:00:00.000Z');
  });

  it('explains disabled mode while keeping the workflow usable', async () => {
    const asset = await new DisabledImageProvider().generate({ id: 'hero', role: 'hero', prompt: 'prompt', negativeConstraints: [], aspectRatio: '1:1', intendedPlacement: 'icon' });
    expect(asset.file).toContain('placeholder');
    expect(asset.provider).toBe('disabled');
  });
});
