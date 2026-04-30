import Reveal from "@/components/Reveal";
import DonationForm from "@/components/DonationForm";
import Carousel from "@/components/Carousel";
import { Droplet, GraduationCap, Tent, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "Humanitaire — Djanet Étoile",
  description:
    "Nos actions auprès des communautés Touaregs : puits, écoles, préservation. Faites un don.",
};

const PROJECTS = [
  {
    icon: Droplet,
    title: "Forage de puits",
    text: "Accès à l'eau pour les campements nomades isolés du Tassili.",
    progress: 72,
  },
  {
    icon: GraduationCap,
    title: "École de Bordj El Haouas",
    text: "Fournitures scolaires et bourses pour 60 enfants Touaregs.",
    progress: 45,
  },
  {
    icon: Tent,
    title: "Préservation des sites",
    text: "Sensibilisation au respect des sites rupestres classés UNESCO.",
    progress: 60,
  },
  {
    icon: HeartHandshake,
    title: "Aide aux familles",
    text: "Soutien direct aux familles de guides en cas de coup dur.",
    progress: 30,
  },
];

export default function HumanitairePage() {
  return (
    <>
      <section className="relative pt-40 pb-20 section overflow-hidden">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <p className="eyebrow mb-5">Humanitaire</p>
            <h1 className="font-display text-5xl md:text-6xl text-balance leading-[1.05]">
              Voyager <em className="text-ocre">utile</em>.
              <br />
              Soutenir ce qui rend le voyage possible.
            </h1>
            <p className="mt-6 text-night/75 text-lg leading-relaxed">
              Sans les communautés Touaregs, le Sahara que nous traversons
              n'existerait pas. Une partie de chaque expédition, et 100% des
              dons reçus, financent des projets concrets, choisis et conduits
              avec les habitants eux-mêmes.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <Carousel
              aspect="aspect-[5/4]"
              slides={[
                {
                  src: "/pics/humanitaire-1.jpg",
                  alt: "Rencontre avec un enfant Touareg",
                },
                {
                  src: "/pics/humanitaire-2.jpg",
                  alt: "Marché artisanal Touareg, échange avec les familles",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="section bg-sand-100/60">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-4">Nos engagements</p>
            <h2 className="font-display text-4xl md:text-5xl max-w-2xl text-balance">
              Quatre projets, suivis sur le terrain.
            </h2>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="p-8 rounded-3xl bg-white border border-sand-200 hover:border-ocre/40 transition">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-ocre/10 text-ocre flex items-center justify-center shrink-0">
                      <p.icon size={22} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl">{p.title}</h3>
                      <p className="mt-2 text-night/70 leading-relaxed">
                        {p.text}
                      </p>
                      <div className="mt-5">
                        <div className="flex justify-between text-xs text-night/60 mb-2">
                          <span>Avancement</span>
                          <span className="text-ocre font-medium">
                            {p.progress}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-sand-200 overflow-hidden">
                          <div
                            className="h-full bg-ocre rounded-full transition-all"
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid lg:grid-cols-[1fr_1.2fr] gap-14">
          <Reveal>
            <p className="eyebrow mb-4">Faire un don</p>
            <h2 className="font-display text-4xl md:text-5xl text-balance leading-tight">
              Chaque euro <em className="text-ocre">change quelque chose</em>.
            </h2>
            <div className="mt-8 space-y-4 text-night/70 leading-relaxed">
              <p>
                <strong className="text-night">25€</strong> — un cartable et
                des fournitures pour un enfant.
              </p>
              <p>
                <strong className="text-night">50€</strong> — un mois de
                soutien à une famille de guide.
              </p>
              <p>
                <strong className="text-night">100€</strong> — un mètre de
                forage de puits dans le désert.
              </p>
              <p>
                <strong className="text-night">250€+</strong> — une journée de
                travaux complète sur un projet.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-3xl bg-white border border-sand-200 p-8 md:p-10 shadow-xl shadow-night/5">
              <DonationForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
