/**
 * Programmes officiels — extraits de la présentation Djanet Étoile.
 * Saison touristique : Octobre 2026 — Mai 2027
 * Trajet : Alger / Djanet / Alger
 */
export const SEASON = "Octobre 2026 — Mai 2027";

export const INCLUDED_DEFAULT = [
  "Transferts aéroportuaires (accueil à l'aéroport de Djanet)",
  "Transport en véhicules 4x4 pendant tout le séjour",
  "Pension complète : petit-déjeuner, déjeuner et dîner",
  "Matériel de bivouac (matelas, couvertures)",
  "Visites, randonnées et expéditions guidées",
  "Soirées musicales Touaregs tous les jours",
];

export const NOT_INCLUDED_DEFAULT = [
  "Vols internationaux et domestiques (Alger ↔ Djanet)",
  "Visa algérien et assurance voyage",
  "Sac de couchage personnel",
  "Boissons supplémentaires et achats personnels",
];

export const PACKING_LIST = [
  { icon: "🏕️", title: "Sac de couchage", text: "Confortable, essentiel pour des nuits reposantes." },
  { icon: "🎒", title: "Sac à dos 50L", text: "Idéal pour transporter vos affaires en bivouac." },
  { icon: "💧", title: "Gourde isotherme", text: "Pour rester hydraté dans le désert chaud." },
  { icon: "🧥", title: "Vêtements adaptés", text: "Chauds et légers — fortes variations de température." },
  { icon: "🧰", title: "Trousse personnelle", text: "Médicaments, toilette, chargeurs." },
];

export const CIRCUITS = {
  essandilene: {
    slug: "essandilene",
    title: "Oasis d'Ihrir & Essandilène",
    tagline: "6 jours au cœur du Tassili — guelta, palmeraie cachée et art rupestre",
    duration: "6 jours / 5 nuits",
    difficulty: "Modérée",
    group: "4 à 10 voyageurs",
    age: "5 à 70 ans",
    season: SEASON,
    hero: "/pics/circuit-essandilene-1.jpg",
    gallery: [
      "/pics/circuit-essandilene-1.jpg",
      "/pics/circuit-essandilene-2.jpg",
      "/pics/circuit-essandilene-3.jpg",
    ],
    description:
      "Un voyage contemplatif au Tassili n'Ajjer : accueil chaleureux à Djanet, traversées en 4x4 entre cathédrales de grès, baignade à la guelta d'Essandilène, nuits dans l'oasis cachée d'Ihrir, et rencontre avec l'art rupestre millénaire de Tin-Taghert. Petits groupes, guides Touaregs francophones.",
    highlights: [
      "Vallée d'Essandilène — paysages, formations rocheuses, marche vers la guelta",
      "Oasis d'Ihrir — palmeraie isolée, refuge ancestral des Kel Ajjer",
      "Musée de Bordj-El-Houas — culture et histoire Touaregs",
      "Gravures rupestres de Tin-Taghert",
      "Bivouac dans les dunes d'Erg Admer",
      "Route panoramique le long de l'erg jusqu'à Tifartassen",
    ],
    itinerary: [
      {
        day: "Jour 1",
        title: "Accueil à Djanet",
        text: "Arrivée à Djanet, accueil chaleureux à l'aéroport, visite du musée pour les formalités. Déjeuner à Taghen, route vers le bivouac à Tikobauin.",
      },
      {
        day: "Jour 2",
        title: "Vallée d'Essandilène",
        text: "Découverte de la grande vallée d'Essandilène, paysages impressionnants et formations rocheuses uniques. Marche vers la guelta pour apprécier la nature environnante.",
      },
      {
        day: "Jour 3",
        title: "Immersion culturelle",
        text: "Visite du musée de Bordj-El-Houas, à la rencontre de l'histoire et de la culture Touaregs. Installation pour la nuit à l'Oasis d'Ihrir.",
      },
      {
        day: "Jour 4",
        title: "Art rupestre & Erg Admer",
        text: "Exploration des fascinantes gravures rupestres de Tin-Taghert, témoins d'une riche histoire. Bivouac dans les dunes d'Erg Admer pour une expérience inoubliable au cœur du désert.",
      },
      {
        day: "Jour 5",
        title: "Voyage le long de l'erg",
        text: "Route panoramique inoubliable le long de l'erg vers Tifartassen, paysages à couper le souffle. Bivouac confortable à Tegharghart.",
      },
      {
        day: "Jour 6",
        title: "Retour à Djanet",
        text: "Dernière matinée dans le désert, retour vers Djanet, transfert à l'aéroport pour le vol retour.",
      },
    ],
    included: INCLUDED_DEFAULT,
    notIncluded: NOT_INCLUDED_DEFAULT,
  },

  tadrart: {
    slug: "tadrart",
    title: "Tadrart Rouge",
    tagline:
      "7 jours d'expédition au plus beau désert du monde — treks de 3h/jour, dunes, arches et canyons",
    duration: "7 jours / 6 nuits",
    difficulty: "Soutenue",
    group: "4 à 8 voyageurs",
    age: "À partir de 12 ans (bonne condition physique)",
    season: SEASON,
    hero: "/pics/circuit-tadrart-1.jpg",
    gallery: [
      "/pics/circuit-tadrart-1.jpg",
      "/pics/circuit-tadrart-2.jpg",
      "/pics/circuit-tadrart-3.jpg",
    ],
    description:
      "L'expédition signature de Djanet Étoile : sept jours d'immersion totale dans la Tadrart Rouge. Trek de 3h chaque matin, transferts en 4x4, bivouacs dans les ergs et au pied des arches. De l'art rupestre ancien aux dunes noires d'Adjalati, en passant par l'Arche Africaine et le Cirque, c'est le grand voyage Touareg.",
    highlights: [
      "Art rupestre d'Elbradj — civilisations passées",
      "Mer de sable d'Intefalghagh & dunes de Marcaoindi",
      "L'Arche Africaine et le rocher d'Ecanasei",
      "Le Cirque — canyon impressionnant — et le \"rocher de la Coupe du Monde\"",
      "Dunes de sable noir d'Adjalati à Tehé-Thosyat",
      "Souk de Djanet — artisanat Touareg",
    ],
    itinerary: [
      {
        day: "Jour 1",
        title: "Arrivée à Djanet — Oued Amaïs",
        text: "Accueil chaleureux par les guides Touaregs. Départ en 4x4 vers Oued Amaïs pour un déjeuner traditionnel, puis installation du bivouac à Elbradj.",
      },
      {
        day: "Jour 2",
        title: "Art rupestre & Marcaoindi",
        text: "Trek de 3 heures pour explorer l'art rupestre ancien, témoin des civilisations passées. Trajet en 4x4 vers Marcaoindi pour un bivouac inoubliable dans les dunes.",
      },
      {
        day: "Jour 3",
        title: "Mer de Sable",
        text: "Marche de 3 heures vers Intefalghagh, continuation en 4x4. Déjeuner savoureux à Ouan-Zewatan, bivouac à In-Tehak.",
      },
      {
        day: "Jour 4",
        title: "L'Arche Africaine",
        text: "Trek de 3h vers l'Arche Africaine, déjeuner à Bouhadienne. Visite du rocher d'Ecanasei et bivouac dans les dunes de Timerzouga.",
      },
      {
        day: "Jour 5",
        title: "Le Cirque & Coupe du Monde",
        text: "Exploration du canyon impressionnant — le « Cirque » — lors d'un trek de 3 heures vers le « rocher de la Coupe du Monde ». Déjeuner à Ounnagan, bivouac à In-Taborak.",
      },
      {
        day: "Jour 6",
        title: "Dunes Noires d'Adjalati",
        text: "Exploration des dunes de sable noir d'Adjalati. Trek de 3h jusqu'à Tehé-Thosyat. Départ vers Tissatka pour un bivouac inoubliable.",
      },
      {
        day: "Jour 7",
        title: "Djanet, ville et souk",
        text: "Court trek matinal avant le retour à Djanet. Exploration de la ville et du souk — souvenirs uniques et artisanat local. Transfert vers l'aéroport.",
      },
    ],
    included: INCLUDED_DEFAULT,
    notIncluded: NOT_INCLUDED_DEFAULT,
  },
};

export const CIRCUITS_LIST = Object.values(CIRCUITS);
