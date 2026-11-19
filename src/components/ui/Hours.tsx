import { company } from '../../data/company'

/** Opening hours. Marked for confirmation until the customer verifies them (see CONTENT_SOURCES.md). */
export function Hours({ className = '', tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  const muted = tone === 'dark' ? 'text-fog' : 'text-muted'
  const strong = tone === 'dark' ? 'text-white' : 'text-graphite'
  return (
    <div className={className}>
      <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 text-[0.98rem]">
        {company.hours.rows.map((r) => (
          <div key={r.days} className="contents">
            <dt className={muted}>{r.days}</dt>
            <dd className={`m-0 tabular font-[600] ${strong}`}>
              {r.time}
              {!company.hours.confirmed && r === company.hours.rows[0] && (
                <span aria-hidden="true" className="text-lamp">
                  *
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <p className={`mt-2 text-[0.88rem] ${muted}`}>{company.hours.note}</p>
      {!company.hours.confirmed && (
        <p className={`mt-1 text-[0.8rem] ${muted}`}>
          <span className="text-lamp">*</span> Aukioloajat vahvistetaan ennen sivuston julkaisua.
        </p>
      )}
    </div>
  )
}
