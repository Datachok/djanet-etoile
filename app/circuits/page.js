import Link from "next/link";
import CircuitCard from "@/components/CircuitCard";
import Reveal from "@/components/Reveal";
import { CIRCUITS_LIST } from "@/lib/circuits";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Circuits — Djanet Étoile",
  description: "Nos expéditions au Tassili n'Ajjer et dans la Tadrart Rouge.",
};

export default function CircuitsPage() {
  return (
    <>
      <section className="pt-40 pb-16 section">
        <div className="container-x max-w-4xl">
          <Reveal>
            <p className="eyebrow mb-5">Expéditions</p>
            <h1 className="font-display text-5xl md:text-7xl text-balance leading-[1]">
              Deux itinéraires, <em className="text-ocre">une même promesse</em>.
            </h1>
            <p className="mt-8 text-night/70 text-lg leading-relaxed">
              Chaque circuit est conçu en petit groupe (4 à 10 voyageurs), avec
              guides Touaregs francophones, 4x4 logistique, et bivouacs
              soigneusement choisis pour préserver le silence du désert.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 section pt-0">
        <div className="container-x grid md:grid-cols-2 gap-8">
          {CIRCUITS_LIST.map((c, i) => (
            <CircuitCard key={c.slug} circuit={c} index={i} />
          ))}
        </div>
      </section>

      <section className="section bg-sand-100/60">
        <div className="container-x">
          <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto text-center">
            <Reveal>
              <p className="font-display text-5xl text-ocre">300€</p>
              <p className="mt-2 text-night/70 text-sm">Acompte / personne</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-display text-5xl text-ocre">4–10</p>
              <p className="mt-2 text-night/70 text-sm">Voyageurs par groupe</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-display text-5xl text-ocre">7–10</p>
              <p className="mt-2 text-night/70 text-sm">Jours d'immersion</p>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="mt-14 text-center">
              <Link href="/reservation" className="btn-primary">
                Réserver une expédition <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
