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

// FAQ der Startseite: seit 07.11. in Supabase (faqs, startseite = true), siehe src/lib/faq.ts.
