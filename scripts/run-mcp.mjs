import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const entry = join(root, 'packages', 'mcp', 'dist', 'server.js');

if (!existsSync(entry)) {
  const build = spawnSync(
    process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
    ['--filter', '@llm-design-engine/mcp', 'build'],
    {
      cwd: root,
      stdio: ['ignore', 'pipe', 'inherit'],
      encoding: 'utf8',
      shell: process.platform === 'win32',
    },
  );
  if (build.stdout) process.stderr.write(build.stdout);
  if (build.status !== 0) process.exit(build.status ?? 1);
}

const result = spawnSync(process.execPath, [entry, ...process.argv.slice(2)], {
  cwd: process.env.LDE_PROJECT_DIR || process.cwd(),
  env: process.env,
  stdio: 'inherit',
});
process.exit(result.status ?? 1);
