import Link from "next/link";
import type { Button as B } from "@/lib/content";

const HUBSPOT = {
  demo: process.env.NEXT_PUBLIC_HUBSPOT_DEMO_URL,
  callback: process.env.NEXT_PUBLIC_HUBSPOT_CALLBACK_URL,
};

function resolve(href: string): string {
  if (href === "hubspot:demo") return HUBSPOT.demo || "/demo#termin";
  if (href === "hubspot:callback") return HUBSPOT.callback || "/demo#rueckruf";
  return href;
}

export function Btn({ item, tone = "light", secondary = false }: { item: B; tone?: "light" | "dark"; secondary?: boolean }) {
  const href = resolve(item.href);
  const external = /^https?:\/\//.test(href);
  const cls =
    item.kind === "button" && !secondary
      ? tone === "dark"
        ? "btn btn-primary-on-dark"
        : "btn btn-primary"
      : "btn btn-ghost";
  if (external)
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {item.label}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {item.label}
    </Link>
  );
}
