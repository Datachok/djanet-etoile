import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { CIRCUITS, CIRCUITS_LIST, PACKING_LIST, SEASON } from "@/lib/circuits";
import {
  ArrowRight,
  Check,
  X as XIcon,
  Clock,
  Users,
  Activity,
  MapPin,
} from "lucide-react";

export function generateStaticParams() {
  return CIRCUITS_LIST.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const c = CIRCUITS[params.slug];
  if (!c) return {};
  return {
    title: `${c.title} — Djanet Étoile`,
    description: c.tagline,
    openGraph: { images: [c.hero] },
  };
}

export default function CircuitDetail({ params }) {
  const circuit = CIRCUITS[params.slug];
  if (!circuit) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[80svh] min-h-[560px] w-full overflow-hidden">
        <Image
          src={circuit.hero}
          alt={circuit.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/30 to-night/85" />
        <div className="relative z-10 h-full container-x px-6 md:px-10 lg:px-16 flex flex-col justify-end pb-16 md:pb-24 text-ivory">
          <p className="uppercase tracking-[0.3em] text-xs text-ocre-light mb-5">
            Expédition · Sahara algérien
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] text-balance max-w-4xl">
            {circuit.title}
          </h1>
          <p className="mt-6 text-ivory/80 text-lg md:text-xl max-w-2xl">
            {circuit.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ivory/85">
            <span className="inline-flex items-center gap-2"><Clock size={16} /> {circuit.duration}</span>
            <span className="inline-flex items-center gap-2"><Users size={16} /> {circuit.group}</span>
            <span className="inline-flex items-center gap-2"><Activity size={16} /> {circuit.difficulty}</span>
            <span className="inline-flex items-center gap-2"><MapPin size={16} /> Tassili n'Ajjer</span>
            <span className="inline-flex items-center gap-2 text-ocre-light">Saison · {SEASON}</span>
          </div>
        </div>
      </section>

      {/* Description + booking card */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-[1.5fr_1fr] gap-14">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">L'expédition</p>
              <h2 className="font-display text-3xl md:text-5xl text-balance leading-tight">
                Une lecture intime du désert.
              </h2>
              <p className="mt-8 text-night/75 text-lg leading-relaxed">
                {circuit.description}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="mt-14 font-display text-2xl md:text-3xl">
                Temps forts
              </h3>
              <ul className="mt-6 space-y-3">
                {circuit.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-night/75 leading-relaxed"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-ocre shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <aside className="sticky top-28 rounded-3xl card-surface p-8 shadow-xl shadow-night/5">
              <p className="text-xs uppercase tracking-[0.25em] text-ocre">
                Expédition
              </p>
              <p className="font-display text-3xl mt-2 leading-tight">
                {circuit.title}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-sand-100 p-3">
                  <p className="text-night/60">Durée</p>
                  <p className="font-medium">{circuit.duration}</p>
                </div>
                <div className="rounded-xl bg-sand-100 p-3">
                  <p className="text-night/60">Niveau</p>
                  <p className="font-medium">{circuit.difficulty}</p>
                </div>
                <div className="rounded-xl bg-sand-100 p-3">
                  <p className="text-night/60">Groupe</p>
                  <p className="font-medium">{circuit.group}</p>
                </div>
                <div className="rounded-xl bg-sand-100 p-3">
                  <p className="text-night/60">Départs</p>
                  <p className="font-medium">Toute l'année</p>
                </div>
              </div>

              <Link
                href={`/reservation?circuit=${circuit.slug}`}
                className="btn-primary w-full mt-6"
              >
                Réserver ma place <ArrowRight size={16} />
              </Link>

              <p className="mt-5 text-xs text-night/55 leading-relaxed">
                Devis personnalisé selon la saison et le nombre de voyageurs.
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Itinerary */}
      <section className="section bg-sand-100/60 dark:bg-white/[0.02]">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-4">Itinéraire</p>
            <h2 className="font-display text-4xl md:text-5xl max-w-2xl text-balance">
              Jour après jour, un voyage qui se déplie.
            </h2>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-2 gap-x-12 gap-y-10">
            {circuit.itinerary.map((step, i) => (
              <Reveal key={step.day} delay={(i % 2) * 0.1}>
                <div className="border-l-2 border-ocre/30 pl-6 hover:border-ocre transition">
                  <p className="text-xs uppercase tracking-[0.25em] text-ocre">
                    {step.day}
                  </p>
                  <h3 className="mt-2 font-display text-2xl">{step.title}</h3>
                  <p className="mt-2 text-night/70 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Inclus / non inclus */}
      <section className="section">
        <div className="container-x grid md:grid-cols-2 gap-10">
          <Reveal>
            <div className="rounded-3xl card-surface p-10">
              <h3 className="font-display text-2xl md:text-3xl">Inclus</h3>
              <ul className="mt-6 space-y-3">
                {circuit.included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-night/75"
                  >
                    <Check size={18} className="text-ocre mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-night text-ivory p-10">
              <h3 className="font-display text-2xl md:text-3xl">Non inclus</h3>
              <ul className="mt-6 space-y-3">
                {circuit.notIncluded.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-ivory/80"
                  >
                    <XIcon size={18} className="text-ocre-light mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="grid md:grid-cols-3 gap-4">
            {circuit.gallery.map((src, i) => (
              <Reveal key={src} delay={i * 0.08}>
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                  <Image
                    src={src}
                    alt={`${circuit.title} ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Préparer son voyage — packing list + accessibilité */}
      <section className="section bg-sand-100/60 dark:bg-white/[0.02]">
        <div className="container-x">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 items-start">
            <Reveal>
              <p className="eyebrow mb-4">Préparer son voyage</p>
              <h2 className="font-display text-3xl md:text-5xl text-balance leading-tight">
                Confort, mobilité et adaptabilité.
              </h2>
              <div className="mt-8 space-y-5 text-night/75 leading-relaxed">
                <p>
                  <strong>Mobilité.</strong> Le circuit se fait en véhicules
                  4x4 durant tout le séjour, pour un transport fluide à
                  travers les paysages désertiques.
                </p>
                <p>
                  <strong>Adaptabilité.</strong> Programme convenable pour
                  toute catégorie d'âge entre 5 et 70 ans, avec un minimum
                  de bonne condition physique pour les marches.
                </p>
                <p>
                  <strong>Saison.</strong>{" "}
                  <span className="text-ocre">{SEASON}</span> — la fenêtre
                  optimale pour profiter du désert dans les meilleures
                  conditions climatiques.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <h3 className="font-display text-2xl md:text-3xl mb-6">
                Équipez-vous pour l'aventure
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {PACKING_LIST.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl card-surface p-5 hover:border-ocre/40 transition"
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-night/65 mt-1 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <div className="rounded-[2.5rem] bg-night-gradient text-ivory p-10 md:p-16 text-center">
              <h2 className="font-display text-4xl md:text-5xl text-balance leading-tight">
                Embarquez pour {circuit.title}.
              </h2>
              <p className="mt-4 text-ivory/70 max-w-xl mx-auto">
                Petits groupes, places limitées. Notre équipe revient vers
                vous sous 24h pour finaliser votre voyage.
              </p>
              <Link
                href={`/reservation?circuit=${circuit.slug}`}
                className="btn-primary mt-8 bg-ocre hover:bg-ocre-light"
              >
                Réserver ma place <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
