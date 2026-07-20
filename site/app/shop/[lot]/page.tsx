import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EnquiryForm from "@/components/EnquiryForm";
import { products } from "@/lib/products";

type Params = { lot: string };

function findProduct(slug: string) {
  return products.find((p) => `lot-${p.lot}` === slug);
}

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ lot: `lot-${p.lot}` }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lot } = await params;
  const product = findProduct(lot);
  if (!product) return {};
  return {
    title: `${product.name} · Theirs. Mine. Yours.`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lot } = await params;
  const product = findProduct(lot);
  if (!product) notFound();

  return (
    <div className="container product-page">
      <a href="/shop" className="tmy-link text-link product-back">
        ← Back to the archive
      </a>

      <div className="product-page-grid">
        <div className="product-page-photo" style={{ background: product.color }}>
          {product.image ? (
            <img className="product-img" src={product.image} alt={product.name} />
          ) : (
            <div className="hatch product-hatch">
              <span>product shot coming soon</span>
            </div>
          )}
          <div className="lot-chip">
            <span className="lot-hole" />
            LOT {product.lot} · {product.era}
          </div>
          <span className="product-dot" title="available" />
        </div>

        <div>
          <div className="kicker page-kicker">
            ✦&nbsp;&nbsp;One of one · available
          </div>
          <h1 className="product-page-name">{product.name}</h1>
          <div className="product-page-price">{product.price}</div>
          <p className="page-copy">{product.description}</p>
          <dl className="product-specs">
            <div>
              <dt>Lot</dt>
              <dd>№ {product.lot}</dd>
            </div>
            <div>
              <dt>Gold</dt>
              <dd>{product.era} solid gold</dd>
            </div>
            <div>
              <dt>Notes</dt>
              <dd>{product.meta}</dd>
            </div>
          </dl>

          <div className="product-enquiry">
            <div className="kicker page-kicker">
              ✦&nbsp;&nbsp;Enquire about this piece
            </div>
            <p className="product-enquiry-note">
              Sizing, condition, extra photos, holds: ask us anything.
            </p>
            <EnquiryForm piece={`Lot ${product.lot} · ${product.name}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
