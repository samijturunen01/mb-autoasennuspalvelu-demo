/**
 * Vectorises the authentic MB-Autoasennuspalvelu logo (raster from the company's
 * KL-ServicePartner listing, see docs/ASSET_PROVENANCE.md) into layered SVG so the
 * site can use – and animate – the real artwork instead of an invented substitute.
 *
 * Layers (original geometry, traced with potrace at 2× for smooth curves):
 *   car      – line drawing of the W124 sedan
 *   wordFill – white letter bodies of "MB-AUTOASENNUSPALVELU" (letter counters stay open)
 *   wordInk  – grey letter outlines
 *   rule     – horizontal rule
 *   tagline  – "Mercedes-Benz ajoneuvojen erikoisliike"
 *
 * Usage: node scripts/trace-logo.mjs
 * Output: src/components/brand/logoPaths.ts, public/brand/logo.svg, public/brand/logo-wordmark.svg
 */
import sharp from 'sharp'
import potrace from 'potrace'
import fs from 'node:fs/promises'

const SRC = 'source-assets/logo-original-kl-servicepartner.jpg'
const S = 2 // upscale factor
const INK_T = 172

const meta = await sharp(SRC).metadata()
const W = meta.width * S
const H = meta.height * S
const grey = await sharp(SRC).greyscale().resize(W, H, { kernel: 'lanczos3' }).raw().toBuffer()
const N = W * H
const ink = new Uint8Array(N)
for (let i = 0; i < N; i++) ink[i] = grey[i] < INK_T ? 1 : 0

// ---- Connected components (4-neighbour) -------------------------------------------------
function label(mask) {
  const lab = new Int32Array(N).fill(-1)
  const comps = []
  const stack = new Int32Array(N)
  for (let p = 0; p < N; p++) {
    if (!mask[p] || lab[p] >= 0) continue
    const id = comps.length
    let sp = 0
    stack[sp++] = p
    lab[p] = id
    let n = 0, x0 = W, y0 = H, x1 = 0, y1 = 0
    while (sp) {
      const q = stack[--sp]
      n++
      const x = q % W, y = (q / W) | 0
      if (x < x0) x0 = x
      if (x > x1) x1 = x
      if (y < y0) y0 = y
      if (y > y1) y1 = y
      if (x > 0 && mask[q - 1] && lab[q - 1] < 0) { lab[q - 1] = id; stack[sp++] = q - 1 }
      if (x < W - 1 && mask[q + 1] && lab[q + 1] < 0) { lab[q + 1] = id; stack[sp++] = q + 1 }
      if (y > 0 && mask[q - W] && lab[q - W] < 0) { lab[q - W] = id; stack[sp++] = q - W }
      if (y < H - 1 && mask[q + W] && lab[q + W] < 0) { lab[q + W] = id; stack[sp++] = q + W }
    }
    comps.push({ id, n, x0, y0, x1, y1 })
  }
  return { lab, comps }
}

// Regions in original (1×) pixel space, measured with scripts/dev/analyze-logo.mjs
const R = (v) => v * S
const isCar = (c) => c.x0 >= R(740) && c.y1 <= R(612)
const isWord = (c) => c.y0 >= R(512) && c.y1 <= R(772) && !isCar(c)
const isRule = (c) => c.y0 >= R(780) && c.y1 <= R(805) && c.x1 - c.x0 > R(1000)
const isTag = (c) => c.y0 >= R(803) && c.y1 <= R(870)

const inkL = label(ink)
const groups = { car: new Uint8Array(N), wordInk: new Uint8Array(N), rule: new Uint8Array(N), tagline: new Uint8Array(N) }
const pick = {}
for (const c of inkL.comps) {
  const g = isRule(c) ? 'rule' : isTag(c) ? 'tagline' : isCar(c) ? 'car' : isWord(c) ? 'wordInk' : null
  pick[c.id] = g
}
for (let p = 0; p < N; p++) {
  const id = inkL.lab[p]
  if (id >= 0 && pick[id]) groups[pick[id]][p] = 1
}

// ---- Letter bodies: enclosed non-ink regions next to the outside background ----------------
// Flood the background from the image border through non-ink pixels.
const bg = new Uint8Array(N)
{
  const stack = new Int32Array(N)
  let sp = 0
  const push = (q) => { if (!ink[q] && !bg[q]) { bg[q] = 1; stack[sp++] = q } }
  for (let x = 0; x < W; x++) { push(x); push((H - 1) * W + x) }
  for (let y = 0; y < H; y++) { push(y * W); push(y * W + W - 1) }
  while (sp) {
    const q = stack[--sp]
    const x = q % W, y = (q / W) | 0
    if (x > 0) push(q - 1)
    if (x < W - 1) push(q + 1)
    if (y > 0) push(q - W)
    if (y < H - 1) push(q + W)
  }
}
// Distance (BFS, 4-neighbour) from the background, capped – a letter body sits one outline
// width (~12 px at 1×) from the outside; a counter sits behind outline + stem + outline.
const CAP = 22 * S
const dist = new Uint16Array(N).fill(65535)
{
  let frontier = []
  for (let p = 0; p < N; p++) if (bg[p]) { dist[p] = 0; frontier.push(p) }
  for (let d = 1; d <= CAP && frontier.length; d++) {
    const next = []
    for (const q of frontier) {
      const x = q % W
      for (const r of [x > 0 ? q - 1 : -1, x < W - 1 ? q + 1 : -1, q - W, q + W]) {
        if (r < 0 || r >= N || dist[r] !== 65535) continue
        dist[r] = d
        next.push(r)
      }
    }
    frontier = next
  }
}
const enclosed = new Uint8Array(N)
for (let p = 0; p < N; p++) enclosed[p] = !ink[p] && !bg[p] ? 1 : 0
const encL = label(enclosed)
const bodyIds = new Set()
for (const c of encL.comps) {
  if (!isWord(c) || c.n < 30) continue
  bodyIds.add(c.id)
}
// A component is a body if any of its pixels lies within CAP of the background.
const touches = new Set()
for (let p = 0; p < N; p++) {
  const id = encL.lab[p]
  if (id >= 0 && bodyIds.has(id) && dist[p] <= CAP) touches.add(id)
}
const body = new Uint8Array(N)
for (let p = 0; p < N; p++) if (touches.has(encL.lab[p])) body[p] = 1
// Grow bodies a little under the outline so no hairline gap shows between the two layers.
let wordFill = body
for (let i = 0; i < 3 * S; i++) {
  const g = new Uint8Array(wordFill)
  for (let p = W; p < N - W; p++) {
    if (wordFill[p] || !groups.wordInk[p]) continue
    if (wordFill[p - 1] || wordFill[p + 1] || wordFill[p - W] || wordFill[p + W]) g[p] = 1
  }
  wordFill = g
}
console.log(`word bodies: ${touches.size}, counters kept open: ${[...bodyIds].filter((id) => !touches.has(id)).length}`)

// ---- Colours (median of core pixels per layer, from the original RGB) ----------------------
const rgb = await sharp(SRC).removeAlpha().resize(W, H, { kernel: 'lanczos3' }).raw().toBuffer()
function colour(mask) {
  // Core (darkest third) pixels of the layer – anti-aliased edges would lighten the colour.
  const g = []
  for (let p = 0; p < N; p++) if (mask[p]) g.push(grey[p])
  g.sort((a, b) => a - b)
  const maxGrey = g[Math.floor(g.length / 3)] + 1
  const rs = [], gs = [], bs = []
  for (let p = 0; p < N; p++) if (mask[p] && grey[p] < maxGrey) { rs.push(rgb[p * 3]); gs.push(rgb[p * 3 + 1]); bs.push(rgb[p * 3 + 2]) }
  const med = (a) => a.sort((x, y) => x - y)[a.length >> 1]
  const hex = (v) => v.toString(16).padStart(2, '0')
  return `#${hex(med(rs))}${hex(med(gs))}${hex(med(bs))}`
}
const colours = {
  car: colour(groups.car),
  wordInk: colour(groups.wordInk),
  rule: colour(groups.rule),
  tagline: colour(groups.tagline),
}
console.log('colours', colours)

// ---- Trace -------------------------------------------------------------------------------
const pad = 8 * S
function bbox(mask) {
  let x0 = W, y0 = H, x1 = 0, y1 = 0
  for (let p = 0; p < N; p++) if (mask[p]) { const x = p % W, y = (p / W) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y }
  return { x0, y0, x1, y1 }
}
const all = new Uint8Array(N)
for (const m of [groups.car, groups.wordInk, groups.rule, groups.tagline, wordFill]) for (let p = 0; p < N; p++) if (m[p]) all[p] = 1
const box = bbox(all)
const vb = { x: box.x0 - pad, y: box.y0 - pad, w: box.x1 - box.x0 + 1 + 2 * pad, h: box.y1 - box.y0 + 1 + 2 * pad }

async function trace(mask) {
  // Crop to the viewBox so path coordinates are relative to it.
  const buf = Buffer.alloc(vb.w * vb.h, 255)
  for (let y = 0; y < vb.h; y++)
    for (let x = 0; x < vb.w; x++) {
      const sx = x + vb.x, sy = y + vb.y
      if (sx < 0 || sy < 0 || sx >= W || sy >= H) continue
      if (mask[sy * W + sx]) buf[y * vb.w + x] = 0
    }
  const png = await sharp(buf, { raw: { width: vb.w, height: vb.h, channels: 1 } }).png().toBuffer()
  const svg = await new Promise((res, rej) =>
    potrace.trace(png, { threshold: 128, turdSize: 6 * S, optTolerance: 0.35, alphaMax: 1, turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY }, (e, s) => (e ? rej(e) : res(s))),
  )
  const d = svg.match(/ d="([^"]+)"/)[1]
  // Round to 0.5 units of the 2× grid (= 0.25 px of the original) to keep the file small.
  return d
    .replace(/-?\d+\.\d+/g, (n) => String(Math.round(parseFloat(n) * 2) / 2))
    .replace(/, /g, ' ')
    .replace(/ ?([MCLZ]) ?/g, '$1')
}

const paths = {}
for (const [k, m] of Object.entries({ ...groups, wordFill })) paths[k] = await trace(m)

// Sub-boxes (in viewBox units) used for cropped variants and animation anchors.
const rel = (b) => ({ x: b.x0 - vb.x, y: b.y0 - vb.y, w: b.x1 - b.x0 + 1, h: b.y1 - b.y0 + 1 })
const wordBox = rel(bbox(groups.wordInk))
const carBox = rel(bbox(groups.car))
// "MB" ends where the only ink left in the column is the hyphen (topmost ink below y≈600 at 1×).
// The B's outline touches the hyphen's outline, so there is no empty column between them.
let mbEnd = null
for (let x = R(520); x < R(640); x++) {
  let top = Infinity
  for (let y = R(512); y < R(772); y++) if (groups.wordInk[y * W + x] || wordFill[y * W + x]) { top = y; break }
  if (top > R(600)) { mbEnd = x; break }
}
const mbBox = { x: wordBox.x, y: wordBox.y, w: (mbEnd ?? R(560)) - vb.x - wordBox.x, h: wordBox.h }
console.log({ vb, wordBox, carBox, mbBox, mbEnd })

const sizes = Object.fromEntries(Object.entries(paths).map(([k, v]) => [k, v.length]))
console.log('path sizes', sizes)

// Only the car drawing ships inline (the animated hero); every static logo use is a cached SVG file.
const ts = `/* Generated by scripts/trace-logo.mjs from the authentic logo – do not edit by hand.
   Render with fill-rule="evenodd". Full layer data: source-assets/logo-paths.json */
export const LOGO_VIEWBOX = { x: 0, y: 0, w: ${vb.w}, h: ${vb.h} } as const
export const LOGO_BOXES = ${JSON.stringify({ word: wordBox, car: carBox, mb: mbBox })} as const
export const LOGO_COLOURS = ${JSON.stringify(colours)} as const
export const CAR_D = ${JSON.stringify(paths.car)}
`
await fs.writeFile('src/components/brand/logoPaths.ts', ts)
await fs.writeFile(
  'source-assets/logo-paths.json',
  JSON.stringify({ viewBox: { x: 0, y: 0, w: vb.w, h: vb.h }, boxes: { word: wordBox, car: carBox, mb: mbBox }, colours, paths }),
)

const dark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vb.w} ${vb.h}" role="img" aria-label="MB-Autoasennuspalvelu – Mercedes-Benz ajoneuvojen erikoisliike">
  <path fill-rule="evenodd" fill="#c9ccd0" d="${paths.car}"/>
  <path fill-rule="evenodd" fill="#ffffff" d="${paths.wordFill}"/>
  <path fill-rule="evenodd" fill="${colours.wordInk}" d="${paths.wordInk}"/>
  <path fill-rule="evenodd" fill="#ffffff" fill-opacity="0.35" d="${paths.rule}"/>
  <path fill-rule="evenodd" fill="#c9ccd0" d="${paths.tagline}"/>
</svg>
`
await fs.writeFile('public/brand/logo-dark.svg', dark)
const cp = 10 * S
const carSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${carBox.x - cp} ${carBox.y - cp} ${carBox.w + 2 * cp} ${carBox.h + 2 * cp}" aria-hidden="true">
  <path fill-rule="evenodd" fill="#ffffff" d="${paths.car}"/>
</svg>
`
await fs.writeFile('public/brand/car-line.svg', carSvg)

const full = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vb.w} ${vb.h}" role="img" aria-label="MB-Autoasennuspalvelu – Mercedes-Benz ajoneuvojen erikoisliike">
  <path fill-rule="evenodd" fill="${colours.car}" d="${paths.car}"/>
  <path fill-rule="evenodd" fill="#ffffff" d="${paths.wordFill}"/>
  <path fill-rule="evenodd" fill="${colours.wordInk}" d="${paths.wordInk}"/>
  <path fill-rule="evenodd" fill="${colours.rule}" d="${paths.rule}"/>
  <path fill-rule="evenodd" fill="${colours.tagline}" d="${paths.tagline}"/>
</svg>
`
await fs.writeFile('public/brand/logo.svg', full)
const p2 = 6 * S
const wm = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${wordBox.x - p2} ${wordBox.y - p2} ${wordBox.w + 2 * p2} ${wordBox.h + 2 * p2}" role="img" aria-label="MB-Autoasennuspalvelu">
  <path fill-rule="evenodd" fill="#ffffff" d="${paths.wordFill}"/>
  <path fill-rule="evenodd" fill="${colours.wordInk}" d="${paths.wordInk}"/>
</svg>
`
await fs.writeFile('public/brand/logo-wordmark.svg', wm)
console.log('done')
