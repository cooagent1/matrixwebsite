-- Ratgeber-CMS: Artikel mit einem Autor und beliebig vielen Tags.
-- Pflege im Supabase Table Editor. Artikeltext (body) ist Markdown.
-- Die Website liest mit dem öffentlichen Schlüssel nur veröffentlichte Artikel
-- (status = 'published' und published_at erreicht); Änderungen erscheinen nach spätestens 5 Minuten.

create table if not exists public.authors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  role text,                       -- z. B. "Leitung Support"
  bio text,                        -- ein bis zwei Sätze
  photo_url text
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  description text,                -- ein Satz, erscheint auf der Themenseite
  sort integer not null default 100
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  lead text not null,              -- Einleitung, zwei bis drei Sätze, auch Teaser in der Liste
  body text not null default '',   -- Markdown: ## Zwischenüberschrift, Listen, Tabellen, Links
  author_id uuid not null references public.authors (id) on delete restrict,
  cover_url text,
  cover_alt text,
  meta_title text,                 -- leer = Titel
  meta_description text,           -- leer = Einleitung
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  published_at timestamptz,
  checked_at date,                 -- "Stand": wann der Inhalt zuletzt fachlich geprüft wurde
  review_notes text                -- intern, wird nie ausgeliefert
);

create table if not exists public.article_tags (
  article_id uuid not null references public.articles (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  primary key (article_id, tag_id)
);

create index if not exists articles_published_idx on public.articles (status, published_at desc);
create index if not exists article_tags_tag_idx on public.article_tags (tag_id);

drop trigger if exists authors_touch on public.authors;
create trigger authors_touch before update on public.authors for each row execute function public.touch_updated_at();
drop trigger if exists articles_touch on public.articles;
create trigger articles_touch before update on public.articles for each row execute function public.touch_updated_at();

alter table public.authors enable row level security;
alter table public.tags enable row level security;
alter table public.articles enable row level security;
alter table public.article_tags enable row level security;

drop policy if exists "authors public read" on public.authors;
create policy "authors public read" on public.authors for select to anon, authenticated using (true);
drop policy if exists "tags public read" on public.tags;
create policy "tags public read" on public.tags for select to anon, authenticated using (true);
drop policy if exists "articles public read" on public.articles;
create policy "articles public read" on public.articles for select to anon, authenticated
  using (status = 'published' and published_at is not null and published_at <= now());
drop policy if exists "article_tags public read" on public.article_tags;
create policy "article_tags public read" on public.article_tags for select to anon, authenticated
  using (exists (select 1 from public.articles a where a.id = article_id and a.status = 'published' and a.published_at <= now()));

-- Interne Notizen nicht öffentlich: Spaltenrechte statt Tabellenrecht
revoke select on public.articles from anon, authenticated;
grant select (id, created_at, updated_at, slug, title, lead, body, author_id, cover_url, cover_alt, meta_title, meta_description, status, published_at, checked_at)
  on public.articles to anon, authenticated;
