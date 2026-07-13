import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const root = process.cwd();
const entry = join(root, 'packages', 'mcp', 'dist', 'server.js');
if (!existsSync(entry)) {
  const build = spawnSync('pnpm', ['--filter', '@llm-design-engine/mcp', 'build'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'inherit'],
    encoding: 'utf8',
  });
  if (build.stdout) process.stderr.write(build.stdout);
  if (build.status !== 0) process.exit(build.status ?? 1);
}
const result = spawnSync(process.execPath, [entry, ...process.argv.slice(2)], {
  cwd: root,
  stdio: 'inherit',
});
process.exit(result.status ?? 1);
