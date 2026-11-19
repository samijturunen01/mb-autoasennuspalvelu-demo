import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { bookingFor } from '../../data/nav'
import { track } from '../../lib/analytics'

/**
 * Mercedes-Benz service reminder explained (general information, not a quote).
 * Big outlined A / B use the logo's lettering style.
 */
export function ServiceAB({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  const Sub = headingLevel === 2 ? 'h3' : 'h4'
  const cols = [
    {
      letter: 'A',
      title: 'Suppeampi määräaikaishuolto',
      text: 'Tyypillisesti moottoriöljyn ja öljynsuodattimen vaihto, nesteiden tarkistus ja perustarkastukset.',
    },
    {
      letter: 'B',
      title: 'Laajempi määräaikaishuolto',
      text: 'A-huollon työt sekä laajemmat tarkastukset ja suodatinvaihdot, kuten sisäilmansuodatin.',
    },
  ]
  return (
    <section className="surface-paper plate-grid-paper relative" aria-labelledby="ab-title">
      <div className="container-x py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-[#8a5a00]" data-reveal>
              Mittariston huoltoilmoitus
            </p>
            <H id="ab-title" className="display mt-4 text-[clamp(2.4rem,1.6rem+3vw,4rem)]" data-reveal>
              Huolto A vai huolto B?
            </H>
            <p className="lead mt-6 max-w-md text-muted" data-reveal>
              Mercedes-Benz kertoo huollon tarpeen mittaristossa. Kirjain kertoo huollon laajuuden – ja meille se kertoo, mitä huoltoon
              kuuluu.
            </p>
            <Link
              to={bookingFor('huolto')}
              onClick={() => track('cta_click', { location: 'service_ab', cta: 'varaa_huolto' })}
              className="btn btn-dark mt-8"
              data-reveal
            >
              Varaa huolto A tai B <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {cols.map((c, i) => (
              <article
                key={c.letter}
                data-reveal
                style={{ '--d': `${i * 90}ms` } as React.CSSProperties}
                className="relative overflow-hidden rounded-[26px] border border-paper-line bg-white/70 p-7 sm:p-8"
              >
                <p aria-hidden="true" className="outline-type text-[9rem] sm:text-[10.5rem]" style={{ WebkitTextStrokeWidth: '0.055em' }}>
                  {c.letter}
                </p>
                <Sub className="display mt-4 text-[1.75rem]">
                  <span className="sr-only">Huolto {c.letter}: </span>
                  {c.title}
                </Sub>
                <p className="mt-3 text-muted">{c.text}</p>
              </article>
            ))}
            <p className="text-[0.95rem] text-muted sm:col-span-2" data-reveal>
              Kirjaimen perässä näkyvä numero tai lisäkoodi viittaa huollon yhteydessä tehtäviin lisätöihin. Tarkka sisältö riippuu mallista,
              moottorista ja ajomääristä – kerro mittariston ilmoitus ajanvarauksessa.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
