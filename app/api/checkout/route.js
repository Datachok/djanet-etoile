import { NextResponse } from "next/server";
import { getStripe, DEPOSIT_PER_PERSON_EUR } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { CIRCUITS } from "@/lib/circuits";
import { getSiteUrl } from "@/lib/site-url";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      circuit,
      circuitTitle,
      people,
      date,
      firstName,
      lastName,
      email,
      phone,
      country,
      notes,
    } = body;

    if (!circuit || !CIRCUITS[circuit]) {
      return NextResponse.json({ error: "Circuit invalide." }, { status: 400 });
    }
    const nb = Math.min(10, Math.max(1, Number(people) || 1));
    const amountEur = DEPOSIT_PER_PERSON_EUR * nb;

    const siteUrl = getSiteUrl(req);

    // Pre-create reservation as pending
    let reservationId = null;
    try {
      const sb = supabaseAdmin();
      const { data, error } = await sb
        .from("reservations")
        .insert({
          circuit_slug: circuit,
          circuit_title: circuitTitle || CIRCUITS[circuit].title,
          people: nb,
          departure_date: date || null,
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          country,
          notes: notes || null,
          deposit_amount_eur: amountEur,
          status: "pending",
        })
        .select("id")
        .single();
      if (error) {
        console.error("[checkout] Supabase insert error:", error);
      } else {
        reservationId = data.id;
      }
    } catch (e) {
      // Supabase missing/misconfigured — don't block payment, but log loudly
      console.error("[checkout] Supabase admin client failed:", e.message);
    }

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Acompte — ${CIRCUITS[circuit].title}`,
              description: `${nb} voyageur(s) × 300€ · départ ${date || "à définir"}`,
            },
            unit_amount: DEPOSIT_PER_PERSON_EUR * 100,
          },
          quantity: nb,
        },
      ],
      metadata: {
        type: "booking",
        reservation_id: reservationId || "",
        circuit,
        people: String(nb),
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        country,
        departure_date: date || "",
      },
      success_url: `${siteUrl}/success?type=booking&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/reservation?cancelled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("checkout error:", err);
    return NextResponse.json(
      { error: err.message || "Erreur de paiement" },
      { status: 500 }
    );
  }
}
