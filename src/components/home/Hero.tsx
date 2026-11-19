import { Link } from 'react-router-dom'
import { ArrowRight, BatteryCharging, MapPin, Phone, Wrench } from 'lucide-react'
import { HeroStage } from './HeroStage'
import { company } from '../../data/company'
import { BOOKING } from '../../data/nav'
import { track } from '../../lib/analytics'

export function Hero() {
  return (
    <section className="surface-ink plate-grid relative overflow-hidden" aria-labelledby="hero-title">
      {/* Soft lamp light pooling under the drawing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 h-[620px] w-[900px] rounded-full opacity-60"
        style={{ background: 'radial-gradient(closest-side, rgb(242 176 53 / 0.1), transparent)' }}
      />
      <div className="container-x relative grid items-center gap-10 pb-14 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-16 xl:pt-20">
        <div className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-3 text-lamp">
            <span aria-hidden="true" className="h-px w-8 bg-lamp" />
            {company.tagline} · Joensuu
          </p>
          <h1 id="hero-title" className="display mt-5 text-[clamp(2.55rem,1.5rem+4.2vw,4.55rem)] text-white">
            <span className="whitespace-nowrap">Mercedes-Benzin</span> huolto ja korjaus Joensuussa
          </h1>
          <p className="lead mt-6 max-w-[34rem] text-silver">
            Huollamme ja korjaamme Mercedes-Benz-henkilö- ja pakettiautot – määräaikaishuolloista vianhakuun, jakoketjuihin ja
            automaattivaihteistoihin. Ajantasainen vikadiagnostiikka ja suora yhteys korjaamolle.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to={BOOKING}
              onClick={() => track('cta_click', { location: 'hero', cta: 'varaa_huoltoaika' })}
              className="btn btn-lamp text-[1.05rem]"
            >
              Varaa huoltoaika
              <ArrowRight size={19} aria-hidden="true" className="btn-arrow" />
            </Link>
            <a
              href={company.phone.href}
              onClick={() => track('phone_click', { location: 'hero' })}
              className="btn btn-ghost text-[1.05rem]"
            >
              <Phone size={18} aria-hidden="true" className="text-lamp" />
              Soita <span className="tabular">{company.phone.display}</span>
            </a>
          </div>
          <ul className="mt-9 grid gap-x-6 gap-y-3 border-t border-line pt-6 text-[0.92rem] text-fog sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <li className="flex items-start gap-2.5">
              <Wrench size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-lamp" />
              <span>
                <span className="text-white">KL-ServicePartner</span> -ketjun korjaamo
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <BatteryCharging size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-lamp" />
              <span>
                <span className="text-white">e-Pro</span>: sähkö- ja hybridiautot
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-lamp" />
              <span>
                <span className="text-white">{company.address.street}</span>, Joensuu
              </span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7 lg:pl-4">
          <p className="mono mb-3 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.14em] text-fog">
            <span>Kuva 01 · Huoltokohteet</span>
            <span className="hidden sm:inline">Valitse kohde</span>
          </p>
          <HeroStage />
        </div>
      </div>
    </section>
  )
}
