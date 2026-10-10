import Link from "next/link";

export default function PriceBand() {
  return (
    <section id="price" className="container price">
      <div className="price-card">
        <div>
          <div className="price-title">Shop to your budget.</div>
        </div>
        <div className="price-options">
          <Link href="/shop?price=under-500" className="price-btn price-btn-solid">
            Under $500
          </Link>
          <Link href="/shop?price=500-1000" className="price-btn">
            $500 – $1,000
          </Link>
          <Link href="/shop?price=1000-plus" className="price-btn">
            $1,000+
          </Link>
        </div>
      </div>
    </section>
  );
}
