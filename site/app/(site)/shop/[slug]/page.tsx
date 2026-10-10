import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EnquiryForm from "@/components/EnquiryForm";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import { getProduct, getProducts } from "@/lib/catalog";
import { OG_SIZE } from "@/lib/og";
import { priceNumber, productPath, type Product } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

// pick up edits from the Studio within a minute
export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

function summary(product: Product): string {
  return product.description || `${product.era} solid gold, one of one. ${product.price}.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  const image = {
    url: shareImagePath(product),
    width: OG_SIZE.width,
    height: OG_SIZE.height,
    alt: `${product.name}, ${product.era} solid gold`,
  };
  // openGraph replaces the site-wide settings rather than merging, so the
  // shared fields are repeated here
  return {
    title: product.name,
    description: summary(product),
    alternates: { canonical: productPath(product) },
    openGraph: {
      siteName: "Theirs. Mine. Yours.",
      locale: "en_AU",
      type: "website",
      title: `${product.name} · ${product.price}`,
      description: summary(product),
      url: productPath(product),
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image] },
  };
}

function shareImagePath(product: Product): string {
  return `${productPath(product)}/share.png`;
}

// Product details for search engines (price, availability, preloved condition)
function structuredData(product: Product) {
  const url = `${SITE_URL}${productPath(product)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: summary(product),
    sku: product.slug,
    // the link-preview image, which has the photo's turn applied
    image: `${SITE_URL}${shareImagePath(product)}`,
    offers: {
      "@type": "Offer",
      url,
      price: priceNumber(product),
      priceCurrency: "AUD",
      availability: product.sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      itemCondition: "https://schema.org/UsedCondition",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const photos = product.image ? [product.image, ...(product.images ?? [])] : [];
  const others = products.filter((p) => !p.sold && p.slug !== product.slug).slice(0, 4);

  return (
    <div className="container product-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData(product)).replace(/</g, "\\u003c"),
        }}
      />
      <Link href="/shop" className="tmy-link text-link product-back">
        ← Back to the archive
      </Link>

      <div className="product-page-grid">
        <ProductGallery
          photos={photos}
          name={product.name}
          color={product.color}
          era={product.era}
          sold={!!product.sold}
        />

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
                <Link href="/contact" className="tmy-link">
                  contact page
                </Link>{" "}
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

      {others.length > 0 && (
        <section className="product-related">
          <div className="archive-head">
            <h2 className="page-h2 product-related-title">More from the archive</h2>
            <Link href="/shop" className="tmy-link text-link">
              See everything →
            </Link>
          </div>
          <div className="archive-grid related-grid">
            {others.map((p) => (
              <ProductCard key={p.slug} product={p} plain />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
