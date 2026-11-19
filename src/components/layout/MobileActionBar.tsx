import { Link } from 'react-router-dom'
import { CalendarCheck, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { BOOKING } from '../../data/nav'
import { track } from '../../lib/analytics'

/** Thumb-reach contact bar on phones and tablets. Never covers content: the footer reserves its height. */
export function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 px-3 pt-2.5 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-2.5">
        <a
          href={company.phone.href}
          onClick={() => track('phone_click', { location: 'mobile_bar' })}
          className="btn btn-ghost !min-h-[52px] !px-3 text-[0.98rem]"
        >
          <Phone size={18} aria-hidden="true" className="text-lamp" />
          Soita
          <span className="sr-only"> korjaamolle {company.phone.display}</span>
        </a>
        <Link
          to={BOOKING}
          onClick={() => track('cta_click', { location: 'mobile_bar', cta: 'varaa_huoltoaika' })}
          className="btn btn-lamp !min-h-[52px] !px-3 text-[0.98rem]"
        >
          <CalendarCheck size={18} aria-hidden="true" />
          Varaa aika
        </Link>
      </div>
    </div>
  )
}
