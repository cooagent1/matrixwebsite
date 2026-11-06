-- Beispielartikel Ratgeber: Cloud-TSE (07.11.2026). Idempotent: aktualisiert bei erneutem Lauf.

insert into public.authors (slug, name, role, bio)
values ('redaktion', 'Redaktion Matrix POS', 'Support und Produktteam, Hannover',
        'Die Ratgeber schreiben Support und Produktteam von Matrix POS aus den Fragen, die Betriebe uns stellen.')
on conflict (slug) do update set name = excluded.name, role = excluded.role, bio = excluded.bio;

insert into public.tags (slug, name, description, sort) values
  ('kasse-und-gesetz', 'Kasse und Gesetz', 'Was Finanzamt und Kassensicherungsverordnung von der Kasse verlangen.', 10),
  ('tse', 'TSE', 'Technische Sicherheitseinrichtung: Hardware, Cloud, Zertifikate und Ausfall.', 20),
  ('meldepflicht', 'Meldepflicht', 'Kassen und TSE über ELSTER beim Finanzamt melden.', 30),
  ('matrix-nxt', 'Matrix NXT', 'Ratgeber mit Bezug zur Cloud-Kasse Matrix NXT.', 40)
on conflict (slug) do update set name = excluded.name, description = excluded.description, sort = excluded.sort;

insert into public.articles (slug, title, lead, body, author_id, meta_title, meta_description, status, published_at, checked_at, review_notes)
values (
  'cloud-tse',
  'Cloud-TSE in der Gastronomie: Pflichten, Unterschiede, Meldung',
  'Jede elektronische Kasse in Deutschland muss ihre Buchungen über eine zertifizierte technische Sicherheitseinrichtung (TSE) absichern. Bei der Cloud-TSE sitzt das Sicherheitsmodul im Rechenzentrum des Anbieters statt als Stick in der Kasse. Dieser Ratgeber erklärt, was die TSE aufzeichnet, worin sich Cloud und Hardware unterscheiden und was Sie beim Wechsel ans Finanzamt melden.',
  $md$
## Rechtsgrundlage

Seit dem 1. Januar 2020 schreibt § 146a der Abgabenordnung (AO) vor, dass elektronische Aufzeichnungssysteme jeden Geschäftsvorfall einzeln, vollständig, richtig, zeitgerecht und geordnet aufzeichnen und durch eine zertifizierte technische Sicherheitseinrichtung schützen. Die Einzelheiten regelt die Kassensicherungsverordnung (KassenSichV).

Eine TSE besteht nach § 146a Abs. 1 AO aus drei Teilen:

- **Sicherheitsmodul:** signiert jeden Vorgang und vergibt Transaktionsnummer und Signaturzähler.
- **Speichermedium:** hält die signierten Daten bis zum Export vor.
- **Einheitliche digitale Schnittstelle:** liefert die Daten im Format der DSFinV-K an Betriebsprüfung und Kassennachschau.

Zertifiziert wird die TSE vom Bundesamt für Sicherheit in der Informationstechnik (BSI) nach der Technischen Richtlinie TR-03153.

## Was die TSE aufzeichnet

Nach § 2 KassenSichV protokolliert die TSE zu jedem Vorgang den Zeitpunkt von Beginn und Ende, eine fortlaufende Transaktionsnummer, die Art des Vorgangs, die Vorgangsdaten, die Zahlungsart, einen Prüfwert und die Seriennummer von Kasse oder Sicherheitsmodul.

In der Gastronomie beginnt die Aufzeichnung nicht erst beim Bezahlen. Schon die Bestellung an einem offenen Tisch ist ein Vorgang und wird signiert. Umsetzen, Splitten und Stornieren erzeugen ebenfalls signierte Vorgänge.

Aus den Daten der TSE entstehen auch die Pflichtangaben auf dem Beleg nach § 6 KassenSichV, unter anderem Transaktionsnummer, Signaturzähler, Prüfwert und Seriennummer.

## Hardware-TSE und Cloud-TSE

Beide Varianten erfüllen dieselbe Pflicht. Der Unterschied liegt darin, wo das Sicherheitsmodul arbeitet.

| | Hardware-TSE | Cloud-TSE |
|---|---|---|
| Sicherheitsmodul | USB-Stick, SD- oder microSD-Karte in der Kasse | Rechenzentrum des TSE-Anbieters |
| Verbindung | lokal an der Kasse | über das Internet |
| Mehrere Kassen | je Kasse oder Kassenverbund ein Modul | mehrere Kassen als Clients an einer TSE |
| Zertifikat | feste Laufzeit, danach Tausch des Moduls | Anbieter erneuert die Zertifizierung zentral |
| Typischer Ausfall | Modul defekt oder abgelaufen | Internet oder Dienst nicht erreichbar |

Für Betriebe mit Handgeräten und mehreren Stationen ist die Cloud-TSE meist einfacher, weil kein Modul an einer bestimmten Hardware hängt. Sie setzt eine stabile Internetverbindung voraus.

## Ablauf der Zertifikate

Das Zertifikat einer Hardware-TSE gilt in der Regel fünf Jahre ab Herstellung, nicht ab Kauf. Die ersten Module wurden Ende 2019 zertifiziert, deshalb laufen viele Zertifikate jetzt aus. Nach Ablauf kann die TSE keine Vorgänge mehr absichern und muss getauscht werden.

Bei der Cloud-TSE verlängert der Anbieter die Zertifizierung beim BSI. Die Cloud-TSE von fiskaly ist nach Angaben des Anbieters bis zum 30. März 2033 zertifiziert.

Prüfen Sie das Ablaufdatum Ihrer TSE im Backoffice der Kasse oder auf dem Etikett des Moduls.

## Wenn die TSE ausfällt

Fällt die TSE aus, dürfen Sie weiter kassieren. Der Ausfall muss aber erkennbar und dokumentiert sein:

1. Die Kasse vermerkt auf dem Beleg, dass keine Signatur erstellt wurde.
2. Sie halten Beginn, Ende und Ursache des Ausfalls fest, zum Beispiel in der Verfahrensdokumentation.
3. Die Störung wird unverzüglich behoben.

Bei der Cloud-TSE gilt auch eine Störung der Internetverbindung als Ausfall. Ein dauerhafter Betrieb ohne funktionierende TSE ist nicht zulässig.

## Meldung beim Finanzamt

Seit dem 1. Januar 2025 sind Kassen und TSE nach § 146a Abs. 4 AO dem Finanzamt zu melden. Die Meldung läuft über ELSTER, entweder per Direkteingabe im Formular „Mitteilungsverfahren nach § 146a Absatz 4 AO“, als XML-Upload in Mein ELSTER oder direkt aus einer Software über die ERiC-Schnittstelle.

- **Fristen:** Kassen, die vor dem 1. Juli 2025 angeschafft wurden, waren bis zum 31. Juli 2025 zu melden. Neue Kassen melden Sie innerhalb eines Monats nach Anschaffung, Außerbetriebnahmen ebenfalls innerhalb eines Monats.
- **Umfang:** Je Betriebsstätte geht eine Mitteilung ein, sie enthält immer alle Kassen dieser Betriebsstätte.
- **Miete und Leasing:** Gemietete und geleaste Kassen sind genauso meldepflichtig.

Beim Wechsel von Hardware-TSE auf Cloud-TSE melden Sie die Außerbetriebnahme der alten und die neue TSE. Das alte Modul und seine exportierten Daten bewahren Sie bis zum Ende der Aufbewahrungsfrist auf.

## Bußgeld

Wer keine oder keine ordnungsgemäße TSE verwendet, handelt nach § 379 Abs. 1 AO ordnungswidrig. Das Bußgeld kann bis zu 25.000 Euro betragen (§ 379 Abs. 6 AO), unabhängig davon, ob ein Steuerschaden entstanden ist. Bei der Kassennachschau kommen Hinzuschätzungen hinzu, wenn die Kassenführung nicht ordnungsgemäß ist.

## Cloud-TSE bei Matrix

Matrix NXT signiert jeden Vorgang über die Cloud-TSE von fiskaly. Ein Stick oder eine Karte in der Kasse entfällt, neue Geräte melden sich per Einrichtungscode an. Betriebe mit Matrix POS und Hardware-TSE stellen wir auf die Cloud-TSE um. Bei der Meldung über ELSTER unterstützt Sie unser Support.

## Checkliste für den Betrieb

- Seriennummer und Ablaufdatum jeder TSE notiert
- Meldung je Betriebsstätte in ELSTER vollständig und aktuell
- Verfahrensdokumentation beschreibt Kasse, TSE und Vorgehen bei Ausfall
- Ausfälle mit Datum, Dauer und Ursache dokumentiert
- DSFinV-K-Export probeweise erstellt, bevor ihn das Finanzamt anfordert

## Quellen

- [§ 146a AO, gesetze-im-internet.de](https://www.gesetze-im-internet.de/ao_1977/__146a.html)
- [Kassensicherungsverordnung, gesetze-im-internet.de](https://www.gesetze-im-internet.de/kassensichv/)
- [§ 379 AO, gesetze-im-internet.de](https://www.gesetze-im-internet.de/ao_1977/__379.html)
- [BMF-Schreiben vom 28. Juni 2024 zur Mitteilungspflicht](https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2024-06-28-mitteilungsverpflichtung-nach-AO.html)
- [BSI TR-03153, Technische Sicherheitseinrichtung für elektronische Aufzeichnungssysteme](https://www.bsi.bund.de/dok/TR-03153)
- [fiskaly: Re-Zertifizierung der Cloud-TSE](https://www.fiskaly.com/blog/fiskaly-cloud-tss-certified-until-2033)

Dieser Ratgeber ersetzt keine Steuerberatung. Für Ihren Einzelfall sprechen Sie mit Ihrer Steuerberaterin oder Ihrem Steuerberater.
$md$,
  (select id from public.authors where slug = 'redaktion'),
  'Cloud-TSE in der Gastronomie: Pflichten, Unterschiede, Meldung | Matrix POS',
  'Was die TSE nach KassenSichV aufzeichnet, Hardware-TSE und Cloud-TSE im Vergleich, Ablauf der Zertifikate, TSE-Ausfall und Meldung nach § 146a Abs. 4 AO.',
  'published',
  '2026-11-07 00:30+01',
  '2026-11-07',
  'Fachlich prüfen lassen (Steuerberatung): Ausfallvermerk und Dokumentation (AEAO zu § 146a), Signatur der Bestellung an offenen Tischen, Aufbewahrung alter TSE. Matrix bestätigen: NXT nur fiskaly, Umstellung POS auf Cloud-TSE, Unterstützung bei ELSTER-Meldung, Anzeige Ablaufdatum im Backoffice.'
)
on conflict (slug) do update set
  title = excluded.title, lead = excluded.lead, body = excluded.body, author_id = excluded.author_id,
  meta_title = excluded.meta_title, meta_description = excluded.meta_description,
  status = excluded.status, published_at = excluded.published_at, checked_at = excluded.checked_at, review_notes = excluded.review_notes;

insert into public.article_tags (article_id, tag_id)
select a.id, t.id from public.articles a, public.tags t
where a.slug = 'cloud-tse' and t.slug in ('kasse-und-gesetz', 'tse', 'meldepflicht', 'matrix-nxt')
on conflict do nothing;
