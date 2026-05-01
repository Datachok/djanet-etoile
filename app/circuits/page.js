import Link from "next/link";
import CircuitCard from "@/components/CircuitCard";
import Reveal from "@/components/Reveal";
import { CIRCUITS_LIST, SEASON } from "@/lib/circuits";
import { ArrowRight, Download, FileText } from "lucide-react";

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
      {/* Bloc téléchargement du programme PDF — bien visible avant les cartes */}
      <section className="pb-12 section pt-0">
        <div className="container-x">
          <Reveal>
            <a
              href="/programme-djanet-etoile.pdf"
              download
              className="group block rounded-3xl p-6 md:p-8 bg-night-gradient text-ivory relative overflow-hidden hover:shadow-2xl hover:shadow-ocre/20 transition-shadow"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-ocre/30 rounded-full blur-3xl" />
              <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-ocre/15 text-ocre-light flex items-center justify-center shrink-0 ring-1 ring-ocre/30">
                  <FileText size={36} />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.25em] text-ocre-light mb-2">
                    Programme officiel · {SEASON}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl leading-tight">
                    Téléchargez le programme complet des expéditions
                  </h3>
                  <p className="mt-2 text-ivory/70 text-sm md:text-base max-w-2xl">
                    Itinéraires détaillés des deux circuits, équipement à
                    prévoir, accueil à Djanet, contacts. PDF — 27 Mo.
                  </p>
                </div>
                <span className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-ocre text-ivory font-medium tracking-wide group-hover:bg-ocre-light group-hover:scale-[1.03] transition-all shrink-0">
                  <Download size={18} /> Télécharger
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </section>



      <section className="section bg-sand-100/60 dark:bg-white/[0.02]">
        <div className="container-x">
          <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto text-center">
            <Reveal>
              <p className="font-display text-5xl text-ocre">4–10</p>
              <p className="mt-2 text-night/70 text-sm">Voyageurs par groupe</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-display text-5xl text-ocre">7–10</p>
              <p className="mt-2 text-night/70 text-sm">Jours d'immersion</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-display text-5xl text-ocre">100%</p>
              <p className="mt-2 text-night/70 text-sm">Guides Touaregs francophones</p>
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
