import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import CircuitCard from "@/components/CircuitCard";
import Reveal from "@/components/Reveal";
import Carousel from "@/components/Carousel";
import { CIRCUITS_LIST } from "@/lib/circuits";
import { ArrowRight, Compass, Heart, Mountain, Stars } from "lucide-react";

const VALUES = [
  {
    icon: Compass,
    title: "Guides Touaregs",
    text: "Des hommes nés du désert, qui en connaissent chaque souffle, chaque pierre, chaque silence.",
  },
  {
    icon: Stars,
    title: "Bivouacs étoilés",
    text: "Nuits à la belle étoile sur le sable doré, sous l'une des voûtes célestes les plus pures du monde.",
  },
  {
    icon: Mountain,
    title: "Sites classés UNESCO",
    text: "Tassili n'Ajjer, Tadrart : musées à ciel ouvert de l'humanité, accessibles seulement avec autorisation.",
  },
  {
    icon: Heart,
    title: "Tourisme régénératif",
    text: "Une part de chaque expédition finance des projets locaux : puits, écoles, préservation des sites.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Intro */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="eyebrow mb-4">Djanet Étoile</p>
            <h2 className="font-display text-4xl md:text-6xl text-night text-balance leading-[1.05]">
              Le Sahara algérien, <em className="text-ocre">en confidence</em>.
            </h2>
            <div className="mt-8 space-y-5 text-night/75 text-lg leading-relaxed">
              <p>
                Djanet est un seuil. À l'extrême sud de l'Algérie, là où
                commencent le Tassili n'Ajjer et la Tadrart, le désert n'est
                plus une carte postale : c'est une présence.
              </p>
              <p>
                Nous concevons des expéditions courtes en groupe, longues en
                expérience. Vous voyagez avec des guides Touaregs francophones,
                au plus près d'un patrimoine vivant — et vous repartez avec une
                empreinte qui ne s'efface pas.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/circuits" className="btn-primary">
                Voir les circuits <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="btn-secondary">
                Notre équipe
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="/pics/hero-5.jpg"
                alt="Voyage Sahara"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-sand-100/50">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-4">Notre signature</p>
            <h2 className="font-display text-4xl md:text-5xl max-w-2xl text-balance">
              Quatre engagements, une seule ambition&nbsp;: vous offrir le
              désert dans sa vérité.
            </h2>
          </Reveal>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="h-full p-8 rounded-3xl bg-white/70 border border-sand-200 hover:border-ocre/40 hover:-translate-y-1 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-ocre/10 text-ocre flex items-center justify-center">
                    <v.icon size={22} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl">{v.title}</h3>
                  <p className="mt-3 text-night/65 text-sm leading-relaxed">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Circuits */}
      <section className="section">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <Reveal>
              <p className="eyebrow mb-4">Nos expéditions</p>
              <h2 className="font-display text-4xl md:text-5xl max-w-xl text-balance">
                Deux circuits, deux visages du Sahara.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/circuits"
                className="inline-flex items-center gap-2 text-ocre hover:gap-3 transition-all"
              >
                Tous les circuits <ArrowRight size={18} />
              </Link>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {CIRCUITS_LIST.map((c, i) => (
              <CircuitCard key={c.slug} circuit={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Heritage teaser */}
      <section className="relative section bg-night text-ivory overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/pics/heritage-rupestre.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/85 to-night/40" />

        <div className="relative container-x grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="eyebrow text-ocre-light mb-4">Héritage</p>
            <h2 className="font-display text-4xl md:text-6xl text-balance leading-[1.05]">
              12 000 ans <em className="italic text-ocre-light">d'humanité</em>
              <br />
              gravés dans la pierre.
            </h2>
            <p className="mt-6 text-ivory/75 text-lg max-w-xl leading-relaxed">
              Le Tassili abrite l'une des plus grandes concentrations d'art
              rupestre au monde — des fresques néolithiques aux gravures
              touarègues. Une histoire qui ne s'enseigne pas, qui se ressent.
            </p>
            <div className="mt-10">
              <Link
                href="/heritage"
                className="inline-flex items-center gap-2 text-ocre-light hover:gap-3 transition-all"
              >
                Explorer l'héritage <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Galerie carrousel */}
      <section className="section">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <Reveal>
              <p className="eyebrow mb-4">Galerie</p>
              <h2 className="font-display text-4xl md:text-5xl max-w-xl text-balance">
                Le Sahara, en images.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-night/65 max-w-md leading-relaxed">
                Quelques instantanés rapportés par nos voyageurs et nos guides.
                Chaque cliché, une journée d'expédition.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <Carousel
              aspect="aspect-[16/10] md:aspect-[2.4/1]"
              showCaption
              slides={[
                { src: "/pics/hero-3.jpg", alt: "Touareg dans le rétroviseur du 4x4", caption: "Sur la piste, le silence en mouvement." },
                { src: "/pics/hero-4.jpg", alt: "Voyageurs dans les dunes", caption: "Au sommet d'un erg, les heures s'arrêtent." },
                { src: "/pics/circuit-tadrart-2.jpg", alt: "Cathédrales de grès — Tadrart", caption: "Les cathédrales de grès, après 100 millions d'années." },
                { src: "/pics/heritage-rocheuse.jpg", alt: "Vallée du Tassili", caption: "Vallée taillée par les anciens fleuves du Sahara vert." },
                { src: "/pics/circuit-essandilene-3.jpg", alt: "Oasis d'Essandilène", caption: "Une oasis cachée — l'eau, c'est la vie." },
                { src: "/pics/heritage-touareg.jpg", alt: "Coucher de soleil sur les ergs", caption: "Le silence du soir." },
                { src: "/pics/team-2.jpg", alt: "Guide Touareg en fin de journée", caption: "Nos guides, l'âme du voyage." },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <div className="rounded-[2.5rem] bg-night-gradient p-10 md:p-16 text-ivory relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-ocre/30 rounded-full blur-3xl" />
              <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 items-end">
                <div>
                  <p className="eyebrow text-ocre-light mb-4">Prêt à partir ?</p>
                  <h2 className="font-display text-4xl md:text-6xl text-balance leading-[1.05]">
                    Réservez votre place dans le désert.
                  </h2>
                  <p className="mt-6 text-ivory/70 max-w-xl">
                    Petits groupes, dates limitées. Notre équipe vous
                    accompagne du premier message au retour.
                  </p>
                </div>
                <div className="flex lg:justify-end">
                  <Link href="/reservation" className="btn-primary bg-ocre hover:bg-ocre-light">
                    Réserver maintenant <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
