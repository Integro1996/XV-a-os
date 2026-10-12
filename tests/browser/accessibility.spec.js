import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('invitation and lightbox have no detected WCAG A/AA violations', async ({ page }) => {
  await page.goto('/');
  for (const id of ['cuenta-regresiva', 'galeria', 'video', 'menu', 'evento', 'vestimenta', 'rsvp']) await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  await page.waitForTimeout(1600);
  let result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(result.violations).toEqual([]);
  await page.getByRole('button', { name: 'Abrir foto 1:', exact: false }).click();
  await page.waitForTimeout(400);
  result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(result.violations).toEqual([]);
});
