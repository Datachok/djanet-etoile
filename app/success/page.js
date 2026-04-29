import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Confirmation — Djanet Étoile",
  description: "Votre réservation est confirmée.",
};

export default function SuccessPage({ searchParams }) {
  const type = searchParams?.type === "donation" ? "donation" : "booking";
  return (
    <section className="min-h-[80vh] flex items-center pt-32 section">
      <div className="container-x max-w-2xl text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-ocre/15 text-ocre flex items-center justify-center">
          <CheckCircle2 size={36} />
        </div>
        <h1 className="mt-8 font-display text-5xl md:text-6xl text-balance leading-tight">
          {type === "donation" ? "Merci pour votre don." : "Votre place est réservée."}
        </h1>
        <p className="mt-6 text-night/70 text-lg leading-relaxed">
          {type === "donation"
            ? "Votre don finance directement les projets humanitaires avec les communautés Touaregs. Un reçu vous a été envoyé par email."
            : "Nous venons de vous envoyer un email de confirmation avec les prochaines étapes : préparation, visa, vols domestiques, et coordination de votre arrivée à Djanet."}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">
            Retour à l'accueil <ArrowRight size={18} />
          </Link>
          <Link href="/heritage" className="btn-secondary">
            Découvrir l'héritage
          </Link>
        </div>
      </div>
    </section>
  );
}
