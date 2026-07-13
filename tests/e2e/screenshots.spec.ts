import { expect, test, type Page } from '@playwright/test';

async function compileGastroOps(page: Page) {
  await page.goto('http://127.0.0.1:4174');
  await page.getByRole('button', { name: /Brief editor/i }).click();
  await page.getByLabel('PROJECT NAME').fill('GastroOps');
  await page
    .getByLabel('ONE-LINE SUMMARY')
    .fill(
      'Operational system for restaurants covering tasks, food safety, inventory, documentation, staff operations, and synchronization status.',
    );
  await page.getByLabel('DOMAIN').fill('restaurant operations');
  await page
    .getByLabel('THE TENSION')
    .fill('Keep control during the pressure of service without hiding the next handoff.');
  await page.getByRole('button', { name: /Save and shape directions/i }).click();
  await expect(page.locator('section[aria-labelledby="directions-title"] h2')).toBeVisible();
}

test('Studio compiles GastroOps into inspectable direction and specification evidence', async ({
  page,
}) => {
  await compileGastroOps(page);

  await expect(page.getByRole('heading', { name: 'Product interpretation' })).toBeVisible();
  await expect(page.locator('.meaning-evidence li').first()).toBeVisible();

  await page
    .getByLabel('REFINE THIS DIRECTION')
    .fill('Make the handoff route more explicit on mobile.');
  await page.getByRole('button', { name: /Apply semantic refinement/i }).click();
  await expect(page.getByRole('heading', { name: 'Semantic patch log' })).toBeVisible();

  await page.getByRole('button', { name: /Design specification/i }).click();
  await expect(page.getByText(/Scene graph:/i)).toBeVisible();
  await page.getByRole('button', { name: /Open deterministic preview/i }).click();
  await expect(page.getByText('SCENE GRAPH', { exact: true })).toBeVisible();
});

test('Studio public workflow views render at desktop and mobile capture sizes', async ({
  browser,
}) => {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await compileGastroOps(desktop);
  await expect(desktop.locator('section[aria-labelledby="directions-title"] h2')).toBeVisible();
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await compileGastroOps(mobile);
  await mobile.getByRole('button', { name: /Deterministic preview/i }).click();
  await expect(mobile.locator('section[aria-labelledby="preview-title"] h2')).toBeVisible();
  expect(
    await mobile.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);
  await mobile.close();
});
