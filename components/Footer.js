import Link from "next/link";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import AgadezCross from "@/components/AgadezCross";

export default function Footer() {
  return (
    <footer className="bg-night text-ivory relative dark:bg-[#08060d]">
      <div className="container-x px-6 md:px-10 lg:px-16 py-20 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4">
            <span className="text-ocre-light">
              <AgadezCross size={88} strokeWidth={2.2} animateIn={false} />
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-display font-semibold">Djanet</span>
              <span className="text-4xl font-display italic text-ocre-light">
                Étoile
              </span>
            </div>
          </div>
          <p className="mt-4 max-w-md text-ivory/65 leading-relaxed">
            Expéditions Touaregs au cœur du Sahara algérien. Le désert, comme
            personne ne vous l'a raconté.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://instagram.com/djanet.etoile"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram @djanet.etoile"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-ivory/10 hover:bg-ocre transition text-sm"
            >
              <Instagram size={16} />
              <span>@djanet.etoile</span>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.2em] text-ocre-light mb-4">
            Explorer
          </h4>
          <ul className="space-y-3 text-ivory/75">
            <li><Link href="/circuits" className="hover:text-ocre-light">Circuits</Link></li>
            <li><Link href="/heritage" className="hover:text-ocre-light">Héritage</Link></li>
            <li><Link href="/humanitaire" className="hover:text-ocre-light">Humanitaire</Link></li>
            <li><Link href="/about" className="hover:text-ocre-light">L'équipe</Link></li>
            <li><Link href="/reservation" className="hover:text-ocre-light">Réserver</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.2em] text-ocre-light mb-4">
            Contact
          </h4>
          <ul className="space-y-3 text-ivory/75">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-1 shrink-0" /> Djanet, Tassili n'Ajjer, Algérie</li>
            <li className="flex items-center gap-2"><Phone size={16} /> <a href="tel:+33781076743" className="hover:text-ocre-light">+33 7 81 07 67 43</a></li>
            <li className="flex items-center gap-2"><Mail size={16} /> <a href="mailto:contact@djanet-etoile.com" className="hover:text-ocre-light break-all">contact@djanet-etoile.com</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-x px-6 md:px-10 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ivory/50">
          <p>© {new Date().getFullYear()} Djanet Étoile — Tous droits réservés.</p>
          <p>Conditions générales disponibles sur demande.</p>
        </div>
      </div>
    </footer>
  );
}
