import { services } from './services'

export interface RouteMeta {
  path: string
  label: string
  title: string
  description: string
}

/** Every prerendered route with its unique title and meta description. */
export const routes: RouteMeta[] = [
  {
    path: '/',
    label: 'Etusivu',
    title: 'Mercedes-Benz-huolto ja -korjaus Joensuu | MB-Autoasennuspalvelu',
    description:
      'MB-Autoasennuspalvelu huoltaa ja korjaa Mercedes-Benz-henkilö- ja pakettiautot Joensuussa: määräaikaishuollot, vikadiagnostiikka, jarrut, jakoketjut ja automaattivaihteistot.',
  },
  {
    path: '/palvelut',
    label: 'Palvelut',
    title: 'Palvelut – Mercedes-Benz-huollot ja korjaukset Joensuussa | MB-Autoasennuspalvelu',
    description:
      'Kaikki palvelut yhdellä silmäyksellä: määräaikaishuollot, vianhaku ja korjaukset, lämmittimet ja asennukset sekä sähkö- ja hybridiautot – Mercedes-Benziin erikoistuneelta korjaamolta.',
  },
  ...services.map((s) => ({ path: s.path, label: s.label, title: s.seo.title, description: s.seo.description })),
  {
    path: '/yritys',
    label: 'Yritys',
    title: 'Yritys – Mercedes-Benz-erikoiskorjaamo Kuurnankadulla | MB-Autoasennuspalvelu',
    description:
      'MB-Autoasennuspalvelu Oy on itsenäinen, Mercedes-Benz-autoihin erikoistunut korjaamo Joensuussa ja osa KL-ServicePartner-ketjua. Tutustu Jouniin ja JP:hen.',
  },
  {
    path: '/yhteystiedot',
    label: 'Yhteystiedot',
    title: 'Yhteystiedot ja huoltoaikapyyntö | MB-Autoasennuspalvelu, Joensuu',
    description:
      'Soita 010 206 4590 tai jätä huoltoaikapyyntö. MB-Autoasennuspalvelu Oy, Kuurnankatu 28, 80130 Joensuu – kartta ja reittiohjeet.',
  },
  {
    path: '/404',
    label: 'Sivua ei löytynyt',
    title: 'Sivua ei löytynyt | MB-Autoasennuspalvelu',
    description: 'Hakemaasi sivua ei löytynyt. Palaa etusivulle tai katso Mercedes-Benz-huollot ja yhteystiedot.',
  },
]

export const metaFor = (path: string) => {
  const clean = path.replace(/\/+$/, '') || '/'
  return routes.find((r) => r.path === clean) ?? routes[routes.length - 1]
}
