import { forwardRef } from 'react'
import { formatPlate } from '../../lib/forms/validate'

const stars = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2 - Math.PI / 2
  return { x: 12 + Math.cos(a) * 7.2, y: 12 + Math.sin(a) * 7.2 }
})

/** Registration number typed straight onto a Finnish licence plate. */
export const PlateInput = forwardRef<
  HTMLInputElement,
  {
    id: string
    value: string
    onChange: (v: string) => void
    onBlur?: () => void
    invalid?: boolean
    describedBy?: string
  }
>(function PlateInput({ id, value, onChange, onBlur, invalid, describedBy }, ref) {
  return (
    <div
      className={`flex h-[4.25rem] w-full max-w-[19rem] overflow-hidden rounded-[10px] border-[3px] bg-white shadow-[inset_0_0_0_2px_#fff,inset_0_0_0_3.5px_#141618] transition-shadow focus-within:shadow-[inset_0_0_0_2px_#fff,inset_0_0_0_3.5px_#141618,0_0_0_4px_rgb(242_176_53/0.5)] ${
        invalid ? 'border-[#b42318]' : 'border-graphite'
      }`}
    >
      <div aria-hidden="true" className="flex w-11 shrink-0 flex-col items-center justify-center gap-0.5 bg-[#003399] text-white">
        <svg viewBox="0 0 24 24" className="h-6 w-6">
          {stars.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r="1.25" fill="#ffcc00" />
          ))}
        </svg>
        <span className="text-[0.72rem] font-[750] tracking-wide">FIN</span>
      </div>
      <input
        ref={ref}
        id={id}
        name="rekisterinumero"
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        maxLength={9}
        placeholder="ABC-123"
        value={value}
        onChange={(e) => onChange(formatPlate(e.target.value))}
        onBlur={onBlur}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className="w-full min-w-0 bg-transparent px-3 text-center text-[2.05rem] font-[750] uppercase tracking-[0.06em] text-graphite outline-none placeholder:text-[#c5c7ca] [font-stretch:82%]"
      />
    </div>
  )
})
