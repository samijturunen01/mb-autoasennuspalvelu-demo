import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileActionBar } from './MobileActionBar'
import { ScrollManager } from './ScrollManager'
import { metaFor } from '../../data/seo'
import { useReveals } from '../../hooks/useReveals'

export function Layout() {
  const { pathname } = useLocation()
  useReveals(pathname)

  // Client-side navigation keeps the page title in sync (prerendered HTML already has it).
  useEffect(() => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '')
    const path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname
    document.title = metaFor(path || '/').title
  }, [pathname])

  return (
    <>
      <ScrollManager />
      <a
        href="#sisalto"
        className="sr-only z-[60] rounded-full bg-lamp px-5 py-3 font-[650] text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Siirry sisältöön
      </a>
      <div className="border-b border-line bg-ink-2">
        <p className="container-x flex min-h-8 items-center justify-center py-1 text-center text-[0.74rem] text-fog sm:text-[0.78rem]">
          <span className="mono mr-2 uppercase tracking-[0.12em] text-silver">Konseptidemo</span>
          <span>Hades Design -verkkosivukonsepti – ei yrityksen virallinen sivusto.</span>
        </p>
      </div>
      <Header />
      <main id="sisalto" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  )
}
