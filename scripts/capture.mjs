/**
 * Screenshot helper for visual QA. Usage:
 *   node scripts/capture.mjs <url> <out.png> [width] [height] [fullPage:0|1] [reducedMotion:0|1] [waitMs]
 */
import { chromium } from '@playwright/test'
const [url, out, w = '1440', h = '900', full = '1', rm = '0', wait = '1500'] = process.argv.slice(2)
const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: +w, height: +h },
  deviceScaleFactor: 1,
  reducedMotion: rm === '1' ? 'reduce' : 'no-preference',
})
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(+wait)
if (full === '1') {
  // Trigger scroll-based reveals before a full-page capture.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(600)
}
await page.screenshot({ path: out, fullPage: full === '1' })
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
console.log(JSON.stringify({ out, overflow, errors }))
await browser.close()
