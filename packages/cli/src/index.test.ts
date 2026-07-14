import { describe, expect, it } from 'vitest';
import { runCommand } from './index.js';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

describe('lde CLI workflow', () => {
  it('initializes a project and writes a brief without credentials', async () => {
    const cwd = await mkdtemp(join(tmpdir(), 'lde-'));
    const output: string[] = [];
    await runCommand(['init'], { cwd, output });
    await runCommand(
      [
        'brief',
        '--name',
        'GastroOps',
        '--summary',
        'Restaurant operations',
        '--domain',
        'restaurant operations',
        '--tension',
        'Keep service legible under pressure',
      ],
      { cwd, output },
    );
    const brief = await readFile(join(cwd, '.design', 'BRIEF.md'), 'utf8');
    expect(brief).toContain('GastroOps');
    expect(brief).toContain('restaurant operations');
    expect(output.join('\n')).toContain('Initialized');
  });

  it('runs directions, generate, lint, brandkit and export locally', async () => {
    const cwd = await mkdtemp(join(tmpdir(), 'lde-'));
    const output: string[] = [];
    await runCommand(['init'], { cwd, output });
    await runCommand(
      [
        'brief',
        '--name',
        'GastroOps',
        '--summary',
        'Restaurant operations',
        '--domain',
        'restaurant operations',
      ],
      { cwd, output },
    );
    await runCommand(['directions'], { cwd, output });
    await runCommand(['generate'], { cwd, output });
    await runCommand(['brandkit'], { cwd, output });
    await runCommand(['lint'], { cwd, output });
    await runCommand(['export'], { cwd, output });
    expect(await readFile(join(cwd, '.design', 'pages', 'landing.design.md'), 'utf8')).toContain(
      '# Narrative',
    );
    expect(await readFile(join(cwd, '.design', 'BRAND.md'), 'utf8')).toContain('Usage and misuse');
    expect(await readFile(join(cwd, '.design', 'EXPORT.md'), 'utf8')).toContain(
      'Agent implementation instructions',
    );
  });

  it('selects a creative direction by index before generation', async () => {
    const cwd = await mkdtemp(join(tmpdir(), 'lde-select-'));
    const output: string[] = [];
    await runCommand(['init'], { cwd, output });
    await runCommand(
      [
        'brief',
        '--name',
        'Field Notes',
        '--summary',
        'Field operations notes',
        '--domain',
        'field research',
      ],
      { cwd, output },
    );
    await runCommand(['directions'], { cwd, output });
    await expect(runCommand(['select'], { cwd, output: [] })).rejects.toThrow(/--direction/);
    await runCommand(['select', '--direction', '2'], { cwd, output });
    const directions = await readFile(join(cwd, '.design', 'DIRECTIONS.md'), 'utf8');
    const payloadText = directions.match(/<!-- lde-directions-data\n([\s\S]*?)\n-->/)?.[1];
    expect(payloadText).toBeTruthy();
    const payload: unknown = JSON.parse(payloadText ?? '{}');
    const listed =
      payload &&
      typeof payload === 'object' &&
      'directions' in payload &&
      Array.isArray(payload.directions)
        ? payload.directions
        : [];
    const statuses = listed.flatMap((direction: unknown) => {
      if (!direction || typeof direction !== 'object' || !('status' in direction)) return [];
      return [String(direction.status)];
    });
    expect(statuses.filter((status) => status === 'selected')).toHaveLength(1);
    expect(statuses.every((status) => status === 'selected' || status === 'candidate' || status === 'approved')).toBe(
      true,
    );
    expect(output.join('\n')).toContain('Selected direction');
  });
});
