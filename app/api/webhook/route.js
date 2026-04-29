import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const raw = await req.text();

  let event;
  try {
    event = getStripe().webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const meta = session.metadata || {};
    const sb = supabaseAdmin();

    try {
      if (meta.type === "donation") {
        if (meta.donation_id) {
          await sb
            .from("donations")
            .update({
              status: "paid",
              stripe_session_id: session.id,
              stripe_payment_intent: session.payment_intent,
              paid_at: new Date().toISOString(),
            })
            .eq("id", meta.donation_id);
        } else {
          await sb.from("donations").insert({
            name: meta.name,
            email: meta.email || session.customer_details?.email,
            message: meta.message || null,
            amount_eur: (session.amount_total || 0) / 100,
            status: "paid",
            stripe_session_id: session.id,
            stripe_payment_intent: session.payment_intent,
            paid_at: new Date().toISOString(),
          });
        }
      } else {
        // booking
        if (meta.reservation_id) {
          await sb
            .from("reservations")
            .update({
              status: "confirmed",
              stripe_session_id: session.id,
              stripe_payment_intent: session.payment_intent,
              paid_at: new Date().toISOString(),
            })
            .eq("id", meta.reservation_id);
        } else {
          await sb.from("reservations").insert({
            circuit_slug: meta.circuit,
            circuit_title: meta.circuit,
            people: Number(meta.people || 1),
            departure_date: meta.departure_date || null,
            first_name: meta.first_name,
            last_name: meta.last_name,
            email: meta.email || session.customer_details?.email,
            phone: meta.phone,
            country: meta.country,
            deposit_amount_eur: (session.amount_total || 0) / 100,
            status: "confirmed",
            stripe_session_id: session.id,
            stripe_payment_intent: session.payment_intent,
            paid_at: new Date().toISOString(),
          });
        }
      }
    } catch (err) {
      console.error("Supabase update failed:", err.message);
    }
  }

  return NextResponse.json({ received: true });
}
