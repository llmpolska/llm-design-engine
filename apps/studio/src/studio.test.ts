import { describe, expect, it } from 'vitest';
import {
  approveDirection,
  compileStudioProject,
  createStudioState,
  requiredViews,
  refineStudioProject,
  selectStudioDirection,
  setActiveView,
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
    expect(
      approved.project.directions.find((direction) => direction.id === 'direction-field-notes')
        ?.status,
    ).toBe('approved');
    expect(
      approved.project.directions.filter((direction) => direction.status === 'approved'),
    ).toHaveLength(1);
  });

  it('compiles the edited brief into meaning, directions, a scene-backed specification, and export', async () => {
    const state = createStudioState();
    state.project.brief.name = 'GastroOps';
    const compiled = await compileStudioProject(state);

    expect(compiled.interpretation?.evidence.length).toBeGreaterThanOrEqual(3);
    expect(compiled.project.directions).toHaveLength(4);
    expect(compiled.design?.sceneGraph?.regions.length).toBeGreaterThan(0);
    expect(compiled.operations.find((operation) => operation.id === 'meaning')?.status).toBe(
      'ready',
    );
    expect(compiled.operations.find((operation) => operation.id === 'preview')?.detail).toContain(
      'scene graph',
    );
    expect(compiled.project.exportMarkdown).toContain('# GastroOps');
    expect(compiled.project.exportMarkdown).toContain('## Scene graph');
  });

  it('rebuilds the design scene when a different direction is selected', async () => {
    const compiled = await compileStudioProject(createStudioState());
    const alternateId = compiled.project.directions[1]?.id;
    expect(alternateId).toBeTruthy();
    const selected = await selectStudioDirection(compiled, alternateId ?? '');

    expect(selected.project.selectedDirectionId).toBe(alternateId);
    expect(selected.design?.directionId).toBe(alternateId);
    expect(
      selected.project.directions.find((direction) => direction.id === alternateId)?.status,
    ).toBe('selected');
    expect(
      selected.project.directions.filter((direction) => direction.status === 'selected'),
    ).toHaveLength(1);
    expect(
      selected.operations.find((operation) => operation.id === 'specification')?.detail,
    ).toContain('selected direction');
  });

  it('records applied and no-op refinement states honestly', async () => {
    const compiled = await compileStudioProject(createStudioState());
    const noOp = await refineStudioProject(compiled, ' ');
    const refined = await refineStudioProject(
      compiled,
      'Make the first read calmer and more tactile.',
    );

    expect(noOp.refinementHistory.at(-1)?.status).toBe('no-op');
    expect(refined.refinementHistory.at(-1)?.status).toBe('applied');
    expect(refined.refinementHistory.at(-1)?.patchCount).toBeGreaterThan(0);
    expect(refined.project.directions[0]?.id).toBe(compiled.project.directions[0]?.id);
  });
});
