import Stripe from "stripe";

let _stripe = null;

export function getStripe() {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY missing. Add it to .env.local before calling Stripe."
    );
  }
  _stripe = new Stripe(key, { apiVersion: "2024-09-30.acacia" });
  return _stripe;
}

export const DEPOSIT_PER_PERSON_EUR = 300;
