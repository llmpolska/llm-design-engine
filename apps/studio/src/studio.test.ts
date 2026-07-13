import { describe, expect, it } from 'vitest';
import {
  createStudioState,
  requiredViews,
  setActiveView,
  approveDirection,
  type StudioView,
} from './studio';

describe('studio local fixture', () => {
  it('exposes every required view and switches the active view', () => {
    const state = createStudioState();

    expect(requiredViews.map((view) => view.id)).toEqual([
      'overview',
      'brief',
      'directions',
      'comparison',
      'specification',
      'preview',
      'brandkit',
      'assets',
      'lint',
      'export',
    ]);

    const next = setActiveView(state, 'brief' satisfies StudioView);
    expect(next.activeView).toBe('brief');
    expect(next.project.name).toBe('Signal Kitchen');
  });

  it('uses deterministic project data without API credentials', () => {
    const state = createStudioState();

    expect(state.provider.mode).toBe('fixture');
    expect(state.provider.requiresApiKey).toBe(false);
    expect(state.project.brief.domain).toBe('restaurant operations');
    expect(state.project.directions).toHaveLength(3);

    const approved = approveDirection(state, 'direction-field-notes');
    expect(approved.project.directions.find((direction) => direction.id === 'direction-field-notes')?.status).toBe('approved');
    expect(approved.project.directions.filter((direction) => direction.status === 'approved')).toHaveLength(1);
  });
});
