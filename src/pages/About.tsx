import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageIntro } from '../components/ui/PageIntro'
import { FullLogo } from '../components/brand/Logo'
import { People } from '../components/ui/People'
import { Network } from '../components/home/Network'
import { CtaBand } from '../components/ui/CtaBand'
import { company, fullAddress } from '../data/company'
import { BOOKING } from '../data/nav'

const facts: { k: string; v: React.ReactNode }[] = [
  { k: 'Yritys', v: company.name },
  { k: 'Y-tunnus', v: company.businessId },
  { k: 'Erikoistuminen', v: 'Mercedes-Benz-henkilö- ja pakettiautojen huolto ja korjaus' },
  { k: 'Korjaamo', v: fullAddress },
  { k: 'Ketju', v: 'KL-ServicePartner · e-Pro-verkosto' },
]

export function About() {
  return (
    <>
      <PageIntro
        crumbs={[{ to: '/', label: 'Etusivu' }, { label: 'Yritys' }]}
        eyebrow="Yritys"
        title="Mercedes-Benz-erikoiskorjaamo Kuurnankadulla"
        lead={
          <p>
            {company.name} huoltaa ja korjaa Mercedes-Benz-merkkisiä henkilö- ja pakettiautoja Joensuussa. Korjaamo on itsenäinen ja
            osa valtakunnallista KL-ServicePartner-korjaamoketjua.
          </p>
        }
        actions={
          <Link to={BOOKING} className="btn btn-lamp">
            Varaa huoltoaika <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
          </Link>
        }
        visual={
          <div className="rounded-[28px] border border-line bg-ink-2/70 p-6 sm:p-10">
            <FullLogo tone="dark" className="h-auto w-full" />
          </div>
        }
      />

      <section className="surface-paper" aria-labelledby="story-title">
        <div className="container-x grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-6">
            <p className="eyebrow text-[#8a5a00]" data-reveal>
              Nimi kertoo erikoistumisen
            </p>
            <h2 id="story-title" className="display mt-4 text-[clamp(2.4rem,1.6rem+3vw,4rem)]" data-reveal>
              MB tarkoittaa Mercedes-Benziä.
            </h2>
            <div className="mt-6 max-w-xl space-y-5 text-[1.08rem] text-muted" data-reveal>
              <p>
                Korjaamon oma kuvaus on lyhyt: <strong className="text-graphite">”Mercedes-Benz ajoneuvojen erikoisliike.”</strong> Se
                kertoo, mihin osaaminen keskittyy – Mercedes-Benz-henkilöautoihin ja -pakettiautoihin.
              </p>
              <p>
                Merkkikohtaisen erikoistumisen ansiosta korjaamo pystyy palvelemaan ammattimaisesti ja nopeasti. Käytössä on ajantasainen
                vikadiagnostiikkalaitteisto, ja huollot voidaan merkitä auton sähköiseen huoltokirjaan.
              </p>
              <p>
                Logon klassinen Mercedes-Benz-viivapiirros on tällä sivustolla myös kuvituksen lähtökohta: huoltokohteet on merkitty siihen
                kuin korjaamon työpiirustukseen.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 lg:pl-8">
            <dl className="m-0 rounded-[26px] border border-paper-line bg-white/75 p-2" data-reveal>
              {facts.map((f) => (
                <div key={f.k} className="grid gap-1 border-b border-paper-line px-5 py-4 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <dt className="mono text-[0.75rem] uppercase tracking-[0.12em] text-[#8a5a00]">{f.k}</dt>
                  <dd className="m-0 font-[600] text-graphite">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="surface-paper border-t border-paper-line" aria-labelledby="people-title">
        <div className="container-x grid gap-10 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <p className="eyebrow text-[#8a5a00]">Yhteyshenkilöt</p>
            <h2 id="people-title" className="display mt-4 text-[clamp(2.4rem,1.6rem+3vw,4rem)]">
              Jouni ja JP
            </h2>
            <p className="mt-5 text-muted">Kummallakin on oma suora numero. Soita sille, joka vastaa – asia hoituu kummalla tahansa.</p>
          </div>
          <div className="lg:col-span-8">
            <People location="about" />
          </div>
        </div>
      </section>

      <Network />
      <CtaBand location="about" />
    </>
  )
}
