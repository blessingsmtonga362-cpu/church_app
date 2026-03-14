import Link from "next/link";

/* ── Cross SVG ──────────────────────────────────────────────── */
const CrossLogo = () => (
  <svg viewBox="0 0 44 60" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: 26, height: 35 }}>
    <rect x="16" y="0" width="12" height="60" rx="2" fill="currentColor" />
    <rect x="0" y="16" width="44" height="12" rx="2" fill="currentColor" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    style={{ width: 16, height: 16 }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);
const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

/* ── Footer data ────────────────────────────────────────────── */
const FOOTER_LINKS = {
  "Explore": [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Sermons", href: "/sermons" },
    { label: "Events", href: "/events" },
    { label: "Give", href: "/give" },
  ],
  "Ministries": [
    { label: "Youth Ministry", href: "/ministries/youth" },
    { label: "Worship Team", href: "/ministries/worship" },
    { label: "Prayer Warriors", href: "/ministries/prayer" },
    { label: "Community Outreach", href: "/ministries/outreach" },
    { label: "Women's Ministry", href: "/ministries/women" },
  ],
  "Connect": [
    { label: "Plan Your Visit", href: "/visit" },
    { label: "Contact Us", href: "/contact" },
    { label: "Prayer Request", href: "/prayer" },
    { label: "Join a Small Group", href: "/groups" },
    { label: "Volunteer", href: "/volunteer" },
  ],
};

const SOCIAL = [
  { icon: <FacebookIcon />, href: "#", label: "Facebook" },
  { icon: <YoutubeIcon />,  href: "#", label: "YouTube" },
  { icon: <InstagramIcon />, href: "#", label: "Instagram" },
  { icon: <WhatsappIcon />, href: "#", label: "WhatsApp" },
];

/* ── Component ──────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer-root {
          background: #2C1810;
          color: #C4A882;
          font-family: 'Cormorant Garamond', serif;
        }

        /* Top banner */
        .footer-cta-band {
          background: #6B2737;
          padding: 52px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .footer-cta-band::before,
        .footer-cta-band::after {
          content: '✦';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 80px;
          color: rgba(255,255,255,0.04);
          font-family: serif;
        }
        .footer-cta-band::before { left: 60px; }
        .footer-cta-band::after  { right: 60px; }

        .footer-cta-label {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #D4AF5A;
          margin-bottom: 10px;
        }
        .footer-cta-heading {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          font-weight: 600;
          color: #FAF7F2;
          margin-bottom: 8px;
        }
        .footer-cta-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-style: italic;
          color: rgba(196,168,130,0.8);
          margin-bottom: 28px;
        }
        .footer-cta-btns {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Main footer body */
        .footer-body {
          padding: 72px 40px 0;
          max-width: 1200px;
          margin: 0 auto;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 60px;
          border-bottom: 1px solid rgba(196,168,130,0.15);
        }

        /* Brand column */
        .footer-brand .logo-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .footer-brand .cross-icon { color: #B8922A; }
        .footer-brand .brand-name {
          font-family: 'Cinzel', serif;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #FAF7F2;
          line-height: 1;
        }
        .footer-brand .brand-sub {
          font-family: 'Cinzel', serif;
          font-size: 7px;
          letter-spacing: 0.38em;
          color: #B8922A;
          margin-top: 3px;
        }
        .footer-brand .tagline {
          font-style: italic;
          font-size: 1.05rem;
          color: rgba(196,168,130,0.65);
          line-height: 1.75;
          margin-bottom: 20px;
          max-width: 260px;
        }

        /* Service info */
        .service-info {
          background: rgba(107,39,55,0.2);
          border: 1px solid rgba(107,39,55,0.4);
          padding: 16px 20px;
          margin-bottom: 24px;
        }
        .service-info .si-label {
          font-family: 'Cinzel', serif;
          font-size: 8px;
          letter-spacing: 0.3em;
          color: #B8922A;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .service-info .si-time {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          color: #FAF7F2;
          line-height: 1.6;
        }

        /* Social icons */
        .social-row {
          display: flex;
          gap: 10px;
        }
        .social-btn {
          width: 36px; height: 36px;
          border: 1px solid rgba(196,168,130,0.25);
          display: flex; align-items: center; justify-content: center;
          color: rgba(196,168,130,0.6);
          transition: all 0.3s;
          background: none;
        }
        .social-btn:hover {
          border-color: #B8922A;
          color: #B8922A;
          background: rgba(184,146,42,0.08);
        }

        /* Link columns */
        .footer-col-title {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #B8922A;
          margin-bottom: 20px;
        }
        .footer-col-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-col-links a {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          color: rgba(196,168,130,0.6);
          transition: color 0.2s, padding-left 0.2s;
          display: block;
        }
        .footer-col-links a:hover {
          color: #FAF7F2;
          padding-left: 6px;
        }

        /* Bottom bar */
        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-bottom .copy {
          font-family: 'Lato', sans-serif;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: rgba(196,168,130,0.35);
          text-transform: uppercase;
        }
        .footer-bottom .verse {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.95rem;
          font-style: italic;
          color: rgba(196,168,130,0.35);
        }

        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-brand { grid-column: unset; }
          .footer-body { padding: 48px 20px 0; }
          .footer-bottom { padding: 20px; }
          .footer-cta-band { padding: 40px 20px; }
          .footer-cta-band::before, .footer-cta-band::after { display: none; }
        }
      `}</style>

      <footer className="footer-root">
        {/* ── CTA Banner ── */}
        <div className="footer-cta-band">
          <div className="footer-cta-label">You are welcome here</div>
          <h3 className="footer-cta-heading">Join Us This Sunday</h3>
          <p className="footer-cta-sub">Experience worship, community, and the Word of God</p>
          <div className="footer-cta-btns">
            <Link href="/visit" style={{
              fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#2C1810", background: "#D4AF5A",
              padding: "12px 30px", border: "2px solid #D4AF5A",
              transition: "all 0.3s", display: "inline-block"
            }}>Plan Your Visit</Link>
            <Link href="/sermons" style={{
              fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#FAF7F2",
              padding: "12px 30px", border: "2px solid rgba(253,251,248,0.4)",
              transition: "all 0.3s", display: "inline-block"
            }}>Watch Online</Link>
          </div>
        </div>

        {/* ── Main body ── */}
        <div className="footer-body">
          <div className="footer-grid">

            {/* Brand */}
            <div className="footer-brand">
              <div className="logo-row">
                <span className="cross-icon"><CrossLogo /></span>
                <div>
                  <div className="brand-name">BIMTO</div>
                  <div className="brand-sub">CHURCH</div>
                </div>
              </div>
              <p className="tagline">
                A community rooted in Scripture, united in love, and sent to serve the world with the Gospel of Jesus Christ.
              </p>

              <div className="service-info">
                <div className="si-label">Sunday Services</div>
                <div className="si-time">
                  First Service &nbsp;·&nbsp; 7:30 AM<br />
                  Main Service &nbsp;·&nbsp; 9:30 AM<br />
                  <span style={{ fontSize: "0.85rem", opacity: 0.6 }}>123 Faith Avenue, Lilongwe</span>
                </div>
              </div>

              <div className="social-row">
                {SOCIAL.map(({ icon, href, label }) => (
                  <a key={label} href={href} aria-label={label} className="social-btn">{icon}</a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="footer-col-title">{title}</h4>
                <ul className="footer-col-links">
                  {links.map(({ label, href }) => (
                    <li key={label}><Link href={href}>{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <span className="copy">© {year} Bimto Church · All Rights Reserved</span>
          <span className="verse">"Love · Faith · Community" — Matt 22:37–39</span>
        </div>
      </footer>
    </>
  );
}