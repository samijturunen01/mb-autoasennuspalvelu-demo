// Captures the homepage hero at several moments of the intro (visual QA of the signature animation).
import { chromium } from '@playwright/test'
const [url, outPrefix, w = '1440', h = '900'] = process.argv.slice(2)
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: +w, height: +h } })
await page.goto(url, { waitUntil: 'commit' })
await page.waitForFunction(() => window.__mbReady === true)
const t0 = Date.now()
for (const ms of [350, 750, 1250, 1700, 2400]) {
  const wait = ms - (Date.now() - t0)
  if (wait > 0) await page.waitForTimeout(wait)
  await page.screenshot({ path: `${outPrefix}-${ms}.png` })
}
await browser.close()
