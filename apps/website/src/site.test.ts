import { describe, expect, it } from 'vitest';
import { transformationStages } from './site.js';

describe('website transformation narrative', () => {
  it('contains the full meaning-to-specification sequence', () => {
    expect(transformationStages.map((stage) => stage.label)).toEqual([
      '01 / brief',
      '02 / direction',
      '03 / document',
      '04 / preview',
    ]);
    expect(transformationStages.every((stage) => stage.body.length > 30)).toBe(true);
  });
});
