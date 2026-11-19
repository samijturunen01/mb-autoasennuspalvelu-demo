import type { Page } from '@playwright/test'

export const BASE = '/mb-autoasennuspalvelu-demo/'
export const url = (p = '') => `${BASE}${p}`

export const routes = [
  { path: '', h1: /Mercedes-Benzin huolto ja korjaus Joensuussa/ },
  { path: 'palvelut/', h1: /Mercedes-Benzin huollot ja korjaukset/ },
  { path: 'palvelut/maaraaikaishuolto/', h1: /määräaikaishuolto Joensuussa/ },
  { path: 'palvelut/vianhaku-ja-korjaukset/', h1: /Vianhaku ja korjaukset/ },
  { path: 'palvelut/lammittimet-ja-asennukset/', h1: /Lämmittimet, vetokoukut ja lisävarusteet/ },
  { path: 'palvelut/sahko-ja-hybridiautot/', h1: /Sähkö- ja hybridi-Mercedesten huolto/ },
  { path: 'pakettiautot/', h1: /pakettiautojen huolto ja korjaus/ },
  { path: 'yritys/', h1: /Mercedes-Benz-erikoiskorjaamo Kuurnankadulla/ },
  { path: 'yhteystiedot/', h1: /Varaa aika Mersullesi/ },
]

export const navLabels = ['Etusivu', 'Palvelut', 'Pakettiautot', 'Yritys', 'Yhteystiedot']

export const PHONE = 'tel:+358102064590'
export const PHONE_JP = 'tel:+358102064591'
export const EMAIL = 'mailto:mb@autoasennuspalvelu.com'

export const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 1024

/** Wait until the app has hydrated. */
export const ready = (page: Page) => page.waitForFunction(() => (window as unknown as { __mbReady?: boolean }).__mbReady === true)

export async function openNav(page: Page) {
  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Valikko' }).click()
    return page.getByRole('navigation', { name: 'Mobiilivalikko' })
  }
  return page.getByRole('navigation', { name: 'Päävalikko' })
}

export const introState = (page: Page) => page.locator('.hero-stage').getAttribute('data-intro')
