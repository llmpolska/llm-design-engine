import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('LLM Design Engine website', () => {
  it('exposes the complete product narrative and interactive transformation stages', () => {
    const app = readFileSync(resolve(process.cwd(), 'src/App.vue'), 'utf8');

    for (const section of [
      'hero',
      'transformation',
      'comparison',
      'design-spec',
      'deterministic-preview',
      'anti-slop',
      'brandkit',
      'gastroops',
      'cli',
      'architecture',
      'roadmap',
      'open-source',
    ]) {
      expect(app).toContain(`id="${section}"`);
    }

    expect(app).toContain('transformationStages');
    expect(app).toContain('activeStage');
    expect(app).toContain('/static/hero-foundry.svg');
  });
});
