import { People } from '../ui/People'
import { Hours } from '../ui/Hours'
import { company, fullAddress } from '../../data/company'
import { MapPin, Navigation } from 'lucide-react'
import { track } from '../../lib/analytics'

export function DirectLine() {
  return (
    <section className="surface-paper relative" aria-labelledby="direct-title">
      <div className="container-x grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-4">
          <p className="eyebrow text-[#8a5a00]" data-reveal>
            Ota yhteyttä suoraan
          </p>
          <h2 id="direct-title" className="display mt-4 text-[clamp(2.4rem,1.6rem+3vw,4rem)]" data-reveal>
            Kaksi numeroa. Suoraan korjaamolle.
          </h2>
          <p className="lead mt-6 text-muted" data-reveal>
            Kerro oireet tai mittariston huoltoilmoitus ja auton rekisterinumero – niin asia etenee jo ensimmäisessä puhelussa.
          </p>
          <div className="mt-8 space-y-6 border-t border-paper-line pt-6" data-reveal>
            <div>
              <h3 className="eyebrow text-graphite">Korjaamo</h3>
              <a
                href={company.maps.directions}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('directions_click', { location: 'home_direct' })}
                className="group mt-2 inline-flex min-h-11 items-center gap-2 font-[650] text-graphite"
              >
                <MapPin size={18} aria-hidden="true" className="text-[#8a5a00]" />
                <span className="link-underline">{fullAddress}</span>
                <Navigation size={15} aria-hidden="true" className="text-muted" />
                <span className="sr-only">– reittiohjeet (avautuu uuteen välilehteen)</span>
              </a>
            </div>
            <div>
              <h3 className="eyebrow text-graphite">Aukiolo</h3>
              <Hours className="mt-2" tone="light" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-8 lg:pl-6" data-reveal>
          <People location="home_direct" />
        </div>
      </div>
    </section>
  )
}
