-- Kleines CMS für die Website: Vertriebspartner (/partner) und Team (/ueber-uns).
-- Pflege im Supabase Table Editor. Die Website liest nur veröffentlichte Zeilen (published = true)
-- mit dem öffentlichen Schlüssel; Änderungen erscheinen nach spätestens 5 Minuten.

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  contact_person text,
  street text,
  postal_code text,
  city text not null,
  country text not null default 'DE' check (country in ('DE', 'AT', 'CH')),
  region text not null,            -- Anzeige-Gruppe, z. B. "PLZ 2" oder "Österreich"
  phone text,
  email text,
  website text,
  sort integer not null default 100,
  published boolean not null default true
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  role text not null,              -- z. B. "Leitung Support"
  name text,                       -- leer = Platzhalter "Name folgt"
  bio text,                        -- zwei Sätze
  photo_url text,                  -- öffentliche URL, z. B. aus Supabase Storage
  sort integer not null default 100,
  published boolean not null default true
);

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists partners_touch on public.partners;
create trigger partners_touch before update on public.partners for each row execute function public.touch_updated_at();
drop trigger if exists team_touch on public.team_members;
create trigger team_touch before update on public.team_members for each row execute function public.touch_updated_at();

alter table public.partners enable row level security;
alter table public.team_members enable row level security;

-- Lesen für alle, aber nur veröffentlichte Zeilen. Schreiben nur über das Dashboard (service role).
drop policy if exists "partners public read" on public.partners;
create policy "partners public read" on public.partners for select to anon, authenticated using (published);
drop policy if exists "team public read" on public.team_members;
create policy "team public read" on public.team_members for select to anon, authenticated using (published);

-- Startbestand: Partnerliste von matrixpos.de/unsere-partner (Stand 06.11.2026)
insert into public.partners (name, contact_person, street, postal_code, city, country, region, phone, email, website, sort)
select * from (values
  ('ABC Kassensysteme GmbH', 'Herr Gerald Okken', 'Mühlenstraße 39a', '23769', 'Burg auf Fehmarn', 'DE', 'PLZ 2', '+49 4371 879687', 'mail@abc-kassen.de', 'https://www.abc-kassen.de', 10),
  ('Kassensysteme Hennings GmbH', 'Herr Arno Hennings', 'Harburger Straße 22', '21244', 'Buchholz', 'DE', 'PLZ 2', '+49 40 37081823-0', 'info@ksh.de', 'https://www.ksh.de', 20),
  ('42 GmbH', 'Herr Thomas Hoffstiepel', 'Eckenerstraße 2', '30179', 'Hannover', 'DE', 'PLZ 3', '+49 511 3532420', 'info@42-gmbh.de', 'https://www.42-gmbh.de', 30),
  ('CKV Kassen-Partner GmbH', 'Herr Björn Drechsler, Herr Jan-Niklas Drechsler', 'Heinrich-Hertz-Str. 11', '46399', 'Bocholt', 'DE', 'PLZ 4 und 5', '+49 2871 887090', 'info@kassen-partner.de', 'https://www.kassen-partner.de', 40),
  ('Gastro IT GmbH', 'Herr Hannes Bahro', 'Gosenburg 17', '42289', 'Wuppertal', 'DE', 'PLZ 4', '+49 202 42989810', 'hello@gastroit.net', 'https://www.gastroit.net', 50),
  ('Mann Consulting', 'Herr Lutz Mann', 'Kuckuckweg 12', '53757', 'Sankt Augustin', 'DE', 'PLZ 5 und 6', '+49 2241 344306', 'info@mann-consulting.de', 'https://www.mann-consulting.de', 60),
  ('hoga-data GmbH', 'Herr Rainer Burkhardt', 'Kirchheimerstraße 42', '70619', 'Stuttgart', 'DE', 'PLZ 7', '+49 711 4790300', 'info@hoga-data.de', 'https://www.hoga-data.de', 70),
  ('KCV Kassensysteme GmbH', 'Herr Torsten Rolka', 'Gaisentalstraße 22', '88400', 'Biberach', 'DE', 'PLZ 7 und 8', '+49 7351 5057-10', 't.rolka@pos-tech.de', 'https://www.kcv-kassen.de', 80),
  ('SOFTSTAR Computer Systems GmbH', 'Herr Michael Bier', 'Erdinger Straße 13', '84416', 'Taufkirchen (Vils)', 'DE', 'PLZ 8', '+49 8084 41330-0', 'vertrieb@softstar.de', 'https://www.softstar.de', 90),
  ('Kassen Merkl Vertriebs GmbH', 'Frau Karoline Merkl', 'Mechthildenstraße 39', '80639', 'München', 'DE', 'PLZ 8', '+49 89 170488', 'info@kassenmerkl.de', 'https://www.kassenmerkl.de', 100),
  ('Wirtshaus Dienstleistungs GmbH', 'Herr Michael Sperger', 'Posthalterring 5', '85599', 'Parsdorf', 'DE', 'PLZ 8', '+49 89 99317180', 'info@wirtshaus.de', 'https://www.wirtshaus.de', 110),
  ('pro Hotel EDV Systeme', 'Herr Lutz Brendel', 'Wasastraße 14', '01219', 'Dresden', 'DE', 'PLZ 0, 1 und 9', '+49 34297 14888', 'info@prohotel-edv.de', 'https://www.prohotel-edv.de', 120),
  ('Your Profit', 'Herr Mohamed R. Mohideen', 'Mellergasse 4/16', '1230', 'Wien', 'AT', 'Österreich', '+43 1 8651566-11', 'office@your-profit.at', 'https://your-profit.at', 130),
  ('IoT Solution GmbH', null, 'Am Marienbrunnen 348', '6290', 'Mayrhofen', 'AT', 'Österreich', '+43 5285 20600', 'info@iot.tirol.at', 'https://www.iottirol.at', 140),
  ('FLM Kassensysteme AG', 'Herr Werner Schilter', 'Buholzstrasse 4', '6032', 'Emmen', 'CH', 'Schweiz', '+41 41 2620404', 'info@flm.ch', 'https://www.flm.ch', 150)
) as v(name, contact_person, street, postal_code, city, country, region, phone, email, website, sort)
where not exists (select 1 from public.partners);

-- Startbestand Team: Rollen als Platzhalter, Namen und Fotos folgen (Entscheidung 06.11.)
insert into public.team_members (role, sort)
select * from (values
  ('Geschäftsführung', 10),
  ('Kaufmännische Leitung', 20),
  ('Leitung Professional Services', 30),
  ('Leitung Payment', 40),
  ('Leitung Support', 50),
  ('Leitung Forschung und Entwicklung', 60),
  ('Leitung Personalmanagement-Systeme', 70)
) as v(role, sort)
where not exists (select 1 from public.team_members);
