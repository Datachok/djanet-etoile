import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { amount, name, email, message } = await req.json();
    const amt = Math.max(5, Math.min(100000, Number(amount) || 0));

    if (!email || !name) {
      return NextResponse.json({ error: "Nom et email requis." }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    let donationId = null;
    try {
      const sb = supabaseAdmin();
      const { data, error } = await sb
        .from("donations")
        .insert({
          name,
          email,
          message: message || null,
          amount_eur: amt,
          status: "pending",
        })
        .select("id")
        .single();
      if (!error) donationId = data.id;
    } catch (e) {
      console.warn("Supabase insert (donation) failed:", e.message);
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
              name: "Don — Djanet Étoile (humanitaire)",
              description: "Soutien aux projets Touaregs (puits, écoles, familles).",
            },
            unit_amount: amt * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "donation",
        donation_id: donationId || "",
        name,
        email,
        message: message || "",
      },
      success_url: `${siteUrl}/success?type=donation&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/humanitaire?cancelled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("donate error:", err);
    return NextResponse.json(
      { error: err.message || "Erreur" },
      { status: 500 }
    );
  }
}
