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
});
