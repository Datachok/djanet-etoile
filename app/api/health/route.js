import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/health — Diagnostic endpoint.
 * Tells you whether Supabase env + tables are reachable from this deploy.
 * Safe to leave in prod; returns no data, only counts and the configured URL.
 */
export async function GET() {
  const env = {
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: !!process.env.STRIPE_WEBHOOK_SECRET,
  };

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || null;
  const result = { env, supabaseUrl, tables: {} };

  try {
    const sb = supabaseAdmin();

    const { count: donationsCount, error: dErr } = await sb
      .from("donations")
      .select("*", { count: "exact", head: true });
    result.tables.donations = dErr
      ? { ok: false, error: dErr.message, code: dErr.code }
      : { ok: true, count: donationsCount };

    const { count: reservationsCount, error: rErr } = await sb
      .from("reservations")
      .select("*", { count: "exact", head: true });
    result.tables.reservations = rErr
      ? { ok: false, error: rErr.message, code: rErr.code }
      : { ok: true, count: reservationsCount };
  } catch (e) {
    result.error = e.message;
  }

  return NextResponse.json(result, { status: 200 });
}
