import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { company } from '../data/company'
import { services } from '../data/services'

export function NotFound() {
  return (
    <section className="surface-ink plate-grid relative overflow-hidden" aria-labelledby="nf-title">
      <div className="container-x relative grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7">
          <p className="eyebrow text-lamp">Virhekoodi 404</p>
          <p aria-hidden="true" className="outline-type mt-4 text-[clamp(7rem,4rem+12vw,15rem)]" style={{ WebkitTextStrokeWidth: '0.05em' }}>
            404
          </p>
          <h1 id="nf-title" className="display mt-4 text-[clamp(2.4rem,1.6rem+3vw,4rem)] text-white">
            Tätä sivua ei löytynyt.
          </h1>
          <p className="lead mt-5 max-w-xl text-silver">
            Osoite voi olla vanhentunut tai kirjoitettu väärin. Alta pääset takaisin oikealle tielle – tai soita suoraan korjaamolle.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/" className="btn btn-lamp">
              Etusivulle <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
            </Link>
            <a href={company.phone.href} className="btn btn-ghost">
              <Phone size={17} aria-hidden="true" className="text-lamp" /> {company.phone.display}
            </a>
          </div>
        </div>
        <nav aria-label="Suositut sivut" className="lg:col-span-5 lg:pt-20">
          <h2 className="eyebrow text-fog">Ehkä etsit</h2>
          <ul className="mt-4 border-t border-line">
            {[...services.map((s) => ({ to: s.path, label: s.label })), { to: '/yhteystiedot', label: 'Yhteystiedot ja ajanvaraus' }].map(
              (l) => (
                <li key={l.to} className="border-b border-line">
                  <Link to={l.to} className="flex min-h-14 items-center justify-between gap-3 text-[1.08rem] font-[600] text-white hover:text-lamp">
                    {l.label} <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </section>
  )
}
