import { expect, test } from '@playwright/test'
import { EMAIL, isMobile, PHONE, PHONE_JP, ready, url } from './helpers'

test.describe('booking form (demo mode)', () => {
  test('validates required fields, keeps input and links errors to fields', async ({ page }) => {
    await page.goto(url('yhteystiedot/'))
    await ready(page)
    const form = page.locator('form').filter({ hasText: 'Huoltoaikapyyntö' })
    await form.getByLabel('Malli').fill('E 220 d')
    await form.getByRole('button', { name: /Lähetä huoltoaikapyyntö/ }).click()
    const summary = form.getByRole('alert')
    await expect(summary).toBeVisible()
    await expect(summary).toBeFocused()
    await expect(summary).toContainText('Valitse vähintään yksi aihe')
    await expect(summary).toContainText('Kirjoita nimesi')
    await expect(summary).toContainText('puhelinnumero')
    // input is preserved
    await expect(form.getByLabel('Malli')).toHaveValue('E 220 d')
    // error link moves focus to the field
    await summary.getByRole('link', { name: /Kirjoita nimesi/ }).click()
    await expect(form.getByLabel(/^Nimi/)).toBeFocused()
    await expect(form.getByLabel(/^Nimi/)).toHaveAttribute('aria-invalid', 'true')
  })

  test('formats the registration plate and validates email/phone format', async ({ page }) => {
    await page.goto(url('yhteystiedot/'))
    await ready(page)
    const plate = page.getByLabel('Rekisterinumero')
    await plate.pressSequentially('abc123')
    await expect(plate).toHaveValue('ABC-123')
    await page.getByLabel(/^Puhelin/).fill('12')
    await page.getByLabel('Sähköposti').fill('ei-sahkoposti')
    await page.getByRole('button', { name: /Lähetä huoltoaikapyyntö/ }).click()
    await expect(page.getByRole('alert')).toContainText('Tarkista puhelinnumero')
    await expect(page.getByRole('alert')).toContainText('Tarkista sähköpostiosoite')
  })

  test('demo submit shows the demo message and sends nothing anywhere', async ({ page }) => {
    const external: string[] = []
    page.on('request', (r) => {
      const u = new URL(r.url())
      if (u.hostname !== '127.0.0.1' && u.hostname !== 'samijturunen01.github.io') external.push(r.url())
      if (r.method() === 'POST') external.push(`POST ${r.url()}`)
    })
    await page.goto(url('yhteystiedot/?aihe=huolto,jarrut'))
    await ready(page)
    await expect(page.getByRole('checkbox', { name: 'Määräaikaishuolto (A / B)' })).toBeChecked()
    await expect(page.getByRole('checkbox', { name: 'Jarrut' })).toBeChecked()
    await page.getByLabel('Rekisterinumero').fill('XYZ-987')
    await page.getByLabel(/^Nimi/).fill('Testi Asiakas')
    await page.getByLabel(/^Puhelin/).fill('040 123 4567')
    await page.getByText('Ensi viikolla').click()
    await page.getByRole('button', { name: /Lähetä huoltoaikapyyntö/ }).click()
    const done = page.getByRole('status')
    await expect(done).toContainText('Demoversio – viestiä ei lähetetty.')
    await expect(done).toBeFocused()
    expect(external).toEqual([])
    expect(await page.evaluate(() => localStorage.length + sessionStorage.length + document.cookie.length)).toBe(0)
    await done.getByRole('button', { name: 'Täytä uusi pyyntö' }).click()
    await expect(page.getByLabel(/^Nimi/)).toHaveValue('')
  })

  test('company field appears only for business customers and is then required', async ({ page }) => {
    await page.goto(url('yhteystiedot/'))
    await ready(page)
    await expect(page.getByLabel(/^Yritys/)).toHaveCount(0)
    await page.getByLabel('Asioin yrityksen puolesta').check()
    await expect(page.getByLabel(/^Yritys/)).toBeVisible()
    await page.getByRole('button', { name: /Lähetä huoltoaikapyyntö/ }).click()
    await expect(page.getByRole('alert')).toContainText('Kirjoita yrityksen nimi')
  })
})

test('Google map loads only on request and points to the verified address', async ({ page }) => {
  await page.goto(url('yhteystiedot/'))
  await ready(page)
  await expect(page.locator('iframe')).toHaveCount(0)
  await page.getByRole('button', { name: 'Näytä kartta' }).click()
  const frame = page.locator('iframe[title^="Kartta"]')
  await expect(frame).toHaveAttribute('src', /maps\.google\.com\/maps\?q=.*Kuurnankatu%2028%2C%2080130%20Joensuu.*output=embed/)
  await expect(page.getByRole('link', { name: /Katso reittiohjeet/ })).toHaveAttribute(
    'href',
    /google\.com\/maps\/dir\/\?api=1&destination=Kuurnankatu%2028%2C%2080130%20Joensuu/,
  )
  await expect(page.getByRole('link', { name: /Avaa Google Mapsissa/ })).toHaveAttribute('target', '_blank')
})

test('phone and email links use the verified numbers', async ({ page }) => {
  await page.goto(url('yhteystiedot/'))
  await ready(page)
  const main = page.locator('main')
  await expect(main.locator(`a[href="${PHONE}"]`).first()).toBeVisible()
  await expect(main.locator(`a[href="${PHONE_JP}"]`).first()).toBeVisible()
  await expect(main.locator(`a[href="${EMAIL}"]`).first()).toBeVisible()
  const hrefs = await page.locator('a[href^="tel:"]').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')))])
  expect(hrefs.sort()).toEqual([PHONE, PHONE_JP].sort())
})

test('hero callouts link to the matching service sections', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  await page.locator('.hero-balloon').filter({ hasText: '03' }).getByRole('link').click()
  await expect(page).toHaveURL(/palvelut\/vianhaku-ja-korjaukset\/?#jarrut$/)
  await expect
    .poll(() => page.evaluate(() => Math.round(document.getElementById('jarrut')!.getBoundingClientRect().top)))
    .toBeLessThan(160)
})

test('service plate follows hover and every row is a real link', async ({ page }) => {
  test.skip(isMobile(page), 'hover preview is desktop only')
  await page.goto(url())
  await ready(page)
  const plate = page.locator('section[aria-labelledby="plate-title"]')
  await plate.getByRole('link', { name: /Pakettiautot/ }).hover()
  await expect(plate.locator('p.display').last()).toHaveText('Pakettiautot')
  await plate.getByRole('link', { name: /Sähkö- ja hybridiautot/ }).click()
  await expect(page).toHaveURL(/palvelut\/sahko-ja-hybridiautot\/?$/)
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
})

test('FAQ answers open and close', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const q = page.locator('details').filter({ hasText: 'valtuutettu merkkikorjaamo' })
  await q.locator('summary').click()
  await expect(q.getByText('itsenäinen, Mercedes-Benz-autoihin erikoistunut korjaamo')).toBeVisible()
  await q.locator('summary').click()
  await expect(q.getByText('itsenäinen, Mercedes-Benz-autoihin erikoistunut korjaamo')).toBeHidden()
})

test('no tracking scripts, pixels or cookies are active', async ({ page }) => {
  const hosts = new Set<string>()
  page.on('request', (r) => hosts.add(new URL(r.url()).hostname))
  for (const p of ['', 'palvelut/', 'yhteystiedot/']) {
    await page.goto(url(p))
    await ready(page)
  }
  expect([...hosts].filter((h) => /google-analytics|googletagmanager|facebook|doubleclick|hotjar|clarity/.test(h))).toEqual([])
  expect((await page.context().cookies()).length).toBe(0)
})
