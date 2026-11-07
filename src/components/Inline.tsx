import Link from "next/link";
import type { ReactNode } from "react";
import { LABELS } from "@/lib/nav";
import { T } from "./T";

const TOKEN = /(⟦[^⟧]+⟧|\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\[[^\]]+\]\([^)]+\)|→\s*\/[^\s,;)]*)/g;

export function Inline({ text }: { text?: string | number | null }) {
  if (text === null || text === undefined || text === "") return null;
  const parts = String(text).split(TOKEN).filter((p) => p !== "");
  const out: ReactNode[] = parts.map((part, i) => {
    const ph = part.match(/^⟦([^⟧]+)⟧$/);
    if (ph) return <T key={i} k={ph[1]} />;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    const md = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (md) return <a key={i} href={md[2]} className="link">{md[1]}</a>;
    const arrow = part.match(/^→\s*(\/[^\s,;)]*)$/);
    if (arrow) {
      const path = arrow[1].split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
      return (
        <Link key={i} href={arrow[1]} className="link">
          {LABELS[path] ?? "Mehr erfahren"} →
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
  return <>{out}</>;
}
