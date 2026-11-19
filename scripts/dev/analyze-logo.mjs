import sharp from 'sharp'
const src = process.argv[2]
const { data, info } = await sharp(src).greyscale().raw().toBuffer({ resolveWithObject: true })
const W = info.width, H = info.height
console.log('size', W, H, 'channels', info.channels)
// histogram
const hist = new Array(256).fill(0); for (const v of data) hist[v]++
const buckets = []; for (let i = 0; i < 256; i += 16) buckets.push(`${i}:${hist.slice(i, i + 16).reduce((a, b) => a + b, 0)}`)
console.log(buckets.join(' '))
// colour sample of darkest pixels (rgb)
const rgb = await sharp(src).removeAlpha().raw().toBuffer()
let sums = {}; for (let i = 0; i < W * H; i++) { const g = data[i]; const k = g < 70 ? 'lt70' : g < 110 ? '70-110' : g < 150 ? '110-150' : null; if (!k) continue; sums[k] ??= [0, 0, 0, 0]; sums[k][0] += rgb[i * 3]; sums[k][1] += rgb[i * 3 + 1]; sums[k][2] += rgb[i * 3 + 2]; sums[k][3]++ }
for (const [k, s] of Object.entries(sums)) console.log(k, s[3], s.slice(0, 3).map((v) => Math.round(v / s[3])))
// connected components of ink (<170)
const T = 170, lab = new Int32Array(W * H).fill(-1); const comps = []
const st = new Int32Array(W * H)
for (let p = 0; p < W * H; p++) {
  if (data[p] >= T || lab[p] >= 0) continue
  let sp = 0; st[sp++] = p; lab[p] = comps.length; let n = 0, x0 = W, y0 = H, x1 = 0, y1 = 0
  while (sp) { const q = st[--sp]; n++; const x = q % W, y = (q / W) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y
    for (const d of [-1, 1, -W, W]) { const r = q + d; if (r < 0 || r >= W * H) continue; if ((d === -1 && x === 0) || (d === 1 && x === W - 1)) continue; if (data[r] < T && lab[r] < 0) { lab[r] = comps.length; st[sp++] = r } } }
  comps.push({ n, x0, y0, x1, y1 })
}
console.log('ink components', comps.length)
comps.map((c, i) => ({ i, ...c })).filter((c) => c.n > 150).sort((a, b) => a.x0 - b.x0).forEach((c) => console.log(c.i, c.n, `x ${c.x0}-${c.x1}`, `y ${c.y0}-${c.y1}`))
console.log('small comps (<=150 px):', comps.filter((c) => c.n <= 150).length)
