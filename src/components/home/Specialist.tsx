import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const reasons = [
  {
    title: 'Vain Mercedes-Benz',
    text: 'Kun korjaamo keskittyy yhteen merkkiin, huolto-ohjelmat, tyypilliset kulumakohteet ja merkin tekniikka ovat tuttuja – henkilöautoista pakettiautoihin.',
  },
  {
    title: 'Ajantasainen vikadiagnostiikka',
    text: 'Nykyaikaisen Mersun vianhaku alkaa ohjainlaitteista ja vikakoodeista. Korjaamolla on käytössä ajantasainen vikadiagnostiikkalaitteisto.',
  },
  {
    title: 'Suora yhteys korjaamolle',
    text: 'Puhelu menee suoraan Jounille tai JP:lle. Kerrot oireet kerran, ja saat vastauksen ihmiseltä, joka tuntee asian.',
  },
  {
    title: 'Huoltohistoria tallessa',
    text: 'Huollot voidaan merkitä auton sähköiseen huoltokirjaan. Yhtenäinen huoltohistoria tukee auton arvoa myös silloin, kun on aika myydä.',
  },
]

export function Specialist() {
  return (
    <section className="surface-paper relative overflow-hidden" aria-labelledby="specialist-title">
      <div className="container-x grid gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <div className="lg:col-span-5">
          <p className="eyebrow text-[#8a5a00]" data-reveal>
            Miksi erikoiskorjaamo
          </p>
          <h2 id="specialist-title" className="display mt-4 text-[clamp(2.4rem,1.6rem+3vw,4rem)]" data-reveal>
            Yksi merkki. <br className="hidden sm:block" />
            Siksi tunnemme sen.
          </h2>
          <p className="lead mt-6 max-w-md text-muted" data-reveal>
            Merkkiliikkeen osaamista ilman merkkiliikkeen etäisyyttä: MB-Autoasennuspalvelu on itsenäinen, Mercedes-Benziin erikoistunut
            korjaamo Kuurnankadulla.
          </p>
          <p
            aria-hidden="true"
            className="outline-type mt-10 hidden select-none text-[clamp(8rem,4rem+10vw,14rem)] lg:block"
            style={{ WebkitTextStrokeWidth: '0.06em' }}
          >
            MB
          </p>
        </div>
        <ol className="m-0 list-none p-0 lg:col-span-7">
          {reasons.map((r, i) => (
            <li
              key={r.title}
              data-reveal
              style={{ '--d': `${i * 70}ms` } as React.CSSProperties}
              className="grid grid-cols-[3.25rem_1fr] gap-x-5 border-t border-paper-line py-7 sm:grid-cols-[4.5rem_1fr] sm:py-8 last:border-b"
            >
              <span className="mono pt-1 text-[0.85rem] text-[#8a5a00]">0{i + 1}</span>
              <div>
                <h3 className="display text-[1.85rem] sm:text-[2.15rem]">{r.title}</h3>
                <p className="mt-2 max-w-xl text-[1.05rem] text-muted">{r.text}</p>
              </div>
            </li>
          ))}
          <li className="pt-8">
            <Link to="/yritys" className="link-underline inline-flex min-h-11 items-center gap-2 font-[650] text-graphite">
              Tutustu korjaamoon <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </li>
        </ol>
      </div>
    </section>
  )
}
