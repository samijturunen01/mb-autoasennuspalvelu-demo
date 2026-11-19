import type { TopicId } from '../../data/services'

export type Timing = 'asap' | 'tama-viikko' | 'ensi-viikko' | 'joustava'

/** Service booking request – a workshop needs the car, the job and a way to call back. */
export interface BookingRequest {
  plate: string
  model: string
  topics: TopicId[]
  description: string
  timing: Timing | ''
  name: string
  phone: string
  email: string
  isCompany: boolean
  company: string
}

export type FieldErrors = Partial<Record<keyof BookingRequest, string>>

export interface SubmitResult {
  ok: boolean
  /** True when nothing was actually sent (demo mode). */
  demo: boolean
  message: string
}

/** Every delivery mechanism implements this – the UI never knows which one is active. */
export interface FormAdapter {
  submit(data: BookingRequest): Promise<SubmitResult>
}

export const emptyBooking = (topics: TopicId[] = []): BookingRequest => ({
  plate: '',
  model: '',
  topics,
  description: '',
  timing: '',
  name: '',
  phone: '',
  email: '',
  isCompany: false,
  company: '',
})
