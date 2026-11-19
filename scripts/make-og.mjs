/**
 * Generates brand raster assets from the vectorised authentic logo:
 *   public/images/og-mb-autoasennuspalvelu.jpg (1200×630 link preview)
 *   source-assets/favicon-mb.svg, public/favicon-32.png, public/apple-touch-icon.png, public/icon-192.png
 * Usage: node scripts/make-og.mjs (after scripts/trace-logo.mjs)
 */
import sharp from 'sharp'
import fs from 'node:fs/promises'

const L = JSON.parse(await fs.readFile('source-assets/logo-paths.json', 'utf8'))
const P = L.paths
const VB = L.viewBox
const B = L.boxes
const C = L.colours
const ev = 'fill-rule="evenodd"'

// ---------- OG image: graphite plate, grid, the logo drawing in silver + wordmark ----------
const W = 1200, H = 630
let grid = ''
for (let x = 0; x <= W; x += 40) grid += `<path d="M${x} 0V${H}" stroke="#ffffff" stroke-opacity="0.045"/>`
for (let y = 0; y <= H; y += 40) grid += `<path d="M0 ${y}H${W}" stroke="#ffffff" stroke-opacity="0.045"/>`
const logoW = 1000
const s = logoW / VB.w
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#0f1113"/>
  ${grid}
  <radialGradient id="g" cx="0.5" cy="0.45" r="0.5"><stop offset="0" stop-color="#f2b035" stop-opacity="0.16"/><stop offset="1" stop-color="#f2b035" stop-opacity="0"/></radialGradient>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <g transform="translate(${(W - logoW) / 2} 70) scale(${s})">
    <path ${ev} fill="#d7dade" d="${P.car}"/>
    <path ${ev} fill="#ffffff" d="${P.wordFill}"/>
    <path ${ev} fill="${C.wordInk}" d="${P.wordInk}"/>
    <path ${ev} fill="#ffffff" fill-opacity="0.35" d="${P.rule}"/>
    <path ${ev} fill="#c9ccd0" d="${P.tagline}"/>
  </g>
  <text x="${W / 2}" y="${H - 52}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" fill="#f2b035" letter-spacing="3">KUURNANKATU 28 · JOENSUU · 010 206 4590</text>
</svg>`
await fs.mkdir('public/images', { recursive: true })
await sharp(Buffer.from(og)).jpeg({ quality: 86, mozjpeg: true }).toFile('public/images/og-mb-autoasennuspalvelu.jpg')

// ---------- Favicon: the logo's outlined "MB" on graphite ----------
const mb = B.mb
const pad = 70
const side = Math.max(mb.w, mb.h) + pad * 2
const fx = mb.x - (side - mb.w) / 2
const fy = mb.y - (side - mb.h) / 2
const clip = `<clipPath id="c"><rect x="${mb.x - 20}" y="${mb.y - 20}" width="${mb.w + 20}" height="${mb.h + 40}"/></clipPath>`
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${fx} ${fy} ${side} ${side}">
  <defs>${clip}</defs>
  <rect x="${fx}" y="${fy}" width="${side}" height="${side}" rx="${side * 0.22}" fill="#15171a"/>
  <g clip-path="url(#c)">
    <path ${ev} fill="#ffffff" d="${P.wordFill}"/>
    <path ${ev} fill="${C.wordInk}" d="${P.wordInk}"/>
  </g>
  <rect x="${fx + side * 0.18}" y="${fy + side * 0.86}" width="${side * 0.64}" height="${side * 0.035}" rx="${side * 0.017}" fill="#f2b035"/>
</svg>`
await fs.writeFile('source-assets/favicon-mb.svg', favicon) // master artwork; the site ships the small PNGs
await sharp(Buffer.from(favicon)).resize(32, 32).png().toFile('public/favicon-32.png')
await sharp(Buffer.from(favicon)).resize(180, 180).png().toFile('public/apple-touch-icon.png')
await sharp(Buffer.from(favicon)).resize(192, 192).png().toFile('public/icon-192.png')
console.log('OG image and icons written', { mb })
