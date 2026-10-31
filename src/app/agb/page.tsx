import type { Metadata } from "next";
export const metadata: Metadata = { title: "AGB | Matrix POS" };
export default function Page() {
  return (
    <section className="wrap py-20">
      <h1 className="text-4xl font-semibold tracking-tight">AGB</h1>
      <p className="prose-p mt-4 text-slate-700">Der Inhalt wird von der Geschäftsführung geliefert und vor dem Go-live eingesetzt.</p>
    </section>
  );
}
