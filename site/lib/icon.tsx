import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { OG } from "@/lib/og";

// The brand mark (TMY in a maroon circle) as a square PNG, for the browser tab
// icon (app/icon.tsx) and the home-screen icon (app/apple-icon.tsx).
export async function brandMark(px: number, rounded: boolean) {
  const bricolage = await readFile(
    join(process.cwd(), "assets/fonts", "bricolage-grotesque-latin-800-normal.woff"),
  );
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: OG.maroon,
          borderRadius: rounded ? 999 : 0,
          color: OG.pink,
          fontFamily: "Bricolage",
          fontSize: px * 0.36,
          letterSpacing: -px * 0.01,
          paddingBottom: px * 0.03,
        }}
      >
        TMY
      </div>
    ),
    {
      width: px,
      height: px,
      fonts: [{ name: "Bricolage", data: bricolage, weight: 800, style: "normal" }],
    },
  );
}
