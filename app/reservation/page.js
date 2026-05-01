import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Réservation — Djanet Étoile",
  description:
    "Réservez votre expédition Sahara avec un acompte de 300€/personne. Solde sur place.",
};

export default function ReservationPage() {
  return (
    <>
      <section className="pt-40 pb-12 section">
        <div className="container-x max-w-4xl">
          <Reveal>
            <p className="eyebrow mb-5">Réservation</p>
            <h1 className="font-display text-5xl md:text-6xl text-balance leading-[1.05]">
              Réservez votre place — <em className="text-ocre">300€</em> d'acompte par voyageur.
            </h1>
            <p className="mt-6 text-night/70 text-lg leading-relaxed">
              Le solde est réglé sur place à Alger ou à Djanet. Acompte non
              remboursable. Report possible selon disponibilité.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-28 section pt-0">
        <div className="container-x">
          <Reveal>
            <div className="rounded-3xl card-surface p-8 md:p-12 shadow-xl shadow-night/5">
              <Suspense fallback={<p className="text-night/60">Chargement…</p>}>
                <BookingForm />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
