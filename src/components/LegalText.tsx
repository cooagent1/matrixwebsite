import fs from "node:fs";
import path from "node:path";
import { Inline } from "@/components/Inline";

// Rechtstexte aus src/content/legal/*.md: Überschriften (##, ###, ####), Absätze, Listen, harte Umbrüche.
type Block = { kind: "h2" | "h3" | "h4" | "p" | "ul"; lines: string[] };

function parse(md: string): Block[] {
  const blocks: Block[] = [];
  for (const raw of md.split(/\n{2,}/)) {
    const chunk = raw.replace(/\s+$/, "");
    if (!chunk.trim()) continue;
    const h = chunk.match(/^(#{2,4})\s+(.*)$/);
    if (h) {
      blocks.push({ kind: (["h2", "h3", "h4"] as const)[h[1].length - 2], lines: [h[2].trim()] });
      continue;
    }
    const lines = chunk.split("\n");
    if (lines.every((l) => /^- /.test(l))) {
      const prev = blocks[blocks.length - 1];
      const items = lines.map((l) => l.slice(2).trim());
      if (prev?.kind === "ul") prev.lines.push(...items);
      else blocks.push({ kind: "ul", lines: items });
      continue;
    }
    blocks.push({ kind: "p", lines: lines.map((l) => l.trim()) });
  }
  return blocks;
}

export function LegalText({ file }: { file: string }) {
  const md = fs.readFileSync(path.join(process.cwd(), "src/content/legal", file), "utf8");
  return (
    <div className="legal">
      {parse(md).map((b, i) => {
        if (b.kind === "h2") return <h2 key={i} className="b-d legal-h2">{b.lines[0]}</h2>;
        if (b.kind === "h3") return <h3 key={i} className="b-d legal-h3">{b.lines[0]}</h3>;
        if (b.kind === "h4") return <h4 key={i} className="b-d legal-h4">{b.lines[0]}</h4>;
        if (b.kind === "ul")
          return (
            <ul key={i} className="legal-ul">
              {b.lines.map((t, j) => <li key={j}><Inline text={t} /></li>)}
            </ul>
          );
        return (
          <p key={i} className="sub-p">
            {b.lines.map((t, j) => (
              <span key={j}>{j > 0 && <br />}<Inline text={t} /></span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

export function LegalPage({ title, file, note }: { title: string; file: string; note?: string }) {
  return (
    <>
      <section className="sub-hero">
        <div className="b-wrap sub-hero-in">
          <h1 className="b-d sub-h1 legal-title">{title}</h1>
          {note && <p className="sub-lead">{note}</p>}
        </div>
      </section>
      <section className="sub-sec">
        <div className="b-wrap"><LegalText file={file} /></div>
      </section>
    </>
  );
}
