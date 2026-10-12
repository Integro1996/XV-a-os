import { test, expect } from '@playwright/test';

test('all invitation sections and local assets render without overflow or runtime errors', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Regina', exact: true })).toBeVisible();
  await expect.poll(() => page.locator('.hero-photo').evaluate(el => el.naturalWidth)).toBeGreaterThan(0);
  for (const id of ['galeria', 'video', 'menu', 'evento', 'vestimenta', 'rsvp']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await expect(page.locator(`#${id} h2`)).toBeVisible();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('fullscreen gallery supports next, previous, zoom, keyboard, and focus restoration', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Abrir foto 1:', exact: false });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('.lightbox-bottom > span')).toHaveText('1 / 4');
  await page.getByRole('button', { name: 'Foto siguiente' }).click();
  await expect(dialog.locator('.lightbox-bottom > span')).toHaveText('2 / 4');
  await page.keyboard.press('ArrowLeft');
  await expect(dialog.locator('.lightbox-bottom > span')).toHaveText('1 / 4');
  await page.getByRole('button', { name: 'Ampliar foto' }).click();
  await expect(dialog.locator('.lightbox-image-area')).toHaveClass(/zoomed/);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
});

test('touch gallery navigation wraps and closing by button works', async ({ page }) => {
  await page.goto('/'); await page.getByRole('button', { name: 'Abrir foto 1:', exact: false }).click();
  const area = page.locator('.lightbox-image-area');
  await area.evaluate(el => {
    const start = new Touch({ identifier: 0, target: el, clientX: 250, clientY: 200 });
    const end = new Touch({ identifier: 0, target: el, clientX: 120, clientY: 202 });
    el.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [start], changedTouches: [start] }));
    el.dispatchEvent(new TouchEvent('touchend', { bubbles: true, touches: [], changedTouches: [end] }));
  });
  await expect(page.locator('.lightbox-bottom > span')).toHaveText('2 / 4');
  await page.getByRole('button', { name: 'Cerrar', exact: true }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('RSVP validates inputs, sends confirmations, and allows editing', async ({ page }) => {
  const requests = [];
  await page.route('**/api/rsvp', async route => { requests.push(route.request().postDataJSON()); await route.fulfill({ status: 201, json: { id: '12345678-1234-1234-1234-123456789abc', editToken: '87654321-1234-1234-1234-123456789abc' } }); });
  await page.goto('/');
  await page.getByRole('button', { name: 'Confirmar mi respuesta' }).click();
  await expect(page.getByText('Escribe tu nombre completo (al menos 3 caracteres).')).toBeVisible();
  await expect(page.getByText('Selecciona si podrás acompañarnos.')).toBeVisible();
  await page.getByLabel('Nombre completo').fill('María López');
  await page.getByLabel('¡Sí, ahí estaré!').check();
  await page.getByLabel('Número de acompañantes').selectOption('2');
  await page.getByLabel('Restricciones alimenticias').fill('Sin nueces');
  await page.getByRole('button', { name: 'Confirmar mi respuesta' }).click();
  await expect(page.getByRole('status')).toContainText('¡Gracias por tu respuesta!');
  const response = requests[0];
  expect(response.name).toBe('María López'); expect(response.guests).toBe(2); expect(response.dietary).toBe('Sin nueces');
  await page.getByRole('button', { name: 'Editar mi respuesta' }).click();
  await page.getByLabel('No podré asistir').check();
  await expect(page.getByLabel('Número de acompañantes')).toHaveCount(0);
  await page.getByRole('button', { name: 'Confirmar mi respuesta' }).click();
  await expect(page.getByRole('status')).toContainText('¡Gracias por tu respuesta!');
  expect(requests[1].guests).toBe(0);
  expect(requests[1].id).toBe('12345678-1234-1234-1234-123456789abc');
});

test('video loads actual media and calendar contains the correct timezone conversion', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /^Reproducir:/ }).click();
  const video = page.locator('dialog video');
  await expect(video).toBeVisible();
  await expect.poll(() => video.evaluate(el => el.readyState)).toBeGreaterThanOrEqual(2);
  expect(await video.evaluate(el => el.duration)).toBeGreaterThan(0);
  await page.keyboard.press('Escape');
  const [download] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Agregar a mi calendario' }).click()]);
  expect(download.suggestedFilename()).toBe('regina-mis-xv.ics');
  const stream = await download.createReadStream(); const parts = []; for await (const part of stream) parts.push(part);
  expect(Buffer.concat(parts).toString()).toContain('DTSTART:20261220T000000Z');
});

test('mobile menu links navigate and close', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile');
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir menú' }).click();
  const nav = page.getByRole('navigation', { name: 'Navegación móvil' });
  await expect(nav).toBeVisible();
  await nav.getByRole('link', { name: /Galería/ }).click();
  await expect(nav).not.toBeVisible();
  await expect(page).toHaveURL(/#galeria$/);
});
