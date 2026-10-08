/**
 * Conteúdo do site — tudo em um só lugar.
 * Textos em italiano. Itens marcados com TODO ainda precisam ser confirmados com a família.
 */

export const SITE = {
  url: "https://www.pogliorobertovini.com",
  company: "Azienda Agricola Vitivinicola Poglio Roberto",
  brand: "Poglio Roberto",
  town: "Castelnuovo Calcea",
  province: "AT",
  region: "Piemonte",
};

/** Contatos. `null` = ainda não temos; o site mostra um marcador. */
export const CONTACT = {
  address: "Via Angelo Brofferio, 43" as string | null, // TODO: confirmar "Via" e o número
  zip: "14040",
  phoneDisplay: "+39 345 886 7026" as string | null,
  whatsapp: "393458867026" as string | null, // TODO: confirmar que o mesmo número tem WhatsApp
  email: "pogliorobertovini@gmail.com" as string | null,
  emailTrade: "pogliorobertovini@gmail.com" as string | null, // TODO: separar, se houver e-mail só para importadores
  instagram: "https://www.instagram.com/poglio.roberto.vini/" as string | null,
  instagramHandle: "@poglio.roberto.vini",
  vat: null as string | null, // TODO: P. IVA
};

/** Vídeo da abertura (drone). Quando houver, coloque o arquivo em /public/video e informe aqui. */
export const HERO = {
  video: null as string | null, // ex. "/video/vigneto.mp4"
  poster: "/images/vigna-neve.webp",
};

export const NAV = [
  { href: "#storia", label: "Storia" },
  { href: "#territorio", label: "Territorio" },
  { href: "#vini", label: "Vini" },
  { href: "#visite", label: "Visite" },
  { href: "#contatti", label: "Contatti" },
];

export const TIMELINE = [
  {
    when: "Primi dell'Ottocento",
    text: "Giovanni Poglio, «Vanin», pianta le sue viti a Castelnuovo Calcea.",
  },
  {
    when: "Di padre in figlio",
    text: "La vigna passa di padre in figlio, senza fermarsi mai.",
  },
  {
    when: "1979",
    text: "178 anni di lavoro ininterrotto: il premio della Camera di Commercio di Asti.",
  },
  {
    when: "Oggi",
    text: "Siamo ancora qui, sulla stessa collina.",
  },
];

export const STATS = [
  { value: 7, prefix: "~", label: "ettari di vigneto" },
  { value: 4, prefix: "", label: "vitigni" },
  { value: 1800, prefix: "", label: "dal primo Ottocento" },
];

export const STEPS = [
  {
    n: "I",
    title: "La vigna",
    text: "Solo uve dei nostri vigneti. Chilometro zero, davvero.",
    img: "/images/grappolo.webp",
    alt: "Un grappolo di uva scura tra le foglie di vite",
    pos: "40% 45%",
  },
  {
    n: "II",
    title: "La vendemmia",
    text: "Vendemmiamo a mano, scegliendo ogni grappolo.",
    img: "/images/vendemmia.webp",
    alt: "Cassette rosse piene di grappoli appena vendemmiati",
    pos: "50% 35%",
  },
  {
    n: "III",
    title: "La cantina",
    text: "Nell'antico monastero: acciaio a temperatura controllata.",
    img: "/images/cantina.webp",
    alt: "La cantina con i serbatoi in acciaio sotto le volte in mattoni",
    pos: "40% 50%",
  },
];

export type Wine = {
  id: string;
  name: string;
  denom: string;
  grape: string | null;
  type: string;
  year: string | null;
  text: string;
  /** textura da garrafa 3D: rótulo + etiqueta, fundo transparente */
  label: string;
  /** contrarrótulo (costas da garrafa) */
  back: string;
  /** cor da cápsula */
  capsule: string;
  /** cor do vinho dentro da garrafa */
  liquid: string;
  /** cor da etiqueta (para o ponto na lista) */
  tag: string;
};

export const WINES: Wine[] = [
  {
    id: "la-bruciata",
    name: "La Bruciata",
    denom: "Barbera d'Asti DOCG",
    grape: "Barbera",
    type: "Rosso",
    year: "2020", // TODO: confirmar a annata (o rótulo de prova diz 2020; a foto antiga dizia 2023)
    text: "Il vino che porta il nome della collina. Barbera d'Asti dalle vigne ad anfiteatro di Castelnuovo Calcea.",
    label: "/labels/bruciata-label.webp",
    back: "/labels/bruciata-back.webp",
    capsule: "#1a1714",
    liquid: "#2a0710",
    tag: "#a50b33",
  },
  {
    id: "il-frutteto",
    name: "Il Frutteto",
    denom: "Cortese dell'Alto Monferrato DOC",
    grape: "Cortese",
    type: "Bianco",
    year: "2020", // TODO: confirmar a annata
    text: "Il nostro bianco, fresco e diretto, da bere giovane.",
    label: "/labels/frutteto-label.webp",
    back: "/labels/frutteto-back.webp",
    capsule: "#c9c6be",
    liquid: "#b9a24a",
    tag: "#3f5e1e",
  },
  {
    id: "il-chiostro",
    name: "Il Chiostro",
    denom: "Grignolino d'Asti DOC",
    grape: "Grignolino",
    type: "Rosso",
    year: "2020", // TODO: confirmar a annata
    text: "Grignolino d'Asti: il rosso chiaro e vivace della tradizione astigiana.",
    label: "/labels/chiostro-label.webp",
    back: "/labels/chiostro-back.webp",
    capsule: "#8a2840",
    liquid: "#5a1424",
    tag: "#8a2840",
  },
  {
    id: "ca-bianca",
    name: "Ca' Bianca",
    denom: "Monferrato DOC Nebbiolo",
    grape: "Nebbiolo",
    type: "Rosso",
    year: "2020", // TODO: confirmar nome (antes era "Anfiteatro") e annata
    text: "Nebbiolo del Monferrato, dalla nostra collina di Castelnuovo Calcea.",
    label: "/labels/cabianca-label.webp",
    back: "/labels/cabianca-back.webp",
    capsule: "#571e36",
    liquid: "#3a0c1a",
    tag: "#571e36",
  },
  {
    id: "nonu-vanin",
    name: "Nonu Vanin",
    denom: "Piemonte DOC Barbera",
    grape: "Barbera",
    type: "Rosso",
    year: "2023",
    text: "Dedicato al nonno Vanin: una Barbera del Piemonte di tutti i giorni.",
    label: "/labels/nonu-label.webp",
    back: "/labels/nonu-back.webp",
    capsule: "#151515",
    liquid: "#2a0710",
    tag: "#2b2e36",
  },
];

/** Pontos do mapa em % do SVG (viewBox 500×646; projeção calibrada nos limites do mapa). */
export const MAP_POINTS = [
  { id: "castelnuovo", label: "Castelnuovo Calcea", x: 15.56, y: 21.17, main: true, side: "br" },
  { id: "asti", label: "Asti", x: 14.76, y: 19.85, main: false, side: "t" },
  { id: "torino", label: "Torino", x: 10.56, y: 18.42, main: false, side: "l" },
  { id: "milano", label: "Milano", x: 22.66, y: 15.17, main: false, side: "r" },
] as const;

export function whatsappUrl(message: string) {
  const text = encodeURIComponent(message);
  return CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}?text=${text}` : `https://wa.me/?text=${text}`;
}

export function mailtoUrl(to: string | null, subject: string, body = "") {
  const q = `subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
  return `mailto:${to ?? ""}?${q}`;
}

export const VISIT_MESSAGE =
  "Buongiorno, vorrei prenotare una visita in cantina. Saremo in … persone, e ci piacerebbe venire il giorno … Grazie!";
