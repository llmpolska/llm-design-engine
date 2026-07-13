import { test, expect } from '@playwright/test';

test('website shows meaning-to-specification story and brand route', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173');
  await expect(page.getByRole('heading', { name: /Turn a rough brief/i })).toBeVisible();
  await page.getByRole('tab', { name: /03 \/ document/i }).click();
  await expect(page.getByRole('tabpanel')).toContainText('A spec an agent can actually build');
  await page.getByRole('button', { name: /View brandkit/i }).click();
  await expect(page.locator('#brandkit')).toBeVisible();
  await page.goto('http://127.0.0.1:4173/#brand');
  await expect(
    page.getByRole('heading', { name: /A system that makes decisions visible/i }),
  ).toBeVisible();
});

test('website distinguishes reproducible Studio evidence from conceptual artwork', async ({
  page,
}) => {
  await page.goto('http://127.0.0.1:4173/#evidence');
  await expect(page.getByRole('heading', { name: /The workflow, not a mockup/i })).toBeVisible();
  await expect(page.getByText(/actual local Studio captures/i)).toBeVisible();
  const frames = page.locator('.evidence-frame');
  await expect(frames).toHaveCount(6);
  await expect(frames.locator('img')).toHaveCount(6);
  await expect
    .poll(() =>
      frames
        .locator('img')
        .evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0)),
    )
    .toBe(true);
});

test('studio reaches all views and remains usable on mobile', async ({ browser }) => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://127.0.0.1:4174');
  await expect(page.getByRole('heading', { name: 'Project overview' })).toBeVisible();
  await page.getByRole('button', { name: /Brief editor/i }).click();
  await expect(page.locator('section[aria-labelledby="brief-title"] h2')).toBeVisible();
  await page.getByRole('button', { name: /Anti-slop report/i }).click();
  await expect(page.locator('section[aria-labelledby="lint-title"] h2')).toBeVisible();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);
  await page.close();
});
