import Link from "next/link";

export default function NotFoundContent() {
  return (
    <section className="container page-hero page-section-last">
      <h1 className="page-title">
        This one&#39;s <em className="accent">moved on</em>.
      </h1>
      <p className="page-lede">
        We couldn&#39;t find that page. If it was a piece, it may have already
        found its person. Have a look at what&#39;s in the archive now, or tell
        us what you&#39;re after and we&#39;ll keep an eye out.
      </p>
      <div className="hero-ctas not-found-ctas">
        <Link href="/shop" className="btn-dark">
          Browse the archive
        </Link>
        <Link href="/contact" className="tmy-link text-link">
          Send us a wish list
        </Link>
      </div>
    </section>
  );
}
