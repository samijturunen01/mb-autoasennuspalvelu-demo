import { Mail, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { track } from '../../lib/analytics'

/**
 * Direct lines to the workshop – the company publishes two named contacts.
 * No photos exist yet: monograms in the logo's outlined lettering stand in (see IMAGE_REPLACEMENT_LIST.md).
 */
export function People({ location, tone = 'paper' }: { location: string; tone?: 'paper' | 'ink' }) {
  const paper = tone === 'paper'
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {company.people.map((p) => (
        <article
          key={p.id}
          className={`relative overflow-hidden rounded-[26px] border p-7 sm:p-8 ${
            paper ? 'border-paper-line bg-white/75' : 'border-line bg-ink-2'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={`eyebrow ${paper ? 'text-[#8a5a00]' : 'text-lamp'}`}>Suora numero</p>
              <h3 className={`display mt-3 text-[2.4rem] ${paper ? 'text-graphite' : 'text-white'}`}>{p.name}</h3>
            </div>
            <span aria-hidden="true" className="outline-type -mr-1 -mt-2 text-[5.5rem]" style={{ WebkitTextStrokeWidth: '0.06em' }}>
              {p.name === 'JP' ? 'JP' : 'J'}
            </span>
          </div>
          <a
            href={p.phone.href}
            onClick={() => track('phone_click', { location, person: p.id })}
            className={`mt-6 flex min-h-14 items-center justify-between gap-3 rounded-full px-5 font-[650] transition-colors ${
              paper ? 'bg-graphite text-white hover:bg-[#2a2e33]' : 'bg-lamp text-ink hover:bg-lamp-2'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Phone size={18} aria-hidden="true" className={paper ? 'text-lamp' : ''} />
              Soita {p.name === 'JP' ? 'JP:lle' : `${p.name}lle`}
            </span>
            <span className="tabular text-[1.1rem]">{p.phone.display}</span>
          </a>
        </article>
      ))}
      <a
        href={`mailto:${company.email}`}
        onClick={() => track('email_click', { location })}
        className={`group flex min-h-14 flex-wrap items-center gap-x-3 gap-y-1 rounded-[20px] border px-6 py-4 md:col-span-2 ${
          paper ? 'border-paper-line bg-white/60 text-graphite' : 'border-line text-white'
        }`}
      >
        <Mail size={18} aria-hidden="true" className={paper ? 'text-[#8a5a00]' : 'text-lamp'} />
        <span className={paper ? 'text-muted' : 'text-fog'}>Sähköposti</span>
        <span className="link-underline break-all font-[650]">{company.email}</span>
      </a>
    </div>
  )
}
