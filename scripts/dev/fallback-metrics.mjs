// Compares heading boxes with and without the web font (fallback calibration).
import { chromium } from '@playwright/test'
const [url] = process.argv.slice(2)
const browser = await chromium.launch()
const measure = async (block) => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  if (block) await page.route(/\.woff2?$/, (r) => r.abort())
  await page.goto(url, { waitUntil: 'load' })
  await page.waitForTimeout(400)
  const r = await page.evaluate(() =>
    ['h1', '#specialist-title', '#plate-title', '.lead'].map((s) => {
      const b = document.querySelector(s).getBoundingClientRect()
      return `${s}: ${Math.round(b.width)}×${Math.round(b.height)} @y${Math.round(b.y)}`
    }),
  )
  await page.close()
  return r
}
console.log('fallback:', await measure(true))
console.log('webfont: ', await measure(false))
await browser.close()
