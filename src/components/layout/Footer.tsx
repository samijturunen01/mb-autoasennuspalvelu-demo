import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { FullLogo } from '../brand/Logo'
import { company, fullAddress } from '../../data/company'
import { mainNav } from '../../data/nav'
import { services } from '../../data/services'
import { track } from '../../lib/analytics'
import { Hours } from '../ui/Hours'

export function Footer() {
  return (
    <footer className="surface-ink relative overflow-hidden border-t border-line bg-ink-2 pb-28 lg:pb-10">
      <div className="container-x pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block" aria-label="MB-Autoasennuspalvelu – etusivu">
              <FullLogo tone="dark" className="h-auto w-[280px] sm:w-[340px]" />
            </Link>
            <p className="mt-6 max-w-md text-fog">
              Itsenäinen, Mercedes-Benz-henkilö- ja pakettiautoihin erikoistunut korjaamo Joensuussa. Osa KL-ServicePartner-korjaamoketjua.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-[1.35fr_1fr_1fr] lg:col-span-7">
            <div>
              <h2 className="eyebrow text-lamp">Yhteystiedot</h2>
              <ul className="mt-4 space-y-3 text-[0.98rem]">
                {company.people.map((p) => (
                  <li key={p.id}>
                    <a
                      href={p.phone.href}
                      onClick={() => track('phone_click', { location: 'footer', person: p.id })}
                      className="group inline-flex min-h-11 items-center gap-2 text-white hover:text-lamp"
                    >
                      <Phone size={16} aria-hidden="true" className="text-fog group-hover:text-lamp" />
                      <span>
                        <span className="text-fog">{p.name}</span> <span className="tabular">{p.phone.display}</span>
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${company.email}`}
                    onClick={() => track('email_click', { location: 'footer' })}
                    className="group inline-flex min-h-11 items-center gap-2 text-white [overflow-wrap:anywhere] hover:text-lamp"
                  >
                    <Mail size={16} aria-hidden="true" className="shrink-0 text-fog group-hover:text-lamp" />
                    {company.email}
                  </a>
                </li>
                <li>
                  <a
                    href={company.maps.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('directions_click', { location: 'footer' })}
                    className="group inline-flex min-h-11 items-start gap-2 text-white hover:text-lamp"
                  >
                    <MapPin size={16} aria-hidden="true" className="mt-1 shrink-0 text-fog group-hover:text-lamp" />
                    <span>
                      {fullAddress}
                      <span className="sr-only"> – reittiohjeet (avautuu uuteen välilehteen)</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-lamp">Aukiolo</h2>
              <Hours className="mt-4" tone="dark" />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-1">
              <div>
                <h2 className="eyebrow text-lamp">Sivut</h2>
                <ul className="mt-4 space-y-1">
                  {mainNav.map((n) => (
                    <li key={n.to}>
                      <Link to={n.to} className="inline-flex min-h-10 items-center text-silver hover:text-white">
                        {n.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="eyebrow text-lamp">Palvelut</h2>
                <ul className="mt-4 space-y-1">
                  {services
                    .filter((s) => s.id !== 'pakettiautot')
                    .map((s) => (
                      <li key={s.id}>
                        <Link to={s.path} className="inline-flex min-h-10 items-center text-silver hover:text-white">
                          {s.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[0.85rem] text-fog lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name} · Y-tunnus {company.businessId}
          </p>
          <p>
            <span className="mono text-[0.75rem] uppercase tracking-[0.12em] text-silver">Konseptidemo</span> · Hades Design
            -verkkosivukonsepti. Ei {company.name}:n virallinen sivusto. Mercedes-Benz on Mercedes-Benz Group AG:n tavaramerkki.
          </p>
        </div>
      </div>
    </footer>
  )
}
