import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EnquiryForm from "@/components/EnquiryForm";
import ProductPhoto from "@/components/ProductPhoto";
import { getProduct, getProducts } from "@/lib/catalog";

// pick up edits from the Studio within a minute
export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
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
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <div className="container product-page">
      <a href="/shop" className="tmy-link text-link product-back">
        ← Back to the archive
      </a>

      <div className="product-page-grid">
        <div>
        <div className="product-page-photo" style={{ background: product.color }}>
          {product.image ? (
            <ProductPhoto src={product.image} alt={product.name} rotate={product.rotate} />
          ) : (
            <div className="hatch product-hatch">
              <span>product shot coming soon</span>
            </div>
          )}
          <div className="tag-chip">
            <span className="tag-hole" />
            {product.era}
          </div>
          {product.sold ? (
            <span className="product-sold-chip">SOLD</span>
          ) : (
            <span className="product-dot" title="available" />
          )}
        </div>
        {product.images && product.images.length > 0 && (
          <div className="product-more">
            {product.images.map((src, i) => (
              <div
                key={src}
                className="product-more-item"
                style={{ background: product.color }}
              >
                <ProductPhoto
                  src={src}
                  alt={`${product.name}, photo ${i + 2}`}
                  rotate={product.rotate}
                />
              </div>
            ))}
          </div>
        )}
        </div>

        <div>
          <h1 className="product-page-name">{product.name}</h1>
          <div className="product-page-price">{product.price}</div>
          <p className="page-copy">{product.description}</p>
          <dl className="product-specs">
            <div>
              <dt>Gold</dt>
              <dd>{product.era} solid gold</dd>
            </div>
            {product.meta && (
              <div>
                <dt>Notes</dt>
                <dd>{product.meta}</dd>
              </div>
            )}
          </dl>

          {product.sold ? (
            <div className="product-enquiry">
              <p className="product-enquiry-note">
                This one has found its person. Want something like it? Tell us
                what you&#39;re after on the{" "}
                <a href="/contact" className="tmy-link">
                  contact page
                </a>{" "}
                and we&#39;ll keep an eye out.
              </p>
            </div>
          ) : (
            <div className="product-enquiry">
              <p className="product-enquiry-note">
                Sizing, condition, extra photos, holds: ask us anything.
              </p>
              <EnquiryForm piece={product.name} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
