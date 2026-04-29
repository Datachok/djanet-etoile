"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle, Loader2, Check } from "lucide-react";
import { CIRCUITS_LIST } from "@/lib/circuits";

const DEPOSIT = 300;

export default function BookingForm() {
  const params = useSearchParams();
  const initialCircuit = params.get("circuit") || CIRCUITS_LIST[0].slug;

  const [circuitSlug, setCircuitSlug] = useState(initialCircuit);
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [notes, setNotes] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [acceptedDjanet, setAcceptedDjanet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setCircuitSlug(initialCircuit);
  }, [initialCircuit]);

  const circuit = useMemo(
    () => CIRCUITS_LIST.find((c) => c.slug === circuitSlug) || CIRCUITS_LIST[0],
    [circuitSlug]
  );
  const total = DEPOSIT * people;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!accepted || !acceptedDjanet) {
      setError("Merci d'accepter les conditions et l'avertissement vols.");
      return;
    }
    if (!date) {
      setError("Merci de choisir une date de départ souhaitée.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          circuit: circuit.slug,
          circuitTitle: circuit.title,
          people,
          date,
          firstName,
          lastName,
          email,
          phone,
          country,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur de paiement");
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1.3fr_1fr] gap-10">
      <div className="space-y-6">
        <div>
          <label className="label">Expédition</label>
          <div className="grid sm:grid-cols-2 gap-3">
            {CIRCUITS_LIST.map((c) => (
              <button
                type="button"
                key={c.slug}
                onClick={() => setCircuitSlug(c.slug)}
                className={`text-left p-5 rounded-2xl border transition ${
                  circuitSlug === c.slug
                    ? "border-ocre bg-ocre/5 ring-1 ring-ocre"
                    : "border-sand-300 bg-white/70 hover:border-ocre/60"
                }`}
              >
                <p className="font-display text-xl">{c.title}</p>
                <p className="text-sm text-night/60 mt-1">{c.duration}</p>
                <p className="text-sm text-ocre mt-2">dès {c.priceFrom}€/pers.</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Nombre de voyageurs</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPeople((p) => Math.max(1, p - 1))}
                className="w-12 h-12 rounded-2xl border border-sand-300 hover:border-ocre transition"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                max={10}
                value={people}
                onChange={(e) =>
                  setPeople(Math.min(10, Math.max(1, Number(e.target.value) || 1)))
                }
                className="input text-center flex-1"
              />
              <button
                type="button"
                onClick={() => setPeople((p) => Math.min(10, p + 1))}
                className="w-12 h-12 rounded-2xl border border-sand-300 hover:border-ocre transition"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="label">Date de départ souhaitée</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input"
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Prénom</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
              required
            />
          </div>
          <div>
            <label className="label">Nom</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
          <div>
            <label className="label">Téléphone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>

        <div>
          <label className="label">Pays de résidence</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="input"
            placeholder="France, Belgique, Canada…"
            required
          />
        </div>

        <div>
          <label className="label">Notes (allergies, expérience, attentes)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="input resize-none"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-amber-50 border border-amber-200 p-5"
        >
          <div className="flex gap-3">
            <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900 leading-relaxed">
              <p className="font-medium">Avertissement vols Djanet</p>
              <p className="mt-1 text-amber-900/85">
                Si votre arrivée ou votre retour tombe le jour du vol Djanet,
                <strong> contactez-nous avant l'achat de vos billets</strong>.
                Les horaires et la sécurité d'acheminement nécessitent une
                coordination préalable.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-3">
          <label className="flex gap-3 items-start cursor-pointer">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 accent-ocre w-4 h-4"
            />
            <span className="text-sm text-night/75 leading-relaxed">
              J'accepte les conditions : acompte de 300€ par personne{" "}
              <strong>non remboursable</strong> (annulation, vol, refus de
              visa). Report possible selon disponibilité.
            </span>
          </label>

          <label className="flex gap-3 items-start cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedDjanet}
              onChange={(e) => setAcceptedDjanet(e.target.checked)}
              className="mt-1 accent-ocre w-4 h-4"
            />
            <span className="text-sm text-night/75 leading-relaxed">
              Je m'engage à <strong>vous contacter avant d'acheter mes
              billets</strong> si mon arrivée ou retour tombe le jour du vol
              Djanet.
            </span>
          </label>
        </div>

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {error}
          </p>
        )}
      </div>

      <aside className="lg:sticky lg:top-28 self-start rounded-3xl bg-night text-ivory p-8 shadow-2xl shadow-night/20">
        <p className="text-xs uppercase tracking-[0.25em] text-ocre-light">
          Récapitulatif
        </p>
        <h3 className="font-display text-3xl mt-2">{circuit.title}</h3>
        <p className="text-ivory/65 mt-1 text-sm">{circuit.duration}</p>

        <div className="mt-8 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-ivory/65">Voyageurs</span>
            <span>{people}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ivory/65">Acompte / pers.</span>
            <span>{DEPOSIT}€</span>
          </div>
          {date && (
            <div className="flex justify-between">
              <span className="text-ivory/65">Date souhaitée</span>
              <span>{date}</span>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-ivory/10 flex justify-between items-end">
          <span className="text-ivory/65 text-sm">Total acompte</span>
          <span className="font-display text-4xl">{total}€</span>
        </div>

        <p className="mt-3 text-xs text-ivory/55">
          Solde réglé sur place à Alger ou Djanet.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full mt-8 bg-ocre hover:bg-ocre-light disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Redirection Stripe…
            </>
          ) : (
            <>
              <Check size={18} /> Payer l'acompte ({total}€)
            </>
          )}
        </button>

        <p className="mt-4 text-[11px] text-ivory/45 text-center">
          Paiement sécurisé via Stripe · Confirmation par email
        </p>
      </aside>
    </form>
  );
}
