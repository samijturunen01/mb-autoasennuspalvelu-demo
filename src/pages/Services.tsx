import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { PageIntro } from '../components/ui/PageIntro'
import { ServiceArt } from '../components/brand/ServiceArt'
import { CtaBand } from '../components/ui/CtaBand'
import { services } from '../data/services'
import { company } from '../data/company'
import { BOOKING } from '../data/nav'
import { track } from '../lib/analytics'

export function Services() {
  return (
    <>
      <PageIntro
        crumbs={[{ to: '/', label: 'Etusivu' }, { label: 'Palvelut' }]}
        eyebrow="Palvelut"
        title="Mercedes-Benzin huollot ja korjaukset"
        lead={
          <p>
            Määräaikaishuolloista vianhakuun ja talvivarusteisiin: kaikki palvelut Mercedes-Benz-henkilö- ja pakettiautoille yhdeltä
            korjaamolta Joensuun Kuurnankadulta.
          </p>
        }
        actions={
          <>
            <Link to={BOOKING} onClick={() => track('cta_click', { location: 'services_intro', cta: 'varaa' })} className="btn btn-lamp">
              Varaa huoltoaika <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
            </Link>
            <a href={company.phone.href} onClick={() => track('phone_click', { location: 'services_intro' })} className="btn btn-ghost">
              <Phone size={17} aria-hidden="true" className="text-lamp" /> Soita <span className="tabular">{company.phone.display}</span>
            </a>
          </>
        }
      />

      <section className="surface-paper" aria-label="Palveluluettelo">
        <div className="container-x py-16 lg:py-24">
          <ol className="m-0 list-none p-0">
            {services.map((s) => (
              <li key={s.id} className="grid gap-8 border-t border-paper-line py-12 last:border-b lg:grid-cols-12 lg:gap-10 lg:py-16">
                <div className="lg:col-span-5" data-reveal>
                  <div className="flex items-center gap-4">
                    <span className="balloon">{s.no}</span>
                    <span className="eyebrow text-[#8a5a00]">{s.eyebrow}</span>
                  </div>
                  <h2 className="display mt-5 text-[clamp(2.2rem,1.5rem+2.4vw,3.4rem)]">
                    <Link to={s.path} className="hover:underline hover:decoration-2 hover:underline-offset-4">
                      {s.label}
                    </Link>
                  </h2>
                  <p className="mt-4 max-w-md text-muted">{s.summary}</p>
                  <Link
                    to={s.path}
                    onClick={() => track('service_interest', { service: s.id, location: 'services_index' })}
                    className="btn btn-dark mt-6"
                  >
                    Lue lisää <span className="sr-only">: {s.label}</span>
                    <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
                  </Link>
                </div>
                <div className="grid gap-8 sm:grid-cols-[1fr_200px] lg:col-span-7 lg:grid-cols-[1fr_220px]" data-reveal>
                  <ul className="m-0 grid list-none content-start gap-x-6 p-0 sm:grid-cols-1 md:grid-cols-2">
                    {s.items.map((it) => (
                      <li key={it.id} className="border-b border-paper-line">
                        <Link
                          to={`${s.path}#${it.id}`}
                          className="flex min-h-12 items-center justify-between gap-3 py-2.5 font-[560] text-graphite hover:text-[#8a5a00]"
                        >
                          {it.name}
                          <ArrowRight size={15} aria-hidden="true" className="shrink-0 opacity-50" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <ServiceArt id={s.art} className="hidden h-auto w-full text-[#3b3f44] sm:block" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand location="services" />
    </>
  )
}
