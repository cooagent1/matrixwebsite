-- FAQ als CMS (Robert 07.11.): alle Fragen in einer Tabelle, /faq zeigt alle veröffentlichten nach Gruppen.
-- startseite = true: erscheint zusätzlich auf der Startseite. seiten: weitere Seiten-Slugs, z. B. {support,pay}
-- (dort nur, wenn die Seite einen FAQ-Block mit "cms": true hat).
-- Pflege im Supabase Table Editor, Änderungen erscheinen nach spätestens 5 Minuten.
-- antwort: Absätze durch Leerzeile getrennt, **fett** und [Text](/pfad) erlaubt. Link unter der Antwort über link_href/link_label.
-- Solange faqs leer ist, nutzt die Website src/content/faqs.json (gleicher Startbestand).

create table if not exists public.faq_groups (
  slug text primary key,           -- Anker auf /faq, z. B. "gesetz" -> /faq#gesetz
  titel text not null,
  sort integer not null default 100
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  gruppe text not null references public.faq_groups(slug) on update cascade,
  frage text not null,
  antwort text not null,
  link_href text,
  link_label text,
  startseite boolean not null default false,
  seiten text[] not null default '{}',
  sort integer not null default 100,
  published boolean not null default true
);

drop trigger if exists faqs_touch on public.faqs;
create trigger faqs_touch before update on public.faqs for each row execute function public.touch_updated_at();

alter table public.faq_groups enable row level security;
alter table public.faqs enable row level security;
drop policy if exists "faq_groups public read" on public.faq_groups;
create policy "faq_groups public read" on public.faq_groups for select to anon, authenticated using (true);
drop policy if exists "faqs public read" on public.faqs;
create policy "faqs public read" on public.faqs for select to anon, authenticated using (published);

-- Startbestand: /faq (15 Fragen) und Startseite (6 Fragen), Stand 07.11.2026
insert into public.faq_groups (slug, titel, sort) values
  ('kasse-und-betrieb', 'Kasse und Betrieb', 10),
  ('bezahlen', 'Bezahlen', 20),
  ('hotel-und-schnittstellen', 'Hotel und Schnittstellen', 30),
  ('kosten-und-vertrag', 'Kosten und Vertrag', 40),
  ('gesetz', 'Gesetz', 50)
on conflict (slug) do nothing;

insert into public.faqs (gruppe, frage, antwort, link_href, link_label, startseite, seiten, sort)
select * from (values
  ('kasse-und-betrieb', 'Funktioniert die Kasse, wenn das Internet ausfällt?', 'Matrix POS läuft lokal und kassiert ohne Internet weiter. Matrix NXT braucht heute eine Verbindung, der Offline-Betrieb ist in Arbeit. Wer heute ohne Netz kassieren muss, nimmt Matrix POS.', null, null, false, '{}'::text[], 10),
  ('kasse-und-betrieb', 'Ist Matrix TSE-konform?', 'Ja, beide Systeme. Sie signieren über die Cloud-TSE von Fiskaly, ohne TSE-Hardware im Betrieb. Betriebe mit Hardware-TSE (Swissbit) kassieren damit vorerst weiter und werden später auf die Cloud-TSE umgestellt.', null, null, false, '{}'::text[], 20),
  ('kasse-und-betrieb', 'Kann ich von Matrix POS auf Matrix NXT wechseln?', 'Ja. Artikel, Preise und Personal übernehmen wir aus Ihrer Matrix Classic. Ob NXT Ihren Betrieb heute abdeckt, hängt vor allem an zwei Punkten, die für NXT noch in Arbeit sind: Offline-Betrieb und Hotelschnittstelle.', null, null, false, '{}'::text[], 30),
  ('kasse-und-betrieb', 'Brauche ich einen Server im Betrieb?', 'Für Matrix NXT nicht. Für Matrix POS ja, die Kasse ist lokal installiert.', null, null, false, '{}'::text[], 40),
  ('kasse-und-betrieb', 'Welche Hardware brauche ich?', 'Für NXT: Orderman 10, Orderman Magellan EASY, Google Pixel 9 oder 10, Samsung Galaxy Tab A11, dazu ein Bondrucker. Für POS stationäre Terminals.', '/kassensysteme', null, false, '{}'::text[], 50),
  ('kasse-und-betrieb', 'Geht Self-Ordering oder ein Bestell-Kiosk?', 'Bei Matrix POS über Schnittstelle, zum Beispiel Flixorder. Bei Matrix NXT nicht.', null, null, false, '{}'::text[], 60),
  ('bezahlen', 'Brauche ich eine Matrix-Kasse, um Matrix PAY zu nutzen?', 'Nein. Matrix PAY läuft auch mit einer anderen Kasse.', '/pay', null, false, '{}'::text[], 10),
  ('bezahlen', 'Warum Matrix PAY?', 'Mit Matrix POS geht der Betrag von der Kasse ans Terminal, der Tagesabschluss braucht keinen Abgleich. In Matrix NXT ist die Kartenzahlung integriert, auch per Tap to Pay am Handgerät. Die Abwicklung läuft über Adyen.', null, null, false, '{}'::text[], 20),
  ('bezahlen', 'Wer hilft bei Problemen mit dem Terminal?', 'Derselbe Support wie für die Kasse, 7 Tage die Woche aus Hannover.', null, null, false, '{}'::text[], 30),
  ('hotel-und-schnittstellen', 'Welche Hotelsoftware ist angebunden?', 'Für Matrix POS: protel, ASA Hotel, Oracle Opera, Guestline. Für Matrix NXT ist die Anbindung an protel und ASA Hotel in Arbeit.', '/schnittstellen', null, false, '{}'::text[], 10),
  ('hotel-und-schnittstellen', 'Meine Warenwirtschaft fehlt in der Liste. Was nun?', 'Die Liste zeigt die über 40 Anbindungen, die heute im Betrieb laufen. Fehlt Ihr System, prüfen wir, ob es eine Schnittstelle anbietet.', null, null, false, '{}'::text[], 20),
  ('kosten-und-vertrag', 'Was kostet Matrix?', 'Der Preis richtet sich nach der Zahl der Geräte und Standorte. Das Angebot erstellen wir nach dem Erstgespräch.', null, null, false, '{}'::text[], 10),
  ('kosten-und-vertrag', 'Gibt es Wartungsverträge?', 'Ja, Basic und Enterprise.', '/support', null, false, '{}'::text[], 20),
  ('gesetz', 'Ist ein elektronisches Kassensystem Pflicht?', 'Nein. Wer eine elektronische Kasse nutzt, muss sie nach § 146a AO mit einer zertifizierten TSE absichern, Belege ausgeben und dem Finanzamt melden.', '/ratgeber', null, false, '{}'::text[], 10),
  ('gesetz', 'Was ist die Kassenmeldepflicht?', 'Seit 1. Januar 2025 melden Betriebe ihre elektronischen Kassen samt TSE über ELSTER an das Finanzamt (§ 146a AO). Für Matrix POS gibt es dafür die ELSTER-Kassenmeldung.', null, null, false, '{}'::text[], 20),
  ('bezahlen', 'Welche Zahlarten nimmt Matrix PAY an?', 'Girocard, Kreditkarten, Apple Pay und Google Pay. Alle Zahlungen laufen in einer Payment-Abrechnung zusammen, im Dashboard sehen Sie jede Transaktion. Matrix PAY arbeitet an der Kasse, am Front Office und bei Online-Buchungen über Channelmanager oder Website.', '/pay', 'Mehr zu PAY', true, '{}'::text[], 40),
  ('bezahlen', 'Wen rufe ich an, wenn das Kartenterminal ausfällt?', 'Die Matrix-Hotline unter +49 511 592938-0, 7 Tage die Woche. Kasse und Payment kommen von der Matrix POS GmbH, Störungen an Terminal und Kasse klären wir deshalb in einem Anruf.', '/support', 'Support & Wartung', true, '{}'::text[], 50),
  ('kasse-und-betrieb', 'Auf welchen Geräten läuft die mobile Kasse?', 'Matrix NEO läuft auf betriebseigenen Smartphones oder auf Orderman-Handhelds. Rechnungen gehen an Bluetooth- oder WLAN-Drucker, das Personal meldet sich per NFC-Transponder an. Matrix NXT ist für Orderman 10, Orderman Magellan EASY sowie Google Pixel 9 und 10 zertifiziert.', '/kassensysteme/nxt#hardware', 'Geräte für NXT', true, '{}'::text[], 70),
  ('hotel-und-schnittstellen', 'Welche Geräte lassen sich an Matrix POS anschließen?', 'Waagen, Scanner, Kartenleser, Bondrucker und Kundendisplays. Hotelsoftware, Warenwirtschaft und Buchhaltung binden wir über Schnittstellen an.', '/schnittstellen', 'Schnittstellen', true, '{}'::text[], 30),
  ('gesetz', 'Wie melde ich meine Kasse beim Finanzamt?', 'Nach § 146a Abs. 4 AO ist jede Kasse mit TSE über ELSTER zu melden, bei Inbetriebnahme und Außerbetriebnahme jeweils innerhalb eines Monats. Für Matrix POS gibt es zwei Wege: die Übermittlung über die ERiC-Schnittstelle im Cloud-Portal der Deutschen Fiskal (per Softwareupdate) oder die manuelle Meldung im ELSTER-Formular. Eine Ausfüllhilfe erhalten Kunden über support@matrixpos.de.', '/faq#gesetz', 'Fragen zu Kasse und Gesetz', true, '{}'::text[], 30),
  ('kasse-und-betrieb', 'Wie läuft die Fernwartung?', 'Über TeamViewer QuickSupport. Unser Support nennt Ihnen am Telefon die Downloadseite, Sie geben die angezeigte ID durch. Die Verbindung ist durchgehend verschlüsselt, mit RSA-Schlüsseltausch (2048 Bit) und AES-Sitzung (256 Bit).', '/support#fernwartung', 'Fernwartung', true, '{}'::text[], 80)
) as v(gruppe, frage, antwort, link_href, link_label, startseite, seiten, sort)
where not exists (select 1 from public.faqs);
