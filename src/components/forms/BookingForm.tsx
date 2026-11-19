import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AlertCircle, ArrowRight, CheckCircle2, Info, Phone } from 'lucide-react'
import { PlateInput } from './PlateInput'
import { topics, type TopicId } from '../../data/services'
import { company } from '../../data/company'
import { emptyBooking, type BookingRequest, type FieldErrors, type Timing } from '../../lib/forms/types'
import { validate } from '../../lib/forms/validate'
import { getFormAdapter, isDemoMode } from '../../lib/forms/submit'
import { track } from '../../lib/analytics'

const timings: { id: Timing; label: string }[] = [
  { id: 'asap', label: 'Mahdollisimman pian' },
  { id: 'tama-viikko', label: 'Tällä viikolla' },
  { id: 'ensi-viikko', label: 'Ensi viikolla' },
  { id: 'joustava', label: 'Joustava' },
]

const fieldOrder: (keyof BookingRequest)[] = ['plate', 'topics', 'description', 'name', 'phone', 'email', 'company']

/**
 * Service booking request ("huoltoaikapyyntö"). Demo mode sends nothing and stores nothing.
 * Topics can be preselected with ?aihe=huolto,jarrut (applied after hydration).
 */
export function BookingForm() {
  const uid = useId()
  const f = (name: string) => `${uid}-${name}`
  const [params] = useSearchParams()
  const [data, setData] = useState<BookingRequest>(emptyBooking())
  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [attempt, setAttempt] = useState(0)
  const started = useRef(false)
  /** Moves focus to an element when it mounts (error summary per submit attempt, success panel). */
  const focusOnMount = useCallback((el: HTMLElement | null) => el?.focus(), [])

  // Preselect topics from the URL (after hydration so prerendered HTML and client agree).
  const aihe = params.get('aihe')
  useEffect(() => {
    if (!aihe) return
    const valid = aihe.split(',').filter((t): t is TopicId => topics.some((x) => x.id === t))
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off sync from the URL after hydration
    if (valid.length) setData((d) => ({ ...d, topics: Array.from(new Set([...d.topics, ...valid])) }))
  }, [aihe])

  const set = <K extends keyof BookingRequest>(key: K, value: BookingRequest[K]) => {
    if (!started.current) {
      started.current = true
      track('form_start', { form: 'huoltoaika' })
    }
    const next = { ...data, [key]: value }
    setData(next)
    if (touched) setErrors(validate(next))
  }

  const toggleTopic = (id: TopicId) => {
    const next = data.topics.includes(id) ? data.topics.filter((t) => t !== id) : [...data.topics, id]
    if (!data.topics.includes(id)) track('booking_topic_select', { topic: id })
    set('topics', next)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    const errs = validate(data)
    setErrors(errs)
    if (Object.keys(errs).length) {
      track('form_validation_error', { form: 'huoltoaika', fields: Object.keys(errs).join(',') })
      setAttempt((a) => a + 1)
      return
    }
    setStatus('sending')
    try {
      const res = await getFormAdapter().submit(data)
      setMessage(res.message)
      setStatus('done')
      track('form_submit_success', { form: 'huoltoaika', demo: res.demo, topics: data.topics.join(',') })
      if (data.plate) track('plate_entered', { form: 'huoltoaika' })
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setData(emptyBooking())
    setErrors({})
    setTouched(false)
    setStatus('idle')
    started.current = false
  }

  const errorIds = fieldOrder.filter((k) => errors[k])
  const focusField = (k: keyof BookingRequest) => {
    const el = document.getElementById(k === 'topics' ? f('topic-huolto') : f(k))
    el?.focus()
  }
  const err = (k: keyof BookingRequest) =>
    errors[k] ? (
      <p id={f(`${k}-error`)} className="field-error">
        <AlertCircle size={17} aria-hidden="true" className="mt-0.5 shrink-0" /> {errors[k]}
      </p>
    ) : null

  if (status === 'done') {
    return (
      <div
        ref={focusOnMount}
        tabIndex={-1}
        role="status"
        className="rounded-[26px] border border-paper-line bg-white p-7 outline-none sm:p-10"
      >
        <CheckCircle2 size={40} aria-hidden="true" className="text-[#1f7a46]" />
        <h3 className="display mt-5 text-[2.2rem] text-graphite">{message}</h3>
        <p className="mt-4 max-w-lg text-muted">
          Tämä on konseptidemo, joten huoltoaikapyyntöä ei välitetty korjaamolle eikä tietoja tallennettu. Valmiilla sivustolla pyyntö menisi
          suoraan korjaamolle.
        </p>
        <p className="mt-4 max-w-lg text-muted">Jos asia on kiireellinen, soita korjaamolle:</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={company.phone.href} onClick={() => track('phone_click', { location: 'form_done' })} className="btn btn-dark">
            <Phone size={17} aria-hidden="true" className="text-lamp" /> {company.phone.display}
          </a>
          <button type="button" onClick={reset} className="btn btn-outline-dark">
            Täytä uusi pyyntö
          </button>
        </div>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby={f('title')} className="rounded-[26px] border border-paper-line bg-white p-5 sm:p-9">
      <h3 id={f('title')} className="display text-[2rem] text-graphite sm:text-[2.3rem]">
        Huoltoaikapyyntö
      </h3>
      <p className="mt-2 text-muted">
        Kentät, joissa on tähti (<span aria-hidden="true">*</span>
        <span className="sr-only">tähti</span>), ovat pakollisia. Muut ovat vapaaehtoisia.
      </p>

      {errorIds.length > 0 && (
        <div
          key={attempt}
          ref={focusOnMount}
          tabIndex={-1}
          role="alert"
          className="mt-6 rounded-2xl border-2 border-[#b42318] bg-[#fdf2f1] p-5 outline-none"
        >
          <p className="font-[700] text-[#8f1c13]">Tarkista {errorIds.length === 1 ? 'yksi kohta' : `${errorIds.length} kohtaa`}:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[#8f1c13]">
            {errorIds.map((k) => (
              <li key={k}>
                <a
                  href={`#${k === 'topics' ? f('topic-huolto') : f(k)}`}
                  onClick={(e) => {
                    e.preventDefault()
                    focusField(k)
                  }}
                  className="underline underline-offset-2"
                >
                  {errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 1 · Auto */}
      <fieldset className="mt-8 border-t border-paper-line pt-6">
        <legend className="flex items-center gap-3 pr-3">
          <span className="balloon">1</span>
          <span className="display text-[1.55rem] text-graphite">Auto</span>
        </legend>
        <div className="mt-5 grid gap-6 md:grid-cols-[auto_1fr]">
          <div>
            <label htmlFor={f('plate')} className="field-label">
              Rekisterinumero
            </label>
            <PlateInput
              id={f('plate')}
              value={data.plate}
              onChange={(v) => set('plate', v)}
              invalid={!!errors.plate}
              describedBy={`${f('plate-hint')}${errors.plate ? ` ${f('plate-error')}` : ''}`}
            />
            <p id={f('plate-hint')} className="field-hint mt-2 max-w-[19rem]">
              Auttaa tunnistamaan mallin ja moottorin heti.
            </p>
            {err('plate')}
          </div>
          <div>
            <label htmlFor={f('model')} className="field-label">
              Malli
            </label>
            <input
              id={f('model')}
              name="malli"
              className="field"
              value={data.model}
              onChange={(e) => set('model', e.target.value)}
              placeholder="esim. E 220 d tai Sprinter 316"
              autoComplete="off"
              aria-describedby={f('model-hint')}
            />
            <p id={f('model-hint')} className="field-hint mt-2">
              Jos et muista rekisterinumeroa.
            </p>
          </div>
        </div>
      </fieldset>

      {/* 2 · Työ */}
      <fieldset className="mt-8 border-t border-paper-line pt-6" aria-describedby={errors.topics ? f('topics-error') : undefined}>
        <legend className="flex items-center gap-3 pr-3">
          <span className="balloon">2</span>
          <span className="display text-[1.55rem] text-graphite">
            Mitä autolle tehdään? <span aria-hidden="true">*</span>
            <span className="sr-only">(pakollinen, valitse yksi tai useampi)</span>
          </span>
        </legend>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {topics.map((t) => (
            <label key={t.id} className="chip">
              <input
                id={f(`topic-${t.id}`)}
                type="checkbox"
                name="aihe"
                value={t.id}
                checked={data.topics.includes(t.id)}
                onChange={() => toggleTopic(t.id)}
                className="sr-only"
              />
              {t.label}
            </label>
          ))}
        </div>
        {err('topics')}

        <div className="mt-6">
          <label htmlFor={f('description')} className="field-label">
            Oireet tai lisätiedot{data.topics.includes('muu') && <span aria-hidden="true"> *</span>}
          </label>
          <textarea
            id={f('description')}
            name="kuvaus"
            rows={4}
            className="field resize-y"
            value={data.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="Esim. mittaristossa lukee ”Huolto B”, tai moottori kolisee kylmänä."
            aria-invalid={!!errors.description || undefined}
            aria-describedby={errors.description ? f('description-error') : undefined}
            aria-required={data.topics.includes('muu') || undefined}
          />
          {err('description')}
        </div>

        <div className="mt-6" role="radiogroup" aria-labelledby={f('timing-label')}>
          <p id={f('timing-label')} className="field-label">
            Toivottu ajankohta
          </p>
          <div className="flex flex-wrap gap-2.5">
            {timings.map((t) => (
              <label key={t.id} className="chip">
                <input
                  type="radio"
                  name="ajankohta"
                  value={t.id}
                  checked={data.timing === t.id}
                  onChange={() => set('timing', t.id)}
                  className="sr-only"
                />
                {t.label}
              </label>
            ))}
          </div>
          <p className="field-hint mt-2">Tarkka aika sovitaan korjaamon kanssa.</p>
        </div>
      </fieldset>

      {/* 3 · Yhteystiedot */}
      <fieldset className="mt-8 border-t border-paper-line pt-6">
        <legend className="flex items-center gap-3 pr-3">
          <span className="balloon">3</span>
          <span className="display text-[1.55rem] text-graphite">Yhteystiedot</span>
        </legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor={f('name')} className="field-label">
              Nimi <span aria-hidden="true">*</span>
            </label>
            <input
              id={f('name')}
              name="nimi"
              className="field"
              value={data.name}
              onChange={(e) => set('name', e.target.value)}
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={!!errors.name || undefined}
              aria-describedby={errors.name ? f('name-error') : undefined}
            />
            {err('name')}
          </div>
          <div>
            <label htmlFor={f('phone')} className="field-label">
              Puhelin <span aria-hidden="true">*</span>
            </label>
            <input
              id={f('phone')}
              name="puhelin"
              type="tel"
              inputMode="tel"
              className="field"
              value={data.phone}
              onChange={(e) => set('phone', e.target.value)}
              autoComplete="tel"
              placeholder="040 123 4567"
              required
              aria-required="true"
              aria-invalid={!!errors.phone || undefined}
              aria-describedby={`${f('phone-hint')}${errors.phone ? ` ${f('phone-error')}` : ''}`}
            />
            <p id={f('phone-hint')} className="field-hint mt-2">
              Korjaamo soittaa ja sopii ajan.
            </p>
            {err('phone')}
          </div>
          <div>
            <label htmlFor={f('email')} className="field-label">
              Sähköposti
            </label>
            <input
              id={f('email')}
              name="sahkoposti"
              type="email"
              inputMode="email"
              className="field"
              value={data.email}
              onChange={(e) => set('email', e.target.value)}
              autoComplete="email"
              aria-invalid={!!errors.email || undefined}
              aria-describedby={errors.email ? f('email-error') : undefined}
            />
            {err('email')}
          </div>
          <div className="sm:col-span-2">
            <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 font-[600] text-graphite">
              <input
                type="checkbox"
                checked={data.isCompany}
                onChange={(e) => set('isCompany', e.target.checked)}
                className="h-5 w-5 accent-[#15171a]"
              />
              Asioin yrityksen puolesta
            </label>
            {data.isCompany && (
              <div className="mt-3">
                <label htmlFor={f('company')} className="field-label">
                  Yritys <span aria-hidden="true">*</span>
                </label>
                <input
                  id={f('company')}
                  name="yritys"
                  className="field"
                  value={data.company}
                  onChange={(e) => set('company', e.target.value)}
                  autoComplete="organization"
                  aria-required="true"
                  aria-invalid={!!errors.company || undefined}
                  aria-describedby={errors.company ? f('company-error') : undefined}
                />
                {err('company')}
              </div>
            )}
          </div>
        </div>
      </fieldset>

      <div className="mt-8 border-t border-paper-line pt-6">
        <p className="text-[0.92rem] text-muted">Tietoja käytetään vain huoltoaikapyyntöön vastaamiseen.</p>
        {isDemoMode() && (
          <p className="mt-3 flex items-start gap-2 rounded-xl bg-paper px-4 py-3 text-[0.92rem] text-graphite">
            <Info size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-[#8a5a00]" />
            Konseptidemo: lomake ei lähetä eikä tallenna tietoja.
          </p>
        )}
        {status === 'error' && (
          <p role="alert" className="field-error mt-3">
            <AlertCircle size={17} aria-hidden="true" className="mt-0.5 shrink-0" /> Lähetys epäonnistui. Yritä uudelleen tai soita{' '}
            {company.phone.display}.
          </p>
        )}
        <button type="submit" disabled={status === 'sending'} className="btn btn-lamp mt-5 w-full text-[1.05rem] sm:w-auto">
          {status === 'sending' ? 'Lähetetään…' : 'Lähetä huoltoaikapyyntö'}
          {status !== 'sending' && <ArrowRight size={19} aria-hidden="true" className="btn-arrow" />}
        </button>
      </div>
    </form>
  )
}
