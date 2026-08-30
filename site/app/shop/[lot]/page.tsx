import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import EnquiryForm from "@/components/EnquiryForm";
import { getProducts, getProduct } from "@/lib/getProducts";

type Params = { lot: string };

export const revalidate = 60;

// Pieces added in the Studio after a deploy are not in this list; Next renders
// them on demand (dynamicParams defaults to true) and caches from then on.
export async function generateStaticParams(): Promise<Params[]> {
  const products = await getProducts();
  return products.map((p) => ({ lot: `lot-${p.lot}` }));
}

function findProduct(slug: string) {
  const match = /^lot-(\d+)$/.exec(slug);
  return match ? getProduct(match[1]) : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lot } = await params;
  const product = await findProduct(lot);
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
  const product = await findProduct(lot);
  if (!product) notFound();

  return (
    <div className="container product-page">
      <a href="/shop" className="tmy-link text-link product-back">
        ← Back to the archive
      </a>

      <div className="product-page-grid">
        <div className="product-page-photo" style={{ background: product.color }}>
          {product.image ? (
            <Image
              className="product-img"
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              preload
            />
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
