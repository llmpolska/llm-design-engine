import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const root = process.cwd();
const entry = join(root, 'packages', 'cli', 'dist', 'bin.js');
if (!existsSync(entry)) {
  const build = spawnSync('pnpm', ['--filter', '@llm-design-engine/cli', 'build'], {
    cwd: root,
    stdio: 'inherit',
  });
  if (build.status !== 0) process.exit(build.status ?? 1);
}
const result = spawnSync(process.execPath, [entry, ...process.argv.slice(2)], {
  cwd: root,
  stdio: 'inherit',
});
process.exit(result.status ?? 1);
