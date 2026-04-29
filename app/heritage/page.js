import Image from "next/image";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Héritage — Djanet Étoile",
  description:
    "Histoire des Touaregs, peintures rupestres du Tassili et héritage néolithique du Sahara.",
};

const SECTIONS = [
  {
    eyebrow: "Le peuple Touareg",
    title: "Les hommes bleus, gardiens du désert",
    text: `Les Kel Tamasheq — ceux qui parlent le tamasheq — peuplent le Sahara central depuis plus d'un millénaire. Une société matrilinéaire, lettrée (le tifinagh, leur écriture, est l'un des plus vieux alphabets vivants), profondément structurée autour de l'hospitalité, du silence et du voyage.\n\nLe chèche indigo, qui a longtemps déteint sur leur peau, leur a valu le surnom poétique d'« hommes bleus ». Mais derrière l'image, une réalité plus dense : poètes, philosophes, caravaniers, artisans, ils ont bâti et préservé la mémoire d'un Sahara qu'aucune carte ne peut totalement contenir.`,
    image: "/pics/heritage-touareg.jpg",
  },
  {
    eyebrow: "Tassili n'Ajjer",
    title: "Une cathédrale à ciel ouvert",
    text: `Classé patrimoine mondial de l'UNESCO depuis 1982, le Tassili n'Ajjer est l'un des plus vastes musées préhistoriques au monde. Plus de 15 000 peintures et gravures rupestres, échelonnées sur près de 12 000 ans, racontent les métamorphoses du Sahara — de la savane verdoyante au désert minéral.\n\nGirafes, éléphants, troupeaux de bovidés, scènes de chasse, danses rituelles : ces fresques, peintes à l'ocre, au kaolin et au charbon, sont les premières archives visuelles de l'humanité africaine.`,
    image: "/pics/heritage-rupestre.jpg",
  },
  {
    eyebrow: "Néolithique saharien",
    title: "Quand le Sahara était vert",
    text: `Il y a 10 000 ans, ce qui est aujourd'hui un océan de sable et de pierre était une terre généreuse, parsemée de lacs et de rivières. Les premiers pasteurs du Sahara y vivaient, élevaient bovins et caprins, peignaient leurs croyances sur les parois des grottes.\n\nLa "période bovidienne" (-7000 à -3000 av. J.-C.) reste l'âge d'or de l'art rupestre saharien. Puis vint la grande aridification, et avec elle, l'exode vers le Nil et la naissance des grandes civilisations africaines.`,
    image: "/pics/heritage-erg.jpg",
  },
  {
    eyebrow: "Tadrart Rouge",
    title: "Le sublime à l'état brut",
    text: `Au sud-est de Djanet, la Tadrart est une forêt de grès rouge sculptée par 100 millions d'années d'érosion. Ses arches, ses cathédrales, ses ergs ondulants en font l'un des paysages les plus photographiés — et pourtant les moins fréquentés — du Sahara.\n\nC'est ici que les caravanes Kel Ajjer puisaient l'eau aux gueltas cachées, et que les peuples bovidiens ont laissé certaines de leurs plus belles gravures.`,
    image: "/pics/heritage-tadrart.jpg",
  },
];

export default function HeritagePage() {
  return (
    <>
      <section className="relative pt-40 pb-20 section overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-sunset-gradient opacity-50" />
        <div className="container-x max-w-4xl">
          <Reveal>
            <p className="eyebrow mb-5">Héritage</p>
            <h1 className="font-display text-5xl md:text-7xl text-balance leading-[1]">
              Une mémoire <em className="text-ocre">millénaire</em>,
              <br />
              à fleur de pierre.
            </h1>
            <p className="mt-8 text-night/75 text-lg leading-relaxed">
              Voyager au Sahara algérien, c'est traverser plusieurs strates
              d'histoire en une seule journée. Du néolithique aux Touaregs
              contemporains, le désert n'a jamais cessé d'écrire.
            </p>
          </Reveal>
        </div>
      </section>

      {SECTIONS.map((s, i) => (
        <section
          key={s.title}
          className={`section ${i % 2 === 1 ? "bg-sand-100/60" : ""}`}
        >
          <div
            className={`container-x grid lg:grid-cols-2 gap-14 items-center ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Reveal>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="eyebrow mb-3">{s.eyebrow}</p>
              <h2 className="font-display text-4xl md:text-5xl text-balance leading-tight">
                {s.title}
              </h2>
              <div className="mt-6 space-y-5 text-night/75 leading-relaxed whitespace-pre-line">
                {s.text}
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="section bg-night text-ivory">
        <div className="container-x max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow text-ocre-light mb-4">Tifinagh</p>
            <h2 className="font-display text-4xl md:text-5xl text-balance leading-tight">
              « Aman iman » — l'eau, c'est la vie.
            </h2>
            <p className="mt-6 text-ivory/70 leading-relaxed">
              Un proverbe Touareg, gravé dans chaque geste du désert. Voyager
              ici, c'est apprendre à mesurer ce qu'on possède en silence, en
              eau, et en regards.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
