import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Carousel from "@/components/Carousel";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "L'équipe — Djanet Étoile",
  description: "L'équipe Touareg derrière Djanet Étoile.",
};

const TEAM = [
  {
    name: "Mohamed",
    role: "Guide principal · Fondateur",
    bio: "Né à Djanet, Mohamed a grandi entre les caravanes et les bivouacs. Il guide les expéditions Tassili et Tadrart depuis plus de 15 ans.",
  },
  {
    name: "Ibrahim",
    role: "Guide & cuisinier",
    bio: "Maître du feu et du méchoui. Ibrahim partage à chaque étape la cuisine Touarègue traditionnelle, du taguella au thé à la menthe.",
  },
  {
    name: "Linda",
    role: "Coordination & accueil",
    bio: "Côté logistique : visa, vols domestiques, hébergement à Alger. Linda accompagne chaque voyageur de la première question au retour.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-40 pb-16 section">
        <div className="container-x max-w-4xl">
          <Reveal>
            <p className="eyebrow mb-5">À propos</p>
            <h1 className="font-display text-5xl md:text-7xl text-balance leading-[1]">
              Une <em className="text-ocre">famille</em> au service du désert.
            </h1>
            <p className="mt-8 text-night/75 text-lg leading-relaxed">
              Djanet Étoile est née d'un constat : le Sahara algérien — sans
              doute le plus beau désert du monde — reste l'un des moins connus.
              Nous sommes une petite équipe, Touaregs et passionnés, qui
              concevons chaque voyage comme une rencontre. Pas comme un
              produit.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <Carousel
              aspect="aspect-[16/10] md:aspect-[2.4/1]"
              showCaption
              slides={[
                {
                  src: "/pics/team-1.jpg",
                  alt: "Mohamed et Ibrahim, guides Touaregs",
                  caption: "L'équipe, en plein Tassili.",
                },
                {
                  src: "/pics/team-2.jpg",
                  alt: "Guide Touareg en 4x4 au coucher du soleil",
                  caption: "Sur la piste, à l'heure dorée.",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="section bg-sand-100/60">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-4">L'équipe</p>
            <h2 className="font-display text-4xl md:text-5xl max-w-2xl text-balance">
              Trois visages, mille trajets dans le désert.
            </h2>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <div className="h-full p-8 rounded-3xl bg-white border border-sand-200 hover:border-ocre/40 transition">
                  <div className="w-16 h-16 rounded-full bg-ocre/15 text-ocre flex items-center justify-center font-display text-2xl">
                    {m.name[0]}
                  </div>
                  <h3 className="mt-6 font-display text-2xl">{m.name}</h3>
                  <p className="text-sm text-ocre uppercase tracking-[0.15em] mt-1">
                    {m.role}
                  </p>
                  <p className="mt-4 text-night/70 leading-relaxed text-sm">
                    {m.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid lg:grid-cols-2 gap-14">
          <Reveal>
            <p className="eyebrow mb-4">Notre philosophie</p>
            <h2 className="font-display text-4xl md:text-5xl text-balance leading-tight">
              Voyager moins. Voyager mieux.
            </h2>
            <div className="mt-6 space-y-5 text-night/70 leading-relaxed">
              <p>
                Petits groupes, guides locaux, retombées directes pour les
                familles, respect strict des sites rupestres et des
                campements. Nous ne croyons pas au tourisme de masse. Nous
                croyons à la lenteur, au silence, et à la rencontre.
              </p>
              <p>
                Chaque voyageur reçoit en amont un livret de préparation,
                rédigé à la main : visa, vaccins, conseils, lectures, code de
                conduite. C'est la moindre des choses, quand on s'apprête à
                marcher dans une si vieille mémoire.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="/pics/heritage-rocheuse.jpg"
                alt="Sahara"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <div className="rounded-[2.5rem] bg-night-gradient text-ivory p-10 md:p-16 text-center">
              <h2 className="font-display text-4xl md:text-5xl text-balance leading-tight">
                Une question, un projet&nbsp;?
              </h2>
              <p className="mt-4 text-ivory/70 max-w-xl mx-auto">
                Nous répondons à chaque message dans la journée. Voyages sur
                mesure, dates spéciales, groupes privés.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:contact@djanet-etoile.com"
                  className="btn-primary bg-ocre hover:bg-ocre-light"
                >
                  Nous écrire <ArrowRight size={18} />
                </a>
                <Link href="/reservation" className="btn-ghost text-ivory hover:bg-ivory/10">
                  Réserver une expédition
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
