import { ImageResponse } from "next/og";
import { OG, OG_SIZE, ogFonts, ogPhoto } from "@/lib/og";

// The preview shown when any page without its own (homepage, story, etc.) is
// shared. Uses two of the bundled photos, so it never depends on the Studio.
export const alt = "Theirs. Mine. Yours. Gold that's already lived a little.";
export const size = OG_SIZE;
export const contentType = "image/png";

const TAGS = [
  {
    src: "/products/ruby-gypsy-ring.jpg",
    color: "#E5A06B",
    w: 300,
    h: 380,
    top: 70,
    right: 90,
    tilt: -3,
  },
  {
    src: "/products/lattice-dome-ring.jpg",
    color: "#A9C6D6",
    w: 230,
    h: 230,
    top: 290,
    right: 330,
    tilt: 4,
  },
];

export default async function Image() {
  const [fonts, ...photos] = await Promise.all([
    ogFonts(),
    ...TAGS.map((t) => ogPhoto({ src: t.src })),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: OG.pink,
        color: OG.ink,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
          width: 640,
        }}
      >
        <div style={{ fontFamily: "Bricolage", fontSize: 30, color: OG.maroon }}>
          Theirs. Mine. Yours.
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontFamily: "Bricolage",
            fontSize: 82,
            lineHeight: 0.95,
            letterSpacing: -2.5,
            marginTop: 26,
          }}
        >
          <span>Gold that&apos;s already&nbsp;</span>
          <span
            style={{
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              color: OG.maroon,
              letterSpacing: 0,
            }}
          >
            lived
          </span>
          <span>&nbsp;a little.</span>
        </div>
        <div
          style={{
            fontFamily: "Instrument Serif",
            fontStyle: "italic",
            fontSize: 32,
            color: OG.body,
            marginTop: 30,
          }}
        >
          Curated preloved fine jewellery.
        </div>
      </div>

      {TAGS.map((t, i) => (
        <div
          key={t.src}
          style={{
            position: "absolute",
            top: t.top,
            right: t.right,
            width: t.w,
            height: t.h,
            display: "flex",
            borderRadius: 22,
            overflow: "hidden",
            background: t.color,
            transform: `rotate(${t.tilt}deg)`,
            boxShadow: "0 16px 36px rgba(43, 33, 26, 0.22)",
          }}
        >
          {photos[i] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photos[i]}
              alt=""
              width={t.w}
              height={t.h}
              style={{ width: t.w, height: t.h, objectFit: "cover" }}
            />
          )}
        </div>
      ))}
    </div>,
    { ...size, fonts },
  );
}
