import { mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { chromium } from '@playwright/test';

const root = process.cwd();
const studioUrl = 'http://127.0.0.1:4174';
const outputDirectory = resolve(root, 'docs/assets/screenshots');
const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';

const gastroOps = {
  name: 'GastroOps',
  summary:
    'Operational system for restaurants covering tasks, food safety, inventory, documentation, staff operations, and synchronization status.',
  domain: 'restaurant operations',
  tension: 'Keep control during the pressure of service without hiding the next handoff.',
};

async function isStudioAvailable() {
  try {
    const response = await fetch(studioUrl);
    return response.ok;
  } catch {
    return false;
  }
}

async function waitForStudio() {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (await isStudioAvailable()) return;
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  }
  throw new Error(`Studio did not become available at ${studioUrl}`);
}

function startStudio() {
  return spawn(
    pnpm,
    ['--filter', '@llm-design-engine/studio', 'dev', '--', '--host', '127.0.0.1', '--port', '4174'],
    {
      cwd: root,
      stdio: 'ignore',
    },
  );
}

async function stopStudio(server) {
  if (!server || server.exitCode !== null) return;
  server.kill('SIGTERM');
  await new Promise((resolveExit) => server.once('exit', resolveExit));
}

async function compileGastroOps(page) {
  await page.goto(studioUrl, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Brief editor/i }).click();
  await page.getByLabel('PROJECT NAME').fill(gastroOps.name);
  await page.getByLabel('ONE-LINE SUMMARY').fill(gastroOps.summary);
  await page.getByLabel('DOMAIN').fill(gastroOps.domain);
  await page.getByLabel('THE TENSION').fill(gastroOps.tension);
  await page.getByRole('button', { name: /Save and shape directions/i }).click();
  await page.locator('section[aria-labelledby="directions-title"] h2').waitFor();
}

async function capture(page, filename) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: resolve(outputDirectory, filename),
    animations: 'disabled',
    caret: 'hide',
  });
  console.log(`Captured docs/assets/screenshots/${filename}`);
}

async function captureDesktop(browser) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(studioUrl, { waitUntil: 'networkidle' });
  await capture(page, 'studio-overview.png');

  await page.getByRole('button', { name: /Brief editor/i }).click();
  await capture(page, 'studio-brief.png');

  await compileGastroOps(page);
  await capture(page, 'studio-directions.png');

  await page.getByRole('button', { name: /Direction comparison/i }).click();
  await capture(page, 'studio-comparison.png');

  await page.getByRole('button', { name: /Design specification/i }).click();
  await capture(page, 'studio-specification.png');

  await page.getByRole('button', { name: /Open deterministic preview/i }).click();
  await capture(page, 'studio-preview-desktop.png');

  await page.getByRole('button', { name: /Brandkit/i }).click();
  await capture(page, 'studio-brandkit.png');

  await page.getByRole('button', { name: /Generated assets/i }).click();
  await capture(page, 'studio-assets.png');

  await page.getByRole('button', { name: /Anti-slop report/i }).click();
  await capture(page, 'studio-lint.png');

  await page.getByRole('button', { name: /^10 Export$/i }).click();
  await capture(page, 'studio-export.png');
  await page.close();
}

async function captureMobile(browser) {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await compileGastroOps(page);
  await page.getByRole('button', { name: /Deterministic preview/i }).click();
  await capture(page, 'studio-preview-mobile.png');
  await page.close();
}

await mkdir(outputDirectory, { recursive: true });
const startedStudio = !(await isStudioAvailable());
const server = startedStudio ? startStudio() : undefined;

try {
  await waitForStudio();
  const browser = await chromium.launch({ headless: true });
  try {
    await captureDesktop(browser);
    await captureMobile(browser);
  } finally {
    await browser.close();
  }
} finally {
  await stopStudio(server);
}
