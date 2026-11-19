import { Plus } from 'lucide-react'
import type { Faq } from '../../data/services'

/** Native <details> accordion: keyboard and screen-reader friendly, works without JS. */
export function FaqList({ items, tone = 'paper' }: { items: Faq[]; tone?: 'paper' | 'ink' }) {
  const paper = tone === 'paper'
  return (
    <div className={`border-t ${paper ? 'border-paper-line' : 'border-line'}`}>
      {items.map((f) => (
        <details key={f.q} className={`group border-b ${paper ? 'border-paper-line' : 'border-line'}`}>
          <summary className="flex min-h-[4.25rem] list-none items-center justify-between gap-6 py-5">
            <h3 className={`text-[1.12rem] font-[650] leading-snug sm:text-[1.22rem] ${paper ? 'text-graphite' : 'text-white'}`}>{f.q}</h3>
            <span
              aria-hidden="true"
              className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-open:rotate-45 ${
                paper ? 'border-paper-line text-graphite' : 'border-line-2 text-white'
              }`}
            >
              <Plus size={18} />
            </span>
          </summary>
          <p className={`max-w-3xl pb-6 pr-12 text-[1.03rem] ${paper ? 'text-muted' : 'text-fog'}`}>{f.a}</p>
        </details>
      ))}
    </div>
  )
}
