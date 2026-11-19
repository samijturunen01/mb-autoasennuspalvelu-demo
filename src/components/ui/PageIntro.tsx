import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export interface Crumb {
  to?: string
  label: string
}

/** Sub-page hero: breadcrumbs, eyebrow, H1, lead, actions and an optional plate visual. */
export function PageIntro({
  crumbs,
  eyebrow,
  title,
  lead,
  actions,
  visual,
}: {
  crumbs: Crumb[]
  eyebrow: string
  title: string
  lead: React.ReactNode
  actions?: React.ReactNode
  visual?: React.ReactNode
}) {
  return (
    <section className="surface-ink plate-grid relative overflow-hidden" aria-labelledby="page-title">
      <div className={`container-x relative grid gap-10 pb-16 pt-8 sm:pt-10 lg:pb-24 ${visual ? 'lg:grid-cols-12 lg:items-center' : ''}`}>
        <div className={visual ? 'lg:col-span-7' : 'max-w-4xl'}>
          <nav aria-label="Murupolku">
            <ol className="flex flex-wrap items-center gap-1 text-[0.88rem] text-fog">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight size={14} aria-hidden="true" className="opacity-60" />}
                  {c.to ? (
                    <Link to={c.to} className="inline-flex min-h-10 items-center hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-silver">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="eyebrow mt-8 flex items-center gap-3 text-lamp lg:mt-12">
            <span aria-hidden="true" className="h-px w-8 bg-lamp" />
            {eyebrow}
          </p>
          <h1 id="page-title" className="display mt-5 text-[clamp(2.6rem,1.6rem+4vw,4.9rem)] text-white">
            {title}
          </h1>
          <div className="lead mt-6 max-w-2xl text-silver">{lead}</div>
          {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
        </div>
        {visual && <div className="lg:col-span-5">{visual}</div>}
      </div>
    </section>
  )
}
