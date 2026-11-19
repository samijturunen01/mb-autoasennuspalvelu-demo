import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { BOOKING } from '../../data/nav'
import { track } from '../../lib/analytics'
import { asset } from '../../lib/asset'

/** Closing call to action used at the end of every page. */
export function CtaBand({
  title = 'Mersu huoltoon Kuurnankadulle.',
  text = 'Varaa aika puhelimella tai jätä huoltoaikapyyntö – kerro rekisterinumero ja mitä autolle pitää tehdä.',
  to = BOOKING,
  cta = 'Varaa huoltoaika',
  location,
}: {
  title?: string
  text?: string
  to?: string
  cta?: string
  location: string
}) {
  return (
    <section className="surface-ink plate-grid relative overflow-hidden" aria-labelledby={`cta-${location}`}>
      <img
        src={asset('brand/car-line.svg')}
        alt=""
        width={760}
        height={472}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute -bottom-10 -right-24 hidden w-[640px] opacity-[0.07] md:block lg:-right-10 lg:w-[760px]"
      />
      <div className="container-x relative py-20 lg:py-28">
        <p className="eyebrow text-lamp">Ajanvaraus</p>
        <h2 id={`cta-${location}`} className="display mt-4 max-w-3xl text-[clamp(2.6rem,1.6rem+4vw,5rem)]">
          {title}
        </h2>
        <p className="lead mt-6 max-w-xl text-silver">{text}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link to={to} onClick={() => track('cta_click', { location, cta: 'closing' })} className="btn btn-lamp text-[1.05rem]">
            {cta} <ArrowRight size={19} aria-hidden="true" className="btn-arrow" />
          </Link>
          {company.people.map((p) => (
            <a
              key={p.id}
              href={p.phone.href}
              onClick={() => track('phone_click', { location, person: p.id })}
              className="btn btn-ghost text-[1.02rem]"
            >
              <Phone size={17} aria-hidden="true" className="text-lamp" />
              <span className="text-fog">{p.name}</span> <span className="tabular">{p.phone.display}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
