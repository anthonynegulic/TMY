export default function PriceBand() {
  return (
    <section className="container price">
      <div className="price-card">
        <div>
          <div className="price-kicker">Every piece $300 – $2,000</div>
          <div className="price-title">Shop to your budget.</div>
        </div>
        <div className="price-options">
          <a href="/shop?price=under-500" className="price-btn price-btn-solid">
            Under $500
          </a>
          <a href="/shop?price=500-1000" className="price-btn">
            $500 – $1,000
          </a>
          <a href="/shop?price=1000-plus" className="price-btn">
            $1,000+
          </a>
        </div>
      </div>
    </section>
  );
}
