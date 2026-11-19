/**
 * Service content. Every sub-service below comes verbatim from the company's own
 * KL-ServicePartner listing (docs/CONTENT_SOURCES.md) – nothing has been added.
 * Copy explains what the service is and why it matters; it makes no price,
 * duration or outcome promises.
 */
import type { ArtId } from '../components/brand/ServiceArt'

export type TopicId =
  | 'huolto'
  | 'oljy'
  | 'vianhaku'
  | 'jarrut'
  | 'jakoketju'
  | 'vaihteisto'
  | 'alusta'
  | 'ilmastointi'
  | 'akku'
  | 'lammitin'
  | 'vetokoukku'
  | 'katsastus'
  | 'sahko'
  | 'muu'

/** Booking-form topics (chips). Order = typical frequency. */
export const topics: { id: TopicId; label: string }[] = [
  { id: 'huolto', label: 'Määräaikaishuolto (A / B)' },
  { id: 'oljy', label: 'Öljynvaihto / pikahuolto' },
  { id: 'vianhaku', label: 'Vikavalo / vianhaku' },
  { id: 'jarrut', label: 'Jarrut' },
  { id: 'jakoketju', label: 'Jakoketju / -hihna' },
  { id: 'vaihteisto', label: 'Automaattivaihteisto' },
  { id: 'alusta', label: 'Iskunvaimentimet / alusta' },
  { id: 'ilmastointi', label: 'Ilmastointi' },
  { id: 'akku', label: 'Akku / autosähkö' },
  { id: 'lammitin', label: 'Lohko- tai lisälämmitin' },
  { id: 'vetokoukku', label: 'Vetokoukku / lisävaruste' },
  { id: 'katsastus', label: 'Katsastus / pakokaasumittaus' },
  { id: 'sahko', label: 'Sähkö- tai hybridiauto' },
  { id: 'muu', label: 'Muu asia' },
]

export interface SubService {
  /** Anchor id on the service page */
  id: string
  /** Name as listed by the company */
  name: string
  text: string
  topic: TopicId
}

export interface Faq {
  q: string
  a: string
}

export type ServiceId = 'huolto' | 'korjaukset' | 'asennukset' | 'sahko' | 'pakettiautot'

export interface Service {
  id: ServiceId
  /** Path without base, no trailing slash */
  path: string
  /** Short label for menus and indexes */
  label: string
  /** Index number on the service plate */
  no: string
  art: ArtId
  eyebrow: string
  title: string
  /** One-line summary for indexes */
  summary: string
  lead: string
  need: { title: string; text: string }
  items: SubService[]
  signals: { title: string; list: string[] }
  note?: string
  faq: Faq[]
  topic: TopicId
  cta: string
  seo: { title: string; description: string }
}

export const services: Service[] = [
  {
    id: 'huolto',
    path: '/palvelut/maaraaikaishuolto',
    label: 'Määräaikaishuolto',
    no: '01',
    art: 'huolto',
    eyebrow: 'Huolto · öljyt · huoltokirja',
    title: 'Mercedes-Benzin määräaikaishuolto Joensuussa',
    summary: 'Huolto A ja B, pikahuolto, öljynvaihdot, akku, ilmastointi ja huoltomerkintä sähköiseen huoltokirjaan.',
    lead: 'Mittaristo muistuttaa huollosta – me hoidamme loput. Teemme Mercedes-Benz-henkilö- ja pakettiautojen määräaikaishuollot, pikahuollot ja öljynvaihdot sekä kirjaamme huollon auton sähköiseen huoltokirjaan.',
    need: {
      title: 'Huoltohistoria on Mersun arvokkain varuste',
      text: 'Säännöllinen huolto pitää auton luotettavana ja jälleenmyyntiarvon korkeana. Kun huolto tehdään merkkiin erikoistuneessa korjaamossa ja merkitään sähköiseen huoltokirjaan, seuraava ostaja näkee saman historian kuin sinä.',
    },
    items: [
      {
        id: 'maaraaikaishuollot',
        name: 'Määräaikaishuollot',
        text: 'Huolto A, huolto B ja vuosihuollot auton huolto-ohjelman mukaan. Kerro mittariston huoltoilmoitus, niin tiedämme, mitä huoltoon kuuluu.',
        topic: 'huolto',
      },
      {
        id: 'pikahuolto',
        name: 'Pikahuolto',
        text: 'Kevyempi perushuolto silloin, kun laajaa määräaikaishuoltoa ei vielä tarvita.',
        topic: 'oljy',
      },
      {
        id: 'oljynvaihdot',
        name: 'Öljynvaihdot',
        text: 'Moottoriöljyn ja öljynsuodattimen vaihto auton vaatimusten mukaisella öljyllä.',
        topic: 'oljy',
      },
      {
        id: 'huoltokirja',
        name: 'Sähköinen huoltokirja',
        text: 'Huoltomerkintä auton sähköiseen huoltokirjaan. Huoltohistoria pysyy yhtenäisenä ja helposti todennettavana myös autokaupassa.',
        topic: 'huolto',
      },
      {
        id: 'akkuhuolto',
        name: 'Akkuhuolto',
        text: 'Akun kunnon tarkistus ja vaihto ennen kuin pakkasaamu paljastaa heikon akun.',
        topic: 'akku',
      },
      {
        id: 'ilmastointi',
        name: 'Ilmastointihuolto ja -korjaukset',
        text: 'Ilmastoinnin huolto ja vianetsintä, kun viilennys heikkenee tai ikkunat huurtuvat herkästi.',
        topic: 'ilmastointi',
      },
      {
        id: 'pakokaasumittaus',
        name: 'Pakokaasunmittaus',
        text: 'Pakokaasupäästöjen mittaus esimerkiksi ennen katsastusta tai vianhaun tukena.',
        topic: 'katsastus',
      },
      {
        id: 'katsastuspalvelut',
        name: 'Katsastuspalvelut',
        text: 'Katsastukseen liittyvät palvelut. Kysy lisää, niin kerromme vaihtoehdot autollesi.',
        topic: 'katsastus',
      },
    ],
    signals: {
      title: 'Varaa huolto, kun',
      list: [
        'mittaristossa näkyy huoltoilmoitus, kuten ”Huolto A” tai ”Huolto B”',
        'edellisestä huollosta on kulunut vuosi tai huoltoväli on täynnä',
        'olet ostanut käytetyn Mercedeksen ja haluat aloittaa puhtaalta pöydältä',
        'akku on vanha tai ilmastointi ei enää viilennä kunnolla',
      ],
    },
    faq: [
      {
        q: 'Säilyykö uuden auton takuu, jos huollatan auton teillä?',
        a: 'EU:n kilpailusäännöt sallivat määräaikaishuoltojen teettämisen myös merkkiliikkeen ulkopuolella, kun huolto tehdään valmistajan ohjeiden mukaan. KL-ServicePartner-ketju kertoo huoltavansa autot valmistajan ohjeiden mukaisesti alkuperäislaatuisilla varaosilla. Valmistajan maksamat takuukorjaukset tehdään edelleen merkkiliikkeessä. Kerro auton takuutilanne, kun varaat ajan.',
      },
      {
        q: 'Mitä Mercedes-Benzin huolto maksaa?',
        a: 'Hinta riippuu mallista, moottorista ja huollon laajuudesta – A-huolto on suppeampi kuin B-huolto. Kerro rekisterinumero ja mittariston huoltoilmoitus, niin korjaamo voi kertoa hinnan juuri sinun autosi huollolle.',
      },
      {
        q: 'Mikä on sähköinen huoltokirja?',
        a: 'Se on auton valmistajan järjestelmään tallennettu huoltohistoria paperisen huoltokirjan sijaan. Merkintä kertoo, milloin ja millainen huolto autolle on tehty, mikä helpottaa myös auton myyntiä.',
      },
    ],
    topic: 'huolto',
    cta: 'Varaa määräaikaishuolto',
    seo: {
      title: 'Mercedes-Benz-määräaikaishuolto Joensuu – Huolto A ja B | MB-Autoasennuspalvelu',
      description:
        'Mercedes-Benzin määräaikaishuolto, pikahuolto ja öljynvaihto Joensuussa. Huolto A ja B, akku, ilmastointi ja merkintä sähköiseen huoltokirjaan.',
    },
  },
  {
    id: 'korjaukset',
    path: '/palvelut/vianhaku-ja-korjaukset',
    label: 'Vianhaku ja korjaukset',
    no: '02',
    art: 'vianhaku',
    eyebrow: 'Vikadiagnostiikka · korjaukset',
    title: 'Vianhaku ja korjaukset Mercedes-Benziin',
    summary: 'Vikadiagnostiikka, autosähkö, jarrut, jakoketjut ja -hihnat, automaattivaihteistot sekä iskunvaimentimet ja alusta.',
    lead: 'Vikavalo, kolina kylmäkäynnistyksessä tai nykivä vaihteisto? Ajantasainen vikadiagnostiikkalaitteisto ja Mercedes-Benziin erikoistunut korjaamo selvittävät, mistä on kyse – ja korjaavat sen.',
    need: {
      title: 'Vikakoodi kertoo, mistä etsiä – ei aina, mikä on rikki',
      text: 'Nykyaikainen Mercedes on täynnä ohjainlaitteita ja antureita. Siksi vianhaku alkaa vikakoodeista, mutta varsinainen syy paikannetaan mittaamalla ja tutkimalla. Merkkikohtainen kokemus auttaa tunnistamaan tyypilliset viat nopeammin.',
    },
    items: [
      {
        id: 'vikadiagnostiikka',
        name: 'Vikadiagnostiikka',
        text: 'Vikakoodien luku ja tulkinta ajantasaisella vikadiagnostiikkalaitteistolla sekä vian paikantaminen.',
        topic: 'vianhaku',
      },
      {
        id: 'autosahko',
        name: 'Autosähkötyöt',
        text: 'Valot, latausjärjestelmä, anturit, johdotukset ja sähköiset varusteet.',
        topic: 'akku',
      },
      {
        id: 'jarrut',
        name: 'Jarruhuollot',
        text: 'Jarrulevyjen ja -palojen vaihdot sekä jarrujen huolto, kun jarrut kirskuvat, täristävät tai poljin tuntuu oudolta.',
        topic: 'jarrut',
      },
      {
        id: 'jakoketju',
        name: 'Jakoketjun ja jakohihnan vaihdot',
        text: 'Moottorin ajoituksen kriittiset osat. Kolina kylmäkäynnistyksessä voi viitata venyneeseen jakoketjuun – asia kannattaa tarkistaa ajoissa.',
        topic: 'jakoketju',
      },
      {
        id: 'automaattivaihteisto',
        name: 'Automaattivaihteistojen huolto',
        text: 'Vaihteistoöljyn vaihto ja vianhaku, kun vaihteet vaihtuvat nykien, myöhässä tai auto luistaa.',
        topic: 'vaihteisto',
      },
      {
        id: 'alusta',
        name: 'Iskunvaimentimet ja alusta',
        text: 'Iskunvaimentimet, jouset ja alustan nivelet, kun auto pomppii, kolisee tai ei pidä ajolinjaa.',
        topic: 'alusta',
      },
    ],
    signals: {
      title: 'Ota yhteyttä, jos',
      list: [
        'mittaristoon on syttynyt vikavalo tai ilmoitus',
        'moottori kolisee käynnistettäessä tai käy epätasaisesti',
        'automaattivaihteisto nykii tai vaihtaa viiveellä',
        'jarrut kirskuvat, täristävät tai auto vetää jarrutettaessa',
        'alusta kolisee tai auto vaeltaa tiellä',
      ],
    },
    note: 'Jos punainen varoitusvalo palaa tai jarrut eivät toimi normaalisti, keskeytä ajo turvallisesti ja soita.',
    faq: [
      {
        q: 'Voiko autolla ajaa, kun vikavalo palaa?',
        a: 'Keltainen vikavalo tarkoittaa yleensä, että vika kannattaa tutkia pian. Punainen varoitusvalo tarkoittaa, että ajo kannattaa keskeyttää turvallisesti. Tarkista merkitys auton käyttöohjeesta ja soita, jos olet epävarma.',
      },
      {
        q: 'Mitä vianhaku maksaa?',
        a: 'Hinta riippuu vian laadusta ja siitä, kuinka paljon selvitystyötä tarvitaan. Kerro oireet, vikailmoitus ja rekisterinumero, niin korjaamo osaa arvioida tilanteen jo puhelimessa.',
      },
      {
        q: 'Korjaatteko myös pakettiautoja?',
        a: 'Kyllä. Huollamme ja korjaamme Mercedes-Benz-merkkiset henkilö- ja pakettiautot.',
      },
    ],
    topic: 'vianhaku',
    cta: 'Varaa vianhaku',
    seo: {
      title: 'Mercedes-Benz-vianhaku ja korjaukset Joensuu | MB-Autoasennuspalvelu',
      description:
        'Mercedes-Benzin vikadiagnostiikka ja korjaukset Joensuussa: autosähkö, jarrut, jakoketjut ja -hihnat, automaattivaihteistot ja alusta.',
    },
  },
  {
    id: 'asennukset',
    path: '/palvelut/lammittimet-ja-asennukset',
    label: 'Lämmittimet ja asennukset',
    no: '03',
    art: 'lammitin',
    eyebrow: 'Talvivarustus · asennukset',
    title: 'Lämmittimet, vetokoukut ja lisävarusteet',
    summary: 'Lohkolämmittimien asennus, alkuperäisten polttoainetoimisten lämmittimien huolto, vetokoukut ja lisävarusteet.',
    lead: 'Pohjois-Karjalan pakkasaamuna auto lähtee helpommin ja ikkunat ovat sulana, kun lämmitys toimii. Asennamme lohkolämmittimet ja vetokoukut sekä korjaamme ja huollamme alkuperäiset polttoainetoimiset lämmittimet.',
    need: {
      title: 'Talvi Joensuussa ei kysy, onko lämmitin kunnossa',
      text: 'Lämmin moottori käynnistyy helpommin ja kuluu vähemmän, ja lämmin sisätila tarkoittaa sulia ikkunoita heti lähtiessä. Lämmittimen kunto kannattaa tarkistaa ennen pakkasia – ei vasta ensimmäisenä kylmänä aamuna.',
    },
    items: [
      {
        id: 'lohkolammitin',
        name: 'Lohkolämmittimien asennus',
        text: 'Moottorin lohkolämmitin helpottaa kylmäkäynnistystä ja vähentää moottorin kulumista pakkasella.',
        topic: 'lammitin',
      },
      {
        id: 'polttoainelammitin',
        name: 'Alkuperäisten polttoainekäyttöisten lämmittimien korjaus ja huolto',
        text: 'Tehdasasenteisten polttoainetoimisten lisälämmittimien vianhaku, korjaus ja huolto.',
        topic: 'lammitin',
      },
      {
        id: 'vetokoukku',
        name: 'Vetokoukkujen asennus',
        text: 'Vetokoukun asennus peräkärryä, venettä tai asuntovaunua varten.',
        topic: 'vetokoukku',
      },
      {
        id: 'lisavarusteet',
        name: 'Lisävarusteiden asennus',
        text: 'Lisävarusteiden asennukset. Kysy, sopiiko toivomasi varuste autoosi.',
        topic: 'vetokoukku',
      },
    ],
    signals: {
      title: 'Hyvä hetki varata aika, kun',
      list: [
        'syksyn ensimmäiset pakkasyöt lähestyvät',
        'polttoainetoiminen lämmitin ei käynnisty tai sammuu kesken',
        'ostit Mersun ilman lohkolämmitintä',
        'kesän matkoille tarvitaan vetokoukku',
      ],
    },
    faq: [
      {
        q: 'Lohkolämmitin vai polttoainetoiminen lisälämmitin?',
        a: 'Lohkolämmitin tarvitsee sähköpistokkeen, ja se lämmittää moottoria. Polttoainetoiminen lämmitin toimii ilman verkkovirtaa ja voi lämmittää mallista riippuen myös sisätilan. Kerro, missä auto yöpyy ja miten sitä käytät, niin kerromme vaihtoehdot.',
      },
      {
        q: 'Huollatteko jälkiasennettuja lisälämmittimiä?',
        a: 'Palvelumme koskee alkuperäisiä, tehdasasenteisia polttoainetoimisia lämmittimiä. Kysy muista lämmittimistä puhelimitse.',
      },
    ],
    topic: 'lammitin',
    cta: 'Kysy asennusta',
    seo: {
      title: 'Lohkolämmitin, lisälämmitin ja vetokoukku Mercedes-Benziin Joensuu | MB-Autoasennuspalvelu',
      description:
        'Lohkolämmittimen asennus, alkuperäisten polttoainetoimisten lämmittimien huolto, vetokoukut ja lisävarusteet Mercedes-Benziin Joensuussa.',
    },
  },
  {
    id: 'sahko',
    path: '/palvelut/sahko-ja-hybridiautot',
    label: 'Sähkö- ja hybridiautot',
    no: '04',
    art: 'sahko',
    eyebrow: 'e-Pro · sähkö · hybridi',
    title: 'Sähkö- ja hybridi-Mercedesten huolto',
    summary: 'Sähkö- ja hybridiautojen huollot osana KL-ServicePartner-ketjun e-Pro-verkostoa.',
    lead: 'Sähköinen voimalinja ei poista huollon tarvetta: jarrut, alusta, ilmastointi ja hybridin polttomoottori kaipaavat huoltonsa. MB-Autoasennuspalvelu on mukana KL-ServicePartner-ketjun e-Pro-verkostossa, joka on erikoistunut hybridi- ja sähköautojen huoltoon.',
    need: {
      title: 'Sähköauto huolletaan valmistajan ohjeiden mukaan',
      text: 'Hybridi- ja sähköautojen huolto vaatii enemmän osaamista etenkin, kun työskennellään korkeajännitejärjestelmän lähellä. e-Pro-verkoston korjaamot tekevät työt autovalmistajien ohjeiden mukaisesti.',
    },
    items: [
      {
        id: 'sahkoautot',
        name: 'Sähköautot',
        text: 'Sähköautojen määräaikaishuollot sekä esimerkiksi jarrujen, alustan ja ilmastoinnin huollot.',
        topic: 'sahko',
      },
      {
        id: 'hybridiautot',
        name: 'Hybridiautot',
        text: 'Hybridiautojen huollot – myös polttomoottorin määräaikaishuollot – valmistajan ohjeiden mukaisesti.',
        topic: 'sahko',
      },
      {
        id: 'e-pro',
        name: 'e-Pro',
        text: 'e-Pro-korjaamoiden työt on jaettu kolmeen tasoon sen mukaan, tehdäänkö töitä korkeajännitejärjestelmässä. Kysy, mitkä työt teemme autollesi.',
        topic: 'sahko',
      },
    ],
    signals: {
      title: 'Kerro ajanvarauksessa',
      list: ['auton malli ja vuosimalli (esim. EQA, EQC tai C 300 e)', 'mittariston huoltoilmoitus tai vikailmoitus', 'mitä toivot tehtävän'],
    },
    faq: [
      {
        q: 'Säilyykö sähköauton takuu, jos huollatan sen teillä?',
        a: 'e-Pro-verkoston mukaan sen korjaamot tekevät huollot autovalmistajien ohjeiden mukaan, joten takuu pysyy voimassa ja auton arvo säilyy. Valmistajan maksamat takuukorjaukset tehdään merkkiliikkeessä. Kerro takuutilanne, kun varaat ajan.',
      },
      {
        q: 'Teettekö korkeajännitejärjestelmän töitä?',
        a: 'Se riippuu työn tasosta. Kerro auton malli ja mitä autolle pitää tehdä, niin kerromme suoraan, voidaanko työ tehdä meillä.',
      },
    ],
    topic: 'sahko',
    cta: 'Kysy sähköauton huoltoa',
    seo: {
      title: 'Sähkö- ja hybridi-Mercedesten huolto Joensuu – e-Pro | MB-Autoasennuspalvelu',
      description:
        'Mercedes-Benz-sähkö- ja hybridiautojen huollot Joensuussa osana KL-ServicePartner-ketjun e-Pro-verkostoa. Kysy, mitkä työt teemme autollesi.',
    },
  },
  {
    id: 'pakettiautot',
    path: '/pakettiautot',
    label: 'Pakettiautot',
    no: '05',
    art: 'pakettiauto',
    eyebrow: 'Yrityksille · pakettiautot',
    title: 'Mercedes-Benz-pakettiautojen huolto ja korjaus Joensuussa',
    summary: 'Sprinterit, Vitot ja muut Mercedes-Benz-pakettiautot: huollot, vianhaku, jakoketjut, vaihteistot, lämmittimet ja vetokoukut.',
    lead: 'Kun pakettiauto on työkalu, jokainen seisontapäivä maksaa. Huollamme ja korjaamme Mercedes-Benz-pakettiautot merkkiin erikoistuneella osaamisella – ja yhteys korjaamoon on suora.',
    need: {
      title: 'Työauton huolto, joka ymmärtää työn',
      text: 'Pakettiauto ajaa paljon, kantaa kuormaa ja käynnistyy pakkasella aamusta toiseen. Merkkikohtainen osaaminen auttaa huomaamaan kulumat ajoissa ja hoitamaan viat ennen kuin ne pysäyttävät työpäivän.',
    },
    items: [
      { id: 'huollot', name: 'Määräaikaishuollot', text: 'Huolto A ja B sekä öljynvaihdot huolto-ohjelman mukaan.', topic: 'huolto' },
      {
        id: 'vianhaku',
        name: 'Vikadiagnostiikka',
        text: 'Vikakoodien luku ja vian paikannus ajantasaisella vikadiagnostiikkalaitteistolla.',
        topic: 'vianhaku',
      },
      {
        id: 'jakoketju',
        name: 'Jakoketjun ja jakohihnan vaihdot',
        text: 'Paljon ajavassa autossa ajoituksen osien kunto kannattaa tarkistaa ajoissa.',
        topic: 'jakoketju',
      },
      {
        id: 'vaihteisto',
        name: 'Automaattivaihteistojen huolto',
        text: 'Vaihteistoöljyn vaihto ja vianhaku kuormaa kantavaan autoon.',
        topic: 'vaihteisto',
      },
      {
        id: 'jarrut-alusta',
        name: 'Jarrut, iskunvaimentimet ja alusta',
        text: 'Kuorma ja kilometrit kuluttavat jarruja ja alustaa – tarkistetaan ja korjataan.',
        topic: 'jarrut',
      },
      {
        id: 'lammittimet',
        name: 'Polttoainetoimiset lämmittimet',
        text: 'Alkuperäisten lisälämmittimien korjaus ja huolto ennen pakkasia.',
        topic: 'lammitin',
      },
      {
        id: 'vetokoukut',
        name: 'Vetokoukut ja lisävarusteet',
        text: 'Vetokoukkujen ja lisävarusteiden asennukset työn tarpeisiin.',
        topic: 'vetokoukku',
      },
      {
        id: 'pakokaasu',
        name: 'Pakokaasunmittaus',
        text: 'Päästömittaus esimerkiksi ennen katsastusta.',
        topic: 'katsastus',
      },
    ],
    signals: {
      title: 'Kerro yhteydenotossa',
      list: [
        'auton malli ja rekisterinumero',
        'montako autoa kalustossasi on, jos haluat sopia useamman auton huollot',
        'milloin auto on helpoimmin pois töistä',
      ],
    },
    faq: [
      {
        q: 'Huollatteko Sprinterit ja Vitot?',
        a: 'Huollamme ja korjaamme Mercedes-Benz-pakettiautoja. Kerro malli ja vuosimalli, niin varmistetaan saman tien, mitä autolle voidaan tehdä.',
      },
      {
        q: 'Voiko useamman auton huollot sopia kerralla?',
        a: 'Soita ja kerro kalustosi tarpeet, niin katsotaan huoltoajat yhdessä.',
      },
    ],
    topic: 'huolto',
    cta: 'Kysy huoltoaikaa pakettiautolle',
    seo: {
      title: 'Mercedes-Benz-pakettiautojen huolto Joensuu – Sprinter ja Vito | MB-Autoasennuspalvelu',
      description:
        'Mercedes-Benz-pakettiautojen huollot ja korjaukset Joensuussa: määräaikaishuollot, vikadiagnostiikka, jakoketjut, automaattivaihteistot, lämmittimet ja vetokoukut.',
    },
  },
]

export const serviceById = (id: ServiceId) => services.find((s) => s.id === id)!
/** Service pages under /palvelut (vans has its own top-level page). */
export const serviceGroups = services.filter((s) => s.id !== 'pakettiautot')
