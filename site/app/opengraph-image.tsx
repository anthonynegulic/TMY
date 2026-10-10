import { ImageResponse } from "next/og";
import { getHeroPieces } from "@/lib/catalog";
import { OG, OG_SIZE, ogFonts, ogPhoto } from "@/lib/og";

// The preview shown when any page without its own (homepage, story, etc.) is
// shared: the tagline beside the first two hero pieces from the Studio.
export const alt = "Theirs. Mine. Yours. Gold that's already lived a little.";
export const size = OG_SIZE;
export const contentType = "image/png";
export const revalidate = 60;

// square cards, so a photo's quarter turn still fills its card
const SLOTS = [
  { size: 340, top: 60, right: 80, tilt: -3 },
  { size: 240, top: 320, right: 345, tilt: 4 },
];

export default async function Image() {
  const pieces = (await getHeroPieces()).slice(0, SLOTS.length);
  const [fonts, ...photos] = await Promise.all([
    ogFonts(),
    ...pieces.map((p) => ogPhoto(p.image)),
  ]);
  const tags = pieces.map((p, i) => ({ ...SLOTS[i], piece: p, photo: photos[i] }));

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

      {tags.map((t) => (
        <div
          key={t.piece.slug}
          style={{
            position: "absolute",
            top: t.top,
            right: t.right,
            width: t.size,
            height: t.size,
            display: "flex",
            borderRadius: 22,
            overflow: "hidden",
            background: t.piece.color,
            transform: `rotate(${t.tilt}deg)`,
            boxShadow: "0 16px 36px rgba(43, 33, 26, 0.22)",
          }}
        >
          {t.photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={t.photo}
              alt=""
              width={t.size}
              height={t.size}
              style={{
                width: t.size,
                height: t.size,
                objectFit: "cover",
                transform: `rotate(${t.piece.image?.rotation ?? 0}deg)`,
              }}
            />
          )}
        </div>
      ))}
    </div>,
    { ...size, fonts },
  );
}
