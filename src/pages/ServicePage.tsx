import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, ArrowUpRight, Check, Phone } from 'lucide-react'
import { PageIntro, type Crumb } from '../components/ui/PageIntro'
import { ServiceArt } from '../components/brand/ServiceArt'
import { FaqList } from '../components/ui/FaqList'
import { CtaBand } from '../components/ui/CtaBand'
import { People } from '../components/ui/People'
import { ServiceAB } from '../components/home/ServiceAB'
import { services, serviceById, type ServiceId } from '../data/services'
import { company } from '../data/company'
import { bookingFor } from '../data/nav'
import { track } from '../lib/analytics'

export function ServicePage({ id }: { id: ServiceId }) {
  const s = serviceById(id)
  const isVans = id === 'pakettiautot'
  const crumbs: Crumb[] = isVans
    ? [{ to: '/', label: 'Etusivu' }, { label: 'Pakettiautot' }]
    : [{ to: '/', label: 'Etusivu' }, { to: '/palvelut', label: 'Palvelut' }, { label: s.label }]
  const related = services.filter((x) => x.id !== id)

  return (
    <>
      <PageIntro
        crumbs={crumbs}
        eyebrow={s.eyebrow}
        title={s.title}
        lead={<p>{s.lead}</p>}
        actions={
          <>
            <Link
              to={bookingFor(s.topic)}
              onClick={() => track('cta_click', { location: `service_${s.id}`, cta: 'intro' })}
              className="btn btn-lamp"
            >
              {s.cta} <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
            </Link>
            <a href={company.phone.href} onClick={() => track('phone_click', { location: `service_${s.id}` })} className="btn btn-ghost">
              <Phone size={17} aria-hidden="true" className="text-lamp" /> Soita <span className="tabular">{company.phone.display}</span>
            </a>
          </>
        }
        visual={
          <div className="relative rounded-[28px] border border-line bg-ink-2/70 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="mono text-[0.7rem] uppercase tracking-[0.14em] text-fog">Kuva {s.no}</span>
              <span className="balloon">{s.no}</span>
            </div>
            <ServiceArt id={s.art} className="mt-2 h-auto w-full text-silver" />
          </div>
        }
      />

      {/* Need + signals */}
      <section className="surface-paper" aria-labelledby="need-title">
        <div className="container-x grid gap-10 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <h2 id="need-title" className="display text-[clamp(2.2rem,1.5rem+2.6vw,3.5rem)]" data-reveal>
              {s.need.title}
            </h2>
            <p className="lead mt-6 max-w-2xl text-muted" data-reveal>
              {s.need.text}
            </p>
          </div>
          <aside className="lg:col-span-5" data-reveal aria-labelledby="signals-title">
            <div className="rounded-[26px] border border-paper-line bg-white/75 p-7">
              <h3 id="signals-title" className="display text-[1.7rem]">
                {s.signals.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {s.signals.list.map((l) => (
                  <li key={l} className="flex items-start gap-3 text-graphite">
                    <Check size={18} aria-hidden="true" className="mt-1 shrink-0 text-[#8a5a00]" />
                    {l}
                  </li>
                ))}
              </ul>
              {s.note && (
                <p className="mt-6 flex items-start gap-3 rounded-2xl bg-[#fff4dc] p-4 text-[0.97rem] font-[550] text-graphite">
                  <AlertTriangle size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-[#8a5a00]" />
                  <span>
                    {s.note}{' '}
                    <a href={company.phone.href} className="link-underline whitespace-nowrap font-[700]">
                      {company.phone.display}
                    </a>
                  </span>
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* What we do */}
      <section className="surface-ink" aria-labelledby="items-title">
        <div className="container-x py-20 lg:py-28">
          <p className="eyebrow text-lamp" data-reveal>
            Palvelun sisältö
          </p>
          <h2 id="items-title" className="display mt-4 max-w-3xl text-[clamp(2.2rem,1.5rem+2.6vw,3.6rem)]" data-reveal>
            {isVans ? 'Mitä teemme pakettiautoille' : 'Mitä teemme'}
          </h2>
          <ol className="mt-12 grid list-none gap-px overflow-hidden rounded-[26px] border border-line bg-line p-0 md:grid-cols-2">
            {s.items.map((it, i) => (
              <li key={it.id} id={it.id} className="bg-ink p-7 sm:p-8" data-reveal style={{ '--d': `${(i % 2) * 70}ms` } as React.CSSProperties}>
                <div className="flex items-start gap-5">
                  <span className="mono pt-1.5 text-[0.8rem] text-lamp">
                    {s.no}.{i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="display text-[1.7rem] leading-[1.05] text-white sm:text-[1.9rem]">{it.name}</h3>
                    <p className="mt-3 text-fog">{it.text}</p>
                    <Link
                      to={bookingFor(it.topic)}
                      onClick={() => track('cta_click', { location: `service_${s.id}_item`, cta: it.id })}
                      className="mt-4 inline-flex min-h-11 items-center gap-2 font-[650] text-white hover:text-lamp"
                    >
                      Varaa aika <ArrowRight size={16} aria-hidden="true" />
                      <span className="sr-only">: {it.name}</span>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {id === 'huolto' && <ServiceAB />}

      {isVans && (
        <section className="surface-paper" aria-labelledby="fleet-title">
          <div className="container-x grid gap-10 py-20 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-4">
              <p className="eyebrow text-[#8a5a00]">Yritysasiakkaille</p>
              <h2 id="fleet-title" className="display mt-4 text-[clamp(2.2rem,1.5rem+2.6vw,3.5rem)]">
                Sovi kaluston huollot suoraan
              </h2>
              <ul className="mt-6 space-y-3">
                {s.signals.list.map((l) => (
                  <li key={l} className="flex items-start gap-3 text-graphite">
                    <Check size={18} aria-hidden="true" className="mt-1 shrink-0 text-[#8a5a00]" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-8">
              <People location="vans" />
            </div>
          </div>
        </section>
      )}

      <section className="surface-paper border-t border-paper-line" aria-labelledby="sfaq-title">
        <div className="container-x grid gap-10 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <p className="eyebrow text-[#8a5a00]">Usein kysyttyä</p>
            <h2 id="sfaq-title" className="display mt-4 text-[clamp(2.2rem,1.5rem+2.6vw,3.5rem)]">
              Kysymyksiä ja vastauksia
            </h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={s.faq} />
          </div>
        </div>
      </section>

      <section className="surface-ink border-b border-line bg-ink-2" aria-labelledby="related-title">
        <div className="container-x py-16 lg:py-20">
          <h2 id="related-title" className="eyebrow text-lamp">
            Muut palvelut
          </h2>
          <ul className="mt-6 grid list-none gap-px overflow-hidden rounded-[22px] border border-line bg-line p-0 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <li key={r.id} className="bg-ink-2">
                <Link
                  to={r.path}
                  onClick={() => track('service_interest', { service: r.id, location: `related_${s.id}` })}
                  className="group flex h-full min-h-[8.5rem] flex-col justify-between gap-6 p-6 hover:bg-ink-3"
                >
                  <span className="mono text-[0.75rem] text-fog">{r.no}</span>
                  <span className="flex items-end justify-between gap-3">
                    <span className="display text-[1.6rem] leading-[1.02] text-white">{r.label}</span>
                    <ArrowUpRight size={20} aria-hidden="true" className="shrink-0 text-fog transition-colors group-hover:text-lamp" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        location={`service_${s.id}`}
        title={isVans ? 'Pakettiauto huoltoon – ja takaisin töihin.' : 'Varaa aika – kerro mitä Mersulle tehdään.'}
        to={bookingFor(s.topic)}
        cta={s.cta}
      />
    </>
  )
}
