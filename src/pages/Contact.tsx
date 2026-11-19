import { Mail, MapPin, Navigation, Phone } from 'lucide-react'
import { PageIntro } from '../components/ui/PageIntro'
import { BookingForm } from '../components/forms/BookingForm'
import { MapEmbed } from '../components/contact/MapEmbed'
import { Hours } from '../components/ui/Hours'
import { company, fullAddress } from '../data/company'
import { track } from '../lib/analytics'

const steps = [
  { t: 'Soita tai jätä pyyntö', d: 'Puhelimella sovit ajan heti. Lomakkeen voit täyttää myös iltaisin ja viikonloppuisin.' },
  { t: 'Kerro auto ja tarve', d: 'Rekisterinumero, mittariston huoltoilmoitus tai oireet – niiden avulla korjaamo tietää, mitä autolle tehdään.' },
  { t: 'Sovitaan aika', d: 'Korjaamo ottaa yhteyttä ja sopii kanssasi ajan, jolloin tuot auton Kuurnankadulle.' },
]

export function Contact() {
  return (
    <>
      <PageIntro
        crumbs={[{ to: '/', label: 'Etusivu' }, { label: 'Yhteystiedot' }]}
        eyebrow="Yhteystiedot · ajanvaraus"
        title="Varaa aika Mersullesi"
        lead={<p>Nopeimmin asia hoituu soittamalla korjaamolle. Voit myös jättää huoltoaikapyynnön, niin korjaamo ottaa yhteyttä.</p>}
      />

      {/* Contact tiles */}
      <section className="surface-ink border-b border-line" aria-label="Yhteystiedot">
        <div className="container-x pb-16 lg:pb-20">
          <div className="grid gap-px overflow-hidden rounded-[26px] border border-line bg-line md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.35fr_1.15fr]">
            {company.people.map((p) => (
              <a
                key={p.id}
                href={p.phone.href}
                onClick={() => track('phone_click', { location: 'contact_tiles', person: p.id })}
                className="group flex flex-col gap-3 bg-ink-2 p-6 hover:bg-ink-3 sm:p-7"
              >
                <span className="flex items-center gap-2 text-fog">
                  <Phone size={17} aria-hidden="true" className="text-lamp" /> {p.name}
                </span>
                <span className="display tabular text-[2rem] text-white group-hover:text-lamp">{p.phone.display}</span>
              </a>
            ))}
            <a
              href={`mailto:${company.email}`}
              onClick={() => track('email_click', { location: 'contact_tiles' })}
              className="group flex flex-col gap-3 bg-ink-2 p-6 hover:bg-ink-3 sm:p-7"
            >
              <span className="flex items-center gap-2 text-fog">
                <Mail size={17} aria-hidden="true" className="text-lamp" /> Sähköposti
              </span>
              <span className="text-[1.08rem] font-[650] text-white [overflow-wrap:anywhere] group-hover:text-lamp">{company.email}</span>
            </a>
            <a
              href={company.maps.directions}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('directions_click', { location: 'contact_tiles' })}
              className="group flex flex-col gap-3 bg-ink-2 p-6 hover:bg-ink-3 sm:p-7"
            >
              <span className="flex items-center gap-2 text-fog">
                <MapPin size={17} aria-hidden="true" className="text-lamp" /> Korjaamo
              </span>
              <span className="text-[1.15rem] font-[650] text-white group-hover:text-lamp">
                {fullAddress}
                <span className="sr-only"> – reittiohjeet (avautuu uuteen välilehteen)</span>
              </span>
              <span className="mt-auto inline-flex items-center gap-1.5 text-[0.9rem] text-fog">
                <Navigation size={14} aria-hidden="true" /> Reittiohjeet
              </span>
            </a>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h2 className="eyebrow text-lamp">Aukiolo</h2>
              <Hours className="mt-3" tone="dark" />
            </div>
            <div className="lg:col-span-3">
              <h2 className="eyebrow text-lamp">Yritystiedot</h2>
              <dl className="mt-3 grid gap-x-8 gap-y-1.5 text-[0.98rem] sm:grid-cols-[auto_1fr]">
                <dt className="text-fog">Virallinen nimi</dt>
                <dd className="m-0 font-[600] text-white">{company.name}</dd>
                <dt className="text-fog">Y-tunnus</dt>
                <dd className="m-0 font-[600] text-white">{company.businessId}</dd>
                <dt className="text-fog">Posti- ja käyntiosoite</dt>
                <dd className="m-0 font-[600] text-white">{fullAddress}</dd>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="huoltoaika" className="surface-paper" aria-labelledby="booking-title">
        <div className="container-x grid gap-10 py-20 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-8 lg:py-24">
          {/* DOM order = phone order (heading, form, steps); desktop puts heading + steps in the left column */}
          <div className="lg:col-span-4 lg:row-start-1">
            <p className="eyebrow text-[#8a5a00]">Huoltoaikapyyntö</p>
            <h2 id="booking-title" className="display mt-4 text-[clamp(2.4rem,1.6rem+3vw,4rem)]">
              Kolme kohtaa, ja pyyntö on valmis.
            </h2>
          </div>
          <div className="lg:col-span-8 lg:col-start-5 lg:row-span-2 lg:row-start-1">
            <BookingForm />
          </div>
          <div className="lg:col-span-4 lg:row-start-2 lg:self-start">
            <ol className="m-0 list-none space-y-6 p-0">
              {steps.map((s, i) => (
                <li key={s.t} className="grid grid-cols-[2.6rem_1fr] gap-4">
                  <span className="balloon">{i + 1}</span>
                  <div>
                    <h3 className="text-[1.12rem] font-[700] text-graphite">{s.t}</h3>
                    <p className="mt-1 text-muted">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 rounded-[22px] border border-paper-line bg-white/70 p-6">
              <p className="font-[650] text-graphite">Kiireellinen asia?</p>
              <a
                href={company.phone.href}
                onClick={() => track('phone_click', { location: 'booking_aside' })}
                className="btn btn-dark mt-4 w-full"
              >
                <Phone size={17} aria-hidden="true" className="text-lamp" /> Soita {company.phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="surface-ink" aria-labelledby="map-title">
        <div className="container-x py-20 lg:py-24">
          <p className="eyebrow text-lamp">Sijainti</p>
          <h2 id="map-title" className="display mt-4 text-[clamp(2.2rem,1.5rem+2.6vw,3.5rem)]">
            Kuurnankatu 28, Joensuu
          </h2>
          <div className="mt-8">
            <MapEmbed />
          </div>
        </div>
      </section>
    </>
  )
}
