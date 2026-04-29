import { createClient } from "@supabase/supabase-js";

let _public = null;

export function supabase() {
  if (_public) return _public;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error("Supabase env vars missing.");
  }
  _public = createClient(url, anon);
  return _public;
}

export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !service) {
    throw new Error("Supabase admin env vars missing.");
  }
  return createClient(url, service, { auth: { persistSession: false } });
}
