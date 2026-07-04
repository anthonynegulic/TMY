export default function PriceBand() {
  return (
    <section className="container price">
      <div className="price-card">
        <div>
          <div className="price-kicker">Every piece $300 – $2,000</div>
          <div className="price-title">Shop to your budget.</div>
        </div>
        <div className="price-options">
          <a href="#shop" className="price-btn price-btn-solid">
            Under $500
          </a>
          <a href="#shop" className="price-btn">
            $500 – $1,000
          </a>
          <a href="#shop" className="price-btn">
            $1,000+
          </a>
        </div>
      </div>
    </section>
  );
}
