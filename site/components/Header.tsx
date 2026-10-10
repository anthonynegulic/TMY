"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/story", label: "The story" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  // The menu remembers the page it was opened on, so it closes by itself
  // once you navigate somewhere else.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Escape closes the menu and puts focus back on the button
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setOpenOn(null);
      burgerRef.current?.focus();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="masthead">
      <div className="container masthead-inner">
        <Link href="/" className="brand" onClick={close}>
          <span className="brand-mark">TMY</span>
          <span className="brand-name">Theirs. Mine. Yours.</span>
        </Link>
        <nav className="nav-desktop" aria-label="Main">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`tmy-link nav-link${isActive(link.href) ? " nav-link-active" : ""}`}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-mobile">
          <button
            ref={burgerRef}
            type="button"
            className="nav-burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="nav-panel" aria-label="Main">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? "nav-panel-active" : undefined}
              aria-current={isActive(link.href) ? "page" : undefined}
              onClick={close}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
