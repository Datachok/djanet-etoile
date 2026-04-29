# Djanet Étoile

Site de réservation d'expéditions Touaregs au Sahara algérien.
**Next.js 14 (App Router) · Tailwind · Supabase · Stripe · Framer Motion.**

## Installation

```bash
npm install
cp .env.local.example .env.local
# Renseigner Supabase + Stripe dans .env.local
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Configuration Supabase
pwd : VdL5kWfsJV3kP_s
1. Créer un projet sur [supabase.com](https://supabase.com).
2. Dans **SQL Editor**, exécuter [`supabase/schema.sql`](supabase/schema.sql).
3. Récupérer dans **Project Settings → API** :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (côté serveur uniquement — ne jamais exposer)

## Configuration Stripe

1. Sur [stripe.com](https://dashboard.stripe.com), récupérer :
   - `STRIPE_SECRET_KEY` (sk_test_…)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk_test_…)
2. Créer un webhook pointant vers `https://votre-domaine.com/api/webhook` :
   - événement : `checkout.session.completed`
   - récupérer `STRIPE_WEBHOOK_SECRET` (whsec_…)
3. Pour tester en local :
   ```bash
   stripe login
   stripe listen --forward-to localhost:3000/api/webhook
   ```
   Le CLI affiche un `whsec_…` à mettre dans `.env.local`.

## Architecture

```
app/
  layout.js / globals.css     # Layout global + design system "Luxury Desert"
  page.js                     # Home — Hero immersif, valeurs, circuits, CTA
  circuits/
    page.js                   # Liste des expéditions
    [slug]/page.js            # Détail (Essandilène, Tadrart) — itinéraire, inclus/non, galerie
  heritage/page.js            # Touaregs, Tassili, néolithique, Tadrart
  humanitaire/page.js         # 4 projets + formulaire de don
  about/page.js               # Équipe, philosophie
  reservation/page.js         # Formulaire de réservation + Stripe
  success/page.js             # Confirmation
  api/
    checkout/route.js         # Crée la Checkout Session (booking)
    donate/route.js           # Crée la Checkout Session (donation)
    webhook/route.js          # Met à jour Supabase après paiement

components/
  Navbar, Footer, Hero, CircuitCard, Reveal, BookingForm, DonationForm

lib/
  supabase.js   # client public + supabaseAdmin() service role
  stripe.js     # client + DEPOSIT_PER_PERSON_EUR = 300
  circuits.js   # contenu structuré des deux circuits

supabase/schema.sql   # Tables reservations + donations + RLS
public/pics/          # Photos (placeholders)
```

## Logique de paiement

- **Acompte fixe** : 300€/personne (`lib/stripe.js`).
- À la soumission du formulaire :
  1. La réservation est créée dans Supabase avec `status = pending`.
  2. Une Checkout Session Stripe est créée, `metadata.reservation_id` injecté.
  3. L'utilisateur est redirigé vers Stripe.
- Sur `checkout.session.completed`, le webhook met `status = confirmed` + stocke `stripe_session_id` et `paid_at`.
- Le solde est réglé sur place — pas géré par le site.

## Conditions affichées (réservation)

- « Acompte non remboursable (annulation, vol, refus de visa). Report possible selon disponibilité. »
- ⚠️ Avertissement vols Djanet : « Si arrivée/retour le jour du vol Djanet, contactez-nous avant l'achat des billets. »

Les deux cases à cocher sont **bloquantes** dans `components/BookingForm.js`.

## Déploiement

Vercel (recommandé) — connecter le repo, ajouter les variables d'env, déployer.
Penser à mettre à jour l'URL du webhook Stripe avec le domaine de production.

## Personnalisation rapide

- Contenu des circuits : [`lib/circuits.js`](lib/circuits.js)
- Palette / typo : [`tailwind.config.js`](tailwind.config.js)
- Montant de l'acompte : [`lib/stripe.js`](lib/stripe.js) — `DEPOSIT_PER_PERSON_EUR`
- Liens / contact : [`components/Footer.js`](components/Footer.js)
