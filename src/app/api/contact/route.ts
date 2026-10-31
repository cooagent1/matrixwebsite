import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";


type Body = Record<string, unknown>;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  // Honeypot: Bots füllen das Feld, Menschen sehen es nicht. Stillschweigend "ok".
  if (str(body.website, 200)) return Response.json({ ok: true });

  const input = {
    name: str(body.name, 200),
    company: str(body.company, 200),
    email: str(body.email, 200),
    phone: str(body.phone, 60),
    message: str(body.message, 5000),
    role: str(body.role, 30) === "Partner" ? "Partner" : "Interessent",
    source_path: str(body.path, 300),
  };
  if (!input.name || !input.company || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.email) || body.consent !== "on") {
    return Response.json({ error: "validation" }, { status: 422 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL;

  // Ohne Konfiguration ist das Formular nicht aktiv (Vorschau). Nichts wird verschluckt.
  if (!(supabaseUrl && supabaseKey) && !(resendKey && to && from)) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  let stored = false;
  if (supabaseUrl && supabaseKey) {
    const db = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });
    const { error } = await db.from("inquiries").insert({
      ...input,
      user_agent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
    });
    if (error) console.error("inquiries insert failed", error.message);
    else stored = true;
  }

  let mailed = false;
  if (resendKey && to && from) {
    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()),
      replyTo: input.email,
      subject: `Neue Anfrage (${input.role}): ${input.company}`,
      html: `<p><strong>${esc(input.name)}</strong>, ${esc(input.company)}<br>${esc(input.email)} ${esc(input.phone)}</p>
<p>${esc(input.message).replace(/\n/g, "<br>")}</p>
<p style="color:#64748b;font-size:12px">Seite: ${esc(input.source_path)}</p>`,
    });
    if (error) console.error("resend failed", error.message);
    else mailed = true;
  }

  // Erfolg nur, wenn die Anfrage irgendwo sicher angekommen ist.
  if (!stored && !mailed) return Response.json({ error: "delivery" }, { status: 502 });
  return Response.json({ ok: true });
}
