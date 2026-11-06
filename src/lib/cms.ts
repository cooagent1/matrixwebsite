import { createClient } from "@supabase/supabase-js";

// Lesezugriff auf das kleine Website-CMS in Supabase (Tabellen partners, team_members).
// Öffentlicher Schlüssel + RLS: nur veröffentlichte Zeilen. Ohne Konfiguration leere Listen,
// damit Build und Vorschau nicht an Supabase hängen.
export type Partner = {
  id: string;
  name: string;
  contact_person: string | null;
  street: string | null;
  postal_code: string | null;
  city: string;
  country: "DE" | "AT" | "CH";
  region: string;
  phone: string | null;
  email: string | null;
  website: string | null;
};
export type TeamMember = { id: string; role: string; name: string | null; bio: string | null; photo_url: string | null };

function client() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
}

export async function getPartners(): Promise<Partner[]> {
  const db = client();
  if (!db) return [];
  const { data, error } = await db
    .from("partners")
    .select("id,name,contact_person,street,postal_code,city,country,region,phone,email,website")
    .order("sort")
    .order("name");
  if (error) console.error("cms partners", error.message);
  return (data as Partner[] | null) ?? [];
}

export async function getTeam(): Promise<TeamMember[]> {
  const db = client();
  if (!db) return [];
  const { data, error } = await db.from("team_members").select("id,role,name,bio,photo_url").order("sort");
  if (error) console.error("cms team", error.message);
  return (data as TeamMember[] | null) ?? [];
}
