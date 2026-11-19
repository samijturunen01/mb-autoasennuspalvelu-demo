/**
 * Line illustrations in the logo's technical-drawing language: solid outlines that
 * draw themselves in ([data-draw] + .draw, pathLength=1) over dash-dot construction lines.
 * Abstract artwork – not product photos or technical documentation.
 */
export type ArtId = 'huolto' | 'vianhaku' | 'lammitin' | 'sahko' | 'pakettiauto'

const D = { className: 'draw', pathLength: 1 } as const

function Construction({ children }: { children: React.ReactNode }) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="7 4 1.5 4" opacity="0.32">
      {children}
    </g>
  )
}

const art: Record<ArtId, React.ReactNode> = {
  huolto: (
    <>
      <Construction>
        <path d="M69 22V142M146 26V132M20 130H186" />
      </Construction>
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path {...D} d="M46 46H92A8 8 0 0 1 100 54V122A8 8 0 0 1 92 130H46A8 8 0 0 1 38 122V54A8 8 0 0 1 46 46Z" />
        <path {...D} d="M44 46V36H94V46" />
        <path {...D} d="M52 60V116M63 60V116M75 60V116M86 60V116" />
        <path {...D} d="M146 40C146 40 120 74 120 92C120 107 132 118 146 118C160 118 172 107 172 92C172 74 146 40 146 40Z" />
        <path {...D} d="M133 94C133 101 138 106 145 107" />
      </g>
      <g stroke="currentColor" strokeWidth="1.2" opacity="0.55">
        <path d="M38 142H100M38 137V147M100 137V147" />
      </g>
    </>
  ),
  vianhaku: (
    <>
      <Construction>
        <path d="M85 18V116M18 67H156M147 112V152" />
      </Construction>
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path {...D} d="M38 30H132A8 8 0 0 1 140 38V96A8 8 0 0 1 132 104H38A8 8 0 0 1 30 96V38A8 8 0 0 1 38 30Z" />
        <path {...D} d="M40 78H56L62 60L70 92L78 50L86 84L92 70H130" />
        <path {...D} d="M140 98C152 98 147 112 147 120" />
        <path {...D} d="M118 120H176L168 144H126Z" />
      </g>
      <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeDasharray="0 7.5" opacity="0.8">
        <path d="M130 128.5H166M134 136H162" />
      </g>
    </>
  ),
  lammitin: (
    <>
      <Construction>
        <path d="M92 30V146M20 138H190" />
      </Construction>
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path
          {...D}
          d="M92 128C66 128 54 108 62 88C66 78 74 74 74 62C84 70 86 80 84 88C92 80 96 66 92 50C112 62 124 82 122 102C121 117 109 128 92 128Z"
        />
        <path {...D} d="M92 128C82 128 78 120 80 112C82 104 88 102 90 94C98 102 102 110 100 118C99 124 96 128 92 128Z" />
        <path {...D} d="M124 112C148 112 146 70 170 70" />
        <path {...D} d="M174 58H184A4 4 0 0 1 188 62V78A4 4 0 0 1 184 82H174A4 4 0 0 1 170 78V62A4 4 0 0 1 174 58Z" />
        <path {...D} d="M188 64H196M188 76H196" />
        <path {...D} d="M42 30V58M29.9 37L54.1 51M29.9 51L54.1 37" />
      </g>
    </>
  ),
  sahko: (
    <>
      <Construction>
        <path d="M90 34V152M38 94H142" />
      </Construction>
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path {...D} d="M68.4 56H111.6A42 42 0 1 1 68.4 56Z" />
        <path {...D} d="M72 74A6 6 0 1 0 84 74A6 6 0 1 0 72 74Z" />
        <path {...D} d="M96 74A6 6 0 1 0 108 74A6 6 0 1 0 96 74Z" />
        <path {...D} d="M60 94A6 6 0 1 0 72 94A6 6 0 1 0 60 94Z" />
        <path {...D} d="M84 94A6 6 0 1 0 96 94A6 6 0 1 0 84 94Z" />
        <path {...D} d="M108 94A6 6 0 1 0 120 94A6 6 0 1 0 108 94Z" />
        <path {...D} d="M73 114A5 5 0 1 0 83 114A5 5 0 1 0 73 114Z" />
        <path {...D} d="M97 114A5 5 0 1 0 107 114A5 5 0 1 0 97 114Z" />
        <path {...D} d="M90 136V150" />
        <path {...D} d="M164 30L146 78H162L152 120L182 64H166L178 30Z" />
      </g>
    </>
  ),
  pakettiauto: (
    <>
      <Construction>
        <path d="M8 134H196M52 92V146M152 92V146" />
      </Construction>
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path
          {...D}
          d="M32 118H18V80C18 72 22 67 30 65L58 59L76 35C78 32 81 31 85 31H184C188 31 190 33 190 37V118H172M132 118H72"
        />
        <path {...D} d="M32 118A20 20 0 0 1 72 118M132 118A20 20 0 0 1 172 118" />
        <path {...D} d="M37 118A15 15 0 1 0 67 118A15 15 0 1 0 37 118Z" />
        <path {...D} d="M137 118A15 15 0 1 0 167 118A15 15 0 1 0 137 118Z" />
        <path {...D} d="M47 118A5 5 0 1 0 57 118A5 5 0 1 0 47 118Z" />
        <path {...D} d="M147 118A5 5 0 1 0 157 118A5 5 0 1 0 147 118Z" />
        <path {...D} d="M63 60L79 39H99V60Z" />
        <path {...D} d="M104 36V112M108 52H160M18 84H27M56 56L50 49" />
      </g>
    </>
  ),
}

export function ServiceArt({ id, className = '', label }: { id: ArtId; className?: string; label?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 160"
      data-draw
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {art[id]}
    </svg>
  )
}
