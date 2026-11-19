import { Link } from 'react-router-dom'
import { ArrowRight, Check, Phone } from 'lucide-react'
import { ServiceArt } from '../brand/ServiceArt'
import { company } from '../../data/company'
import { track } from '../../lib/analytics'

const vanWork = [
  'Määräaikaishuollot ja öljynvaihdot',
  'Vikadiagnostiikka ja autosähkö',
  'Jakoketjut, jakohihnat ja automaattivaihteistot',
  'Jarrut, iskunvaimentimet ja alusta',
  'Alkuperäiset polttoainetoimiset lämmittimet',
  'Vetokoukut ja lisävarusteet',
]

export function VansFeature() {
  return (
    <section className="surface-ink relative overflow-hidden bg-graphite" aria-labelledby="vans-title">
      <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-12 lg:py-28">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <div className="relative rounded-[28px] border border-line p-6 sm:p-10">
            <span className="mono absolute left-6 top-5 text-[0.7rem] uppercase tracking-[0.14em] text-fog sm:left-10 sm:top-8">
              Kuva 05 · Pakettiauto
            </span>
            <ServiceArt id="pakettiauto" className="mt-6 h-auto w-full text-silver" label="Pakettiauton viivapiirros" />
            <div className="mt-2 flex items-center gap-3 text-fog">
              <span className="dim-rule flex-1" />
              <span className="mono text-[0.7rem] uppercase tracking-[0.14em]">Työkalu · ei seisontapäiviä</span>
              <span className="dim-rule flex-1" />
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6 lg:pl-6">
          <p className="eyebrow text-lamp" data-reveal>
            Yrityksille · pakettiautot
          </p>
          <h2 id="vans-title" className="display mt-4 text-[clamp(2.4rem,1.6rem+3vw,4rem)]" data-reveal>
            Pakettiauto on työkalu. Pidetään se töissä.
          </h2>
          <p className="lead mt-6 max-w-xl text-silver" data-reveal>
            Sprinterit, Vitot ja muut Mercedes-Benz-pakettiautot ajavat paljon, kantavat kuormaa ja käynnistyvät pakkasella aamusta toiseen.
            Huollamme ja korjaamme ne merkkiin erikoistuneella osaamisella.
          </p>
          <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2" data-reveal>
            {vanWork.map((w) => (
              <li key={w} className="flex items-start gap-2.5 text-[0.99rem] text-white">
                <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-lamp" />
                {w}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row" data-reveal>
            <Link
              to="/pakettiautot"
              onClick={() => track('service_interest', { service: 'pakettiautot', location: 'home_vans' })}
              className="btn btn-lamp"
            >
              Pakettiautojen huolto <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
            </Link>
            <a
              href={company.people[1].phone.href}
              onClick={() => track('phone_click', { location: 'home_vans', person: 'jp' })}
              className="btn btn-ghost"
            >
              <Phone size={17} aria-hidden="true" className="text-lamp" /> Sovi kaluston huollot
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
