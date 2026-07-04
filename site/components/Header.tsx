"use client";

import { useState } from "react";

const LINKS = [
  { href: "#shop", label: "Shop" },
  { href: "#story", label: "The story" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

function BagLink() {
  return (
    <a href="#shop" className="bag-link">
      Bag <span className="bag-count">0</span>
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="masthead">
      <div className="container masthead-inner">
        <a href="#top" className="brand">
          <span className="brand-mark">TMY</span>
          <span className="brand-name">Theirs. Mine. Yours.</span>
        </a>
        <nav className="nav-desktop">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="tmy-link nav-link">
              {link.label}
            </a>
          ))}
          <span className="nav-divider" />
          <BagLink />
        </nav>
        <div className="nav-mobile">
          <BagLink />
          <button
            type="button"
            className="nav-burger"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {open && (
        <nav className="nav-panel">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
