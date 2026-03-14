"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ── SVG Cross Logo ─────────────────────────────────────────── */
const CrossLogo = () => (
  <svg viewBox="0 0 44 60" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: 28, height: 38 }}>
    <rect x="16" y="0" width="12" height="60" rx="2" fill="currentColor" />
    <rect x="0" y="16" width="44" height="12" rx="2" fill="currentColor" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    style={{ width: 24, height: 24 }}>
    <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    style={{ width: 24, height: 24 }}>
    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
  </svg>
);

/* ── Nav links config ───────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home",    href: "/" },
  { label: "About",   href: "/about" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events",  href: "/events" },
  { label: "Give",    href: "/give" },
];

/* ── Component ──────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 200;
          transition: background 0.4s, box-shadow 0.4s, border-color 0.4s;
          border-bottom: 1px solid transparent;
        }
        .navbar.scrolled {
          background: rgba(253,251,248,0.97);
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 24px rgba(107,39,55,0.08);
          border-bottom-color: #EDE5D8;
        }
        .navbar.open {
          background: #FDFBF8;
          border-bottom-color: #EDE5D8;
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .nav-logo .cross-wrap {
          color: #6B2737;
          transition: color 0.3s;
        }
        .navbar.scrolled .nav-logo .cross-wrap,
        .navbar.open .nav-logo .cross-wrap {
          color: #6B2737;
        }
        .navbar:not(.scrolled):not(.open) .nav-logo .cross-wrap {
          color: #FAF7F2;
        }
        .nav-logo-text .church-name {
          font-family: 'Cinzel', serif;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 0.12em;
          line-height: 1;
          transition: color 0.3s;
        }
        .navbar.scrolled .church-name,
        .navbar.open .church-name { color: #2C1810; }
        .navbar:not(.scrolled):not(.open) .church-name { color: #FAF7F2; }

        .nav-logo-text .church-sub {
          font-family: 'Cinzel', serif;
          font-size: 7.5px;
          letter-spacing: 0.38em;
          margin-top: 2px;
          transition: color 0.3s;
        }
        .navbar.scrolled .church-sub,
        .navbar.open .church-sub { color: #B8922A; }
        .navbar:not(.scrolled):not(.open) .church-sub { color: #D4AF5A; }

        /* Desktop links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 36px;
          list-style: none;
        }
        .nav-link-item a {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          position: relative;
          padding-bottom: 3px;
          transition: color 0.3s;
        }
        .navbar.scrolled .nav-link-item a,
        .navbar.open .nav-link-item a { color: #5C3D2E; }
        .navbar:not(.scrolled):not(.open) .nav-link-item a { color: rgba(253,251,248,0.88); }

        .nav-link-item a::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          height: 1px; width: 0;
          background: #B8922A;
          transition: width 0.3s;
        }
        .nav-link-item a:hover::after,
        .nav-link-item a.active::after { width: 100%; }
        .nav-link-item a:hover { color: #6B2737 !important; }
        .nav-link-item a.active { color: #6B2737 !important; font-weight: 600; }

        /* CTA button */
        .nav-cta {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 10px 22px;
          border: 1.5px solid;
          transition: all 0.3s;
          text-decoration: none;
        }
        .navbar.scrolled .nav-cta,
        .navbar.open .nav-cta {
          color: #6B2737;
          border-color: #6B2737;
        }
        .navbar:not(.scrolled):not(.open) .nav-cta {
          color: #FAF7F2;
          border-color: rgba(253,251,248,0.6);
        }
        .navbar.scrolled .nav-cta:hover,
        .navbar.open .nav-cta:hover {
          background: #6B2737;
          color: #FAF7F2;
        }
        .navbar:not(.scrolled):not(.open) .nav-cta:hover {
          background: rgba(253,251,248,0.15);
        }

        /* Burger */
        .burger-btn {
          background: none;
          border: none;
          padding: 4px;
          display: none;
          transition: color 0.3s;
        }
        .navbar.scrolled .burger-btn,
        .navbar.open .burger-btn { color: #6B2737; }
        .navbar:not(.scrolled):not(.open) .burger-btn { color: #FAF7F2; }

        /* Mobile menu */
        .mobile-menu {
          background: #FDFBF8;
          border-top: 1px solid #EDE5D8;
          padding: 28px 40px 32px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .mobile-link {
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #5C3D2E;
          padding: 14px 0;
          border-bottom: 1px solid #EDE5D8;
          display: block;
          transition: color 0.2s, padding-left 0.2s;
        }
        .mobile-link:hover,
        .mobile-link.active { color: #6B2737; padding-left: 8px; }
        .mobile-cta {
          margin-top: 20px;
          text-align: center;
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #FDFBF8;
          background: #6B2737;
          padding: 14px;
          transition: background 0.3s;
        }
        .mobile-cta:hover { background: #4A1826; }

        @media (max-width: 900px) {
          .nav-links, .nav-cta { display: none; }
          .burger-btn { display: flex; }
        }
        @media (max-width: 480px) {
          .nav-inner { padding: 0 20px; }
          .mobile-menu { padding: 24px 20px 28px; }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? "scrolled" : ""} ${menuOpen ? "open" : ""}`}>
        <div className="nav-inner">
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <span className="cross-wrap"><CrossLogo /></span>
            <div className="nav-logo-text">
              <div className="church-name">BIMTO</div>
              <div className="church-sub">CHURCH</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="nav-links">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href} className="nav-link-item">
                <Link href={href} className={pathname === href ? "active" : ""}>{label}</Link>
              </li>
            ))}
          </ul>

          <Link href="/visit" className="nav-cta hide-mobile">Plan Your Visit</Link>

          {/* Burger */}
          <button
            className="burger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="mobile-menu">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`mobile-link ${pathname === href ? "active" : ""}`}
              >
                {label}
              </Link>
            ))}
            <Link href="/visit" className="mobile-cta">Plan Your Visit</Link>
          </div>
        )}
      </nav>
    </>
  );
}