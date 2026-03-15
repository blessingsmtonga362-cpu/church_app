"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CrossIcon = () => (
  <svg viewBox="0 0 44 60" fill="none" style={{ width: 32, height: 44 }}>
    <rect x="16" y="0"  width="12" height="60" rx="2.5" fill="currentColor" />
    <rect x="0"  y="17" width="44" height="12" rx="2.5" fill="currentColor" />
  </svg>
);

const NAV = [
  { label: "Home",    href: "/" },
  { label: "About",   href: "/about" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events",  href: "/events" },
  { label: "Give",    href: "/give" },
];

export default function Navbar() {
  const [up,   setUp]   = useState(false);   // scrolled up = solid bg
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const fn = () => setUp(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => setOpen(false), [path]);

  const solid = up || open;

  return (
    <>
      <style>{`
        .nb {
          position: fixed; top: 0; left: 0; right: 0; z-index: 300;
          transition: background 0.35s, box-shadow 0.35s, border-color 0.35s;
          border-bottom: 1px solid transparent;
        }
        .nb.solid {
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(16px);
          box-shadow: 0 2px 24px rgba(139,26,46,0.07);
          border-bottom-color: #E8D9C4;
        }

        /* Inner */
        .nb-inner {
          max-width: 1280px; margin: 0 auto; padding: 0 56px;
          height: 88px;
          display: flex; align-items: center; justify-content: space-between;
        }

        /* Logo */
        .nb-logo { display: flex; align-items: center; gap: 14px; text-decoration: none; }
        .nb-logo .ico { transition: color 0.3s; }
        .nb.solid  .ico { color: #8B1A2E; }
        .nb:not(.solid) .ico { color: #FAF6F0; }

        .nb-logo-text .church {
          font-family: 'Cinzel', serif;
          font-size: 22px; font-weight: 700; letter-spacing: 0.14em;
          line-height: 1; transition: color 0.3s;
        }
        .nb.solid  .church { color: #1C0A0F; }
        .nb:not(.solid) .church { color: #FAF6F0; }

        .nb-logo-text .sub {
          font-family: 'Cinzel', serif;
          font-size: 9px; letter-spacing: 0.42em; margin-top: 4px;
          line-height: 1; transition: color 0.3s;
        }
        .nb.solid  .sub { color: #B8882A; }
        .nb:not(.solid) .sub { color: #D4A840; }

        /* Links */
        .nb-links { display: flex; align-items: center; gap: 44px; list-style: none; }
        .nb-links a {
          font-family: 'Cinzel', serif;
          font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase;
          position: relative; padding-bottom: 4px; transition: color 0.28s;
        }
        .nb.solid  .nb-links a { color: #6B3D2E; }
        .nb:not(.solid) .nb-links a { color: rgba(250,246,240,0.85); }
        .nb-links a::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          height: 2px; width: 0; background: #B8882A; transition: width 0.28s;
        }
        .nb-links a:hover::after, .nb-links a.on::after { width: 100%; }
        .nb-links a:hover { color: #8B1A2E !important; }
        .nb-links a.on    { color: #8B1A2E !important; font-weight: 600; }

        /* CTA */
        .nb-cta {
          font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.24em;
          text-transform: uppercase; padding: 12px 28px; border: 2px solid;
          transition: all 0.28s; text-decoration: none;
        }
        .nb.solid  .nb-cta { color: #8B1A2E; border-color: #8B1A2E; }
        .nb:not(.solid) .nb-cta { color: #FAF6F0; border-color: rgba(250,246,240,0.55); }
        .nb.solid  .nb-cta:hover { background: #8B1A2E; color: #FAF6F0; }
        .nb:not(.solid) .nb-cta:hover { background: rgba(250,246,240,0.12); }

        /* Burger */
        .nb-burger {
          background: none; border: none; padding: 6px;
          display: none; align-items: center; justify-content: center;
          transition: color 0.28s;
        }
        .nb.solid  .nb-burger { color: #8B1A2E; }
        .nb:not(.solid) .nb-burger { color: #FAF6F0; }

        /* Mobile menu */
        .nb-mobile {
          background: #FFFFFF; border-top: 1px solid #E8D9C4;
          padding: 28px 56px 36px;
        }
        .nb-mob-link {
          display: block; font-family: 'Cinzel', serif;
          font-size: 14px; letter-spacing: 0.22em; text-transform: uppercase;
          color: #3D1F16; padding: 18px 0; border-bottom: 1px solid #EAE0D0;
          transition: color 0.22s, padding-left 0.22s; text-decoration: none;
        }
        .nb-mob-link:hover, .nb-mob-link.on { color: #8B1A2E; padding-left: 12px; }
        .nb-mob-cta {
          display: block; margin-top: 24px; padding: 18px; text-align: center;
          font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 0.24em;
          text-transform: uppercase; color: #FAF6F0; background: #8B1A2E;
          transition: background 0.28s; text-decoration: none;
        }
        .nb-mob-cta:hover { background: #6A1222; }

        @media (max-width: 960px) {
          .nb-links, .nb-cta { display: none !important; }
          .nb-burger { display: flex !important; }
        }
        @media (max-width: 600px) {
          .nb-inner { padding: 0 24px; height: 76px; }
          .nb-mobile { padding: 24px 24px 32px; }
          .nb-logo-text .church { font-size: 19px; }
        }
      `}</style>

      <nav className={`nb ${solid ? "solid" : ""}`}>
        <div className="nb-inner">
          <Link href="/" className="nb-logo">
            <span className="ico"><CrossIcon /></span>
            <div className="nb-logo-text">
              <div className="church">BIMTO</div>
              <div className="sub">CHURCH</div>
            </div>
          </Link>

          <ul className="nb-links">
            {NAV.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className={path === href ? "on" : ""}>{label}</Link>
              </li>
            ))}
          </ul>

          <Link href="/visit" className="nb-cta" style={{ display: "inline-block" }}>Plan Your Visit</Link>

          <button className="nb-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
            {open
              ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:28, height:28 }}><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>
              : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:28, height:28 }}><path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round"/></svg>
            }
          </button>
        </div>

        {open && (
          <div className="nb-mobile">
            {NAV.map(({ label, href }) => (
              <Link key={href} href={href} className={`nb-mob-link ${path === href ? "on" : ""}`}>{label}</Link>
            ))}
            <Link href="/visit" className="nb-mob-cta">Plan Your Visit</Link>
          </div>
        )}
      </nav>
    </>
  );
}