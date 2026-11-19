// Lists layout-shift entries and the elements that moved (lab diagnostics).
import { chromium } from '@playwright/test'
const [url] = process.argv.slice(2)
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const cdp = await page.context().newCDPSession(page)
await cdp.send('Network.enable')
await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 })
await page.addInitScript(() => {
  window.__shifts = []
  new PerformanceObserver((l) => {
    for (const e of l.getEntries())
      window.__shifts.push({
        t: Math.round(e.startTime),
        v: Number(e.value.toFixed(4)),
        src: (e.sources || []).map((s) => {
          const n = s.node
          return n ? `${n.nodeName}.${(n.className && n.className.baseVal === undefined ? n.className : '').toString().slice(0, 60)} ${JSON.stringify(s.previousRect.toJSON?.() ?? {})}→${JSON.stringify(s.currentRect.toJSON?.() ?? {})}` : '?'
        }),
      })
  }).observe({ type: 'layout-shift', buffered: true })
})
await page.goto(url, { waitUntil: 'load' })
await page.waitForTimeout(3500)
console.log(JSON.stringify(await page.evaluate(() => window.__shifts), null, 1))
await browser.close()
