import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CAR_PATH } from '../brand/Logo'
import { gsap } from '../../lib/motion'
import { introAllowed, releaseIntroHold } from '../../lib/intro'
import { track } from '../../lib/analytics'

/**
 * Signature hero: the W124 drawing from the company's own logo as a technical service plate.
 * Intro (fresh homepage load only): a diagnostic scan line inks the drawing, the headlights
 * switch on and numbered callouts draw out to the services. ~2 s, never blocks the page.
 */

// Plate coordinate system = the logo's traced coordinate space.
const VB = { x: 1000, y: -170, w: 1500, h: 1050 }
const px = (x: number) => `${(((x - VB.x) / VB.w) * 100).toFixed(3)}%`
const py = (y: number) => `${(((y - VB.y) / VB.h) * 100).toFixed(3)}%`
/** Scan travels across the car's horizontal extent (traced bbox ≈ 1160–2340). */
const SCAN_FROM = 9
const SCAN_TO = 92

type Side = 'left' | 'right'
export const callouts: {
  no: string
  label: string
  to: string
  anchor: [number, number]
  balloon: [number, number]
  side: Side
}[] = [
  { no: '01', label: 'Määräaikaishuolto', to: '/palvelut/maaraaikaishuolto', anchor: [1760, 300], balloon: [1575, -95], side: 'right' },
  { no: '02', label: 'Vianhaku ja sähkö', to: '/palvelut/vianhaku-ja-korjaukset', anchor: [2105, 445], balloon: [2400, -95], side: 'left' },
  {
    no: '03',
    label: 'Jarrut ja alusta',
    to: '/palvelut/vianhaku-ja-korjaukset#jarrut',
    anchor: [1250, 600],
    balloon: [1150, 815],
    side: 'right',
  },
  { no: '04', label: 'Ilmastointi', to: '/palvelut/maaraaikaishuolto#ilmastointi', anchor: [1560, 130], balloon: [1150, -95], side: 'right' },
  {
    no: '05',
    label: 'Lohkolämmitin',
    to: '/palvelut/lammittimet-ja-asennukset#lohkolammitin',
    anchor: [1905, 628],
    balloon: [2400, 815],
    side: 'left',
  },
]

/** Headlamp lenses of the drawing (traced coordinates). */
const lamps = [
  { x: 1340, y: 392, w: 262, h: 110 },
  { x: 2012, y: 382, w: 180, h: 112 },
]

export function HeroStage() {
  const stage = useRef<HTMLDivElement>(null)
  const car = useRef<SVGSVGElement>(null)
  const scan = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = stage.current
    if (!root || !car.current || !scan.current) return
    if (!introAllowed()) {
      releaseIntroHold()
      root.dataset.intro = 'skipped'
      return
    }
    root.dataset.intro = 'playing'
    const carEl = car.current
    const scanEl = scan.current
    const glows = root.querySelectorAll<HTMLElement>('.hero-glow')
    const leaders = root.querySelectorAll<SVGPathElement>('.hero-leader')
    const balloons = root.querySelectorAll<HTMLElement>('.hero-balloon')
    const dots = root.querySelectorAll<SVGCircleElement>('.hero-dot')

    const setScan = (p: number) => {
      const x = SCAN_FROM + p * (SCAN_TO - SCAN_FROM)
      carEl.style.clipPath = p >= 1 ? 'none' : `inset(0 ${100 - x}% 0 0)`
      scanEl.style.transform = `translateX(${x}%)`
    }
    // Take over the CSS-held pre-intro state with inline styles, then release the hold.
    setScan(0)
    gsap.set(glows, { opacity: 0 })
    gsap.set(leaders, { strokeDashoffset: 1 })
    gsap.set(dots, { opacity: 0 })
    gsap.set(balloons, { opacity: 0, scale: 0.6 })
    gsap.set(scanEl, { opacity: 0 })
    releaseIntroHold()

    const state = { p: 0 }
    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        root.dataset.intro = 'done'
      },
    })
    tl.to(scanEl, { opacity: 1, duration: 0.15 })
      .to(state, { p: 1, duration: 1.15, ease: 'power2.inOut', onUpdate: () => setScan(state.p) }, '<')
      .to(scanEl, { opacity: 0, duration: 0.3 }, '-=0.15')
      .to(glows, { keyframes: [{ opacity: 0.75, duration: 0.07 }, { opacity: 0.15, duration: 0.08 }, { opacity: 1, duration: 0.35 }] }, '-=0.2')
      .to(dots, { opacity: 1, duration: 0.2, stagger: 0.07 }, '-=0.35')
      .to(leaders, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out', stagger: 0.07 }, '<0.05')
      .to(balloons, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.2)', stagger: 0.07 }, '-=0.45')

    return () => {
      tl.kill()
      root.dataset.intro = 'done'
      carEl.style.clipPath = ''
      gsap.set([...glows, ...leaders, ...dots, ...balloons], { clearProps: 'all' })
      gsap.set(scanEl, { opacity: 0 })
    }
  }, [])

  return (
    <figure className="relative m-0">
      <div ref={stage} className="hero-stage relative w-full" style={{ aspectRatio: `${VB.w} / ${VB.h}` }}>
        {/* Corner crop marks of the plate */}
        <span aria-hidden="true" className="absolute left-0 top-0 h-4 w-4 border-l border-t border-line-2" />
        <span aria-hidden="true" className="absolute right-0 top-0 h-4 w-4 border-r border-t border-line-2" />
        <span aria-hidden="true" className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-line-2" />
        <span aria-hidden="true" className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-line-2" />

        {/* Ghost drawing: the faint "blueprint" that is always there (also holds the shared path) */}
        <svg className="absolute inset-0 h-full w-full" viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} aria-hidden="true">
          <defs>
            <path id="hero-car-d" fillRule="evenodd" d={CAR_PATH} />
          </defs>
          <use href="#hero-car-d" fill="rgb(255 255 255 / 0.09)" />
        </svg>

        {/* Headlamp glow (behind the inked lines) */}
        {lamps.map((l, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="hero-glow pointer-events-none absolute"
            style={{
              left: px(l.x - l.w * 0.35),
              top: py(l.y - l.h * 0.6),
              width: `${((l.w * 1.7) / VB.w) * 100}%`,
              height: `${((l.h * 2.2) / VB.h) * 100}%`,
              background:
                'radial-gradient(closest-side, rgb(255 236 190 / 0.95), rgb(255 205 110 / 0.55) 38%, rgb(242 176 53 / 0.18) 62%, transparent 80%)',
              filter: 'blur(5px)',
              mixBlendMode: 'screen',
            }}
          />
        ))}

        {/* Inked drawing – revealed by the scan line */}
        <svg
          ref={car}
          className="hero-car absolute inset-0 h-full w-full"
          viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
          role="img"
          aria-label="MB-Autoasennuspalvelun logon Mercedes-Benz-piirros huoltokohteineen"
        >
          <use href="#hero-car-d" fill="#d7dade" />
        </svg>

        {/* Diagnostic scan line */}
        {/* Full-width carrier moved with transform (no layout shift); the 2px line sits on its left edge. */}
        <div
          ref={scan}
          aria-hidden="true"
          className="hero-scan pointer-events-none absolute inset-x-0 bottom-[8%] top-[6%]"
          style={{ transform: `translateX(${SCAN_TO}%)`, opacity: 0 }}
        >
          <span
            className="absolute left-0 top-0 h-full w-[2px] -translate-x-1/2"
            style={{
              background: 'linear-gradient(to bottom, transparent, #ffc95c 20%, #f2b035 80%, transparent)',
              boxShadow: '0 0 18px 4px rgb(242 176 53 / 0.45)',
            }}
          />
        </div>

        {/* Callout leaders */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} aria-hidden="true">
          {callouts.map((c) => (
            <g key={c.no}>
              <path
                className="hero-leader"
                d={`M${c.anchor[0]} ${c.anchor[1]}L${c.balloon[0]} ${c.balloon[1]}`}
                pathLength={1}
                fill="none"
                stroke="#f2b035"
                strokeWidth="3.5"
                strokeDasharray="1"
                opacity="0.85"
              />
              <circle className="hero-dot" cx={c.anchor[0]} cy={c.anchor[1]} r="9" fill="#f2b035" />
            </g>
          ))}
        </svg>

        {/* Callout balloons – real links to the services */}
        <ul className="m-0 list-none p-0">
          {callouts.map((c) => (
            // The <li> sits exactly on the leader end; the link is offset so the number circle is centred on it.
            <li key={c.no} className="hero-balloon absolute z-10 h-0 w-0" style={{ left: px(c.balloon[0]), top: py(c.balloon[1]) }}>
              <Link
                to={c.to}
                onClick={() => track('callout_click', { callout: c.no })}
                className={`group absolute top-0 flex -translate-y-1/2 items-center gap-2 ${
                  c.side === 'left' ? 'right-0 translate-x-[1.05rem] flex-row-reverse' : 'left-0 -translate-x-[1.05rem]'
                }`}
              >
                <span className="balloon transition-colors group-hover:bg-lamp group-hover:text-ink">{c.no}</span>{' '}
                <span className="sr-only transition-colors sm:not-sr-only sm:inline-block sm:whitespace-nowrap sm:rounded-full sm:border sm:border-line sm:bg-ink/85 sm:px-3 sm:py-1 sm:text-[0.86rem] sm:font-[600] sm:text-white sm:backdrop-blur-sm sm:group-hover:border-lamp">
                  {c.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Phone-size legend for the numbered balloons */}
      <figcaption className="mt-4 sm:hidden">
        <span className="sr-only">Huoltokohteet:</span>
        <ol className="grid grid-cols-2 gap-x-4 gap-y-1 text-[0.92rem]">
          {callouts.map((c) => (
            <li key={c.no}>
              <Link to={c.to} className="flex min-h-10 items-center gap-2 text-silver hover:text-white">
                <span className="mono text-[0.75rem] text-lamp">{c.no}</span>
                {c.label}
              </Link>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  )
}
