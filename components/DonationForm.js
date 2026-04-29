"use client";

import { useState } from "react";
import { Heart, Loader2 } from "lucide-react";

const PRESETS = [25, 50, 100, 250];

export default function DonationForm() {
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const finalAmount = custom ? Number(custom) : amount;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!finalAmount || finalAmount < 5) {
      setError("Le don minimum est de 5€.");
      return;
    }
    if (!email || !name) {
      setError("Merci de renseigner votre nom et votre email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount, name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="label">Montant du don</label>
        <div className="grid grid-cols-4 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setAmount(p);
                setCustom("");
              }}
              className={`py-3 rounded-2xl border transition ${
                !custom && amount === p
                  ? "border-ocre bg-ocre text-ivory"
                  : "border-sand-300 bg-white/70 hover:border-ocre/60"
              }`}
            >
              {p}€
            </button>
          ))}
        </div>
        <input
          type="number"
          min="5"
          placeholder="Autre montant (€)"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          className="input mt-3"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Nom</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
          />
        </div>
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
      </div>

      <div>
        <label className="label">Message (optionnel)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="input resize-none"
          placeholder="Un mot pour les bénéficiaires…"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full bg-ocre hover:bg-ocre-light disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Redirection…
          </>
        ) : (
          <>
            <Heart size={18} /> Faire un don de {finalAmount || 0}€
          </>
        )}
      </button>

      <p className="text-xs text-night/55 text-center">
        Paiement sécurisé via Stripe. 100% des dons sont alloués aux projets
        humanitaires Touaregs.
      </p>
    </form>
  );
}
