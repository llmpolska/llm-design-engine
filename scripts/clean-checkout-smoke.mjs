import { cp, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const source = process.cwd();
const destination = await mkdtemp(join(tmpdir(), 'lde-clean-checkout-'));

const excluded = new Set([
  '.git',
  'node_modules',
  '.turbo',
  'dist',
  'coverage',
  'playwright-report',
  'test-results',
]);
await cp(source, destination, {
  recursive: true,
  filter: (path) => {
    const relativePath = relative(source, path);
    const firstSegment = relativePath.split('/')[0];
    return !excluded.has(firstSegment) && !relativePath.endsWith('.tsbuildinfo');
  },
});

try {
  const commands = [
    ['pnpm', ['run', 'setup']],
    ['pnpm', ['typecheck']],
    ['pnpm', ['test']],
    ['pnpm', ['lde', '--help']],
  ];
  for (const [command, args] of commands) {
    process.stdout.write(`\n$ ${command} ${args.join(' ')}\n`);
    await run(command, args, { cwd: destination, stdio: 'inherit' });
  }
  process.stdout.write(`\nClean checkout smoke passed: ${destination}\n`);
} finally {
  await rm(destination, { recursive: true, force: true });
}
