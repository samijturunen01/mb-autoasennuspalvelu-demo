import { Hero } from '../components/home/Hero'
import { Specialist } from '../components/home/Specialist'
import { ServicePlate } from '../components/home/ServicePlate'
import { ServiceAB } from '../components/home/ServiceAB'
import { VansFeature } from '../components/home/VansFeature'
import { DirectLine } from '../components/home/DirectLine'
import { Network } from '../components/home/Network'
import { FaqList } from '../components/ui/FaqList'
import { CtaBand } from '../components/ui/CtaBand'
import { faqs } from '../data/faq'

export function Home() {
  return (
    <>
      <Hero />
      <Specialist />
      <ServicePlate />
      <ServiceAB />
      <VansFeature />
      <DirectLine />
      <Network />
      <section className="surface-paper" aria-labelledby="faq-title">
        <div className="container-x grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4">
            <p className="eyebrow text-[#8a5a00]" data-reveal>
              Usein kysyttyä
            </p>
            <h2 id="faq-title" className="display mt-4 text-[clamp(2.4rem,1.6rem+3vw,4rem)]" data-reveal>
              Ennen kuin soitat
            </h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>
      <CtaBand location="home" />
    </>
  )
}
