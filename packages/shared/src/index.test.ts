import { describe, expect, it } from 'vitest';
import { slugify, unique } from './index.js';

describe('shared helpers', () => {
  it('creates stable URL-safe slugs', () => {
    expect(slugify('Café / Field Notes')).toBe('cafe-field-notes');
  });

  it('preserves first-seen order while removing duplicate values', () => {
    expect(unique(['paper', 'ink', 'paper'])).toEqual(['paper', 'ink']);
  });
});
