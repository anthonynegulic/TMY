import { ImageResponse } from "next/og";
import { getProduct, getProducts } from "@/lib/catalog";
import { OG, OG_SIZE, ogFonts, ogPhoto } from "@/lib/og";

// The preview shown when a piece is shared (Instagram DMs, iMessage, etc.):
// its main photo, turned as set in the Studio, beside the name and price.
// Served at a fixed address (/shop/<slug>/share.png) so the product page's
// metadata and structured data can both point at it.
export const revalidate = 60;

const CARD = 500;

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const [fonts, photo] = await Promise.all([ogFonts(), ogPhoto(product?.image)]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 80px",
          background: OG.pink,
          color: OG.ink,
        }}
      >
        <div
          style={{
            display: "flex",
            position: "relative",
            flex: "none",
            width: CARD,
            height: CARD,
            borderRadius: 26,
            overflow: "hidden",
            background: product?.color ?? "#E5A06B",
            transform: "rotate(-2.5deg)",
            boxShadow: "0 18px 40px rgba(43, 33, 26, 0.22)",
          }}
        >
          {photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              alt=""
              width={CARD}
              height={CARD}
              style={{
                width: CARD,
                height: CARD,
                objectFit: "cover",
                transform: `rotate(${product?.image?.rotation ?? 0}deg)`,
              }}
            />
          )}
          {product && (
            <div
              style={{
                position: "absolute",
                top: 22,
                left: 22,
                display: "flex",
                alignItems: "center",
                gap: 9,
                background: OG.pink,
                borderRadius: 10,
                padding: "6px 15px 8px 12px",
                fontFamily: "Bricolage",
                fontSize: 24,
              }}
            >
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 999,
                  border: "2px solid rgba(43, 33, 26, 0.5)",
                }}
              />
              {product.era}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontFamily: "Bricolage", fontSize: 28, color: OG.maroon }}>
            Theirs. Mine. Yours.
          </div>
          <div
            style={{
              fontFamily: "Instrument Serif",
              fontSize: 80,
              lineHeight: 1.02,
              marginTop: 26,
            }}
          >
            {product?.name ?? "Curated preloved fine jewellery"}
          </div>
          {product && (
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 28 }}>
              <div style={{ fontFamily: "Bricolage", fontSize: 46 }}>{product.price}</div>
              {product.sold && (
                <div
                  style={{
                    display: "flex",
                    background: OG.ink,
                    color: OG.pink,
                    borderRadius: 999,
                    padding: "6px 18px 8px",
                    fontFamily: "Bricolage",
                    fontSize: 22,
                    letterSpacing: 2,
                  }}
                >
                  SOLD
                </div>
              )}
            </div>
          )}
          <div
            style={{
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              fontSize: 32,
              color: OG.body,
              marginTop: 34,
            }}
          >
            {product ? `${product.era} solid gold, one of one.` : "Gold that's already lived a little."}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
