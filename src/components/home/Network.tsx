import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { company } from '../../data/company'

/** Verified partnership. Chain-level statements are attributed to the chain (see CONTENT_SOURCES.md). */
const facts = [
  { k: 'Ketju', v: 'Lähes 100 korjaamoa ympäri Suomen' },
  { k: 'Varaosat', v: 'Alkuperäislaatuiset osat, valmistajan ohjeiden mukaan' },
  { k: 'Huoltokirja', v: 'Huoltotiedot autonvalmistajan sähköiseen huoltokirjaan' },
  { k: 'Takuu', v: 'KL-Varaosien tuotteille 2 vuoden takuu korjaamon asentamana' },
]

export function Network() {
  return (
    <section className="surface-ink relative border-y border-line bg-ink-2" aria-labelledby="network-title">
      <div className="container-x grid gap-10 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <p className="eyebrow text-lamp" data-reveal>
            Korjaamoketju
          </p>
          <h2 id="network-title" className="display mt-4 text-[clamp(2rem,1.5rem+2vw,3rem)]" data-reveal>
            Paikallinen korjaamo, valtakunnallinen ketju
          </h2>
          <p className="mt-5 text-fog" data-reveal>
            MB-Autoasennuspalvelu on {company.network.name} -ketjun korjaamo ja mukana ketjun sähkö- ja hybridiautojen{' '}
            {company.network.ev.name}-verkostossa.
          </p>
          <Link to="/palvelut/sahko-ja-hybridiautot" className="link-underline mt-6 inline-flex min-h-11 items-center gap-2 font-[650] text-white">
            Sähkö- ja hybridiautot <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="lg:col-span-8">
          <dl className="grid gap-px overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-2">
            {facts.map((f, i) => (
              <div key={f.k} className="bg-ink-2 p-6 sm:p-7" data-reveal style={{ '--d': `${i * 60}ms` } as React.CSSProperties}>
                <dt className="mono text-[0.72rem] uppercase tracking-[0.14em] text-lamp">{f.k}</dt>
                <dd className="m-0 mt-2 text-[1.08rem] font-[560] leading-snug text-white">{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[0.85rem] text-fog">
            Ketjua koskevat tiedot:{' '}
            <a href={company.network.url} target="_blank" rel="noopener noreferrer" className="link-underline">
              kl-servicepartner.fi
              <span className="sr-only"> (avautuu uuteen välilehteen)</span>
            </a>
            . Kysy korjaamolta, miten edut koskevat juuri sinun autosi töitä.
          </p>
        </div>
      </div>
    </section>
  )
}
