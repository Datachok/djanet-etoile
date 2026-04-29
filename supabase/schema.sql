-- Djanet Étoile — Supabase schema
-- Run in the Supabase SQL editor.

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  paid_at timestamptz,

  circuit_slug text not null,
  circuit_title text,
  people int not null check (people between 1 and 20),
  departure_date date,

  first_name text,
  last_name text,
  email text not null,
  phone text,
  country text,
  notes text,

  deposit_amount_eur int not null,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled','refunded')),

  stripe_session_id text,
  stripe_payment_intent text
);

create index if not exists reservations_email_idx on public.reservations(email);
create index if not exists reservations_status_idx on public.reservations(status);
create index if not exists reservations_created_idx on public.reservations(created_at desc);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  paid_at timestamptz,

  name text,
  email text not null,
  message text,

  amount_eur int not null check (amount_eur >= 1),
  status text not null default 'pending' check (status in ('pending','paid','refunded')),

  stripe_session_id text,
  stripe_payment_intent text
);

create index if not exists donations_email_idx on public.donations(email);
create index if not exists donations_status_idx on public.donations(status);
create index if not exists donations_created_idx on public.donations(created_at desc);

-- RLS: lock down to service role only.
alter table public.reservations enable row level security;
alter table public.donations enable row level security;

-- No public policies: only service_role (used in API routes) can read/write.
-- Add custom policies later if you build an admin dashboard.
