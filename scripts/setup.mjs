import { execFile, spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const executeFile = promisify(execFile);

export function validateNodeVersion(version) {
  const match = /^v?(\d+)/.exec(version);
  const major = Number(match?.[1]);
  if (!Number.isInteger(major) || major < 22) {
    throw new Error(`LLM Design Engine requires Node.js 22 or newer; found ${version}.`);
  }
  return major;
}

export function validatePnpmVersion(version) {
  const match = /^(\d+)/.exec(version.trim());
  const major = Number(match?.[1]);
  if (!Number.isInteger(major) || major !== 10) {
    throw new Error(`LLM Design Engine requires pnpm 10; found ${version}.`);
  }
  return major;
}

export function setupCommands() {
  return [
    ['pnpm', ['install', '--frozen-lockfile']],
    ['pnpm', ['build']],
  ];
}

export function exitCodeFor(error) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'exitCode' in error &&
    typeof error.exitCode === 'number' &&
    error.exitCode > 0
  ) {
    return error.exitCode;
  }
  return 1;
}

function commandText(command, args) {
  return `$ ${[command, ...args].join(' ')}`;
}

function run(command, args, cwd) {
  process.stdout.write(`\n${commandText(command, args)}\n`);

  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: 'inherit' });
    child.once('error', reject);
    child.once('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      const failure = new Error(`${commandText(command, args)} exited with code ${code}.`);
      failure.exitCode = code ?? 1;
      reject(failure);
    });
  });
}

export async function main({ cwd = process.cwd() } = {}) {
  validateNodeVersion(process.version);
  const { stdout } = await executeFile('pnpm', ['--version'], { cwd });
  validatePnpmVersion(stdout);

  for (const [command, args] of setupCommands()) {
    await run(command, args, cwd);
  }

  process.stdout.write(`
Setup complete.

Studio:  pnpm --filter @llm-design-engine/studio dev
         http://127.0.0.1:4174
Website: pnpm --filter @llm-design-engine/website dev
         http://127.0.0.1:4173
CLI:     pnpm lde -- --help
Tests:   pnpm test
`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`${message}\n`);
    process.exitCode = exitCodeFor(error);
  });
}
