import { expect, test } from '@playwright/test'
import { isMobile, navLabels, openNav, PHONE, ready, url } from './helpers'

test('"Etusivu" is the first navigation item and the active item is marked', async ({ page }) => {
  await page.goto(url('yritys/'))
  await ready(page)
  const nav = await openNav(page)
  const links = nav.getByRole('link')
  await expect(links.first()).toHaveText(/Etusivu/)
  for (const [i, label] of navLabels.entries()) await expect(links.nth(i)).toContainText(label)
  await expect(nav.getByRole('link', { name: /Yritys/ })).toHaveAttribute('aria-current', 'page')
})

test('"Palvelut" is active on individual service pages', async ({ page }) => {
  test.skip(isMobile(page), 'desktop nav')
  await page.goto(url('palvelut/sahko-ja-hybridiautot/'))
  await ready(page)
  await expect(page.getByRole('navigation', { name: 'Päävalikko' }).getByRole('link', { name: 'Palvelut' })).toHaveAttribute(
    'aria-current',
    'page',
  )
})

test('logo links to the homepage', async ({ page }) => {
  await page.goto(url('pakettiautot/'))
  await ready(page)
  await page.getByRole('link', { name: 'MB-Autoasennuspalvelu – etusivu' }).first().click()
  await expect(page).toHaveURL(/mb-autoasennuspalvelu-demo\/?$/)
  await expect(page.locator('h1')).toContainText('Mercedes-Benzin huolto')
})

test('navigation menu opens the destination page at the very top', async ({ page }) => {
  await page.goto(url('palvelut/maaraaikaishuolto/'))
  await ready(page)
  await page.evaluate(() => window.scrollTo(0, 1500))
  await page.waitForTimeout(150)
  const nav = await openNav(page)
  await nav.getByRole('link', { name: /Pakettiautot/ }).click()
  await expect(page).toHaveURL(/pakettiautot\/?$/)
  await expect(page.locator('h1')).toContainText('pakettiautojen')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})

test('booking CTA lands on the form section with the topic preselected', async ({ page }) => {
  await page.goto(url('palvelut/vianhaku-ja-korjaukset/'))
  await ready(page)
  await page.getByRole('link', { name: /Varaa vianhaku/ }).first().click()
  await expect(page).toHaveURL(/yhteystiedot\?aihe=vianhaku#huoltoaika$/)
  await expect
    .poll(() => page.evaluate(() => Math.round(document.getElementById('huoltoaika')?.getBoundingClientRect().top ?? 9999)), { timeout: 4000 })
    .toBeLessThan(160)
  await expect(page.getByRole('checkbox', { name: 'Vikavalo / vianhaku' })).toBeChecked()
})

test('back and forward restore the scroll position', async ({ page }) => {
  await page.goto(url('palvelut/maaraaikaishuolto/'))
  await ready(page)
  await page.evaluate(() => window.scrollTo(0, 1100))
  await page.waitForTimeout(250)
  // dispatchEvent = a plain user click without Playwright scrolling the sticky header into view
  await page.locator('footer a[href$="/yritys"]').first().dispatchEvent('click')
  await expect(page).toHaveURL(/yritys\/?$/)
  await page.goBack()
  await expect(page).toHaveURL(/maaraaikaishuolto\/$/)
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBe(1100)
  await page.goForward()
  await expect(page).toHaveURL(/yritys\/?$/)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})

test('anchor links land on their section', async ({ page }) => {
  await page.goto(url('palvelut/lammittimet-ja-asennukset/#lohkolammitin'))
  await ready(page)
  await expect
    .poll(() => page.evaluate(() => Math.round(document.getElementById('lohkolammitin')?.getBoundingClientRect().top ?? 9999)))
    .toBeLessThan(160)
})

test('direct deep links and refresh work on nested routes', async ({ page }) => {
  await page.goto(url('palvelut/sahko-ja-hybridiautot/'))
  await ready(page)
  await expect(page.locator('h1')).toContainText('hybridi')
  await page.reload()
  await ready(page)
  await expect(page.locator('h1')).toContainText('hybridi')
})

test('page transitions are immediate (no blocking overlay)', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const nav = await openNav(page)
  const t0 = Date.now()
  await nav.getByRole('link', { name: /Yhteystiedot/ }).click()
  await expect(page.locator('h1')).toContainText('Varaa aika')
  expect(Date.now() - t0).toBeLessThan(1500)
  const covered = await page.evaluate(() => {
    const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
    return !!el?.closest('[role="dialog"], [class*="fixed"][class*="inset-0"]')
  })
  expect(covered).toBe(false)
})

test('mobile menu opens, closes with Escape and navigates', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only')
  await page.goto(url())
  await ready(page)
  const toggle = page.getByRole('button', { name: 'Valikko' })
  await toggle.click()
  const menu = page.getByRole('navigation', { name: 'Mobiilivalikko' })
  await expect(menu).toBeVisible()
  await expect(menu.getByRole('link').first()).toContainText('Etusivu')
  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
  await expect(toggle).toBeFocused()
  // The close button stays visible and usable above the open menu (touch users).
  await toggle.click()
  const close = page.getByRole('button', { name: 'Sulje' })
  await expect(close).toBeVisible()
  await close.click()
  await expect(menu).toBeHidden()
  await toggle.click()
  await menu.getByRole('link', { name: /Palvelut/ }).first().click()
  await expect(page).toHaveURL(/palvelut\/?$/)
  await expect(menu).toBeHidden()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})

test('mobile action bar offers call and booking', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only')
  await page.goto(url('palvelut/'))
  await ready(page)
  const bar = page.locator('div.fixed.bottom-0')
  await expect(bar.getByRole('link', { name: /Soita/ })).toHaveAttribute('href', PHONE)
  await bar.getByRole('link', { name: /Varaa aika/ }).click()
  await expect(page).toHaveURL(/yhteystiedot\/?#huoltoaika$/)
})
