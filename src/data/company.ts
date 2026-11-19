/**
 * Verified company facts – single source of truth for the whole site.
 * Sources and items awaiting confirmation: docs/CONTENT_SOURCES.md
 */
const street = 'Kuurnankatu 28'
const postalCode = '80130'
const city = 'Joensuu'
const q = encodeURIComponent(`${street}, ${postalCode} ${city}`)

export const company = {
  name: 'MB-Autoasennuspalvelu Oy',
  brand: 'MB-Autoasennuspalvelu',
  tagline: 'Mercedes-Benz ajoneuvojen erikoisliike',
  businessId: '3563174-2',
  foundedDate: '2025-09-08',
  address: { street, postalCode, city, region: 'Pohjois-Karjala' },
  geo: { lat: 62.618272, lon: 29.7474 },
  email: 'mb@autoasennuspalvelu.com',
  phone: { display: '010 206 4590', href: 'tel:+358102064590', e164: '+358102064590' },
  people: [
    { id: 'jouni', name: 'Jouni', phone: { display: '010 206 4590', href: 'tel:+358102064590' } },
    { id: 'jp', name: 'JP', phone: { display: '010 206 4591', href: 'tel:+358102064591' } },
  ],
  /**
   * Hours are NOT published for MB-Autoasennuspalvelu Oy. These come from the directory
   * listing of the same workshop phone/address and must be confirmed (see CONTENT_SOURCES.md).
   */
  hours: {
    confirmed: false,
    rows: [
      { days: 'Ma–pe', time: '7.30–16.00' },
      { days: 'La–su', time: 'suljettu' },
    ],
    note: 'Muina aikoina sopimuksen mukaan.',
    schema: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '16:00' }],
  },
  network: {
    name: 'KL-ServicePartner',
    url: 'https://www.kl-servicepartner.fi/',
    listing: 'https://www.kl-servicepartner.fi/toimipiste/mb-autoasennuspalvelu/',
    ev: { name: 'e-Pro', url: 'https://epro.fi/' },
  },
  maps: {
    embed: `https://maps.google.com/maps?q=${encodeURIComponent('MB-Autoasennuspalvelu, ')}${q}&t=m&z=16&ie=UTF8&iwloc=&output=embed`,
    open: `https://www.google.com/maps/search/?api=1&query=${q}`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
  },
} as const

export const fullAddress = `${street}, ${postalCode} ${city}`

export type PersonId = (typeof company.people)[number]['id']
