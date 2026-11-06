import { ImageResponse } from "next/og";

// Vorschaubild für Links in Social Media, Messengern und Suche (1200×630).
export const alt = "Matrix POS: Kassensysteme für die Gastronomie aus Hannover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Bricolage Grotesque (Headline-Schrift der Seite) zur Build-Zeit laden; ohne Netz fällt es auf die Standardschrift zurück.
async function bricolage(): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@800")).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OgImage() {
  const font = await bricolage();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", background: "radial-gradient(circle at 85% 15%, rgba(0,171,229,0.38) 0%, rgba(7,7,8,0) 55%), #070708", color: "#fff", fontFamily: "sans-serif", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, padding: "10px 26px", borderRadius: 999, background: "#fff", color: "#070708", fontSize: 34 }}>
            <span style={{ fontWeight: 400 }}>matrix</span>
            <span style={{ fontWeight: 800, fontFamily: font ? "Bricolage" : "sans-serif" }}>POS</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 88, fontWeight: 800, fontFamily: font ? "Bricolage" : "sans-serif", lineHeight: 1, letterSpacing: -3, display: "flex", flexDirection: "column" }}>
            <span>Kassensysteme</span>
            <span style={{ color: "#7FDCFF" }}>für die Gastronomie.</span>
          </div>
          <div style={{ fontSize: 26, color: "#BDBDBD", display: "flex" }}>Matrix NXT · Matrix POS · Matrix PAY · seit über 30 Jahren aus Hannover</div>
        </div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Bricolage", data: font, weight: 800, style: "normal" }] : [] },
  );
}
