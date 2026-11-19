import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../../data/services'
import { ServiceArt } from '../brand/ServiceArt'
import { track } from '../../lib/analytics'

/**
 * Service index as a parts plate: a list of service groups on the left, the matching line
 * drawing on the right (follows hover and keyboard focus). Every row is a plain link.
 */
export function ServicePlate() {
  const [active, setActive] = useState(0)
  const current = services[active]

  return (
    <section className="surface-ink plate-grid relative" aria-labelledby="plate-title">
      <div className="container-x py-20 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-lamp" data-reveal>
              Palvelut
            </p>
            <h2 id="plate-title" className="display mt-4 max-w-3xl text-[clamp(2.4rem,1.6rem+3vw,4rem)]" data-reveal>
              Mitä Mersullesi tehdään tänään?
            </h2>
          </div>
          <Link to="/palvelut" className="link-underline inline-flex min-h-11 items-center gap-2 font-[650] text-white" data-reveal>
            Kaikki palvelut <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <ul className="m-0 list-none border-t border-line p-0 lg:col-span-7">
            {services.map((s, i) => (
              <li key={s.id} className="border-b border-line" data-reveal style={{ '--d': `${i * 60}ms` } as React.CSSProperties}>
                <Link
                  to={s.path}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => track('service_interest', { service: s.id, location: 'home_plate' })}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 py-6 sm:grid-cols-[3.5rem_1fr_auto] sm:py-7"
                >
                  <span className={`mono pt-2 text-[0.8rem] transition-colors ${active === i ? 'text-lamp' : 'text-fog'}`}>{s.no}</span>
                  <span>
                    <span
                      className={`display block text-[clamp(1.9rem,1.4rem+1.8vw,2.9rem)] transition-colors ${
                        active === i ? 'text-white' : 'text-silver'
                      } group-hover:text-white`}
                    >
                      {s.label}
                    </span>
                    <span className="mt-2 block max-w-xl text-[0.98rem] text-fog">{s.summary}</span>
                  </span>
                  <span
                    className={`mt-2 inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                      active === i ? 'border-lamp bg-lamp text-ink' : 'border-line-2 text-white'
                    } group-hover:border-lamp group-hover:bg-lamp group-hover:text-ink`}
                  >
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 rounded-[28px] border border-line bg-ink-2/80 p-8">
              <div className="flex items-center justify-between">
                <span className="mono text-[0.72rem] uppercase tracking-[0.14em] text-fog">Kuva {current.no}</span>
                <span className="balloon">{current.no}</span>
              </div>
              <div className="relative mt-4 aspect-[5/4]">
                {services.map((s, i) => (
                  <ServiceArt
                    key={s.id}
                    id={s.art}
                    className={`absolute inset-0 h-full w-full text-silver transition-opacity duration-500 ${
                      active === i ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
              <p className="display mt-4 text-[1.9rem] text-white">{current.label}</p>
              <p className="mt-2 text-fog">{current.eyebrow}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
