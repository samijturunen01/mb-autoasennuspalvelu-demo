/** Main navigation – "Etusivu" is always the first item (desktop and mobile). */
export const mainNav = [
  { to: '/', label: 'Etusivu', end: true },
  { to: '/palvelut', label: 'Palvelut', end: false },
  { to: '/pakettiautot', label: 'Pakettiautot', end: false },
  { to: '/yritys', label: 'Yritys', end: false },
  { to: '/yhteystiedot', label: 'Yhteystiedot', end: false },
] as const

/** Primary conversion target: the service booking request form. */
export const BOOKING = '/yhteystiedot#huoltoaika'
export const bookingFor = (topic?: string) => (topic ? `/yhteystiedot?aihe=${topic}#huoltoaika` : BOOKING)
