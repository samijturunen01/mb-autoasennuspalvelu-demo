import { expect, test } from '@playwright/test'
import { introState, openNav, ready, url } from './helpers'

const carClip = (page: import('@playwright/test').Page) =>
  page.evaluate(() => getComputedStyle(document.querySelector('.hero-car')!).clipPath)

test('signature intro plays on a full homepage load – copy and CTA are readable immediately', async ({ page }) => {
  await page.goto(url(), { waitUntil: 'commit' })
  await page.waitForSelector('h1')
  // The value proposition and the primary CTA are there before the app even boots.
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.getByRole('link', { name: /Varaa huoltoaika/ }).first()).toBeVisible()
  await ready(page)
  // The scan is mid-way: the drawing is only partly inked.
  await expect.poll(() => introState(page)).toBe('playing')
  expect(await carClip(page)).toMatch(/^inset/)
  // … and it completes: drawing fully inked, headlamps on, callouts visible.
  await expect.poll(() => introState(page), { timeout: 6000 }).toBe('done')
  expect(await carClip(page)).toBe('none')
  expect(await page.evaluate(() => getComputedStyle(document.querySelector('.hero-glow')!).opacity)).toBe('1')
  await expect(page.locator('.hero-balloon a').first()).toBeVisible()
})

test('intro plays again after a browser refresh (no storage suppression)', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  await expect.poll(() => introState(page), { timeout: 6000 }).toBe('done')
  await page.reload()
  await ready(page)
  await expect.poll(() => introState(page)).toBe('playing')
  const storage = await page.evaluate(() => localStorage.length + sessionStorage.length + document.cookie.length)
  expect(storage).toBe(0)
})

test('intro does not replay when returning home through the menu', async ({ page }) => {
  await page.goto(url('yritys/'))
  await ready(page)
  const nav = await openNav(page)
  await nav.getByRole('link', { name: /Etusivu/ }).click()
  await expect(page).toHaveURL(/mb-autoasennuspalvelu-demo\/?$/)
  await expect.poll(() => introState(page)).toBe('skipped')
  expect(await carClip(page)).toBe('none')
  expect(await page.evaluate(() => getComputedStyle(document.querySelector('.hero-balloon')!).opacity)).toBe('1')
})

test('intro does not replay on browser back to the homepage', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  await expect.poll(() => introState(page), { timeout: 6000 }).toBe('done')
  const nav = await openNav(page)
  await nav.getByRole('link', { name: /Palvelut/ }).click()
  await expect(page).toHaveURL(/palvelut\/?$/)
  await page.goBack()
  // "skipped" (SPA back) or "done" (restored from the back/forward cache) – never a replay.
  await expect.poll(() => introState(page)).toMatch(/^(skipped|done)$/)
  expect(await carClip(page)).toBe('none')
})

test('the hero stage does not shift layout while the intro runs', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const before = await page.locator('.hero-stage').boundingBox()
  const h1Before = await page.locator('h1').boundingBox()
  await expect.poll(() => introState(page), { timeout: 6000 }).toBe('done')
  const after = await page.locator('.hero-stage').boundingBox()
  const h1After = await page.locator('h1').boundingBox()
  expect(Math.abs((before?.y ?? 0) - (after?.y ?? 0))).toBeLessThan(1)
  expect(Math.abs((before?.height ?? 0) - (after?.height ?? 0))).toBeLessThan(1)
  expect(Math.abs((h1Before?.y ?? 0) - (h1After?.y ?? 0))).toBeLessThan(1)
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })
  test('no intro and all content immediately in its final state', async ({ page }) => {
    await page.goto(url())
    expect(await page.evaluate(() => document.documentElement.classList.contains('intro-pending'))).toBe(false)
    await ready(page)
    await expect.poll(() => introState(page)).toBe('skipped')
    expect(await carClip(page)).toBe('none')
    await expect(page.locator('h1')).toBeVisible()
    const reveal = await page.evaluate(() => getComputedStyle(document.querySelector('[data-reveal]')!).opacity)
    expect(reveal).toBe('1')
  })
})
