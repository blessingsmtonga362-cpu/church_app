import Link from "next/link";

const CrossIcon = () => (
  <svg viewBox="0 0 44 60" fill="none" style={{ width: 30, height: 40 }}>
    <rect x="16" y="0"  width="12" height="60" rx="2.5" fill="currentColor" />
    <rect x="0"  y="17" width="44" height="12" rx="2.5" fill="currentColor" />
  </svg>
);

const LINKS = {
  Explore:    [["Home","/"],["About Us","/about"],["Sermons","/sermons"],["Events","/events"],["Give","/give"]],
  Ministries: [["Youth Ministry","/ministries/youth"],["Worship Team","/ministries/worship"],["Prayer Warriors","/ministries/prayer"],["Community Outreach","/ministries/outreach"]],
  Connect:    [["Plan Your Visit","/visit"],["Contact Us","/contact"],["Prayer Request","/prayer"],["Small Groups","/groups"],["Volunteer","/volunteer"]],
};

const SOCIAL = [
  { label:"Facebook",  href:"#", path:"M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
  { label:"YouTube",   href:"#", path:"M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
  { label:"Instagram", href:"#", path:null },
];

export default function Footer() {
  return (
    <>
      <style>{`
        /* ── CTA band ── */
        .ft-cta {
          background: #521B30; padding: 72px 56px; text-align: center;
          position: relative; overflow: hidden;
        }
        .ft-cta::before, .ft-cta::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
        }
        .ft-cta::before {
          background: radial-gradient(ellipse at 20% 50%, rgba(184,136,42,0.12) 0%, transparent 60%);
        }
        .ft-cta::after {
          background: radial-gradient(ellipse at 80% 50%, rgba(184,136,42,0.08) 0%, transparent 60%);
        }
        .ft-cta-eye {
          font-family:'Cinzel',serif; font-size:11px; letter-spacing:0.42em;
          text-transform:uppercase; color:#E2BF6A; display:block; margin-bottom:14px;
          position:relative; z-index:1;
        }
        .ft-cta-h {
          font-family:'Cinzel',serif; font-size:clamp(1.9rem,3.5vw,3rem);
          font-weight:600; color:#FAF6F0; margin-bottom:12px;
          position:relative; z-index:1;
        }
        .ft-cta-sub {
          font-family:'Cormorant Garamond',serif; font-style:italic;
          font-size:clamp(1.2rem,2vw,1.45rem);
          color:rgba(250,246,240,0.7); margin-bottom:36px;
          position:relative; z-index:1;
        }
        .ft-cta-btns { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; position:relative; z-index:1; }

        /* ── Body ── */
        .ft-body { background:#3B1322; padding:84px 56px 0; }
        .ft-grid {
          max-width:1280px; margin:0 auto;
          display:grid; grid-template-columns:2.2fr 1fr 1fr 1fr;
          gap:56px; padding-bottom:72px;
          border-bottom:1px solid rgba(226,191,106,0.12);
        }

        /* Brand col */
        .ft-logo-row { display:flex; align-items:center; gap:14px; margin-bottom:22px; }
        .ft-logo-cross { color:#B8882A; }
        .ft-brand-name {
          font-family:'Cinzel',serif; font-size:21px; font-weight:700;
          letter-spacing:0.14em; color:#FAF6F0; line-height:1;
        }
        .ft-brand-sub {
          font-family:'Cinzel',serif; font-size:8px; letter-spacing:0.44em;
          color:#B8882A; margin-top:5px;
        }
        .ft-tagline {
          font-family:'Cormorant Garamond',serif; font-style:italic;
          font-size:clamp(1.05rem,1.4vw,1.2rem);
          color:rgba(226,191,106,0.55); line-height:1.78; max-width:290px; margin-bottom:24px;
        }
        .ft-service {
          background:rgba(139,26,46,0.25); border:1px solid rgba(139,26,46,0.45);
          padding:20px 24px; margin-bottom:28px;
        }
        .ft-svc-lbl {
          font-family:'Cinzel',serif; font-size:9px; letter-spacing:0.34em;
          text-transform:uppercase; color:#B8882A; margin-bottom:10px;
        }
        .ft-svc-txt {
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(1rem,1.4vw,1.15rem); color:#FAF6F0; line-height:1.7;
        }
        .ft-socials { display:flex; gap:10px; }
        .ft-soc {
          width:42px; height:42px; border:1px solid rgba(226,191,106,0.2);
          display:flex; align-items:center; justify-content:center;
          color:rgba(226,191,106,0.5); background:none;
          transition:all 0.25s; text-decoration:none;
        }
        .ft-soc:hover { border-color:#B8882A; color:#B8882A; background:rgba(184,136,42,0.08); }

        /* Link cols */
        .ft-col-title {
          font-family:'Cinzel',serif; font-size:11px; letter-spacing:0.32em;
          text-transform:uppercase; color:#B8882A; margin-bottom:24px;
        }
        .ft-col-list { list-style:none; display:flex; flex-direction:column; gap:13px; }
        .ft-col-list a {
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(1rem,1.3vw,1.15rem); color:rgba(226,191,106,0.52);
          transition:color 0.22s, padding-left 0.22s; display:block;
        }
        .ft-col-list a:hover { color:#FAF6F0; padding-left:8px; }

        /* Bottom */
        .ft-bottom {
          background:#2A0D18; padding:28px 56px;
          display:flex; justify-content:space-between; align-items:center;
          flex-wrap:wrap; gap:12px;
        }
        .ft-copy {
          font-family:'Inter',sans-serif; font-size:12px; letter-spacing:0.1em;
          text-transform:uppercase; color:rgba(226,191,106,0.28);
        }
        .ft-verse {
          font-family:'Cormorant Garamond',serif; font-style:italic;
          font-size:clamp(0.95rem,1.2vw,1.08rem); color:rgba(226,191,106,0.28);
        }

        /* Buttons inside footer */
        .ft-btn-gold {
          font-family:'Cinzel',serif; font-size:12px; letter-spacing:0.24em;
          text-transform:uppercase; color:#1C0A0F; background:#B8882A;
          padding:16px 38px; border:2px solid #B8882A;
          transition:all 0.28s; display:inline-block; text-decoration:none;
        }
        .ft-btn-gold:hover { background:#D4A840; border-color:#D4A840; }
        .ft-btn-ghost {
          font-family:'Cinzel',serif; font-size:12px; letter-spacing:0.24em;
          text-transform:uppercase; color:#FAF6F0; background:transparent;
          padding:16px 38px; border:2px solid rgba(250,246,240,0.4);
          transition:all 0.28s; display:inline-block; text-decoration:none;
        }
        .ft-btn-ghost:hover { border-color:#FAF6F0; background:rgba(250,246,240,0.08); }

        @media (max-width: 960px) {
          .ft-grid { grid-template-columns:1fr 1fr; }
          .ft-brand-col { grid-column:1/-1; }
        }
        @media (max-width: 600px) {
          .ft-grid { grid-template-columns:1fr; }
          .ft-brand-col { grid-column:unset; }
          .ft-body, .ft-cta { padding-left:24px; padding-right:24px; }
          .ft-bottom { padding:22px 24px; }
        }
      `}</style>

      <footer>
        {/* CTA band */}
        <div className="ft-cta">
          <span className="ft-cta-eye">You are welcome here</span>
          <h3 className="ft-cta-h">Join Us This Sunday</h3>
          <p className="ft-cta-sub">Experience worship, community & the living Word of God</p>
          <div className="ft-cta-btns">
            <Link href="/visit"   className="ft-btn-gold">Plan Your Visit</Link>
            <Link href="/sermons" className="ft-btn-ghost">Watch Online</Link>
          </div>
        </div>

        {/* Body */}
        <div className="ft-body">
          <div className="ft-grid">
            {/* Brand */}
            <div className="ft-brand-col">
              <div className="ft-logo-row">
                <span className="ft-logo-cross"><CrossIcon /></span>
                <div>
                  <div className="ft-brand-name">BIMTO</div>
                  <div className="ft-brand-sub">CHURCH</div>
                </div>
              </div>
              <p className="ft-tagline">
                A community rooted in Scripture, united in love, and sent to serve the world with the Gospel.
              </p>
              <div className="ft-service">
                <div className="ft-svc-lbl">Sunday Services</div>
                <div className="ft-svc-txt">
                  First Service &nbsp;·&nbsp; 7:30 AM<br />
                  Main Service &nbsp;·&nbsp; 9:30 AM<br />
                  <span style={{ fontSize:"0.87em", opacity:0.6 }}>123 Faith Avenue, Lilongwe</span>
                </div>
              </div>
              <div className="ft-socials">
                {SOCIAL.map(({ label, href, path }) => (
                  <a key={label} href={href} aria-label={label} className="ft-soc">
                    {path
                      ? <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:17,height:17 }}><path d={path}/></svg>
                      : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:17,height:17 }}><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
                    }
                  </a>
                ))}
              </div>
            </div>

            {/* Link cols */}
            {Object.entries(LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="ft-col-title">{title}</h4>
                <ul className="ft-col-list">
                  {(links as [string,string][]).map(([label, href]) => (
                    <li key={label}><Link href={href}>{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="ft-bottom">
          <span className="ft-copy">© {new Date().getFullYear()} Bimto Church — All Rights Reserved</span>
          <span className="ft-verse">"Love · Faith · Community" — Matt 22:37–39</span>
        </div>
      </footer>
    </>
  );
}