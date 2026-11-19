import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Phone, X, ArrowRight, Mail } from 'lucide-react'
import { Wordmark } from '../brand/Logo'
import { mainNav, BOOKING } from '../../data/nav'
import { company } from '../../data/company'
import { track } from '../../lib/analytics'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(location.pathname)
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: lock scroll, trap focus, close with Escape.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const panel = panelRef.current
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>('a, button') ?? [])
    focusables()[0]?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab') {
        const f = focusables()
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-line bg-ink/92 backdrop-blur-md' : 'border-transparent bg-ink'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-[76px]">
        <Link to="/" className="group -m-2 flex shrink-0 items-center p-2">
          <Wordmark className="h-[22px] w-auto sm:h-[26px] lg:h-[28px]" alt="MB-Autoasennuspalvelu – etusivu" />
        </Link>

        <nav aria-label="Päävalikko" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `relative inline-flex min-h-11 items-center px-3 text-[0.98rem] font-[560] transition-colors after:absolute after:inset-x-3 after:bottom-1.5 after:h-[2px] after:origin-left after:rounded-full after:bg-lamp after:transition-transform after:duration-300 ${
                      isActive ? 'text-white after:scale-x-100' : 'text-fog after:scale-x-0 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={company.phone.href}
            onClick={() => track('phone_click', { location: 'header' })}
            className="inline-flex min-h-11 items-center gap-2 px-2 font-[600] text-white tabular hover:text-lamp"
          >
            <Phone size={17} aria-hidden="true" className="text-lamp" />
            {company.phone.display}
          </a>
          <Link
            to={BOOKING}
            onClick={() => track('cta_click', { location: 'header', cta: 'varaa_huoltoaika' })}
            className="btn btn-lamp !min-h-11 !px-5 text-[0.95rem]"
          >
            Varaa huoltoaika
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={company.phone.href}
            onClick={() => track('phone_click', { location: 'header_mobile' })}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:text-lamp"
            aria-label={`Soita korjaamolle ${company.phone.display}`}
          >
            <Phone size={20} aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line-2 px-4 font-[600] text-white"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
            <span>{open ? 'Sulje' : 'Valikko'}</span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Valikko"
          className="plate-grid fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-ink lg:hidden"
        >
          <nav aria-label="Mobiilivalikko" className="container-x pb-10 pt-6">
            <ul className="border-t border-line">
              {mainNav.map((item, i) => (
                <li key={item.to} className="border-b border-line">
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex min-h-[64px] items-center gap-4 py-3 ${isActive ? 'text-white' : 'text-silver'}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`mono text-[0.8rem] ${isActive ? 'text-lamp' : 'text-fog'}`}>0{i + 1}</span>
                        <span className="display text-[2.1rem]">{item.label}</span>
                        {isActive && <span className="sr-only">(nykyinen sivu)</span>}
                        <ArrowRight size={22} aria-hidden="true" className={`ml-auto ${isActive ? 'text-lamp' : 'text-fog'}`} />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3">
              <Link to={BOOKING} className="btn btn-lamp w-full">
                Varaa huoltoaika
              </Link>
              {company.people.map((p) => (
                <a
                  key={p.id}
                  href={p.phone.href}
                  onClick={() => track('phone_click', { location: 'menu', person: p.id })}
                  className="btn btn-ghost w-full justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Phone size={18} aria-hidden="true" className="text-lamp" /> Soita {p.name === 'JP' ? 'JP:lle' : `${p.name}lle`}
                  </span>
                  <span className="tabular">{p.phone.display}</span>
                </a>
              ))}
              <a
                href={`mailto:${company.email}`}
                onClick={() => track('email_click', { location: 'menu' })}
                className="inline-flex min-h-12 items-center gap-2 text-fog hover:text-white"
              >
                <Mail size={18} aria-hidden="true" /> {company.email}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
