// Inhalte der Startseite, die auch ins JSON-LD gehen (FAQPage).
// Quellen: Kundenstimmen wörtlich von der alten matrixpos.de (Freigabe 06.11.),
// FAQ aus den alten Seiten Matrix POS, NEO, Pay, Fernwartung und dem Meldepflicht-Beitrag (22.07.2025).

export type Quote = { text: string; name: string; role: string; tag?: string };

export const QUOTES: Quote[] = [
  {
    text: "Matrix Payment läuft reibungslos mit unserer Hotelsoftware! Ein großer Vorteil: es gibt nur noch eine Payment-Abrechnung und alle Zahlungen sind in einer einzigen Payment Applikation abgebildet.",
    name: "Florian Sbrizzai",
    role: "Stellv. Direktor, Parkhotel Laim, München",
    tag: "Matrix PAY",
  },
  {
    text: "Überzeugt hat uns, dass Matrix im Prinzip alles abbilden kann: von bedienter Gastronomie über Check-out-Gastronomie bis hin zu einer Warenwirtschaft mit internen Produzenten.",
    name: "Dirk Schönekäse",
    role: "F&B-Leiter, Erlebnis-Zoo Hannover",
  },
  {
    text: "Die Zusammenarbeit seit 15 Jahren ist außerordentlich gut. Gerade in der Gastronomie, wenn es Probleme gibt, meistens am Wochenende, ist sofort jemand erreichbar.",
    name: "Jan Fleißig",
    role: "Inhaber, Konditorei Kreipe, Hannover",
    tag: "Support",
  },
  {
    text: "Ich hab Matrix Payment seit ein paar Monaten. Seitdem ich dieses neue System habe, funktioniert alles einwandfrei, und ich, meine Kollegen und die Kunden sind alle zufrieden.",
    name: "Abbas Schafie",
    role: "Restaurant Amorosa, Markthalle Hannover",
    tag: "Matrix PAY",
  },
  {
    text: "Sie ist total einfach, selbsterklärend und erleichtert einem den Arbeitsalltag enorm. Egal was war, es war immer sofort jemand für uns da und hat das Problem gelöst.",
    name: "Samantha Kedzia",
    role: "Service, Treffpunkt, Markthalle Hannover",
  },
];

export const LAW: { n: string; t: string; d: string }[] = [
  { n: "01", t: "Cloud-TSE", d: "Matrix NXT und Matrix POS signieren jede Buchung über die Cloud-TSE von Fiskaly. Betriebe mit Hardware-TSE werden auf die Cloud-TSE umgestellt." },
  { n: "02", t: "Belegausgabe", d: "Zu jedem Vorgang druckt die Kasse einen Beleg mit TSE-Signatur und Transaktionsnummer, wie es die KassenSichV verlangt." },
  { n: "03", t: "DSFinV-K", d: "Der Export liefert die Kassendaten in dem Format, das Betriebsprüfung und Kassennachschau anfordern." },
  { n: "04", t: "Meldepflicht", d: "Seit 2025 ist jede Kasse mit TSE über ELSTER zu melden. Matrix POS übermittelt über die ERiC-Schnittstelle der Deutschen Fiskal." },
];

export type Faq = { q: string; a: string; link?: { href: string; label: string } };

export const FAQ: Faq[] = [
  {
    q: "Welche Zahlarten nimmt Matrix PAY an?",
    a: "Girocard, Kreditkarten, Apple Pay und Google Pay. Alle Zahlungen laufen in einer Payment-Abrechnung zusammen, im Dashboard sehen Sie jede Transaktion. Matrix PAY arbeitet an der Kasse, am Front Office und bei Online-Buchungen über Channelmanager oder Website.",
    link: { href: "/pay", label: "Mehr zu PAY" },
  },
  {
    q: "Wen rufe ich an, wenn das Kartenterminal ausfällt?",
    a: "Die Matrix-Hotline unter +49 511 592938-0, 7 Tage die Woche. Kasse und Payment kommen von der Matrix POS GmbH, Störungen an Terminal und Kasse klären wir deshalb in einem Anruf.",
    link: { href: "/support", label: "Support & Wartung" },
  },
  {
    q: "Auf welchen Geräten läuft die mobile Kasse?",
    a: "Matrix NEO läuft auf betriebseigenen Smartphones oder auf Orderman-Handhelds. Rechnungen gehen an Bluetooth- oder WLAN-Drucker, das Personal meldet sich per NFC-Transponder an. Matrix NXT ist für Orderman 10, Orderman Magellan EASY sowie Google Pixel 9 und 10 zertifiziert.",
    link: { href: "/hardware", label: "Hardware" },
  },
  {
    q: "Welche Geräte lassen sich an Matrix POS anschließen?",
    a: "Waagen, Scanner, Kartenleser, Bondrucker und Kundendisplays. Hotelsoftware, Warenwirtschaft und Buchhaltung binden wir über Schnittstellen an.",
    link: { href: "/schnittstellen", label: "Schnittstellen" },
  },
  {
    q: "Wie melde ich meine Kasse beim Finanzamt?",
    a: "Nach § 146a Abs. 4 AO ist jede Kasse mit TSE über ELSTER zu melden, bei Inbetriebnahme und Außerbetriebnahme jeweils innerhalb eines Monats. Für Matrix POS gibt es zwei Wege: die Übermittlung über die ERiC-Schnittstelle im Cloud-Portal der Deutschen Fiskal (per Softwareupdate) oder die manuelle Meldung im ELSTER-Formular. Eine Ausfüllhilfe erhalten Kunden über support@matrixpos.de.",
    link: { href: "/kasse-und-gesetz", label: "Kasse und Gesetz" },
  },
  {
    q: "Wie läuft die Fernwartung?",
    a: "Über TeamViewer QuickSupport. Unser Support nennt Ihnen am Telefon die Downloadseite, Sie geben die angezeigte ID durch. Die Verbindung ist durchgehend verschlüsselt, mit RSA-Schlüsseltausch (2048 Bit) und AES-Sitzung (256 Bit).",
    link: { href: "/fernwartung", label: "Fernwartung" },
  },
];
