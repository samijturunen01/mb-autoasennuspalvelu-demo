import { useState } from 'react'
import { MapPin, Navigation, ExternalLink } from 'lucide-react'
import { company, fullAddress } from '../../data/company'
import { track } from '../../lib/analytics'

/**
 * Privacy-conscious Google Maps: nothing loads from Google until the visitor asks for
 * the map. Keyless embed URL – no paid API key.
 */
export function MapEmbed() {
  const [load, setLoad] = useState(false)
  return (
    <div className="overflow-hidden rounded-[26px] border border-line bg-ink-2">
      <div className="relative aspect-[4/3.4] w-full sm:aspect-[16/9] lg:aspect-[21/8]">
        {load ? (
          <iframe
            title={`Kartta: ${company.name}, ${fullAddress}`}
            src={company.maps.embed}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="plate-grid absolute inset-0 flex items-center justify-center p-6">
            {/* Schematic placeholder – abstract street lines, not a real map */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g fill="none" stroke="rgb(255 255 255 / 0.09)" strokeLinecap="round">
                <path d="M-20 230C200 214 420 200 820 150" strokeWidth="18" />
                <path d="M330 -20L380 380" strokeWidth="12" />
                <path d="M-20 80L820 50" strokeWidth="8" />
                <path d="M620 -20L580 380" strokeWidth="8" />
              </g>
              <path d="M-20 230C200 214 420 200 820 150" fill="none" stroke="#f2b035" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="6 8" />
            </svg>
            <div className="relative max-w-sm text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lamp text-ink shadow-[0_0_34px_rgb(242_176_53/0.5)]">
                <MapPin size={26} aria-hidden="true" />
              </span>
              <p className="display mt-4 text-[1.8rem] text-white">{fullAddress}</p>
              <button
                type="button"
                onClick={() => {
                  setLoad(true)
                  track('map_load')
                }}
                className="btn btn-lamp mt-5"
              >
                Näytä kartta
              </button>
              <p className="mt-3 text-[0.85rem] text-fog">Kartta ladataan Googlelta vasta, kun valitset sen.</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 border-t border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2 font-[600] text-white">
          <MapPin size={18} aria-hidden="true" className="shrink-0 text-lamp" /> {company.name}, {fullAddress}
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href={company.maps.directions}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('directions_click', { location: 'map' })}
            className="btn btn-lamp !min-h-11 !px-4 text-[0.95rem]"
          >
            <Navigation size={17} aria-hidden="true" /> Katso reittiohjeet
            <span className="sr-only">(avautuu uuteen välilehteen)</span>
          </a>
          <a
            href={company.maps.open}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('directions_click', { location: 'map_open' })}
            className="btn btn-ghost !min-h-11 !px-4 text-[0.95rem]"
          >
            <ExternalLink size={16} aria-hidden="true" /> Avaa Google Mapsissa
            <span className="sr-only">(avautuu uuteen välilehteen)</span>
          </a>
        </div>
      </div>
    </div>
  )
}
