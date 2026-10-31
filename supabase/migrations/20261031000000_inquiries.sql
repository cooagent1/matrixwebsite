-- Anfragen aus dem Kontaktformular. Nur der Server (service role) schreibt und liest.
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text not null,
  email text not null,
  phone text,
  role text not null check (role in ('Interessent', 'Partner')),
  message text,
  source_path text,
  user_agent text,
  handled boolean not null default false
);

alter table public.inquiries enable row level security;
-- Bewusst keine Policies: anon und authenticated haben keinen Zugriff.
